"use client";

import { useEffect, useRef } from "react";
import type { ProjectScene } from "@/lib/projects";
import { createScene, type Scene, type SceneRegion } from "./projectScenes";

const FADE_MS = 300;
/** Elapsed time used for the static frame of scenes that never fully settle. */
const IDLE_FRAME_AT = 8;

type ProjectBackdropProps = {
  kind: ProjectScene;
  region: SceneRegion;
} & (
  | {
      /** Home rows: animates only while `active`, fading in/out over 300ms. */
      mode: "hover";
      active: boolean;
    }
  | {
      /** Case-study hero: plays once on mount, then settles (and stops if the scene allows). */
      mode: "mount";
      reducedMotion: boolean;
    }
);

/**
 * Canvas backdrop for one project's abstract scene. One implementation serves
 * both triggers; nothing animates when it isn't needed.
 */
export function ProjectBackdrop(props: ProjectBackdropProps) {
  const { kind, region, mode } = props;
  const active = mode === "hover" ? props.active : true;
  const reducedMotion = mode === "mount" && props.reducedMotion;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const cancelFadeRef = useRef<(() => void) | null>(null);
  /** Set once a mount-mode scene has drawn its final frame; resizes redraw it. */
  const settledRef = useRef(false);

  const drawStatic = (ctx: CanvasRenderingContext2D, scene: Scene) => {
    const { w, h } = sizeRef.current;
    ctx.clearRect(0, 0, w, h);
    scene.reset();
    scene.draw(ctx, scene.settleAt ?? IDLE_FRAME_AT, scene.settleAt ?? IDLE_FRAME_AT);
  };

  // Size the canvas and (re)lay out the scene when its box resizes.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const scene = createScene(kind);
    sceneRef.current = scene;
    const ro = new ResizeObserver(() => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w: r.width, h: r.height };
      scene.layout(r.width, r.height, region);
      if (settledRef.current || reducedMotion) {
        settledRef.current = true;
        drawStatic(ctx, scene);
      }
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [kind, region, reducedMotion]);

  // Drive the animation: while hovered (hover mode) or once from mount (mount mode).
  useEffect(() => {
    if (!active || reducedMotion) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const scene = sceneRef.current;
    if (!canvas || !ctx || !scene) return;

    cancelFadeRef.current?.(); // re-hovered mid fade-out
    settledRef.current = false;
    scene.reset();
    const { w, h } = sizeRef.current;
    scene.layout(w, h, region); // fresh scatter each run

    let t0 = performance.now();
    let last = t0;
    let raf = 0;
    let paused = false;

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const elapsed = (now - t0) / 1000;
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      if (mode === "mount" && scene.settleAt !== undefined && elapsed >= scene.settleAt) {
        scene.draw(ctx, scene.settleAt, dt); // final resting frame, then stop for good
        settledRef.current = true;
        raf = 0;
        return;
      }
      scene.draw(ctx, elapsed, dt);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Mount mode with an idle (never-settling) scene: pause while off screen or hidden.
    let io: IntersectionObserver | undefined;
    let onVis: (() => void) | undefined;
    if (mode === "mount" && scene.settleAt === undefined) {
      const pause = () => {
        if (paused || !raf) return;
        paused = true;
        cancelAnimationFrame(raf);
        raf = 0;
      };
      const resume = () => {
        if (!paused) return;
        paused = false;
        const now = performance.now();
        t0 += now - last; // freeze elapsed while paused
        last = now;
        raf = requestAnimationFrame(frame);
      };
      let onScreen = true;
      io = new IntersectionObserver(([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen && !document.hidden) resume();
        else pause();
      });
      io.observe(canvas);
      onVis = () => (document.hidden || !onScreen ? pause() : resume());
      document.addEventListener("visibilitychange", onVis);
    }

    return () => {
      io?.disconnect();
      if (onVis) document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(raf);
      if (mode === "mount") return;
      // Hover mode: keep drawing through the CSS fade-out, then stop and clear.
      const stopAt = performance.now() + FADE_MS;
      const fade = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;
        const { w, h } = sizeRef.current;
        ctx.clearRect(0, 0, w, h);
        if (now >= stopAt) return;
        scene.draw(ctx, (now - t0) / 1000, dt);
        raf = requestAnimationFrame(fade);
      };
      raf = requestAnimationFrame(fade);
      cancelFadeRef.current = () => cancelAnimationFrame(raf);
    };
  }, [active, region, mode, reducedMotion]);

  // Cancel any trailing fade on unmount.
  useEffect(() => () => cancelFadeRef.current?.(), []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 block size-full transition-opacity duration-300 ease-out"
      style={{ opacity: active ? 1 : 0 }}
    />
  );
}
