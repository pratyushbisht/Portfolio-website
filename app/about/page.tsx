import type { Metadata } from "next";
import Image from "next/image";
import { DotField } from "@/components/motion/DotField";
import { Reveal } from "@/components/motion/Reveal";
import { CTA } from "@/components/sections/CTA";
import { AboutIntro } from "@/components/sections/about/AboutIntro";
import { Timeline } from "@/components/sections/about/Timeline";
import { bio, education, experience, stats } from "@/lib/about";

export const metadata: Metadata = {
  title: "About",
  description: "Designer by day, gamer by night, dog lover always. Pratyush Bisht's background and experience.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Home-hero dot grid + cursor glow behind everything above the CTA. */}
      <DotField className="pb-[clamp(40px,6vw,80px)]">
        <AboutIntro />

        {/* Stats: three columns from 640px; label/value rows below that. */}
        <Reveal className="container-page">
          <dl className="grid grid-cols-1 sm:grid-cols-3 sm:gap-[clamp(16px,3vw,40px)]">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex min-w-0 items-baseline justify-between gap-4 border-b border-border py-4 sm:flex-col sm:gap-[clamp(6px,0.8vw,10px)] sm:border-0 sm:py-0 ${
                  i === 1 ? "sm:items-center" : i === 2 ? "sm:items-end" : "sm:items-start"
                }`}
              >
                <dt className="t-tag text-accent">{s.label}</dt>
                <dd className="t-date text-text">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Photo + bio */}
        <section aria-labelledby="bio-title" className="container-page pt-[clamp(48px,7vw,96px)]">
          <Reveal className="mx-auto grid max-w-[960px] grid-cols-1 items-center gap-[clamp(28px,5vw,64px)] md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <div className="relative mx-auto w-full min-w-0 max-w-[360px] overflow-hidden rounded-[12px] bg-surface [aspect-ratio:3/4] md:max-w-none">
              <Image
                src="/about/pratyush.jpg"
                alt="Pratyush smiling, wearing glasses and a black polo shirt"
                fill
                priority
                sizes="(min-width: 768px) 360px, (min-width: 400px) 360px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-4">
                <h2 id="bio-title" className="t-tag shrink-0 text-accent">
                  About me
                </h2>
                <span aria-hidden="true" className="h-px min-w-0 flex-1 bg-border" />
              </div>
              <div className="t-lead prose-w mt-[clamp(16px,2.4vw,28px)] space-y-[1em] text-text">
                {bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <Timeline id="education-title" title="Education" entries={education} />
        <Timeline id="experience-title" title="Work Experience" entries={experience} />
      </DotField>

      <CTA />
    </main>
  );
}
