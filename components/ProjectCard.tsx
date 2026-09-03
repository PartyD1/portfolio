import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { experience } from "@/data/experience";
import Artifact from "@/components/Artifact";
import GitHubMark from "@/components/GitHubMark";
import { ArrowRight, ArrowUpRight } from "@/components/Icon";

/**
 * ONE structure, not two.
 *
 * Weight changes classes, grid span and type scale. It never changes WHICH
 * FIELDS RENDER. A card is name, tagline, the facts (who used it, who paid
 * for it), the links, and the taxonomy pill. The description and note
 * paragraphs came off on 2026-09-02: they were the clutter, and the case
 * study is one click away.
 *
 * The employer line is derived from data/experience.ts, never typed here: a
 * project that an employment row points at says where and when it was built,
 * in the row's own words. That is what lets the flagship out-argue the cards
 * beneath it without a single new claim.
 *
 * The media frame shows the project's first screenshot when one exists and
 * the authored mark when none does. The mark is the empty state; the
 * screenshot is the default.
 */
export default function ProjectCard({
  project,
  gradient,
}: {
  project: Project;
  /** One card per row carries the world's gradient as an edge. */
  gradient?: boolean;
}) {
  const { slug, name, tagline, href, demo, label, use, weight, media } = project;
  const flagship = weight === 1;
  const job = experience.find((e) => e.project === slug);
  const shot = media[0];

  const classes = [
    "card",
    flagship && "card--flagship",
    gradient && "card--gradient",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    // Fully server-rendered. The hover lift is CSS on .card and nothing else,
    // so a card ships no JavaScript of its own.
    <article className={classes}>
      <div className="card__body">
        <div className="card__head">
          <h3 className="card__name">{name}</h3>
        </div>
        <p className="card__tagline">{tagline}</p>
        {job && (
          <p className="card__fact">
            {job.company}
            <span className="card__fact-sep" aria-hidden="true">
              ·
            </span>
            {job.period}
          </p>
        )}
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
              disabled one.

              The mark IS the label. It is the one link in the foot whose
              destination is a logo people already read at a glance, so the
              word "GitHub" beside it was restating the picture. The accessible
              name moves to aria-label and the visible control becomes a round
              icon button, above the card overlay like the live-link pill. */}
          {href && (
            <a
              className="card__repo"
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${name} on GitHub (opens in a new tab)`}
            >
              <GitHubMark gradientId={`gh-${slug}`} />
            </a>
          )}
        </div>

        {/* The foot is the only place this system allows tracked caps. Its
            own line, so all seven cards agree about where their last line
            sits. */}
        <span className="pill card__label">{label}</span>
      </div>

      <div className={shot ? "card__media card__media--shot" : "card__media"}>
        {shot ? (
          <Image
            src={shot.src}
            alt=""
            width={shot.width}
            height={shot.height}
            sizes="(max-width: 760px) 34vw, 400px"
            className="card__shot"
          />
        ) : (
          <Artifact slug={slug} className="card__art" />
        )}
      </div>
    </article>
  );
}
