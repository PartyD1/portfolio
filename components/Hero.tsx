import RoleRoll, { type Phrase } from "@/components/RoleRoll";
import { ArrowRight } from "@/components/Icon";
import { availability } from "@/data/site";
import { FIXTURES, fixtureAvailability } from "@/data/fixtures";

const avail = FIXTURES ? fixtureAvailability : availability;

/** Parth's own words. The slot owns the article and the period. */
const phrases: Phrase[] = [
  { text: "a developer." },
  { text: "a researcher." },
  { text: "a computer scientist.", widest: true },
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
          Hey, I&rsquo;m Parth Doshi, and I&rsquo;m a developer, a researcher, a
          computer scientist, an athlete, a mentor — and obsessed with AI.
        </span>

        <span className="hero__line" aria-hidden="true">
          <span className="type-outline">Hey, I&rsquo;m</span>{" "}
          <span className="hero__name">
            Parth Doshi
            <Wave className="hero__wave" />
          </span>
        </span>

        {/*
          The lead sits OUTSIDE the typing slot so it never moves: only the
          phrase after it changes width. "And I'm" rather than a second "I'm",
          which read as a stutter directly under the name.

          It also sits on its own LINE. Sharing a line box with the slot is what
          made the headline unfittable: lead plus slot needs ~21em, which at
          5.1vw is wider than the viewport by construction across the whole
          fluid range and only clears above ~1384px. No amount of wrap-tuning
          fixes an arithmetic impossibility. An orphaned outlined lead-in on a
          left-aligned line reads as composition rather than as a widow, which
          is what left-aligning buys.
        */}
        <span className="hero__line hero__line--lead" aria-hidden="true">
          <span className="type-outline hero__lead">And I&rsquo;m</span>
        </span>
        <span className="hero__line hero__line--roll" aria-hidden="true">
          <RoleRoll phrases={phrases} />
        </span>
      </h1>

      <p className="hero__sub">
        CS student at UC Santa Cruz building autonomous agents that do real
        work — and getting more out of AI than most.
      </p>

      {/*
        Graduation term, target role and location: survey:convert calls these
        the single highest-cost omission on the site, because a recruiter who
        cannot tell WHEN someone is available, or WHERE, cannot act on wanting
        to hire them.

        All three are blocked on Parth and every one renders only when non-null,
        so today this is absent rather than empty. The layout is built and
        captured NOW, under fixtures, so supplying them is a data edit and not a
        design decision made under time pressure.
      */}
      {(avail.gradTerm || avail.target || avail.location) && (
        <p className="hero__avail">
          {[avail.gradTerm, avail.target, avail.location]
            .filter(Boolean)
            .join(" · ")}
        </p>
      )}

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
