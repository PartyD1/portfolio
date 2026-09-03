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
 * WHAT he is looking for leads, not WHEN he graduates. A December 2028
 * graduation read first makes a recruiter assume he is years from hiring and
 * leave; the actual ask is a Summer 2027 internship, and winter/spring too.
 */
export const availability = {
  gradTerm: "Seeking Summer 2027 internships — winter and spring too" as
    | string
    | null,
  location: "Bay Area, California" as string | null,
  target: "Software, ML/AI and full-stack · graduating Dec 2028" as
    | string
    | null,
};
