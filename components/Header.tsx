"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { navLinks, type NavId } from "@/lib/site";
import { MascotWordmark } from "./HeaderMascot";
import { useNavHref } from "./useNavHref";

/**
 * Active link = the current route's own link only. Scrolling past a section with the
 * same name (e.g. Work or About on Home) does not change it.
 */
function useActiveLink(): NavId {
  const pathname = usePathname();
  return pathname.startsWith("/about")
    ? "about"
    : pathname.startsWith("/work")
      ? "work"
      : pathname.startsWith("/contact")
        ? "contact"
        : "home";
}

/** Plain logo, used inside the mobile menu overlay (no greeting there). */
function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 text-[length:var(--fs-brand)] font-medium text-text ${className}`}
    >
      <Image
        src="/brand/face-mark.png"
        alt=""
        width={128}
        height={128}
        quality={90}
        priority
        className="size-[clamp(22px,1.8vw,26px)] shrink-0"
      />
      Pratyush
    </Link>
  );
}

export function Header() {
  const active = useActiveLink();
  const hrefFor = useNavHref();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Lock scroll, close on Escape, move focus in/out of the overlay.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const mql = window.matchMedia("(min-width: 640px)");
    const onWide = () => mql.matches && setOpen(false);
    mql.addEventListener("change", onWide);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mql.removeEventListener("change", onWide);
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 h-[var(--nav-h)] border-b border-border bg-[rgba(12,12,12,0.8)] backdrop-blur-[12px]">
        <nav aria-label="Primary" className="container-page flex h-full items-center justify-between gap-4">
          {/* Logo stays a plain link home; the greeting happens inside the logo slot. */}
          <MascotWordmark />

          <ul className="hidden items-center gap-[clamp(16px,2.2vw,28px)] sm:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <Link
                  href={hrefFor(l)}
                  aria-current={active === l.id ? "page" : undefined}
                  className={`text-[length:var(--fs-nav)] transition-colors duration-200 ${
                    active === l.id ? "text-accent" : "text-text-secondary hover:text-text"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 grid size-11 place-items-center rounded-full text-text sm:hidden"
            data-menu-button
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon className="size-6" />
          </button>
        </nav>
      </header>

      {/* Sibling of <header>: backdrop-filter would otherwise trap position:fixed. */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-bg sm:hidden"
        >
          <div className="container-page flex h-[var(--nav-h)] shrink-0 items-center justify-between border-b border-border">
            <Wordmark />
            <button
              type="button"
              className="-mr-2 grid size-11 place-items-center rounded-full"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <CloseIcon className="size-6" />
            </button>
          </div>
          <ul className="container-page flex flex-1 flex-col justify-center gap-[clamp(12px,4svh,28px)] overflow-y-auto py-8">
            {navLinks.map((l, i) => (
              <li key={l.id}>
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={hrefFor(l)}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.id ? "page" : undefined}
                  className={`t-h2 block ${active === l.id ? "text-accent" : "text-text"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
