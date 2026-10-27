"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Horizontal, snap-scrolling row. Scrolls inside its own box (never widens the
 * page), shows a thin scrollbar, and adds prev/next buttons for mouse users.
 */
export function GalleryScroller({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const reduced = usePrefersReducedMotion();
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const page = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduced ? "auto" : "smooth" });
  };

  const btn =
    "grid size-9 place-items-center rounded-full border border-border text-text-secondary transition-colors hover:border-border-hover hover:text-text disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text-secondary";

  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between gap-4">
        <p className="t-caption font-medium text-accent">{label}</p>
        {!(edges.start && edges.end) && (
          <div className="flex gap-2">
            <button type="button" className={btn} onClick={() => page(-1)} disabled={edges.start} aria-label="Previous screens">
              ←
            </button>
            <button type="button" className={btn} onClick={() => page(1)} disabled={edges.end} aria-label="Next screens">
              →
            </button>
          </div>
        )}
      </div>
      <ul
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label={`${label} (scrolls horizontally)`}
        className="scroll-x mt-4 flex snap-x snap-mandatory gap-[clamp(12px,1.6vw,16px)] overflow-x-auto pb-3"
      >
        {children}
      </ul>
    </div>
  );
}
