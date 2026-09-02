import type { Project } from "@/data/projects";
import Artifact from "@/components/Artifact";
import { ArrowUpRight } from "@/components/Icon";

export default function ProjectCard({ project }: { project: Project }) {
  const { slug, name, label, tagline, description, href, note, tone, flagship } =
    project;

  const link = href ? (
    <a
      className="card__link"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${name} on GitHub`}
    >
      GitHub
      <ArrowUpRight />
    </a>
  ) : null;

  if (flagship) {
    return (
      <article className={`card card--${tone} card--flagship`}>
        <div className="card__body">
          <div className="card__head">
            <h3 className="card__name">{name}</h3>
          </div>
          <p className="card__tagline">{tagline}</p>
          {description && <p className="card__desc">{description}</p>}
          <div className="card__foot">
            {note ? <p className="card__note">{note}</p> : link}
            <p className="card__label">{label}</p>
          </div>
        </div>
        <Artifact slug={slug} className="card__art" />
      </article>
    );
  }

  return (
    <article className={`card card--${tone}`}>
      <Artifact slug={slug} className="card__art" />
      <div className="card__head">
        <h3 className="card__name">{name}</h3>
      </div>
      <p className="card__tagline">{tagline}</p>
      <div className="card__foot">
        {link}
        <p className="card__label">{label}</p>
      </div>
    </article>
  );
}
