import RoleRoll, { type Phrase } from "@/components/RoleRoll";
import { ArrowRight } from "@/components/Icon";
import { availability } from "@/data/site";
import { FIXTURES, fixtureAvailability } from "@/data/fixtures";

const avail = FIXTURES ? fixtureAvailability : availability;

/** Specialization first: what he does is the reason to care where and when. */
const facts = [avail.focus, avail.gradTerm, avail.location].filter(
  (fact): fact is string => Boolean(fact),
);

/**
 * Parth's own words, as bare descriptors.
 *
 * They used to carry an article and a period ("a developer.") because they
 * completed the spoken sentence "And I'm ___". With the lead gone the roll is a
 * secondary descriptor rather than the end of a sentence, so the articles and
 * the full stops go with it — "developer", not "a developer.". Same six words,
 * same order, same finale.
 */
const phrases: Phrase[] = [
  { text: "developer" },
  { text: "researcher" },
  { text: "computer scientist", widest: true },
  { text: "athlete" },
  { text: "mentor" },
  { text: "obsessed with AI", accent: true, hold: 4200 },
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
    // data-scrub: the WAAPI fallback for the recede (ScrollScrub.tsx) where
    // CSS scroll-driven animations are missing. The end matches the CSS range.
    <section
      className="hero"
      id="top"
      aria-labelledby="hero-title"
      data-scrub="exit"
      data-scrub-end="0.85"
    >
      <h1 className="hero__title" id="hero-title">
        {/* The one readable copy: assistive tech gets the whole introduction
            as a sentence, including every phrase the slot cycles through. */}
        <span className="visually-hidden">
          Hey, I&rsquo;m Parth Doshi: developer, researcher, computer
          scientist, athlete, mentor, and obsessed with AI.
        </span>

        <span className="hero__line" aria-hidden="true">
          <span className="type-outline">Hey, I&rsquo;m</span>{" "}
          <span className="hero__name">
            Parth Doshi
            <Wave className="hero__wave" />
          </span>
        </span>

      </h1>

      {/*
        The descriptor, and it is deliberately SECONDARY.

        It used to be a third display line preceded by an outlined "AND I'M",
        which made the name and the role compete at the same weight. The name is
        the headline; what he is qualifies it. So the roll drops out of the h1
        to its own line at roughly a third the size — still the display face, so
        it reads as part of the headline system rather than as body copy.

        This also dissolves the arithmetic problem the three-line version was
        built to solve: the slot no longer sits at display size, so it clears the
        column by a wide margin at every width.
      */}
      <p className="hero__role" aria-hidden="true">
        <RoleRoll phrases={phrases} />
      </p>

      {/*
        The three facts a recruiter needs to decide whether to keep reading:
        what he does, when he is free, where he is. One line, dot-separated,
        in quiet body ink — a fact is not an action, so it gets no pill, no
        accent and no chrome.

        It stays a <ul> because it IS a list of three unrelated facts; the
        separators are CSS on `li + li`, so nothing screen-reader-hostile
        lands in the text. Each field renders only when non-null, so a
        missing one leaves no stray separator behind.
      */}
      {facts.length > 0 && (
        <ul className="hero__avail" aria-label="Availability">
          {facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
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

    </section>
  );
}
