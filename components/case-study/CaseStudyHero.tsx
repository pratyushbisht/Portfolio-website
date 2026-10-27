"use client";

import { motion } from "motion/react";
import { ProjectBackdrop } from "@/components/motion/ProjectBackdrop";
import { REVEAL_EASE } from "@/components/motion/RevealLine";
import { usePrefersReducedMotion } from "@/lib/hooks";
import type { ProjectScene } from "@/lib/projects";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: REVEAL_EASE, delay },
});

/**
 * Title block with the project's scene playing once behind it (mount mode):
 * it animates on entry, settles, and stops — so it's cheap on phones too.
 */
export function CaseStudyHero({
  title,
  tagline,
  meta,
  scene,
}: {
  title: string;
  tagline: string;
  meta: string;
  scene: ProjectScene;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <header className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <ProjectBackdrop mode="mount" kind={scene} region="center" reducedMotion={reduced} />
      </div>
      <div className="container-page pt-[clamp(56px,9vw,112px)] pb-[clamp(40px,6vw,72px)] text-center">
        <motion.p className="t-tag text-accent" {...fadeUp(0.1)}>
          {meta}
        </motion.p>
        <motion.h1 className="t-display mx-auto mt-[clamp(12px,1.6vw,20px)] max-w-[20ch] text-balance" {...fadeUp(0.2)}>
          {title}
        </motion.h1>
        <motion.p className="t-lead mx-auto mt-[clamp(14px,2vw,24px)] max-w-[60ch] text-text-secondary" {...fadeUp(0.35)}>
          {tagline}
        </motion.p>
      </div>
    </header>
  );
}
