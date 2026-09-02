import { stack } from "@/data/stack";
import Blob from "@/components/Blob";
import Reveal from "@/components/Reveal";

/**
 * The stack as an orbit rather than a list: three concentric rings, inner to
 * outer, running languages → frameworks → tools.
 *
 * Deliberately static. The page already has one authored motion moment (the
 * rolling headline) and ambient drift from the blobs; a third continuous
 * rotation would compete with both and make 29 labels harder to read, which is
 * the opposite of what a scanning recruiter needs.
 *
 * Under 760px the rings can't hold their labels, so the same data renders as
 * three typographic runs — still not a bulleted list.
 */
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
        <div className="orbit" role="img" aria-label={ariaSummary()}>
          <div className="orbit__core" aria-hidden="true">
            <Blob name="c" />
          </div>

          {stack.map((group, ring) => (
            <div
              key={group.id}
              className={`orbit__ring orbit__ring--${ring + 1}`}
              style={{ ["--tone" as string]: group.tone }}
              data-label={group.label}
              aria-hidden="true"
            >
              <div className="orbit__track" />
              {group.items.map((item, i) => {
                // Offset each ring so labels don't line up radially.
                const angle = (i * 360) / group.items.length + ring * 14;
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
      </Reveal>

      <ul className="orbit__legend" aria-hidden="true">
        {stack.map((group) => (
          <li key={group.id}>
            <span
              className="orbit__swatch"
              style={{ ["--tone" as string]: group.tone }}
            />
            {group.label}
          </li>
        ))}
      </ul>

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
