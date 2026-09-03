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
 * NEXT_PUBLIC_FIXTURES is never set in any committed env file.
 *
 * A CORRECTION WORTH KNOWING. Next inlines process.env.NEXT_PUBLIC_* into
 * CLIENT bundles, so there the unset branch really is dead code. It does NOT
 * inline it for server components — the build output contains a live
 * `"1" === process.env.NEXT_PUBLIC_FIXTURES` evaluated per request. So "the
 * branch is eliminated" is only half true, and on its own this would mean
 * setting the variable in a production environment would render fixtures.
 *
 * Hence the second condition: on a Vercel production deployment VERCEL_ENV is
 * "production", so fixtures cannot activate there NO MATTER WHAT the public
 * variable says. Locally VERCEL_ENV is undefined, so verification still works
 * against a real production build. Belt and braces, because the failure mode is
 * "a recruiter sees the word FIXTURE".
 *
 * Every fixture string is prefixed "FIXTURE —" so it can never be mistaken for
 * content, in a screenshot or anywhere else.
 */
import type { ProjectMedia } from "@/data/projects";

export const FIXTURES =
  process.env.NEXT_PUBLIC_FIXTURES === "1" &&
  process.env.VERCEL_ENV !== "production";

/**
 * Two real frames, so the pinned sequence can be exercised on a route that
 * has no media of its own. The choreography is driven by the frame, never by
 * pixel content, so which screenshot sits inside does not matter.
 */
export const fixtureMedia: ProjectMedia[] = [
  {
    src: "/work/santaclaws/dashboard.png",
    alt: "FIXTURE: not real content",
    kind: "image",
    width: 1600,
    height: 812,
  },
  {
    src: "/work/santaclaws/mockup.png",
    alt: "FIXTURE: not real content",
    kind: "image",
    width: 1600,
    height: 956,
  },
];

/**
 * Fixture prose, and it exists for a specific measurement reason.
 *
 * The pin's route-growth ceiling (<= +25%) is a claim about not making a page
 * feel padded. Measured against today's case study — which has no prose at all
 * — ANY pin that also satisfies the 40-80svh-per-beat window blows that ceiling,
 * because the denominator is a nearly empty page. That is not the pin being too
 * long; it is the baseline being unrepresentative, and gaming either number to
 * make the gate green would be worse than useless.
 *
 * So the budget is measured against a route carrying roughly the content the
 * pin is designed to sit inside. Lorem-flavoured deliberately: this is ballast
 * for a measurement, not a draft of anything, and it must never read as a
 * suggestion of what to write.
 */
const FILLER =
  "FIXTURE paragraph for scroll-budget measurement only. It exists to give the " +
  "route a representative length so the pin can be measured against a page with " +
  "content rather than against an empty one. It is not draft copy.";

export const fixtureStudy = {
  problem: [FILLER, FILLER],
  build: [FILLER, FILLER, FILLER],
  outcome: [FILLER],
  challenge: [FILLER, FILLER],
  limitations: [FILLER],
};

export const fixtureAvailability = {
  focus: "FIXTURE — Software engineering, applied AI",
  gradTerm: "FIXTURE — Graduating June 2027",
  location: "FIXTURE — Santa Cruz, CA",
};
