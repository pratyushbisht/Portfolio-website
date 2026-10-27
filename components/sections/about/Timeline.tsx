import { Reveal } from "@/components/motion/Reveal";
import type { TimelineEntry } from "@/lib/about";

export function Timeline({ id, title, entries }: { id: string; title: string; entries: TimelineEntry[] }) {
  return (
    <section aria-labelledby={id} className="container-page pt-[clamp(40px,6vw,80px)]">
      <Reveal className="flex items-center gap-4">
        <h2 id={id} className="t-caption shrink-0 font-medium text-accent">
          {title}
        </h2>
        <span aria-hidden="true" className="h-px min-w-0 flex-1 bg-border" />
      </Reveal>

      <ol>
        {entries.map((e) => (
          <li key={e.org} className="border-b border-border last:border-b-0">
            <Reveal className="grid grid-cols-1 gap-[clamp(8px,2.4vw,32px)] py-[clamp(28px,4.5vw,56px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.15fr)]">
              <p className="t-date min-w-0 text-text">
                {e.dates[0]}
                {e.dates[1] && (
                  <>
                    {" "}
                    <br className="hidden md:block" />
                    {e.dates[1]}
                  </>
                )}
              </p>
              <div className="min-w-0">
                <h3 className="t-lead font-normal text-accent">{e.org}</h3>
                {e.sub && <p className="t-caption mt-1 text-text-secondary">{e.sub}</p>}
              </div>
              <p className="t-caption prose-w min-w-0 text-text md:pt-1">{e.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
