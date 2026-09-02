import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

/** Index 0 is the full-width flagship; the rest fill a two-column grid. */
function isGradient(i: number) {
  if (i === 0) return true;
  const row = Math.floor((i - 1) / 2);
  const column = (i - 1) % 2;
  return column === row % 2;
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
          Seven things I&rsquo;ve made. Six have the code out in the open; the
          one I&rsquo;m proudest of lives inside a company.
        </p>
      </div>
      <div className="work__grid">
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={i * 50}
            className={project.weight === 1 ? "work__item--flagship" : undefined}
          >
            {/*
              One gradient edge per ROW, alternating sides. Selecting odd
              indices instead put it on every left-column card, which reads as
              a stripe down the page rather than a rhythm.
            */}
            <ProjectCard project={project} gradient={isGradient(i)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
