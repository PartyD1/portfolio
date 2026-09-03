import Link from "next/link";
import type { Project } from "@/data/projects";
import Artifact from "@/components/Artifact";
import { ArrowRight, ArrowUpRight } from "@/components/Icon";

/**
 * ONE structure, not two.
 *
 * Weight changes classes, grid span and type scale. It never changes WHICH
 * FIELDS RENDER. A card is name, tagline, the one usage fact, the links, and
 * the taxonomy pill. The description and note paragraphs came off on
 * 2026-09-02: they were the clutter, and the case study is one click away.
 */
export default function ProjectCard({
  project,
  gradient,
}: {
  project: Project;
  /** One card per row carries the world's gradient as an edge. */
  gradient?: boolean;
}) {
  const { slug, name, tagline, href, demo, label, use, weight } = project;
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

        <div className="card__foot">
          {/* A thing you can USE outranks a thing you can read, so the live
              link leads the foot. It sits above the card overlay on z-index,
              like the repo link. */}
          {demo && (
            <a
              className="live-link"
              href={demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`Try ${name} live (opens in a new tab)`}
            >
              <span className="live-link__dot" aria-hidden="true" />
              Try it live
              <ArrowUpRight />
            </a>
          )}

          {/* The whole card is the link, via a pseudo-element on the <Link>
              rather than an anchor wrapping the content. Wrapping would make
              the tagline unselectable and would nest the repo anchor inside
              another anchor, which is invalid. */}
          <Link className="card__hit" href={`/work/${slug}`}>
            <ArrowRight />
            case study
          </Link>

          {/* Operations Agent renders no repo affordance at all, not even a
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

        {/* The foot is the only place this system allows tracked caps. Its
            own line, so all seven cards agree about where their last line
            sits. */}
        <span className="pill card__label">{label}</span>
      </div>

      <div className="card__media">
        <Artifact slug={slug} className="card__art" />
      </div>
    </article>
  );
}
