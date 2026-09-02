import Link from "next/link";
import { ArrowLeft } from "@/components/Icon";
import MediaBand from "@/components/MediaBand";
import type { Project } from "@/data/projects";

/**
 * The top of a case study: back affordance, name, the metadata line, and the
 * media well.
 *
 * No eyebrow above the name, ever. No metric band. The metadata line renders
 * ONLY the fields that exist — nothing here emits a placeholder, and a field
 * that has not been supplied is simply not in the line.
 */
export default function CaseStudyHeader({ project }: { project: Project }) {
  const {
    name,
    label,
    role,
    dates,
    use,
    ownership,
    note,
    slug,
    media,
    description,
  } = project;

  // Order matters: what kind of system, then what he was, then when, then who
  // else, then who used it.
  const meta = [label, role, dates, ownership, use].filter(Boolean) as string[];

  return (
    <header className="case__header">
      {/* Leading arrow: this link stays on the site. */}
      <Link className="case__back" href="/#work">
        <ArrowLeft />
        back to the work
      </Link>

      <h1 className="case__title">{name}</h1>

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

      {/*
        Operations Agent renders NO repo affordance of any kind here — not a
        link, not a disabled link, not a greyed pill. A disabled control implies
        the thing exists and is being withheld from you. Its note says the true
        thing calmly instead, and the Experience row plus LinkedIn carry the
        off-site verification of the employment.
      */}
      {note && <p className="case__note">{note}</p>}

      {/* TechRow slot — populated in C8, and absent (not skeletal) until the
          tool→project mapping is supplied. */}

      {/*
        The standfirst sits ABOVE the media, not below it. Until the case-study
        prose is written this is the only real prose on the page, and putting it
        under a ~560px frame buries the one thing worth reading below the fold.
      */}
      {description && (
        <div className="case__standfirst">
          <p>{description}</p>
        </div>
      )}

      <MediaBand slug={slug} media={media} />
    </header>
  );
}
