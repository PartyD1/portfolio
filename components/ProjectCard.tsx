import Link from "next/link";
import type { Project } from "@/data/projects";
import Artifact from "@/components/Artifact";
import { ArrowRight, ArrowUpRight } from "@/components/Icon";
import { Badge } from "@/components/ui/badge";

/**
 * ONE structure, not two.
 *
 * Weight changes classes, grid span and type scale. It never changes WHICH
 * FIELDS RENDER. The two hand-written branches this replaces rendered
 * `description` and `note` only on the flagship, which meant tomorrow's content
 * would silently vanish on the other six — a data edit producing no visible
 * result and no error. That is the defect being fixed here, and it is worth
 * more than the branch symmetry it costs.
 */
export default function ProjectCard({
  project,
  gradient,
}: {
  project: Project;
  /** One card per row carries the world's gradient as an edge. */
  gradient?: boolean;
}) {
  const { slug, name, tagline, description, href, note, label, use, weight } =
    project;
  const flagship = weight === 1;

  const classes = [
    "card",
    flagship && "card--flagship",
    gradient && "card--gradient",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes}>
      <div className="card__body">
        <div className="card__head">
          <h3 className="card__name">{name}</h3>
        </div>
        <p className="card__tagline">{tagline}</p>
        {use && <p className="card__use">{use}</p>}
        {description && <p className="card__desc">{description}</p>}
        {note && <p className="card__note">{note}</p>}

        <div className="card__foot">
          {/*
            The whole card is the link, via a pseudo-element on the <Link>
            rather than an anchor wrapping the content. Wrapping would make the
            tagline unselectable and would nest the repo anchor inside another
            anchor, which is invalid. This way the text stays selectable and the
            repo link simply sits above the overlay on z-index.
          */}
          <Link className="card__hit" href={`/work/${slug}`}>
            <ArrowRight />
            case study
          </Link>

          {/* Operations Agent renders no repo affordance at all — not even a
              disabled one. */}
          {href && (
            <a
              className="card__repo"
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${name} on GitHub`}
            >
              GitHub
              <ArrowUpRight />
            </a>
          )}

        </div>

        {/*
          Below the links rather than beside them, and it is the foot region
          either way — which is the only place this system allows tracked caps.
          Sharing the links' row made it wrap on some cards and not others
          purely on label length, so the seven cards disagreed about where their
          last line sat. Its own line is the same on all seven.
        */}
        <Badge variant="outline" className="card__label">
          {label}
        </Badge>
      </div>

      <div className="card__media">
        <Artifact slug={slug} className="card__art" />
      </div>
    </article>
  );
}
