"use client";

import { useEffect, useRef } from "react";

const SIZE = 500;
/** Exponential smoothing time constant — ~0.4s to settle. */
const TAU = 0.12;

/** Soft accent glow trailing the cursor. Lives inside a clipped layer so it can't cause overflow. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const layer = el?.parentElement;
    if (!el || !layer) return;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let visible = false;
    let primed = false;
    let raf = 0;
    let last = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const k = 1 - Math.exp(-dt / TAU);
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      el.style.transform = `translate3d(${pos.x - SIZE / 2}px, ${pos.y - SIZE / 2}px, 0)`;
      if (Math.abs(target.x - pos.x) > 0.3 || Math.abs(target.y - pos.y) > 0.3) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = layer.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      const inside = target.x >= 0 && target.y >= 0 && target.x <= r.width && target.y <= r.height;
      if (!primed) {
        pos.x = target.x;
        pos.y = target.y;
        primed = true;
      }
      if (inside !== visible) {
        visible = inside;
        el.style.opacity = inside ? "1" : "0";
      }
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 rounded-full opacity-0 transition-opacity duration-500 will-change-transform"
      style={{
        width: SIZE,
        height: SIZE,
        background: "radial-gradient(circle, rgba(110,168,254,0.08) 0%, rgba(110,168,254,0) 70%)",
      }}
    />
  );
}
