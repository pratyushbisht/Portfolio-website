"use client";

import { CursorGlow } from "@/components/motion/CursorGlow";
import { DotGrid } from "@/components/motion/DotGrid";
import { useMouseEffects, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Home-hero background (interactive dot grid + cursor glow) behind an arbitrary,
 * possibly very tall, block of content. Same rules as the hero: ≥768px with a real
 * mouse only, static grid and no glow under reduced motion, clipped so the glow
 * can never widen the page.
 */
export function DotField({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const isDesktop = useMouseEffects();
  const reduced = usePrefersReducedMotion();
  return (
    <div className={`relative isolate ${className}`}>
      {isDesktop && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-clip">
          {/* Dimmer than the Home hero: here the dots sit behind body copy, not empty space. */}
          <DotGrid reducedMotion={reduced} sticky dim={0.55} />
          {!reduced && <CursorGlow />}
        </div>
      )}
      {children}
    </div>
  );
}
