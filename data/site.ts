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
