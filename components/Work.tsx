import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

/**
 * One gradient edge per ROW, alternating sides — a rhythm, not a stripe.
 *
 * This is the TWO-COLUMN rule only, and it is provably correct for the current
 * shape: the flagship at i=0 spans its own row, so the remaining six occupy
 * rows (1,2) (3,4) (5,6). For k = i-1, row = floor(k/2) and col = k%2; the edge
 * falls where col === row%2, giving k = 0, 3, 4 → i = 1, 4, 5. That is one per
 * row, alternating left → right → left, plus the flagship.
 *
 * It stays correct only because WEIGHT NEVER CHANGES GRID SPAN — exactly one
 * item spans a row. Promoting a card to weight 2 must not make it span, or this
 * arithmetic silently breaks.
 *
 * The ONE-COLUMN case is not decidable here: JavaScript does not know the
 * column count, and duplicating the 760px breakpoint in JS to find out is the
 * coupling worth avoiding. So this emits the fact and CSS picks the rule. See
 * .work__item[data-edge-2col] and the :nth-child(odd) rule beside it.
 */
function edge2col(i: number) {
  if (i === 0) return true;
  const k = i - 1;
  return k % 2 === Math.floor(k / 2) % 2;
}

export default function Work() {
  return (
    <section
      className="section section--work"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="section__head">
        <h2 className="section__title" id="work-title">
          Work
        </h2>
        <p className="section__lede">
          Seven things I&rsquo;ve made. Every one opens into how it was built,
          what it cost, and what I&rsquo;d change.
        </p>
      </div>
      <div className="work__grid">
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={i * 50}
            className={[
              "work__item",
              project.weight === 1 && "work__item--flagship",
            ]
              .filter(Boolean)
              .join(" ")}
            data-edge-2col={edge2col(i) ? "" : undefined}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
