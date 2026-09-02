import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

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
            delay={i * 70}
            className={project.flagship ? "work__item--flagship" : undefined}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
