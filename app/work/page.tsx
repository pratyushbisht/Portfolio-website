import type { Metadata } from "next";
import { CTA } from "@/components/sections/CTA";
import { DotField } from "@/components/motion/DotField";
import { WorkCard } from "@/components/sections/work/WorkCard";
import { workCards } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Thoughtful digital experiences grounded in research and human-centered design.",
};

export default function WorkPage() {
  return (
    <main>
      {/* Same dot grid + cursor glow as About, behind everything above the CTA. */}
      <DotField>
        <section aria-labelledby="work-page-title" className="container-page section-y">
          <header className="mx-auto max-w-[640px] text-center">
            <p className="t-tag text-accent">All Projects</p>
            <h1 id="work-page-title" className="t-display mt-[clamp(10px,1.4vw,16px)]">
              Work
            </h1>
            <p className="t-body mt-[clamp(12px,1.6vw,20px)] text-text-secondary">
              Thoughtful digital experiences grounded in research and human-centered design.
            </p>
          </header>

          {/* One column until two 340px cards + gap fit side by side (~800px viewport). */}
          <ul className="mt-[clamp(40px,6vw,72px)] grid grid-cols-1 gap-x-[clamp(16px,2.4vw,24px)] gap-y-[clamp(36px,4.5vw,56px)] min-[800px]:grid-cols-2">
            {workCards.map((card, i) => (
              <WorkCard key={card.slug} card={card} index={i} />
            ))}
          </ul>
        </section>
      </DotField>

      <CTA />
    </main>
  );
}
