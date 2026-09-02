import Link from "next/link";
import { experience } from "@/data/experience";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icon";

/**
 * Experience as a DENSE RULED LIST, not cards and not a timeline.
 *
 * An employment list is the textbook case of craft-floor L25 — same-size cards
 * of icon plus heading plus text used as the page's structure — and a timeline
 * spine is the textbook case of L35, a coloured border-left heavier than 1px.
 * `operate` L60 explicitly permits density for a scanning reader, and the date
 * range is the legitimate sequence signal L28 asks for, so there are no
 * 01/02/03 numbers here.
 *
 * No card, no backdrop-filter, no left rail — which also keeps this section off
 * the scroll-motion do-not-move list.
 *
 * Returns null when there is nothing to show, so it can never become the
 * content-free section that got Hobbies cut.
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
        <p className="section__lede">
          Where the work above was done for someone other than me.
        </p>
      </div>

      <div className="exp">
        {experience.map((e, i) => (
          <Reveal key={e.id} delay={i * 50} className="exp__row">
            <p className="exp__period">{e.period}</p>
            <div className="exp__detail">
              {/* company and title render only when supplied — never a
                  placeholder, and never "Internship" standing in for a title. */}
              {e.company && <p className="exp__company">{e.company}</p>}
              {e.title && <p className="exp__title">{e.title}</p>}
              <p className="exp__ownership">{e.ownership}</p>
              {e.href && (
                <Link className="exp__link" href={e.href}>
                  <ArrowRight />
                  read the case study
                </Link>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
