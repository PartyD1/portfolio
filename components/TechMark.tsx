import { stack } from "@/data/stack";
import { techMarks, techTitles } from "@/components/tech-marks.generated";
import { localMarks } from "@/components/tech-marks.local";

/**
 * The per-project technology row, as a row of glass TILES rather than a
 * hairline of names. Parth's call (2026-09-02): a recruiter scans logos, so
 * the marks carry weight, and a tool with no mark is dropped from the list
 * rather than shipped as a text pill.
 *
 * THE RECONCILIATION, stated as a decision. Simple Icons are solid single-path
 * silhouettes; every other mark on this site is 2.25px open stroke. So the
 * exception is BOUNDED: one register, one surface, one size, one ink. Brand
 * GEOMETRY ships and brand COLOUR does not, because ~25 uncontrolled accents
 * would blow The One Accent Rule on a page whose identity is having exactly
 * one accent colour.
 *
 * Returns null on an empty list. The row is ABSENT, not a skeleton. The
 * tool-to-project mapping may not be inferred from repo language or README.
 */
type Mark = { d: string; viewBox: string };

function resolve(name: string): { name: string; mark?: Mark } | null {
  const item = stack
    .flatMap((g) => g.items)
    .find((i) => i.name === name || i.slug === name);
  if (!item) return null;
  if (item.slug && techMarks[item.slug]) {
    return { name: item.name, mark: { d: techMarks[item.slug], viewBox: "0 0 24 24" } };
  }
  if (item.local && localMarks[item.local]) {
    const m = localMarks[item.local];
    return { name: item.name, mark: { d: m.d, viewBox: m.viewBox } };
  }
  return { name: item.name };
}

export function TechRow({ slugs }: { slugs: string[] }) {
  if (!slugs.length) return null;

  const items = slugs
    .map(resolve)
    .filter((t): t is { name: string; mark?: Mark } => t !== null && !!t.mark);

  if (!items.length) return null;

  return (
    <ul className="tech" aria-label="Built with">
      {items.map((t) => (
        <li className="tech__item" key={t.name}>
          <svg
            className="tech__mark"
            viewBox={t.mark!.viewBox}
            /* fill, never stroke: these are silhouettes, and currentColor is
               what keeps them inside the page's single-ink discipline. */
            fill="currentColor"
            fillRule="evenodd"
            aria-hidden="true"
          >
            <path d={t.mark!.d} />
          </svg>
          <span className="tech__name">{t.name}</span>
        </li>
      ))}
    </ul>
  );
}

/** Exported for the generator's sake; keeps the titles import live. */
export const markTitle = (slug: string) => techTitles[slug];
