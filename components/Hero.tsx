import Sparkle from "@/components/Sparkle";
import { ArrowRight } from "@/components/Icon";
import { links } from "@/data/projects";

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <Sparkle className="hero__sparkle hero__sparkle--a" />
      <Sparkle className="hero__sparkle hero__sparkle--b" />

      <h1 className="hero__title" id="hero-title">
        <span>Hi. I&rsquo;m Parth.</span>
        <span>I build with AI.</span>
      </h1>

      <p className="hero__sub">
        Computer science at UC Santa Cruz. I build autonomous agents that do
        real work — managing bookings, grading reports, finding leads — and I
        get more out of AI than most, in what I build and how I work.
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
        <span className="status">
          <span className="status__dot" aria-hidden="true" />
          Open to opportunities
        </span>
      </div>
    </section>
  );
}
