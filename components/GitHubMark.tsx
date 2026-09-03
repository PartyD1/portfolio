/**
 * The GitHub octocat, in two paints stacked in one <svg>.
 *
 *   source:   simple-icons v16.29.0, slug `github` (the same pinned version
 *             scripts/vendor-icons.mjs reads). Hand-placed rather than
 *             generated, because that generator's slug list is data/stack.ts
 *             — THE ONE TOOL LIST — and GitHub is not a tool in this stack.
 *   licence:  icon DATA is CC0-1.0. The mark remains GitHub's trademark, used
 *             here to identify the destination of a link, not as endorsement.
 *
 * NO BRAND HEX, same rule the vendored tech marks follow: simple-icons ships
 * `#181717` for this and it is dropped. The rest state is `currentColor`, and
 * the hover state is THIS SITE'S gradient — the same three blob stops the card
 * edge and the experience rail wear — so "coloured" means the world's colour
 * arriving, not a ninth accent moving in.
 *
 * Two paths, not one, because a `fill` cannot transition from a flat colour to
 * a paint server. Stacking them and cross-fading `opacity` can, and opacity is
 * one of the two properties this project animates.
 *
 * `gradientId` is required and must be unique in the document: seven cards
 * render seven of these, and duplicate ids would be invalid markup. The caller
 * passes the project slug, which is already unique and is available on the
 * server — no `useId`, so this stays a server component.
 */

/** 24x24 viewBox, single path, fill (never stroke). */
const GITHUB_PATH =
  "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";

export default function GitHubMark({ gradientId }: { gradientId: string }) {
  return (
    <svg className="gh-mark" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        {/* Bottom-left to top-right: the same 120deg reading the card edge and
            the experience rail use, expressed in the unit square. */}
        <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
          {/* stop-color is set in CSS, not as an attribute, because a
              presentation ATTRIBUTE cannot resolve var(). Doing it in CSS is
              also what makes the mark follow the theme for free. */}
          <stop className="gh-mark__stop-1" offset="0%" />
          <stop className="gh-mark__stop-2" offset="50%" />
          <stop className="gh-mark__stop-3" offset="100%" />
        </linearGradient>
      </defs>
      <path className="gh-mark__mono" d={GITHUB_PATH} fill="currentColor" />
      <path
        className="gh-mark__hue"
        d={GITHUB_PATH}
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}
