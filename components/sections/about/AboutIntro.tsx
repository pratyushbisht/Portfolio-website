"use client";

import { motion } from "motion/react";
import { REVEAL_EASE, RevealLine, revealDelay } from "@/components/motion/RevealLine";

const LINES = [
  ["Designer", " by day,"],
  ["gamer", " by night,"],
  ["dog lover", " always"],
];

export function AboutIntro() {
  return (
    <section
      aria-labelledby="about-title"
      className="container-page pt-[clamp(56px,9vw,112px)] pb-[clamp(40px,6vw,72px)] text-center"
    >
      <h1 id="about-title" className="t-display mx-auto max-w-[900px]">
        {LINES.map(([accent, rest], i) => (
          <RevealLine key={i} delay={revealDelay(i)}>
            <span className="text-accent">{accent}</span>
            {rest}
          </RevealLine>
        ))}
      </h1>
      <motion.p
        className="t-body mx-auto mt-[clamp(16px,2vw,24px)] max-w-[46ch] text-text-secondary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: REVEAL_EASE, delay: revealDelay(LINES.length) + 0.25 }}
      >
        I&apos;m curious about new technologies and love shaping them into thoughtful,
        user-centered experiences.
      </motion.p>
    </section>
  );
}
