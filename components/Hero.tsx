import { ArrowRight } from "@/components/Icon";
import RoleRoll, { type Phrase } from "@/components/RoleRoll";
import { links } from "@/data/projects";

/** Parth's own words. The slot owns the article and the period. */
const phrases: Phrase[] = [
  { text: "a developer." },
  { text: "a researcher." },
  { text: "a computer scientist." },
  { text: "an athlete." },
  { text: "a mentor." },
  { text: "obsessed with AI.", accent: true, hold: 4200 },
];

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <h1 className="hero__title" id="hero-title">
        <span className="hero__line">Hey, I&rsquo;m Parth.</span>
        <span className="hero__line hero__line--roll">
          <span className="visually-hidden">
            I&rsquo;m a developer, a researcher, a computer scientist, an
            athlete, a mentor — and obsessed with AI.
          </span>
          <span className="hero__lead" aria-hidden="true">
            I&rsquo;m{" "}
          </span>
          <RoleRoll phrases={phrases} />
        </span>
      </h1>

      <p className="hero__sub">
        CS student at UC Santa Cruz building autonomous agents that do real
        work — and getting more out of AI than most.
      </p>

      <div className="hero__actions">
        <a className="btn btn--primary" href={`mailto:${links.email}`}>
          Get in touch
          <ArrowRight />
        </a>
        <a
          className="btn btn--ghost"
          href={links.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>

      <p className="status">
        <span className="status__dot" aria-hidden="true" />
        Open to opportunities
      </p>
    </section>
  );
}
