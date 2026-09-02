import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, bySlug } from "@/data/projects";
import { links } from "@/data/site";
import { ArrowUpRight } from "@/components/Icon";
import CaseStudyHeader from "@/components/CaseStudyHeader";
import CaseStudySection from "@/components/CaseStudySection";

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
    title: `${p.name} — Parth Doshi`,
    description: p.tagline,
  };
}

/**
 * One page per project.
 *
 * The governing rule of this surface is ABSENT, NOT EMPTY. A section whose
 * prose has not been written does not render at all: there is no "coming soon",
 * no skeleton, no greyed placeholder anywhere on a case study. A visible
 * admission of incompleteness is worse to a recruiter than a shorter page.
 *
 * There is also no hero-metric template. Outcome & impact is prose. Where
 * nothing is documented the section is absent; it never renders an invented
 * number, a bar, a ring, or a count-up.
 */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) notFound();

  const s = p.study;

  return (
    <article className="case">
      <CaseStudyHeader project={p} />

      {s?.problem && (
        <CaseStudySection id="problem" title="Problem &amp; context">
          {s.problem.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </CaseStudySection>
      )}

      {s?.build && (
        <CaseStudySection id="build" title="What I built &amp; how">
          {s.build.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </CaseStudySection>
      )}

      {s?.outcome && (
        <CaseStudySection id="outcome" title="Outcome &amp; impact">
          {s.outcome.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </CaseStudySection>
      )}

      {s?.challenge && (
        <CaseStudySection id="challenge" title="Hardest technical challenge">
          {s.challenge.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </CaseStudySection>
      )}

      {/* Rare in a student portfolio, and it reads as seniority: it is the
          section that proves the author has a view of his own work rather than
          only a memory of it. */}
      {s?.limitations && (
        <CaseStudySection id="limitations" title="Current limitations">
          {s.limitations.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </CaseStudySection>
      )}

      {/*
        The bottom of a case study is the highest-intent moment on the site, so
        it carries the same email treatment Contact does. This is not a seventh
        accent: The One Accent Rule counts KINDS of place, not instances, and
        "the email underline" is one kind now appearing on two surfaces.
      */}
      <section className="case__foot" aria-labelledby="case-cta">
        <h2 className="case__foot-title" id="case-cta">
          Want the detail?
        </h2>
        <p className="case__foot-lede">
          I can walk through any decision on this page — why it was built this
          way, what broke, and what I&rsquo;d change.
        </p>
        <a className="contact__email" href={`mailto:${links.email}`}>
          {links.email}
        </a>
        {p.href && (
          <div className="case__foot-links">
            <a
              className="link-arrow"
              href={p.href}
              target="_blank"
              rel="noreferrer"
            >
              {p.name} on GitHub
              <ArrowUpRight />
            </a>
          </div>
        )}
      </section>
    </article>
  );
}
