"use client";

import { useCallback, useSyncExternalStore } from "react";

/** SSR-safe media query. Returns false on the server and during hydration. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

/** ≥768px — where the decorative, mouse-driven effects are allowed to exist at all. */
export const useIsDesktop = () => useMediaQuery("(min-width: 768px)");

/** A real mouse/trackpad, so hover-driven effects make sense. */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");

/**
 * Gate for the mouse-driven backgrounds (dot grid, cursor glow, hero icons):
 * ≥768px wide AND a real mouse/trackpad. Width alone isn't enough — phones in
 * landscape and tablets are wide but touch-only, where these effects only cost battery.
 */
export const useMouseEffects = () =>
  useMediaQuery("(min-width: 768px) and (hover: hover) and (pointer: fine)");
