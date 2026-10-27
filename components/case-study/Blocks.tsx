import Image from "next/image";
import type { Block, Figure, MilestoneIcon } from "@/lib/case-studies";
import { GalleryScroller } from "./GalleryScroller";

const label = "t-caption font-medium text-accent";
/** Shared pill look for method tags and pill-valued facts. */
const pill = "t-caption rounded-full border border-border bg-surface px-3.5 py-1.5 text-text-secondary";

/** "16/9" or "1.5" -> 1.777... (width / height). */
const aspectToNumber = (aspect: string) => {
  const [w, h] = aspect.split("/").map(Number);
  return h ? w / h : w || 1;
};

const MILESTONE_ICONS: Record<MilestoneIcon, React.ReactNode> = {
  // Open book
  research: <path d="M3 6c2.6-1.2 5.6-1.2 9 1 3.4-2.2 6.4-2.2 9-1v12.5c-2.6-1.2-5.6-1.2-9 1-3.4-2.2-6.4-2.2-9-1V6Zm9 1v12.5" />,
  prototype: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 18.5h2" />
    </>
  ),
  experience: <path d="m5 12.5 4.5 4.5L19 7.5" />,
};

/**
 * Rendered widths of the case-study content column (sidebar layout from 1024px,
 * capped at 912px). Measured, so each breakpoint errs slightly wide, never narrow.
 */
const SIZES_FULL = "(min-width: 1280px) 912px, (min-width: 1024px) calc(95vw - 300px), calc(100vw - 40px)";
/** Half of that column: the image side of an alternating decision row. */
const SIZES_HALF =
  "(min-width: 1280px) 440px, (min-width: 1024px) calc(47vw - 150px), (min-width: 768px) calc(50vw - 40px), calc(100vw - 40px)";

export function FigureView({ figure, sizes = SIZES_FULL }: { figure: Figure; sizes?: string }) {
  const { src, alt, caption, aspect = "16/9", fit = "cover", position, maxWidth, inset, phoneMaxHeight } = figure;
  // Below 768px, narrow the figure so its height stays at or under phoneMaxHeight.
  const phoneMax = phoneMaxHeight ? `${Math.round(phoneMaxHeight * aspectToNumber(aspect))}px` : undefined;
  const media = (
    <div
      className={`relative w-full overflow-hidden ${
        inset ? "rounded-[6px]" : "rounded-[12px] border border-border bg-surface"
      }`}
      style={{ aspectRatio: aspect }}
    >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            // Case-study figures are screenshots and diagrams: text edges need the higher quality.
            quality={90}
            className={fit === "contain" ? "object-contain" : "object-cover"}
            style={{ objectPosition: position ?? "center" }}
          />
        ) : (
          // Placeholder until the real asset is added in lib/case-studies/*.
          <div className="absolute inset-0 grid place-items-center p-4 text-center">
            <span className="t-caption text-text-meta">Image coming soon · {alt}</span>
          </div>
        )}
    </div>
  );
  return (
    <figure
      className={`mx-auto w-full min-w-0 ${phoneMax ? "max-md:max-w-[min(100%,var(--phone-max))]!" : ""}`}
      style={{ maxWidth, ...(phoneMax ? { ["--phone-max" as string]: phoneMax } : {}) }}
    >
      {inset ? (
        // Dark card frame (same border/radius as the photos) with the image padded inside.
        <div className="rounded-[12px] border border-border bg-surface p-[var(--inset-pad)]">{media}</div>
      ) : (
        media
      )}
      {caption && <figcaption className="t-caption mt-2 text-center text-text-meta">{caption}</figcaption>}
    </figure>
  );
}

