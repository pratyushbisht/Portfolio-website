"use client";

import Link from "next/link";
import { navLinks } from "@/lib/site";
import { useNavHref } from "./useNavHref";

export function FooterNav() {
  const hrefFor = useNavHref();
  return (
    <nav aria-label="Footer">
      <ul className="flex flex-wrap justify-center gap-x-[clamp(16px,2.2vw,28px)] gap-y-2">
        {navLinks.map((l) => (
          <li key={l.id}>
            <Link
              href={hrefFor(l)}
              className="text-[length:var(--fs-nav)] text-text-secondary transition-colors duration-200 hover:text-text"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
