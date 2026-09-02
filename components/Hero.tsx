import { ArrowRight } from "@/components/Icon";
import { links } from "@/data/projects";

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <h1 className="hero__title" id="hero-title">
        <span>I&rsquo;m Parth Doshi.</span>
        <span>I build with AI.</span>
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
