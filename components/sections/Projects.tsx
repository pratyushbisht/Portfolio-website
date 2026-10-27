import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { projects } from "@/lib/projects";
import { links } from "@/lib/site";
import { ProjectRow } from "./ProjectRow";

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="section-y">
      <div className="container-page">
        <Reveal>
          <SectionHeading id="work-title" tag="Selected Work" title="Case Studies" />
        </Reveal>

        <Reveal className="mt-[clamp(28px,4vw,48px)]">
          <ul className="flex flex-col">
            {projects.map((p, i) => (
              <li key={p.slug} className="min-w-0">
                <ProjectRow project={p} imageSide={i % 2 === 0 ? "left" : "right"} priority={i === 0} />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-[clamp(32px,4vw,48px)] flex justify-center">
          <Button
            href={links.allProjects}
            variant="secondary"
            className="flex-row-reverse"
            icon={<ArrowRightIcon />}
          >
            View all projects
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
