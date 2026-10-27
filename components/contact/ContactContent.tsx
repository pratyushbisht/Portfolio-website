"use client";

import { motion } from "motion/react";
import { REVEAL_EASE, RevealLine, revealDelay } from "@/components/motion/RevealLine";
import { MailIcon } from "@/components/contact/SocialIcons";
import { contactEmail, socialLinks, type SocialLink } from "@/lib/socialLinks";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: REVEAL_EASE, delay },
});

const INFO = [
  { label: "Based In", value: "West Lafayette" },
  { label: "Timezone", value: "EST (UTC-5)" },
  { label: "Status", value: "Available", dot: true },
];

function SocialButton({ link }: { link: SocialLink }) {
  const external = link.href.startsWith("http");
  return (
    <a
      href={link.href}
      className="social-btn"
      style={{ "--brand": link.hoverColor, "--icon-motion": link.iconMotion } as React.CSSProperties}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <link.Icon />
      <span>{link.label}</span>
    </a>
  );
}

export function ContactContent() {
  // Headline is one line, so one reveal at the shared hero timing (no stagger).
  const base = revealDelay(0);
  return (
    <section aria-labelledby="contact-title" className="container-page section-y">
      <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
        <motion.p className="t-tag text-accent" {...fadeUp(base - 0.2)}>
          Contact
        </motion.p>

        <h1 id="contact-title" className="t-display mt-[clamp(12px,1.6vw,20px)] w-full text-balance">
          <RevealLine delay={base}>Let&apos;s build something worth using</RevealLine>
        </h1>

        <motion.p
          className="t-body mt-[clamp(14px,2vw,22px)] max-w-[48ch] text-[rgba(239,239,239,0.65)]"
          {...fadeUp(base + 0.4)}
        >
          Open to UX and Product Design roles for Summer 2027. Always happy to talk shop.
        </motion.p>

        <motion.div className="mt-[clamp(28px,4vw,44px)] w-full" {...fadeUp(base + 0.55)}>
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex max-w-full items-center justify-center gap-[0.4em] font-medium text-accent transition-colors duration-200 hover:text-accent-hover text-[length:clamp(1rem,0.643rem+1.786vw,2rem)] leading-tight"
          >
            <MailIcon className="size-[0.9em] shrink-0" />
            {/* Fits one line down to 320px; if it ever can't, it breaks cleanly before the @. */}
            <span className="min-w-0">
              {contactEmail.split("@")[0]}
              <wbr />@{contactEmail.split("@")[1]}
            </span>
          </a>
          <p className="t-caption mt-2 text-text-meta">Usually replies within a day</p>
        </motion.div>

        <motion.div className="mt-[clamp(28px,4vw,40px)] w-full" {...fadeUp(base + 0.7)}>
          <ul className="flex flex-wrap justify-center gap-[clamp(8px,1.2vw,12px)]">
            {socialLinks
              .filter((l) => l.row === 1)
              .map((l) => (
                <li key={l.label}>
                  <SocialButton link={l} />
                </li>
              ))}
          </ul>
          <ul className="mt-[clamp(8px,1.2vw,12px)] flex flex-wrap justify-center gap-[clamp(8px,1.2vw,12px)]">
            {socialLinks
              .filter((l) => l.row === 2)
              .map((l) => (
                <li key={l.label}>
                  <SocialButton link={l} />
                </li>
              ))}
          </ul>
        </motion.div>

        <motion.dl
          className="mt-[clamp(40px,6vw,64px)] grid w-full grid-cols-1 gap-[clamp(20px,3vw,32px)] border-t border-border pt-[clamp(28px,4vw,40px)] sm:grid-cols-3"
          {...fadeUp(base + 0.85)}
        >
          {INFO.map((i) => (
            <div key={i.label} className="min-w-0">
              <dt className="t-tag text-text-meta">{i.label}</dt>
              <dd className="t-body mt-1.5 inline-flex items-center gap-2 font-medium text-text">
                {i.dot && (
                  <span
                    aria-hidden="true"
                    className="size-2 shrink-0 rounded-full bg-[#3FB950] shadow-[0_0_0_3px_rgba(63,185,80,0.2)]"
                  />
                )}
                {i.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
