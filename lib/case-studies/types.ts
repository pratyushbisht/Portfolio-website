import type { ProjectScene } from "@/lib/projects";

/** An image slot. Leave `src` empty to render a labelled placeholder until the asset exists. */
export type Figure = {
  src?: string;
  alt: string;
  caption?: string;
  /** CSS aspect-ratio, e.g. "16/9". */
  aspect?: string;
  fit?: "cover" | "contain";
  position?: string;
  /** Cap for portrait images so they don't tower over the text, e.g. "420px". */
  maxWidth?: string;
  /** Pad the image inside its dark card (for light scans/tables on the dark page). */
  inset?: boolean;
  /** Opt-in: cap the image's height (px) below 768px wide by narrowing it. */
  phoneMaxHeight?: number;
};

export type MilestoneIcon = "research" | "prototype" | "experience";

export type Block =
  | { type: "text"; body: string }
  /** A string value renders as text; an array renders as pills (same style as `tags`). */
  | { type: "facts"; items: { label: string; value: string | string[] }[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "hmw"; body: string }
  | { type: "tags"; label?: string; items: string[] }
  | {
      type: "insights";
      label?: string;
      /** First number shown, so a second group can continue the count (e.g. 5 after 01 to 04). */
      start?: number;
      items: { body: string; citation?: string }[];
    }
  /** Short one-line points with accent dots, e.g. ethical considerations. */
  | { type: "bullets"; label?: string; items: string[] }
  | {
      type: "decisions";
      items: { title: string; body: string; citation?: string; figure: Figure }[];
    }
  | { type: "features"; label?: string; items: { title: string; body: string }[] }
  | { type: "fixes"; label?: string; items: { problem: string; fix: string }[] }
  | { type: "figure"; figure: Figure }
  /** Self-hosted video with native controls; never autoplays. */
  | { type: "video"; src: string; title: string; caption?: string; poster?: string }
  | {
      type: "milestones";
      title: string;
      intro: string;
      items: { icon: MilestoneIcon; title: string; body: string }[];
    }
  | { type: "gallery"; label?: string; items: Figure[] }
  | { type: "columns"; items: { title: string; body: string }[] }
  /** Plain-spoken caveat, e.g. "no quantified metrics exist for this project". */
  | { type: "note"; body: string; /** Bold lead-in; defaults to "A note on metrics". */ title?: string };

export const CHAPTERS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "role", label: "My Role" },
  { id: "process", label: "Process" },
  { id: "solution", label: "Solution" },
  { id: "impact", label: "Impact" },
  { id: "reflection", label: "Reflection" },
] as const;

/** Always last, rendered as the page's closing CTA rather than a regular chapter. */
export const DOCS_CHAPTER = { id: "documentation", label: "Design Documentation" } as const;

export type ChapterId = (typeof CHAPTERS)[number]["id"];

export type CaseStudy = {
  slug: string;
  title: string;
  year: string;
  /** One-line summary under the title. */
  tagline: string;
  meta: string;
  /** Background animation that plays once behind the hero. */
  scene: ProjectScene;
  chapters: Record<ChapterId, Block[]>;
  docs: {
    body: string;
    /** TODO: paste the documentation link here; empty renders a placeholder href. */
    url: string;
  };
};
