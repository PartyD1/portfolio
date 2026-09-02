import type { Project } from "@/data/projects";
import Artifact from "@/components/Artifact";
import { ArrowUpRight } from "@/components/Icon";
import { Badge } from "@/components/ui/badge";

export default function ProjectCard({
  project,
  gradient,
}: {
  project: Project;
  /** One card per row carries the world's gradient as an edge. */
  gradient?: boolean;
}) {
  const { slug, name, tagline, description, href, note, label, use, weight } =
    project;
  const flagship = weight === 1;

  const classes = [
    "card",
    flagship && "card--flagship",
    gradient && "card--gradient",
  ]
    .filter(Boolean)
    .join(" ");

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
      <article className={classes}>
        <div className="card__body">
          <div className="card__head">
            <h3 className="card__name">{name}</h3>
          </div>
          <p className="card__tagline">{tagline}</p>
          {use && <p className="card__use">{use}</p>}
          {description && <p className="card__desc">{description}</p>}
          <div className="card__foot">
            {note ? <p className="card__note">{note}</p> : link}
            <Badge variant="outline">{label}</Badge>
          </div>
        </div>
        <Artifact slug={slug} className="card__art" />
      </article>
    );
  }

  return (
    <article className={classes}>
      <Artifact slug={slug} className="card__art" />
      <div className="card__head">
        <h3 className="card__name">{name}</h3>
      </div>
      <p className="card__tagline">{tagline}</p>
      {use && <p className="card__use">{use}</p>}
      <div className="card__foot">
        {link}
        <Badge variant="outline">{label}</Badge>
      </div>
    </article>
  );
}
