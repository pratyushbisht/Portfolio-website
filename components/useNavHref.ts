"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { navLinks } from "@/lib/site";

type NavLink = (typeof navLinks)[number];

/**
 * In-page anchors (Contact → #contact) only work where the target exists.
 * Case-study pages end with Design Documentation instead of the CTA block, so
 * there Contact falls back to the Home page's contact section.
 */
export function useNavHref() {
  const pathname = usePathname();
  const [missing, setMissing] = useState<Set<string>>(new Set());

  useEffect(() => {
    const ids = ["contact"];
    setMissing(new Set(ids.filter((id) => !document.getElementById(id))));
  }, [pathname]);

  return (link: NavLink) =>
    link.href.startsWith("#") && missing.has(link.href.slice(1)) ? `/${link.href}` : link.href;
}
