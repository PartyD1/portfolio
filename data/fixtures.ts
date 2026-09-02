/**
 * Local verification only.
 *
 * Several things in this PR — the pinned media sequence, the availability
 * subline — are designed but content-blocked. Shipping them unverified because
 * their content has not arrived would mean their first real exercise happens on
 * the day the content lands, under time pressure, with the layout still
 * undecided. Fixtures let every one of their gates run for real, now, against
 * real DOM.
 *
 * NEXT_PUBLIC_FIXTURES is never set in any committed env file and never in
 * production. Next inlines process.env.NEXT_PUBLIC_* at build time, so with the
 * variable unset every branch below is dead code and is eliminated. There is a
 * grep gate on .next/ after a plain build to prove it.
 *
 * Every fixture string is prefixed "FIXTURE —" so it can never be mistaken for
 * content, in a screenshot or anywhere else.
 */
import type { ProjectMedia } from "@/data/projects";

export const FIXTURES = process.env.NEXT_PUBLIC_FIXTURES === "1";

/**
 * Deliberately carries no `src`, so it renders the same authored Artifact mark
 * that the real empty state renders. That is the point: the choreography is
 * identical with a fixture, with an empty state, and with tomorrow's
 * screenshot, because the motion is driven by the frame's aspect ratio and
 * never by pixel content.
 */
export const fixtureMedia: ProjectMedia[] = [
  {
    alt: "FIXTURE — not real content",
    kind: "diagram",
    width: 1600,
    height: 1000,
  },
  {
    alt: "FIXTURE — not real content",
    kind: "diagram",
    width: 1600,
    height: 1000,
  },
];

export const fixtureAvailability = {
  gradTerm: "FIXTURE — June 2027",
  location: "FIXTURE — Santa Cruz, CA · open to relocation",
  target: "FIXTURE — Software engineering, applied AI",
};
