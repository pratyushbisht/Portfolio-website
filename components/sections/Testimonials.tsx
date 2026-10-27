import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const TESTIMONIALS = [
  {
    quote:
      "His ability to grasp complex concepts quickly has been impressive, allowing him to adapt seamlessly.",
    name: "Pratheep Chandramouli",
    role: "Manager, EY",
  },
  {
    quote:
      "A true team player and great problem-solver who would never let you worry in case a problem arises.",
    name: "Tanvi Kapoor",
    role: "UX Designer",
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="section-y">
      <div className="container-page">
        <Reveal>
          <SectionHeading id="testimonials-title" tag="Testimonials" title="What people say" />
        </Reveal>

        <Reveal className="mt-[clamp(28px,4vw,48px)] grid grid-cols-1 gap-[clamp(16px,2vw,24px)] md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex min-w-0 flex-col rounded-[12px] border border-border bg-surface p-[clamp(20px,2.4vw,28px)]"
            >
              <span aria-hidden="true" className="block h-[0.5em] font-medium leading-none text-accent text-[length:var(--fs-quote-mark)]">
                &ldquo;
              </span>
              <blockquote className="t-body mt-[clamp(16px,2vw,24px)] flex-1 text-text">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="mt-[clamp(20px,2.4vw,28px)] flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="t-caption grid size-10 shrink-0 place-items-center rounded-full border border-border bg-bg font-medium text-text"
                >
                  {initials(t.name)}
                </span>
                <span className="min-w-0">
                  <span className="t-body block font-medium text-text">{t.name}</span>
                  <span className="t-caption block text-text-meta">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
