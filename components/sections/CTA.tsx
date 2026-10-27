import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ChatIcon } from "@/components/ui/icons";
import { links } from "@/lib/site";

export function CTA() {
  return (
    <section id="contact" aria-labelledby="cta-title" className="section-y bg-surface-cta">
      <Reveal className="container-page flex flex-col items-center text-center">
        <h2 id="cta-title" className="t-h2 max-w-[22ch]">
          Currently open to <span className="text-accent">UX &amp; Product Design</span> opportunities
        </h2>
        <p className="t-body mt-[clamp(14px,1.8vw,20px)] max-w-[52ch] text-text-secondary">
          Whether it&apos;s an internship, a full-time role, or a freelance project, I&apos;d love to
          chat about how I can contribute to your team.
        </p>
        <div className="btn-group mt-[clamp(24px,3vw,36px)] w-full justify-center">
          <Button href={links.getInTouch} icon={<ChatIcon />}>
            Get in touch
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
