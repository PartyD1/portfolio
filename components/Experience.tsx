import Link from "next/link";
import { experience } from "@/data/experience";
import { bySlug } from "@/data/projects";
import Artifact from "@/components/Artifact";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icon";

/**
 * Experience as a TIMELINE: one rail, a node per role, the period in display
 * type, and a glass card per role that ends in the project it produced.
 *
 * The rail is the connection to the section above. Work says what was built;
 * this says who paid for it, and every card links back to the card it grew
 * out of, with that project's own mark, so a reader walks between the two
 * without hunting. The date range is the one sequence signal; never 01/02/03.
 *
 * Returns null when there is nothing to show, so it can never become a
 * content-free section.
 */
export default function Experience() {
  if (experience.length === 0) return null;

  return (
    <section
      className="section section--exp"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="section__head">
        <h2 className="section__title" id="experience-title">
          Experience
        </h2>
      </div>

      <Reveal className="timeline">
        <ol className="timeline__list">
          {experience.map((e, i) => {
            const project = bySlug(e.project);
            return (
              <Reveal
                key={e.id}
                delay={120 + i * 70}
                className="timeline__item"
                data-live={e.end ? undefined : ""}
              >
                <p className="timeline__period">
                  <span className="timeline__node" aria-hidden="true" />
                  {e.period}
                </p>
                <article className="timeline__card">
                  <p className="timeline__company">{e.company}</p>
                  <p className="timeline__title">{e.title}</p>
                  <p className="timeline__ownership">{e.ownership}</p>
                  {project && (
                    <Link
                      className="timeline__project"
                      href={`/work/${project.slug}`}
                    >
                      <span className="timeline__project-mark" aria-hidden="true">
                        <Artifact slug={project.slug} />
                      </span>
                      <span className="timeline__project-name">{project.name}</span>
                      <ArrowRight />
                    </Link>
                  )}
                </article>
              </Reveal>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
