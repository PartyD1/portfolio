/**
 * Site-level config that isn't project content.
 *
 * The résumé ships as a designed pending state rather than a dead link: until
 * the PDF exists, the page says so in words (not a hover-only hint, which
 * touch users never see) and nothing is clickable. To publish it:
 *
 *   1. drop the file at `public/resume.pdf`
 *   2. flip `ready` to true below
 *
 * That is the whole change — the link, the download attribute and the menu
 * entry all switch over from this one flag.
 */
export const resume = {
  path: "/resume.pdf",
  ready: false,
} as const;
