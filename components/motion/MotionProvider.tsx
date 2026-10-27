"use client";

import { MotionConfig } from "motion/react";

/** "user" = honour prefers-reduced-motion: transforms are skipped, opacity still animates. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