function Milestones({ block }: { block: Extract<Block, { type: "milestones" }> }) {
  return (
    <div className="rounded-[16px] border border-border bg-surface p-[clamp(20px,3.5vw,40px)]">
      <h3 className="t-h3 text-text">{block.title}</h3>
      <p className="t-body prose-w mt-2 text-text-secondary">{block.intro}</p>
      <ol className="mt-[clamp(20px,3vw,32px)] grid grid-cols-1 gap-[clamp(16px,2vw,20px)] md:grid-cols-3 md:gap-2">
        {block.items.map((m, i) => (
          <li key={m.title} className="min-w-0">
            {/* Chevron step bar; plain rounded bar when stacked on small screens. */}
            <div
              className={`milestone-step flex h-14 items-center justify-center bg-white/[0.04] ${
                i === 0 ? "is-first" : ""
              }`}
            >
              <span className="grid size-9 place-items-center rounded-full bg-accent/15 text-accent">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="size-5"
                >
                  {MILESTONE_ICONS[m.icon]}
                </svg>
              </span>
            </div>
            <h4 className="t-body mt-3 font-medium text-text md:px-3">{m.title}</h4>
            <p className="t-caption mt-1 text-text-secondary md:px-3">{m.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return <p className="t-body prose-w text-text-secondary">{block.body}</p>;

    case "facts": {
      // Text facts share a row; pill facts (arrays) take a full row underneath.
      const textCount = block.items.filter((f) => typeof f.value === "string").length;
      return (
        <dl
          className={`grid grid-cols-2 gap-x-6 gap-y-5 border-y border-border py-[clamp(16px,2.4vw,24px)] ${
            textCount === 3 ? "md:grid-cols-3" : "md:grid-cols-4"
          }`}
        >
          {block.items.map((f) =>
            typeof f.value === "string" ? (
              <div key={f.label} className="min-w-0">
                <dt className="t-tag text-accent">{f.label}</dt>
                <dd className="t-caption mt-1.5 text-text">{f.value}</dd>
              </div>
            ) : (
              <div key={f.label} className="col-span-full min-w-0">
                <dt className="t-tag text-accent">{f.label}</dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-2">
                    {f.value.map((v) => (
                      <li key={v} className={pill}>
                        {v}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ),
          )}
        </dl>
      );
    }

    case "stats":
      return (
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-[clamp(12px,1.6vw,16px)]">
          {block.items.map((s) => (
            <li key={s.value + s.label} className="min-w-0 rounded-[12px] border border-border p-[clamp(16px,2vw,24px)]">
              <p className="t-h2 text-accent">{s.value}</p>
              <p className="t-caption mt-2 text-text-secondary">{s.label}</p>
            </li>
          ))}
        </ul>
      );

    case "hmw":
      return (
        <blockquote className="t-lead prose-w border-l-2 border-accent py-1 pl-[clamp(16px,2vw,24px)] text-text">
          {block.body}
        </blockquote>
      );

    case "tags":
      return (
        <div>
          {block.label && <p className={label}>{block.label}</p>}
          <ul className="mt-3 flex flex-wrap gap-2">
            {block.items.map((t) => (
              <li key={t} className={pill}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      );

    case "insights":
      return (
        <div>
          {block.label && <p className={label}>{block.label}</p>}
          <ol className="mt-4 space-y-[clamp(18px,2.4vw,28px)]">
            {block.items.map((it, i) => (
              <li key={i} className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4">
                <span className="t-h3 text-accent tabular-nums">
                  {String((block.start ?? 1) + i).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="t-body prose-w text-text">{it.body}</p>
                  {it.citation && (
                    <p className="t-caption prose-w mt-2 italic text-text-meta [overflow-wrap:anywhere]">{it.citation}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      );

    case "decisions":
      return (
        <div className="space-y-[clamp(40px,6vw,72px)]">
          {block.items.map((d, i) => (
            <div key={d.title} className="grid grid-cols-1 items-center gap-[clamp(20px,3.5vw,40px)] md:grid-cols-2">
              <div className={`min-w-0 ${i % 2 ? "md:order-2" : ""}`}>
                <FigureView figure={d.figure} sizes={SIZES_HALF} />
              </div>
              <div className="min-w-0">
                <h3 className="t-h3 text-accent">{d.title}</h3>
                <p className="t-body mt-3 text-text-secondary">{d.body}</p>
                {d.citation && (
                  <p className="t-caption mt-3 italic text-text-meta [overflow-wrap:anywhere]">{d.citation}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      );

    case "features":
      return (
        <div>
          {block.label && <p className={label}>{block.label}</p>}
          <ul className="mt-4 grid grid-cols-1 gap-[clamp(12px,1.6vw,16px)] sm:grid-cols-2">
            {block.items.map((f) => (
              <li key={f.title} className="min-w-0 rounded-[12px] border border-border bg-surface p-[clamp(16px,2vw,24px)]">
                <h3 className="t-body font-medium text-text">{f.title}</h3>
                <p className="t-caption mt-1.5 text-text-secondary">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      );

    case "fixes":
      return (
        <div>
          {block.label && <h3 className="t-h3 text-text">{block.label}</h3>}
          <ul className="mt-5 divide-y divide-border border-y border-border">
            {block.items.map((f) => (
              <li
                key={f.problem}
                className="grid grid-cols-1 gap-3 py-[clamp(16px,2.4vw,24px)] sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-6"
              >
                <div className="min-w-0">
                  <p className="t-tag text-accent">Problem</p>
                  <p className="t-caption mt-1.5 text-text-secondary">{f.problem}</p>
                </div>
                <span aria-hidden="true" className="t-h3 self-center text-text-meta rotate-90 sm:rotate-0 w-fit">
                  →
                </span>
                <div className="min-w-0">
                  <p className="t-tag text-accent">Fix</p>
                  <p className="t-caption mt-1.5 text-text">{f.fix}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );

    case "bullets":
      return (
        <div>
          {block.label && <h3 className="t-h3 text-accent">{block.label}</h3>}
          <ul className="mt-3 space-y-2">
            {block.items.map((item) => (
              <li key={item} className="t-body prose-w flex gap-3 text-text-secondary">
                <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" />
                <span className="min-w-0">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "figure":
      return <FigureView figure={block.figure} />;

    case "video":
      return (
        <figure className="w-full min-w-0">
          {block.caption && <figcaption className="t-body mb-3 text-text-secondary">{block.caption}</figcaption>}
          <div className="overflow-hidden rounded-[12px] border border-border bg-surface">
            {/* metadata only: the file isn't downloaded until the viewer presses play. */}
            <video
              src={block.src}
              poster={block.poster}
              title={block.title}
              aria-label={block.title}
              controls
              playsInline
              preload="metadata"
              className="block h-auto w-full"
            />
          </div>
        </figure>
      );

    case "milestones":
      return <Milestones block={block} />;

    case "gallery":
      return (
        <GalleryScroller label={block.label ?? "Gallery"}>
          {block.items.map((f) => {
            // Every item shares one height; width follows its own aspect ratio,
            // so wide mockups and tall phone screens sit in one even row.
            const ratio = aspectToNumber(f.aspect ?? "3/4");
            return (
              <li
                key={f.alt}
                className="max-w-[85%] shrink-0 snap-start"
                style={{
                  // Padded (inset) items: size the image to the height left after padding,
                  // so the card's outer height still matches its neighbours.
                  width: f.inset
                    ? `calc((var(--gallery-h) - 2 * var(--inset-pad)) * ${ratio.toFixed(4)} + 2 * var(--inset-pad))`
                    : `calc(var(--gallery-h) * ${ratio.toFixed(4)})`,
                }}
              >
                <FigureView figure={f} sizes={`${Math.round(360 * ratio)}px`} />
              </li>
            );
          })}
        </GalleryScroller>
      );

    case "columns":
      return (
        <div className="grid grid-cols-1 gap-[clamp(24px,4vw,48px)] md:grid-cols-2">
          {block.items.map((c) => (
            <div key={c.title} className="min-w-0">
              <h3 className="t-h3 text-accent">{c.title}</h3>
              <p className="t-body mt-3 text-text-secondary">{c.body}</p>
            </div>
          ))}
        </div>
      );

    case "note":
      return (
        <p className="t-caption prose-w rounded-[12px] border border-border bg-surface px-[clamp(16px,2vw,20px)] py-3 text-text-secondary">
          <span className="font-medium text-text">{block.title ?? "A note on metrics"}: </span>
          {block.body}
        </p>
      );
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-[clamp(24px,3.5vw,40px)]">
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </div>
  );
}
