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

const TYPE_MS = 45;
const TYPE_JITTER_MS = 22;
const START_DELAY_MS = 320;
const CARET_HOLD_MS = 700;
const HOLD_MS = 2400;
const REDUCED_HOLD_MS = 3600;
const ROLL_MS = 650;
const PAUSE_POLL_MS = 400;

/**
 * The rolling "I'm …" phrase. Server-renders the first phrase in full so
 * nothing depends on JS; on hydration the first phrase types in once, then
 * the rest roll through a clipped line box. Under reduced motion there is no
 * typing and no roll: phrases swap in place on a slower clock. The whole
 * thing is aria-hidden: the h1 carries the full sentence.
 */
export default function RoleRoll({ phrases }: { phrases: Phrase[] }) {
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [typed, setTyped] = useState(phrases[0].text.length);
  const [phase, setPhase] = useState<Phase>("typing");
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  const paused = useRef(false);
  const indexRef = useRef(0);
  const timer = useRef<number | null>(null);
  const advanceRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setPhase("rolling");
    } else {
      setTyped(0);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;

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

    const holdThen = (i: number, ms: number) =>
      tick(() => {
        if (paused.current || document.hidden) {
          holdThen(i, PAUSE_POLL_MS);
          return;
        }
        goNext();
      }, ms);

    const goNext = () => {
      const next = (indexRef.current + 1) % phrases.length;
      setPrev(indexRef.current);
      indexRef.current = next;
      setIndex(next);
      holdThen(next, (phrases[next].hold ?? baseHold) + rollMs);
    };

    advanceRef.current = goNext;

    if (reduced) {
      holdThen(0, baseHold);
      return () => {
        cancelled = true;
        clear();
        advanceRef.current = null;
      };
    }

    const typeChar = (n: number) => {
      setTyped(n);
      if (n < phrases[0].text.length) {
        tick(() => typeChar(n + 1), TYPE_MS + Math.random() * TYPE_JITTER_MS);
        return;
      }
      setPhase("caret");
      tick(() => {
        setPhase("rolling");
        holdThen(0, phrases[0].hold ?? HOLD_MS);
      }, CARET_HOLD_MS);
    };

    tick(() => typeChar(1), START_DELAY_MS);

    return () => {
      cancelled = true;
      clear();
      advanceRef.current = null;
    };
  }, [reduced, mounted, phrases]);

  const showCaret = mounted && !reduced && phase !== "rolling";

  return (
    <span
      className="roll"
      data-phase={phase}
      aria-hidden="true"
      onPointerEnter={() => {
        paused.current = true;
      }}
      onPointerLeave={() => {
        paused.current = false;
      }}
      onClick={() => {
        if (phase === "rolling") advanceRef.current?.();
      }}
    >
      {phrases.map((p, i) => {
        const active = i === index;
        const leaving = i === prev;
        const text = i === 0 && phase !== "rolling" ? p.text.slice(0, typed) : p.text;
        const cls = [
          "roll__item",
          active && "is-active",
          leaving && "is-leaving",
          p.accent && "roll__item--accent",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <span key={p.text} className={cls}>
            {text}
            {i === 0 && showCaret && <span className="roll__caret" />}
          </span>
        );
      })}
    </span>
  );
}
