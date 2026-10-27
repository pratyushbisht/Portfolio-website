"use client";

import { useEffect, useRef } from "react";

const SPACING = 50;
const FALLOFF = 250;
const BASE_RGB = [239, 239, 239];
const ACCENT_RGB = [110, 168, 254];
/** Idle dots are batched into a few alpha buckets so we issue ~4 fills, not ~1000. */
const BUCKETS = 4;

/** Stable per-dot phase from its grid cell, so nothing is stored or rebuilt. */
const phaseAt = (c: number, r: number) => {
  const s = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453;
  return (s - Math.floor(s)) * Math.PI * 2;
};

/**
 * Single-canvas interactive dot field.
 * - The grid is anchored to the canvas's parent (the "field"), and only the dots
 *   inside the canvas are drawn. With `sticky`, the canvas is viewport-sized and
 *   pinned while its tall field scrolls past, so the dots move with the page
 *   without a giant canvas.
 * - Mouse lives in a closure variable (never React state).
 * - rAF only runs while the canvas is on screen and the tab is visible.
 * - Reduced motion: static frames only (redrawn on scroll/resize), no animation.
 */
export function DotGrid({
  reducedMotion,
  sticky = false,
  dim = 1,
}: {
  reducedMotion: boolean;
  sticky?: boolean;
  /** Multiplier on dot alpha (idle and hover), for text-heavy pages. 1 = Home hero. */
  dim?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const field = canvas?.parentElement;
    if (!canvas || !ctx || !field) return;

    let w = 0;
    let h = 0;

    // Pointer in client coords; influence eases in/out so dots never pop.
    const pointer = { cx: 0, cy: 0, inside: false };
    let influence = 0;

    let raf = 0;
    let onScreen = true;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const t = reducedMotion ? 0 : now / 1000;

      influence += ((pointer.inside ? 1 : 0) - influence) * (1 - Math.exp(-dt / 0.15));
      const cr = canvas.getBoundingClientRect();
      const fr = field.getBoundingClientRect();
      const mx = pointer.cx - cr.left;
      const my = pointer.cy - cr.top;
      const useMouse = !reducedMotion && influence > 0.01;

      // Grid origin in canvas coordinates, centred within the field.
      const ox = fr.left - cr.left + (fr.width - Math.floor(fr.width / SPACING) * SPACING) / 2;
      const oy = fr.top - cr.top + (fr.height - Math.floor(fr.height / SPACING) * SPACING) / 2;
      const c0 = Math.ceil(-ox / SPACING);
      const c1 = Math.floor((w - ox) / SPACING);
      const r0 = Math.ceil(-oy / SPACING);
      const r1 = Math.floor((h - oy) / SPACING);

      ctx.clearRect(0, 0, w, h);
      const paths: Path2D[] = Array.from({ length: BUCKETS }, () => new Path2D());
      const near: [number, number, number][] = [];

      for (let r = r0; r <= r1; r++) {
        const y = oy + r * SPACING;
        for (let c = c0; c <= c1; c++) {
          const x = ox + c * SPACING;
          const phase = phaseAt(c, r);
          if (useMouse) {
            const dx = x - mx;
            const dy = y - my;
            if (dx * dx + dy * dy < FALLOFF * FALLOFF) {
              near.push([x, y, phase]);
              continue;
            }
          }
          const pulse = 0.5 + 0.5 * Math.sin(t * 1.1 + phase);
          const b = Math.min(BUCKETS - 1, Math.floor(pulse * BUCKETS));
          const rad = 1 + (b / (BUCKETS - 1)) * 0.5;
          paths[b].moveTo(x + rad, y);
          paths[b].arc(x, y, rad, 0, Math.PI * 2);
        }
      }

      for (let b = 0; b < BUCKETS; b++) {
        const a = (0.05 + (b / (BUCKETS - 1)) * 0.04) * dim; // ≈ 0.07 average at dim 1
        ctx.fillStyle = `rgba(239,239,239,${a.toFixed(3)})`;
        ctx.fill(paths[b]);
      }

      for (const [x, y, phase] of near) {
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.1 + phase);
        const d = Math.hypot(x - mx, y - my);
        const p = 1 - d / FALLOFF;
        const e = p * p * (3 - 2 * p) * influence; // smoothstep
        const rad = 1 + pulse * 0.5 + e * 2.2;
        const cr2 = Math.round(BASE_RGB[0] + (ACCENT_RGB[0] - BASE_RGB[0]) * e);
        const cg = Math.round(BASE_RGB[1] + (ACCENT_RGB[1] - BASE_RGB[1]) * e);
        const cb = Math.round(BASE_RGB[2] + (ACCENT_RGB[2] - BASE_RGB[2]) * e);
        const a = (0.07 + pulse * 0.03 + e * 0.6) * dim;
        ctx.fillStyle = `rgba(${cr2},${cg},${cb},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    ro.observe(field);

    if (reducedMotion) {
      // Static grid; a sticky canvas still needs a redraw as the field scrolls.
      const redraw = () => draw(performance.now());
      if (sticky) window.addEventListener("scroll", redraw, { passive: true });
      return () => {
        ro.disconnect();
        window.removeEventListener("scroll", redraw);
      };
    }

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (raf || !onScreen || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.cx = e.clientX;
      pointer.cy = e.clientY;
      const r = field.getBoundingClientRect();
      pointer.inside =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    };
    const onLeave = () => (pointer.inside = false);
    const onVis = () => (document.hidden ? stop() : start());
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    io.observe(canvas);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reducedMotion, sticky, dim]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={sticky ? "sticky top-0 block h-svh w-full" : "absolute inset-0 block size-full"}
    />
  );
}
