import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "@/components/Icon";
import MediaBand from "@/components/MediaBand";
import { TechRow } from "@/components/TechMark";
import { FIXTURES, fixtureMedia } from "@/data/fixtures";
import type { Project } from "@/data/projects";

/**
 * The top of a case study, in Parth's order (2026-09-02): the name, then the
 * thing you can USE, then what it is built with, then the one-line facts.
 * No standfirst, no eyebrow, no metric band. The metadata line renders ONLY
 * the fields that exist; nothing here emits a placeholder.
 */
export default function CaseStudyHeader({ project }: { project: Project }) {
  const { name, label, role, dates, use, ownership, note, media, tech, demo } =
    project;

  // What kind of system, then what he was, then when, then who else, then
  // who used it.
  const meta = [label, role, dates, ownership, use].filter(Boolean) as string[];

  return (
    <header className="case__header">
      {/* Everything textual sits on one frosted panel. */}
      <div className="case__headline">
        {/* Leading arrow: this link stays on the site. */}
        <Link className="case__back" href="/#work">
          <ArrowLeft />
          back to the work
        </Link>

        <h1 className="case__title">{name}</h1>

        {/* Someone who can try the thing should not have to read anything
            first, so the live link comes before every other fact. */}
        {demo && (
          <a
            className="live-link case__live"
            href={demo}
            target="_blank"
            rel="noreferrer"
            aria-label={`Try ${name} live (opens in a new tab)`}
          >
            <span className="live-link__dot" aria-hidden="true" />
            Try {name} live
            <ArrowUpRight />
          </a>
        )}

        <TechRow slugs={tech} />

        {meta.length > 0 && (
          <p className="case__meta">
            {meta.map((m, i) => (
              <span key={m} className="case__meta-item">
                {i > 0 && (
                  <span className="case__meta-sep" aria-hidden="true">
                    ·
                  </span>
                )}
                {m}
              </span>
            ))}
          </p>
        )}

        {/* Operations Agent renders NO repo affordance of any kind here: not a
            link, not a disabled link, not a greyed pill. Its note says the true
            thing calmly instead. */}
        {note && <p className="case__note">{note}</p>}
      </div>

      <MediaBand media={FIXTURES ? fixtureMedia : media} />
    </header>
  );
}
