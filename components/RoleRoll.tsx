"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type Phrase = {
  /** Everything after "I'm" — article and period included. */
  text: string;
  /** Set in the page accent and held longer: the finale. */
  accent?: boolean;
  /** Override the hold, in ms. */
  hold?: number;
};

type Phase = "typing" | "caret" | "rolling";
type ItemState = "idle" | "active" | "leaving";

const TYPE_MS = 45;
const TYPE_JITTER_MS = 22;
const START_DELAY_MS = 320;
const CARET_HOLD_MS = 700;
const HOLD_MS = 2400;
/** Slower cadence when motion is reduced: gentler, not absent. */
const REDUCED_HOLD_MS = 3200;
/** Must match the enter duration in globals.css. */
const ROLL_MS = 360;
const PAUSE_POLL_MS = 400;

/**
 * The rolling "I'm …" phrase.
 *
 * Typing is not spatial motion, so it runs even under reduced motion; only the
 * vertical roll degrades there, to a crossfade in place. The swap itself is a
 * CSS transition rather than a keyframe so that click-to-advance can interrupt
 * it and retarget from wherever it is. The whole element is aria-hidden — the
 * h1 carries the full sentence for assistive tech.
 */
export default function RoleRoll({ phrases }: { phrases: Phrase[] }) {
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);
  // Server-render the full first phrase; CSS holds the glyphs back until the
  // client takes over, so there is no flash of the whole phrase before typing.
  const [typed, setTyped] = useState(phrases[0].text.length);
  const [phase, setPhase] = useState<Phase>("typing");
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  const rootRef = useRef<HTMLSpanElement>(null);
  const hovered = useRef(false);
  const onScreen = useRef(true);
  const indexRef = useRef(0);
  const timer = useRef<number | null>(null);
  const advanceRef = useRef<(() => void) | null>(null);
  const typedOnce = useRef(false);

  useLayoutEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (!typedOnce.current) setTyped(0);
    setMounted(true);
  }, []);

  // Nothing animates off-screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    let raf = 0;

    const clear = () => {
      if (timer.current !== null) {
        window.clearTimeout(timer.current);
        timer.current = null;
      }
    };
    const tick = (fn: () => void, ms: number) => {
      clear();
      timer.current = window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };

    const baseHold = reduced ? REDUCED_HOLD_MS : HOLD_MS;
    const rollMs = reduced ? 0 : ROLL_MS;

    const holdThen = (ms: number) =>
      tick(() => {
        if (hovered.current || document.hidden || !onScreen.current) {
          holdThen(PAUSE_POLL_MS);
          return;
        }
        goNext();
      }, ms);

    const goNext = () => {
      const next = (indexRef.current + 1) % phrases.length;
      setPrev(indexRef.current);
      indexRef.current = next;
      setIndex(next);
      holdThen((phrases[next].hold ?? baseHold) + rollMs);
    };

    const startRolling = () => {
      setPhase("rolling");
      holdThen(phrases[indexRef.current].hold ?? baseHold);
    };

    advanceRef.current = goNext;

    const stop = () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clear();
      advanceRef.current = null;
    };

    // Already typed once (a re-run of this effect, or StrictMode's second
    // pass in development): pick up at the roll rather than retyping.
    if (typedOnce.current) {
      startRolling();
      return stop;
    }

    const typeChar = (n: number) => {
      setTyped(n);
      if (n < phrases[0].text.length) {
        tick(() => typeChar(n + 1), TYPE_MS + Math.random() * TYPE_JITTER_MS);
        return;
      }
      typedOnce.current = true;
      setPhase("caret");
      tick(startRolling, CARET_HOLD_MS);
    };

    // Wait for the real face: typing in a fallback font reflows mid-word.
    const begin = () => {
      if (cancelled) return;
      raf = requestAnimationFrame(() => tick(() => typeChar(1), START_DELAY_MS));
    };
    if (typeof document !== "undefined" && document.fonts) {
      if (document.fonts.status === "loaded") begin();
      else document.fonts.ready.then(begin);
    } else {
      begin();
    }

    return stop;
  }, [reduced, mounted, phrases]);

  const showCaret = mounted && phase !== "rolling";

  return (
    <span
      ref={rootRef}
      className="roll"
      data-phase={phase}
      data-pretype={mounted ? undefined : "true"}
      aria-hidden="true"
      onPointerEnter={() => {
        hovered.current = true;
      }}
      onPointerLeave={() => {
        hovered.current = false;
      }}
      onClick={() => {
        if (phase === "rolling") advanceRef.current?.();
      }}
    >
      {phrases.map((p, i) => {
        const state: ItemState =
          i === index ? "active" : i === prev ? "leaving" : "idle";
        const text =
          i === 0 && phase !== "rolling" ? p.text.slice(0, typed) : p.text;
        return (
          <span
            key={p.text}
            className={`roll__item${p.accent ? " roll__item--accent" : ""}`}
            data-state={state}
          >
            {text}
            {i === 0 && showCaret && <span className="roll__caret" />}
          </span>
        );
      })}
    </span>
  );
}
