"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { REVEAL_EASE } from "@/components/motion/RevealLine";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";
import { projectBySlug, type WorkCard as WorkCardData } from "@/lib/projects";

/** Stagger by index, capped so a longer list doesn't keep compounding the delay. */
const staggerDelay = (index: number) => Math.min(index, 3) * 0.1;

/**
 * Scroll-triggered, play-once reveal: the card fades/slides up. The image itself is
 * never scaled at rest (a leftover scale resamples the bitmap and blurs it).
 */
export function WorkCard({ card, index }: { card: WorkCardData; index: number }) {
  const project = projectBySlug(card.slug);
  // Work-only projects carry their own image; the rest reuse their Home row image.
  const image =
    card.image ??
    (project && { src: project.image, alt: project.imageAlt, position: project.imagePosition });
  const reduced = usePrefersReducedMotion();
  // On short viewports (phones in landscape) a card can be nearly viewport-tall,
  // so trigger earlier or it pops in late.
  const shortViewport = useMediaQuery("(max-height: 500px)");
  const viewport = { once: true, amount: shortViewport ? 0.15 : 0.3 } as const;
  const delay = staggerDelay(index);

  return (
    <motion.li
      className="min-w-0"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={reduced ? { duration: 0 } : { duration: 0.7, ease: REVEAL_EASE, delay }}
    >
      <Link href={`/work/${card.slug}`} className="work-card block h-full rounded-[12px]">
        <div className="relative overflow-hidden rounded-[12px] bg-surface [aspect-ratio:16/10]">
          {image && (
            <div className="work-card-media absolute inset-0">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index < 2}
                quality={90}
                sizes="(min-width: 1248px) 588px, (min-width: 800px) 48vw, calc(100vw - 40px)"
                className="object-cover"
                style={{ objectPosition: image.position ?? "center" }}
              />
            </div>
          )}
        </div>

        <div className="w-full min-w-0 pt-[clamp(14px,1.8vw,20px)]">
          <p className="t-tag font-normal text-text-meta">{card.meta}</p>
          <h2 className="work-card-title t-h3 mt-[clamp(6px,0.8vw,10px)] w-full [overflow-wrap:anywhere]">
            {card.title}
          </h2>
          <p className="t-body mt-[clamp(4px,0.6vw,8px)] text-text-secondary">{card.caption}</p>
        </div>
      </Link>
    </motion.li>
  );
}
