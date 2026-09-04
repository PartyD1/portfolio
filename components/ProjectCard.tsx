import Link from "next/link";
import type { Project } from "@/data/projects";
import { experience } from "@/data/experience";
import Artifact from "@/components/Artifact";
import GitHubMark from "@/components/GitHubMark";
import { ArrowUpRight } from "@/components/Icon";

/**
 * ONE structure, not two.
 *
 * Weight changes classes, grid span and type scale. It never changes WHICH
 * FIELDS RENDER. A card is name, tagline, the facts (who used it, who paid
 * for it) and the links. The description and note paragraphs came off on
 * 2026-09-02: they were the clutter, and the case study is one click away.
 * The taxonomy pill under the foot followed on 2026-09-03 (Parth: awkwardly
 * placed, no value); `label` still exists in the data because the Open Graph
 * image and the case-study meta line print it.
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
 * The media frame carries the project's authored MARK, always, and never a
 * screenshot. A card is 400px wide at most: a full product screenshot shrunk
 * into it is a grey rectangle with unreadable type in it, which is a picture
 * of a thing rather than a thing. Two of the seven had one and they were the
 * two weakest cards on the page (Parth, 2026-09-03). The screenshots live at
 * full width in the case study's slideshow, where they can be read.
 */
export default function ProjectCard({
  project,
  gradient,
}: {
  project: Project;
  /** One card per row carries the world's gradient as an edge. */
  gradient?: boolean;
}) {
  const { slug, name, cardHeadline, tagline, href, demo, use, weight } =
    project;
  const flagship = weight === 1;
  const job = experience.find((e) => e.project === slug);

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
      {/* The head is a grid child of the card, NOT of the body, so it can
          span the full card width above the mark. Inside the body it shared a
          column with the mark and a two-word name like "Santa Claws" broke
          one word per line in any card under 300px of text column (Parth,
          2026-09-03). The mark now sits beside the tagline and the foot. */}
      <div className="card__head">
        <h3 className="card__name">{headline}</h3>
        {org && <p className="card__org">{org}</p>}
      </div>

      <div className="card__body">
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
      </div>

      {/* The foot is a grid child of the card too, for the same reason the
          head is: on a phone it spans the full width under the mark, so the
          56px repo button never drops onto a line of its own. On desktop it
          keeps its old place, bottom-left beside the mark. */}
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
            another anchor, which is invalid. The visible "case study" label
            came off on 2026-09-03 (Parth: every card already glows and lifts
            on hover, so a redundant button read as clutter) — the link
            stays, carrying only an accessible name for keyboard and
            screen-reader users. */}
        <Link className="card__hit" href={`/work/${slug}`}>
          <span className="sr-only">View the {name} case study</span>
        </Link>

        {/* Operations Agent renders no repo affordance at all, not even a
            disabled one.

            The mark IS the label. It is the one link in the foot whose
            destination is a logo people already read at a glance, so the
            word "GitHub" beside it was restating the picture. The accessible
            name moves to aria-label and the visible control becomes a round
            icon button, above the card overlay like the live-link pill.

            When the button is the only visible control in the foot it takes
            the corner variant: bigger, and pulled into the card's own corner
            instead of parked on the text column's padding edge. ScorelyAI,
            whose foot leads with the live pill, keeps the in-flow button so
            the two controls share a baseline. */}
        {href && (
          <a
            className={demo ? "card__repo" : "card__repo card__repo--corner"}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${name} on GitHub (opens in a new tab)`}
          >
            <GitHubMark gradientId={`gh-${slug}`} />
          </a>
        )}
      </div>

      <div className="card__media">
        <Artifact slug={slug} className="card__art" />
      </div>
    </article>
  );
}
