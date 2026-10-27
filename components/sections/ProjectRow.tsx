"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProjectBackdrop } from "@/components/motion/ProjectBackdrop";
import { useFinePointer, useIsDesktop, usePrefersReducedMotion } from "@/lib/hooks";
import type { Project } from "@/lib/projects";

export function ProjectRow({
  project,
  imageSide,
  priority,
}: {
  project: Project;
  imageSide: "left" | "right";
  priority?: boolean;
}) {
  const [active, setActive] = useState(false);
  const isDesktop = useIsDesktop();
  const finePointer = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const showBackdrop = isDesktop && finePointer && !reduced;

  return (
    <Link
      href={`/work/${project.slug}`}
      data-image={imageSide}
      className="project-row relative isolate grid grid-cols-1 items-center gap-[clamp(16px,2.4vw,24px)] border-b border-border py-[clamp(20px,2.4vw,24px)] md:grid-cols-2"
      onPointerEnter={(e) => e.pointerType === "mouse" && setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {showBackdrop && (
        <div className="absolute inset-0 -z-10">
          <ProjectBackdrop
            mode="hover"
            kind={project.scene}
            active={active}
            region={imageSide === "left" ? "right" : "left"}
          />
        </div>
      )}

      <div
        className={`relative min-w-0 overflow-hidden rounded-[12px] bg-surface [aspect-ratio:16/9] ${
          imageSide === "right" ? "md:order-2" : ""
        }`}
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          priority={priority}
          quality={90}
          sizes="(min-width: 1248px) 588px, (min-width: 768px) 48vw, calc(100vw - 40px)"
          className="project-media object-cover"
          style={{ objectPosition: project.imagePosition ?? "center" }}
        />
        <div aria-hidden="true" className="project-overlay absolute inset-0 bg-accent/10" />
      </div>

      <div className="min-w-0">
        <p className="t-meta text-text-meta">
          {project.meta}
        </p>
        <h3 className="project-title t-h3 mt-[clamp(6px,0.8vw,10px)]">{project.title}</h3>
        <p className="t-body prose-w mt-[clamp(8px,1vw,12px)] text-text-secondary">
          {project.caption}
        </p>
        <p className="t-caption mt-[clamp(12px,1.4vw,18px)] font-medium text-accent">
          Read case study <span className="project-arrow" aria-hidden="true">→</span>
        </p>
      </div>
    </Link>
  );
}
