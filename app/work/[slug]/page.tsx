import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, bySlug } from "@/data/projects";
import { FIXTURES, fixtureStudy } from "@/data/fixtures";
import { links } from "@/data/site";
import { ArrowUpRight } from "@/components/Icon";
import CaseStudyHeader from "@/components/CaseStudyHeader";
import CaseStudySection from "@/components/CaseStudySection";
import Flow from "@/components/Flow";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return {};
  return {
    title: `${p.name} · Parth Doshi`,
    description: p.tagline,
  };
}

/**
 * One page per project, and it is a portfolio page, not a blog post.
 *
 * ORDER: header, screenshots, the flow diagram, then short bullets. The
 * governing rule of this surface is ABSENT, NOT EMPTY. A section whose
 * content has not been written does not render at all: there is no "coming
 * soon", no skeleton, no greyed placeholder anywhere on a case study.
 *
 * There is also no hero-metric template. Where nothing is documented the
 * section is absent; it never renders an invented number, a bar, a ring, or a
 * count-up.
 */
const sections: { id: string; title: string; key: keyof Omit<NonNullable<ReturnType<typeof bySlug>>["study"] & object, "flow"> }[] = [
  { id: "problem", title: "Problem", key: "problem" },
  { id: "build", title: "What I built", key: "build" },
  { id: "outcome", title: "Outcome", key: "outcome" },
  { id: "challenge", title: "Hardest part", key: "challenge" },
  { id: "limitations", title: "Limitations", key: "limitations" },
];

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) notFound();

  // Fixture prose exists only so the pin's scroll budget can be measured
  // against a representative route. Never active in production.
  const s = FIXTURES ? { ...p.study, ...fixtureStudy } : p.study;

  return (
    <article className="case">
      <CaseStudyHeader project={p} />

      {s?.flow && <Flow flow={s.flow} />}

      {/* Two columns of short sections on a wide screen, so the page reads as
          a spread rather than a scroll. */}
      <div className="case__sections">
        {sections.map(({ id, title, key }) => {
          const points = s?.[key];
          if (!points?.length) return null;
          return (
            <CaseStudySection id={id} title={title} key={id}>
              {points.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </CaseStudySection>
          );
        })}
      </div>

      {/* The bottom of a case study is the highest-intent moment on the site,
          so it carries the same email treatment Contact does. */}
      <section className="case__foot" aria-labelledby="case-cta">
        <h2 className="case__foot-title" id="case-cta">
          Want the detail?
        </h2>
        <p className="case__foot-lede">
          {s
            ? "I can walk through any decision on this page: why it was built this way, what broke, and what I'd change."
            : "The repo is the detail for now. I can walk through what it does, why it is built this way, and what I'd change."}
        </p>
        <a className="contact__email" href={`mailto:${links.email}`}>
          {links.email}
        </a>
        {(p.demo || p.href) && (
          <div className="case__foot-links">
            {/* A thing a recruiter can USE outranks a thing they can read, so
                the live link leads where one exists. */}
            {p.demo && (
              <a
                className="link-arrow"
                href={p.demo}
                target="_blank"
                rel="noreferrer"
              >
                Try {p.name} live
                <ArrowUpRight />
              </a>
            )}
            {p.href && (
              <a
                className="link-arrow"
                href={p.href}
                target="_blank"
                rel="noreferrer"
              >
                {p.name} on GitHub
                <ArrowUpRight />
              </a>
            )}
          </div>
        )}
      </section>
    </article>
  );
}
