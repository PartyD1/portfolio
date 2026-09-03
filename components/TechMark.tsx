import { stack } from "@/data/stack";
import { techMarks, techTitles } from "@/components/tech-marks.generated";

/**
 * The per-project technology row.
 *
 * THE RECONCILIATION, stated as a decision rather than left implicit. Simple
 * Icons are solid single-path 24px silhouettes; every other mark on this site
 * is 2.25–2.5px open stroke in currentColor. Dropping filled brand glyphs
 * beside ArrowUpRight is two icon styles on one surface (`operate` L36) and a
 * head-on break of The Drawn-Not-Set Rule.
 *
 * So the exception is BOUNDED: one register, one surface, one size, one ink.
 * Brand GEOMETRY ships — which is what was actually asked for — and brand
 * COLOUR does not, because ~25 uncontrolled accents would blow The One Accent
 * Rule and The Ground-Only Iridescence Rule on a page whose identity is having
 * exactly one accent colour. Case-study header only; never on homepage cards,
 * which keep the authored stroke vocabulary intact.
 *
 * Returns null on an empty list. The row is ABSENT, not a skeleton and not an
 * "empty state that teaches the interface" — there is nothing to teach, because
 * the fact does not exist yet. The tool→project mapping is blocked on Parth and
 * may not be inferred from repo language, README, or the framework you would
 * expect.
 */
export function TechRow({ slugs }: { slugs: string[] }) {
  if (!slugs.length) return null;

  const items = slugs
    .map((s) => {
      const item = stack.flatMap((g) => g.items).find((i) => i.slug === s || i.name === s);
      if (!item) return null;
      return { name: item.name, mark: item.slug ? techMarks[item.slug] : undefined };
    })
    .filter(Boolean) as { name: string; mark?: string }[];

  if (!items.length) return null;

  return (
    <ul className="tech" aria-label="Built with">
      {items.map((t) => (
        <li className="tech__item" key={t.name}>
          {t.mark ? (
            <svg
              className="tech__mark"
              viewBox="0 0 24 24"
              /* fill, never stroke: these are silhouettes, and currentColor is
                 what keeps them inside the page's single-ink discipline. */
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={t.mark} />
            </svg>
          ) : null}
          <span className={t.mark ? "tech__name" : "tech__pill"}>{t.name}</span>
        </li>
      ))}
    </ul>
  );
}

/** Exported for the generator's sake — keeps the titles import live. */
export const markTitle = (slug: string) => techTitles[slug];
