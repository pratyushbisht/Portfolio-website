"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

export type ChapterLink = { id: string; label: string };

/**
 * Two-column case-study body: sticky "Chapters" sidebar on desktop, a sticky
 * horizontal pill row on smaller screens. Both share one scroll-spy.
 * `lastChapter` (Design Documentation) is set apart visually in both.
 */
export function ChapterLayout({
  chapters,
  lastChapter,
  children,
}: {
  chapters: ChapterLink[];
  lastChapter: ChapterLink;
  children: React.ReactNode;
}) {
  const all = [...chapters, lastChapter];
  const [active, setActive] = useState(all[0].id);
  const reduced = usePrefersReducedMotion();
  const rowRef = useRef<HTMLDivElement>(null);

  // Scroll-spy. IntersectionObserver watches each section against the top third of
  // the viewport; on any change, the active chapter is the last one whose top has
  // crossed that line. The closing section wins once it's mostly on screen, since
  // a short last section may never reach the top third.
  useEffect(() => {
    const els = all
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => !!el);
    const last = els[els.length - 1];
    const BAND = 0.34; // must match the rootMargin below (-66% from the bottom)
    const compute = () => {
      // A few px of slack: the observer fires just as a top crosses the band edge.
      const line = window.innerHeight * BAND + 4;
      let current = els[0]?.id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      if (last) {
        const r = last.getBoundingClientRect();
        const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
        if (visible >= Math.min(r.height, window.innerHeight) * 0.6) current = last.id;
      }
      if (current) setActive(current);
    };
    const io = new IntersectionObserver(compute, {
      rootMargin: "0px 0px -66% 0px",
      threshold: [0, 1],
    });
    const lastIo = new IntersectionObserver(compute, { threshold: [0, 0.3, 0.6, 1] });
    els.forEach((el) => io.observe(el));
    if (last) lastIo.observe(last);
    compute();
    // Settle-check once a (smooth) scroll finishes, in case it ended between observer events.
    window.addEventListener("scrollend", compute);
    return () => {
      io.disconnect();
      lastIo.disconnect();
      window.removeEventListener("scrollend", compute);
    };
    // Chapter ids are static for a page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the active pill visible in the mobile row (horizontal scroll only).
  useEffect(() => {
    const row = rowRef.current;
    const pill = row?.querySelector<HTMLElement>(`[data-chapter="${active}"]`);
    if (!row || !pill || row.offsetParent === null) return;
    const target = pill.offsetLeft - (row.clientWidth - pill.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, target), behavior: reduced ? "auto" : "smooth" });
  }, [active, reduced]);

  const go = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      setActive(id);
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    },
    [reduced],
  );

  const pill = (c: ChapterLink, variant: "side" | "row") => (
    <a
      key={c.id}
      href={`#${c.id}`}
      data-chapter={c.id}
      onClick={(e) => go(e, c.id)}
      aria-current={active === c.id ? "location" : undefined}
      className={`chapter-pill ${variant === "row" ? "shrink-0 whitespace-nowrap" : "block"} ${
        active === c.id ? "is-active" : ""
      }`}
    >
      {c.label}
    </a>
  );

  return (
    <div className="container-page grid grid-cols-1 gap-x-[clamp(32px,5vw,80px)] lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]">
      {/* Desktop sidebar */}
      <aside className="hidden min-w-0 lg:block">
        <nav aria-label="Chapters" className="sticky top-[calc(var(--nav-h)+40px)]">
          <p className="t-caption mb-3 px-4 text-text-secondary">Chapters</p>
          <ul className="flex flex-col gap-1">
            {chapters.map((c) => (
              <li key={c.id}>{pill(c, "side")}</li>
            ))}
            <li className="mt-3 border-t border-border pt-3">{pill(lastChapter, "side")}</li>
          </ul>
        </nav>
      </aside>

      <div className="min-w-0">
        {/* Phone / tablet: sticky horizontal pill row under the site header */}
        <nav
          aria-label="Chapters"
          className="sticky top-[var(--nav-h)] z-30 -mx-[var(--gutter)] border-b border-border bg-[rgba(12,12,12,0.85)] backdrop-blur-[12px] lg:hidden"
        >
          <div
            ref={rowRef}
            className="no-scrollbar flex h-[var(--pillbar-h)] items-center gap-1 overflow-x-auto px-[var(--gutter)]"
          >
            {chapters.map((c) => pill(c, "row"))}
            <span aria-hidden="true" className="mx-2 h-5 w-px shrink-0 bg-border" />
            {pill(lastChapter, "row")}
          </div>
        </nav>

        {children}
      </div>
    </div>
  );
}
