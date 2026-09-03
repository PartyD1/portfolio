"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProjectMedia } from "@/data/projects";
import { ArrowLeft, ArrowRight } from "@/components/Icon";

/**
 * The screens, as a slideshow, at the END of the case study.
 *
 * They used to open the page as a scroll-pinned sequence directly under the
 * headline, which spent the reader's first screen on pictures and the route's
 * one pin allowance on them too. Parth's call (2026-09-03): the words come
 * first and the screens are the thing you look at once you have decided to
 * care. So the band is gone and this is the last block before the CTA.
 *
 * NATIVE SCROLL, DRIVEN BY HAND. The track is a real scroll-snap container,
 * which is what buys touch swipe with momentum, trackpad flicks, and a
 * focusable scroll region, none of which a translated track gets for free.
 * The arrows and dots then animate scrollLeft themselves rather than calling
 * scrollTo({ behavior: "smooth" }), because that behaviour's curve and
 * duration belong to the engine and this site owns exactly one easing.
 *
 * The active index is read back OUT of the scroll position rather than
 * written into it, so a swipe, a wheel, a dot and an arrow key all report the
 * same truth and none of them can desync the dots.
 */

/** 1-(1-t)^5, the closed form nearest --ease-out's cubic-bezier(.23,1,.32,1). */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 5);

/** Matches the vocabulary: a dropdown-sized move, comfortably under 300ms. */
const DURATION = 260;

export default function Slideshow({
  media,
  name,
}: {
  media: ProjectMedia[];
  name: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const frame = useRef(0);
  const [index, setIndex] = useState(0);

  const count = media.length;
  const last = count - 1;

  /** Cancels any run in flight. A user gesture always outranks our animation. */
  const stop = useCallback(() => cancelAnimationFrame(frame.current), []);

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const target = track.children[i] as HTMLElement | undefined;
      if (!target) return;

      const from = track.scrollLeft;
      const to = target.offsetLeft - track.offsetLeft;
      const distance = to - from;

      stop();

      // Reduced motion means gentler, not none: the slide still changes, it
      // just does not travel. Same for a distance the eye would not read.
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      if (reduced || Math.abs(distance) < 2) {
        track.scrollLeft = to;
        setIndex(i);
        return;
      }

      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / DURATION, 1);
        track.scrollLeft = from + distance * easeOut(t);
        if (t < 1) frame.current = requestAnimationFrame(step);
      };
      frame.current = requestAnimationFrame(step);
    },
    [stop],
  );

  // The dots follow the scroller, whoever moved it. An observer rather than a
  // scroll handler: no per-frame work, and it stays correct after a resize.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.children);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setIndex(slides.indexOf(visible.target));
      },
      { root: track, threshold: 0.6 },
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => stop, [stop]);

  if (count === 0) return null;

  const single = count === 1;

  return (
    <section
      className="shots"
      aria-labelledby="screens-t"
      aria-roledescription={single ? undefined : "carousel"}
    >
      <h2 className="case__section-title shots__title" id="screens-t">
        Screens
      </h2>

      <ul
        className="shots__track"
        ref={trackRef}
        // A scroll container has to be reachable without a mouse, and the
        // arrow keys have to move it by a whole screen rather than by the
        // engine's 40px nudge.
        tabIndex={single ? undefined : 0}
        role={single ? undefined : "group"}
        aria-label={single ? undefined : `${name} screens, use the arrow keys`}
        onPointerDown={stop}
        onWheel={stop}
        onKeyDown={(e) => {
          if (single) return;
          if (e.key === "ArrowRight" && index < last) {
            e.preventDefault();
            goTo(index + 1);
          }
          if (e.key === "ArrowLeft" && index > 0) {
            e.preventDefault();
            goTo(index - 1);
          }
        }}
      >
        {media.map((m, i) => (
          <li
            className="shots__slide"
            key={m.src}
            role={single ? undefined : "group"}
            aria-roledescription={single ? undefined : "slide"}
            aria-label={single ? undefined : `${i + 1} of ${count}`}
          >
            <figure className="shots__figure">
              {/* stage (one height for every slide) > frame (this picture's
                  own shape) > the image, which resolves both constraints. */}
              <div className="shots__stage">
                <div
                  className="shots__frame"
                  // The ratio goes in as a custom property rather than as a
                  // finished width, so the stylesheet keeps the decision: a
                  // phone treats a tall full-page capture differently from a
                  // landing page, and an inline width would have settled that
                  // here, at every breakpoint at once.
                  data-tall={m.height > m.width ? "" : undefined}
                  style={
                    {
                      "--ar": (m.width / m.height).toFixed(4),
                    } as React.CSSProperties
                  }
                >
                  <Image
                    src={m.src}
                    alt={m.alt}
                    width={m.width}
                    height={m.height}
                    className="shots__img"
                    sizes="(max-width: 760px) 92vw, 1140px"
                  />
                </div>
              </div>
              {m.caption && (
                <figcaption className="shots__cap">{m.caption}</figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>

      {!single && (
        <div className="shots__controls">
          <button
            type="button"
            className="shots__arrow"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous screen"
          >
            <ArrowLeft />
          </button>

          <ol className="shots__dots">
            {media.map((m, i) => (
              <li key={m.src}>
                <button
                  type="button"
                  className="shots__dot"
                  onClick={() => goTo(i)}
                  aria-current={i === index ? "true" : undefined}
                  aria-label={`Screen ${i + 1}`}
                />
              </li>
            ))}
          </ol>

          <button
            type="button"
            className="shots__arrow"
            onClick={() => goTo(index + 1)}
            disabled={index === last}
            aria-label="Next screen"
          >
            <ArrowRight />
          </button>

          <p className="shots__count" aria-live="polite">
            {index + 1} <span aria-hidden="true">/</span>{" "}
            <span className="sr-only">of</span> {count}
          </p>
        </div>
      )}
    </section>
  );
}
