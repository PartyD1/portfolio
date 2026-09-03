import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { experience } from "@/data/experience";
import Artifact from "@/components/Artifact";
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
 * One card leads with its ENGAGEMENT rather than its name: `cardHeadline` in
 * data/projects.ts replaces the headline, and the organisation printed under
 * it comes from the employment row, not from a second string.
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
  const { slug, name, cardHeadline, tagline, href, demo, label, use, weight, media } =
    project;
  const flagship = weight === 1;
  const job = experience.find((e) => e.project === slug);
  const shot = media[0];

  /*
   * A card whose `cardHeadline` is set leads with the engagement instead of
   * the project name, and the employment row supplies the organisation under
   * it. The fact line then carries the ROLE rather than the company, because
   * the company is already the line above it and no card says a thing twice.
   */
  const headline = cardHeadline ?? name;
  const org = cardHeadline ? job?.company : undefined;

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
          <h3 className="card__name">{headline}</h3>
          {org && <p className="card__org">{org}</p>}
        </div>
        <p className="card__tagline">{tagline}</p>
        {job && (
          <p className="card__fact">
            {org ? job.title : job.company}
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
