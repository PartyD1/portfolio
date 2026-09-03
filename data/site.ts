/**
 * Site-level config that isn't project content.
 *
 * The résumé is live (`public/resume.pdf`, supplied 2026-09-01).
 *
 * `ready` stays as a switch rather than being deleted: setting it to false
 * reverts Contact and the menu to a designed pending state — inert text
 * saying "coming soon", never a dead link — which is what you want while
 * swapping the file out for a newer one.
 */
export const resume = {
  path: "/resume.pdf",
  ready: true,
} as const;

/**
 * Where to reach him. Moved here from data/projects.ts, which had no business
 * owning them — one list per fact.
 */
export const links = {
  email: "pmdoshi@ucsc.edu",
  github: "https://github.com/PartyD1",
  linkedin: "https://www.linkedin.com/in/parthmdoshi/",
};

/**
 * BLOCKED — supplied by Parth. Each field renders ONLY when non-null.
 *
 * Never invent one, never approximate one, and never write "TBD" into the UI.
 * survey:convert calls graduation term / location / role target the single
 * highest-cost omission on the site: a recruiter who cannot tell when someone
 * is available, or where, cannot act. The layout is built and captured now, so
 * supplying these tomorrow is a data edit and not a design decision made under
 * time pressure.
 */
/*
 * THREE facts, and only three: what he does, when he is free, where he is.
 *
 * The hero used to carry a fourth — "Seeking Summer 2027 internships, winter
 * and spring too" — plus a subheadline and an "open to opportunities" badge.
 * Four competing claims in one fold is no claim at all, so the ask moved to
 * Contact, where someone who wants to act on it already is. What is left is
 * the shortest set a recruiter needs to decide whether to keep reading.
 */
export const availability = {
  focus: "Software, ML/AI and full-stack" as string | null,
  gradTerm: "Graduating Dec 2028" as string | null,
  location: "Bay Area, California" as string | null,
  /**
   * The ask itself, and it renders ONLY in Contact. It is the one line here
   * that is a request rather than a fact, which is exactly why it does not
   * belong in the fold beside the other three.
   */
  seeking: "Seeking Summer 2027 internships, winter and spring too." as
    | string
    | null,
};
