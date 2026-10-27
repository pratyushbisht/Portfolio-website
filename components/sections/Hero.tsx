"use client";

import { motion } from "motion/react";
import { CursorGlow } from "@/components/motion/CursorGlow";
import { DotGrid } from "@/components/motion/DotGrid";
import { REVEAL_EASE, RevealLine, revealDelay } from "@/components/motion/RevealLine";
import { ScatterIcons } from "@/components/motion/ScatterIcons";
import { Button } from "@/components/ui/Button";
import { LayersIcon } from "@/components/ui/icons";
import { useMouseEffects, usePrefersReducedMotion } from "@/lib/hooks";
import { links } from "@/lib/site";

const LINES: React.ReactNode[] = [
  "I design experiences that",
  "make technology feel",
  <>
    <em className="italic">a little more</em>{" "}
    <em className="italic text-accent">human.</em>
  </>,
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: REVEAL_EASE, delay },
});

export function Hero() {
  const isDesktop = useMouseEffects();
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate -mt-[var(--nav-h)] flex min-h-svh items-center justify-center"
    >
      {/* Decorative layer — clipped so the glow/icons can never widen the page. Desktop only. */}
      {isDesktop && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <DotGrid reducedMotion={reduced} />
          {!reduced && <CursorGlow />}
          <ScatterIcons reducedMotion={reduced} />
        </div>
      )}

      <div className="container-page pt-[calc(var(--nav-h)+clamp(40px,8svh,96px))] pb-[clamp(48px,8svh,96px)]">
        <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
          <motion.p className="t-tag text-accent" {...fadeUp(0.2)}>
            UX Designer · Purdue University
          </motion.p>

          <h1 id="hero-title" className="t-h1 mt-[clamp(14px,2vw,24px)] w-full text-balance">
            {LINES.map((line, i) => (
              <RevealLine key={i} delay={revealDelay(i)}>
                {line}
              </RevealLine>
            ))}
          </h1>

          <motion.p
            className="t-body mt-[clamp(16px,2.2vw,28px)] max-w-[520px] text-text-secondary"
            {...fadeUp(1.1)}
          >
            I&apos;m Pratyush, a UX designer who swapped debugging for design thinking, now
            crafting intuitive experiences grounded in real research at Purdue.
          </motion.p>

          <motion.div
            className="btn-group mt-[clamp(24px,3vw,36px)] w-full justify-center"
            {...fadeUp(1.4)}
          >
            <Button href={links.explore} icon={<LayersIcon />}>
              Explore Projects
            </Button>
            <Button href={links.getInTouch} variant="secondary">
              Get in touch
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
