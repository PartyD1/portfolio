import RoleRoll, { type Phrase } from "@/components/RoleRoll";
import { ArrowRight } from "@/components/Icon";

/** Parth's own words. The slot owns the article and the period. */
const phrases: Phrase[] = [
  { text: "a developer." },
  { text: "a researcher." },
  { text: "a computer scientist." },
  { text: "an athlete." },
  { text: "a mentor." },
  { text: "obsessed with AI.", accent: true, hold: 4200 },
];

/** Two sine passes behind the name, echoing the reference's wave. */
function Wave({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 40"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M0 22C25 22 25 8 50 8s25 14 50 14 25-14 50-14 25 14 50 14 25-14 50-14 25 14 50 14 25-14 50-14 25 14 50 14 25-14 50-14 25 14 50 14 25-14 50-14" />
      <path
        d="M0 30C25 30 25 16 50 16s25 14 50 14 25-14 50-14 25 14 50 14 25-14 50-14 25 14 50 14 25-14 50-14 25 14 50 14 25-14 50-14 25 14 50 14 25-14 50-14"
        opacity="0.45"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <h1 className="hero__title" id="hero-title">
        <span className="visually-hidden">
          Hey, I&rsquo;m Parth Doshi. I&rsquo;m a developer, a researcher, a
          computer scientist, an athlete, a mentor — and obsessed with AI.
        </span>

        <span className="hero__line" aria-hidden="true">
          <span className="type-outline">Hey, I&rsquo;m</span>{" "}
          <span className="hero__name">
            Parth Doshi
            <Wave className="hero__wave" />
          </span>
        </span>

        <span className="hero__line hero__line--roll" aria-hidden="true">
          <RoleRoll phrases={phrases} lead="I’m" />
        </span>
      </h1>

      <p className="hero__sub">
        CS student at UC Santa Cruz building autonomous agents that do real
        work — and getting more out of AI than most.
      </p>

      <div className="hero__actions">
        <a className="link-arrow" href="#work">
          <ArrowRight />
          see my work
        </a>
        <a className="link-arrow" href="#about">
          <ArrowRight />
          more about me
        </a>
      </div>

      <p className="status">
        <span className="status__dot" aria-hidden="true" />
        Open to opportunities
      </p>
    </section>
  );
}
