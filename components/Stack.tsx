import { stack } from "@/data/stack";
import Reveal from "@/components/Reveal";
import OrbitScroller from "@/components/OrbitScroller";

/**
 * The stack as an orbit rather than a list: three concentric rings, inner to
 * outer, running languages → frameworks → tools.
 *
 * Deliberately static. The page already has one authored motion moment (the
 * rolling headline) and ambient drift from the blobs; a third continuous
 * rotation would compete with both and make 29 labels harder to read, which is
 * the opposite of what a scanning recruiter needs.
 *
 * On a phone the rings keep their form and scroll horizontally inside their
 * own container. Collapsing them into stacked runs would ship exactly the
 * shape this section exists to avoid.
 */

/**
 * Degrees left clear at the top of each ring for that ring's own label.
 *
 * The label sits just OUTSIDE its ring line rather than on it, so it barely
 * consumes tool arc. Widening the gap instead compressed the inner ring's ten
 * labels into each other — the circle is small and JavaScript is a long word.
 */
const LABEL_GAP = 44;

export default function Stack() {
  return (
    <section className="section" id="stack" aria-labelledby="stack-title">
      <div className="section__head">
        <h2 className="section__title" id="stack-title">
          Stack
        </h2>
        <p className="section__lede">
          What I build with, from the languages outward to the tools I build
          them in.
        </p>
      </div>

      <Reveal>
        <OrbitScroller>
          <div className="orbit" role="img" aria-label={ariaSummary()}>
            <span className="orbit__core" aria-hidden="true">
              PD
            </span>

            {stack.map((group, ring) => (
              <div
                key={group.id}
                className={`orbit__ring orbit__ring--${ring + 1}`}
                style={{ ["--tone" as string]: group.tone }}
                aria-hidden="true"
              >
                <div className="orbit__track" />
                <span className="orbit__ring-label">{group.short}</span>
                {group.items.map((item, i) => {
                  // Distribute across the arc left over once the ring's own
                  // label has taken the top, so the two never collide.
                  const span = 360 - LABEL_GAP;
                  const angle =
                    LABEL_GAP / 2 + (i * span) / group.items.length;
                  return (
                    <span
                      key={item}
                      className="orbit__label"
                      style={{ ["--a" as string]: `${angle}deg` }}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </OrbitScroller>
      </Reveal>

      {/* The rings are decorative to a screen reader; this is the real content. */}
      <div className="visually-hidden">
        {stack.map((group) => (
          <p key={group.id}>
            {group.label}: {group.items.join(", ")}.
          </p>
        ))}
      </div>
    </section>
  );
}

function ariaSummary() {
  return `Technology stack in three rings: ${stack
    .map((g) => `${g.label} (${g.items.length})`)
    .join(", ")}.`;
}
