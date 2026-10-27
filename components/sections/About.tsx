import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { FileIcon, UserIcon } from "@/components/ui/icons";
import { links } from "@/lib/site";

const SKILLS = [
  "User Research",
  "Interaction and Visual Design",
  "High-Fidelity Prototyping",
  "Design Systems",
];
const TOOLS = ["Figma", "Framer", "FigJam", "Notion", "Miro", "HTML/CSS", "Maze"];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y">
      <div className="container-page">
        <Reveal className="grid grid-cols-1 items-center gap-[clamp(28px,5vw,64px)] md:grid-cols-[minmax(0,38fr)_minmax(0,62fr)]">
          <div className="relative mx-auto w-full min-w-0 max-w-[400px] overflow-hidden rounded-[12px] bg-surface [aspect-ratio:4/5] md:max-w-none">
            <Image
              src="/about/golden-gate.jpg"
              alt="Pratyush in sunglasses and an NY sweatshirt in front of the Golden Gate Bridge"
              fill
              sizes="(min-width: 1248px) 432px, (min-width: 768px) 36vw, 400px"
              className="object-cover"
              style={{ objectPosition: "center 35%" }}
            />
          </div>

          <div className="min-w-0">
            <p className="t-tag text-accent">About me</p>
            <h2 id="about-title" className="t-h2 mt-[clamp(8px,1vw,12px)]">
              CS grad turned <span className="text-accent">UX designer</span>, now at Purdue.
            </h2>
            <div className="t-body prose-w mt-[clamp(16px,2vw,24px)] space-y-[1em] text-text-secondary">
              <p>
                I started writing code, but found my real strength in understanding the people
                using it. Now pursuing my Master&apos;s in UX Design, I craft experiences that
                blend logic, empathy, and a bit of personality.
              </p>
              <p>
                When I&apos;m not pushing pixels, you&apos;ll find me debating FIFA formations,
                pretending leg day is optional, rewatching The Office for the 7th time, or
                adjusting to Indiana winters.
              </p>
            </div>
            <div className="btn-group mt-[clamp(20px,2.6vw,32px)]">
              <Button href={links.moreAboutMe} variant="secondary" icon={<UserIcon />}>
                More about me
              </Button>
              <Button href={links.resume} variant="secondary" icon={<FileIcon />}>
                Resume
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-[clamp(40px,6vw,72px)] grid grid-cols-1 gap-[clamp(28px,4vw,48px)] border-t border-border pt-[clamp(28px,4vw,48px)] sm:grid-cols-2">
          <div className="min-w-0">
            <h3 className="t-caption font-medium text-accent">What I do</h3>
            <ul className="mt-[clamp(12px,1.5vw,18px)] space-y-[clamp(6px,0.8vw,10px)]">
              {SKILLS.map((s) => (
                <li key={s} className="t-body flex items-baseline gap-3 text-text">
                  <span aria-hidden="true" className="size-1.5 shrink-0 translate-y-[-0.15em] rounded-full bg-accent" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <h3 className="t-caption font-medium text-accent">Tools I use</h3>
            <ul className="mt-[clamp(12px,1.5vw,18px)] flex flex-wrap gap-[clamp(6px,0.8vw,10px)]">
              {TOOLS.map((t) => (
                <li
                  key={t}
                  className="t-caption rounded-full border border-border bg-surface px-[clamp(12px,1.2vw,16px)] py-[clamp(6px,0.6vw,8px)] text-text-secondary"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
