import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/case-study/Blocks";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { ChapterLayout } from "@/components/case-study/ChapterLayout";
import { ArrowRightIcon } from "@/components/ui/icons";
import { CHAPTERS, DOCS_CHAPTER, caseStudies, getCaseStudy } from "@/lib/case-studies";
import { projectBySlug, workCards } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  // Share copy comes from the project's Work card; its cover image is the preview,
  // falling back to the site-wide og.png.
  const card = workCards.find((c) => c.slug === slug);
  const project = projectBySlug(slug);
  const title = card?.title ?? study.title;
  const description = card?.caption ?? study.tagline;
  const cover = card?.image ?? (project && { src: project.image, alt: project.imageAlt });
  const image = cover
    ? { url: cover.src, alt: cover.alt }
    : { url: "/og.png", width: 1200, height: 630, alt: "Pratyush Bisht, UX Designer and Researcher" };
  return {
    title,
    description,
    openGraph: { type: "article", title, description, url: `/work/${slug}`, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  return (
    <main>
      <CaseStudyHero title={study.title} tagline={study.tagline} meta={study.meta} scene={study.scene} />

      <ChapterLayout chapters={[...CHAPTERS]} lastChapter={DOCS_CHAPTER}>
        {CHAPTERS.map((c, i) => (
          <section
            key={c.id}
            id={c.id}
            aria-labelledby={`${c.id}-title`}
            className={`chapter ${i === 0 ? "pt-[clamp(20px,3vw,28px)] lg:pt-0" :"pt-[clamp(48px,7vw,88px)]"}`}
          >
            <h2 id={`${c.id}-title`} className="t-h2 mb-[clamp(16px,2.4vw,28px)] text-text">
              {c.label}
            </h2>
            <Blocks blocks={study.chapters[c.id]} />
          </section>
        ))}

        {/* Closing chapter: deliberately heavier so it reads as the end of the page. */}
        <section
          id={DOCS_CHAPTER.id}
          aria-labelledby="documentation-title"
          className="chapter pt-[clamp(64px,9vw,120px)] pb-[clamp(64px,9vw,120px)]"
        >
          <div className="rounded-[16px] border border-border bg-surface px-[clamp(20px,4vw,56px)] py-[clamp(40px,6vw,72px)] text-center">
            <p className="t-tag text-accent">Last chapter</p>
            <h2 id="documentation-title" className="t-h2 mt-3 text-text">
              {DOCS_CHAPTER.label}
            </h2>
            <p className="t-body mx-auto mt-3 max-w-[52ch] text-text-secondary">{study.docs.body}</p>
            <div className="btn-group mt-[clamp(24px,3vw,32px)] justify-center">
              <a
                // TODO: add documentation link in lib/case-studies/<project>.ts (docs.url)
                href={study.docs.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex-row-reverse"
              >
                <ArrowRightIcon />
                <span>View Design Documentation</span>
              </a>
            </div>
          </div>
        </section>
      </ChapterLayout>
    </main>
  );
}
