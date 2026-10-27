"use client";

import { motion } from "motion/react";

export const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
/** Home hero and About headline share this timing: 0.4s start, 0.15s per line. */
export const revealDelay = (index: number) => 0.4 + index * 0.15;

/**
 * One headline line that slides up out of an overflow:hidden mask on mount.
 * Extra bottom padding (cancelled by a negative margin) keeps descenders and
 * italic overhang out of the clip.
 */
export function RevealLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="-mb-[0.12em] block overflow-hidden px-[0.06em] pb-[0.12em]">
      <motion.span
        className="block"
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.9, ease: REVEAL_EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
