"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type Phrase = {
  /** Everything after the lead — article and period included. */
  text: string;
  /** Set in the page accent and held longer: the finale. */
  accent?: boolean;
  /** Override the hold, in ms. */
  hold?: number;
  /**
   * The widest phrase BY MEASURED WIDTH at weight 700, all-caps, tracking
   * 0.005em — not by character count. Exactly one phrase carries it.
   * Re-measure when the list changes.
   */
  widest?: true;
};

type Mode = "typing" | "holding" | "erasing";

const TYPE_MS = 52;
const TYPE_JITTER_MS = 26;
/** Backspacing is quicker than typing — it is a correction, not a thought. */
const ERASE_MS = 26;
const START_DELAY_MS = 320;
const HOLD_MS = 1900;
const BETWEEN_MS = 320;
/** Reduced motion swaps whole phrases, so it needs a slower, calmer clock. */
const REDUCED_HOLD_MS = 3400;
const PAUSE_POLL_MS = 400;

/**
 * The typewriter: types a phrase, holds it, backspaces it away, types the next.
 *
 * The slot is sized to the longest phrase and the text is left-aligned inside
 * it, so the lead beside it never moves. The trailing space that leaves reads
 * as a text field rather than a gap, because the caret sits at the end of the
 * typed text — which is exactly what makes this shape work where a centred
 * swap did not.
 *
 * Under reduced motion the per-character animation is dropped entirely and
 * phrases swap whole on a slower clock: typing is not spatial motion, but a
 * continuous churn of characters is still churn.
 */
export default function RoleRoll({ phrases }: { phrases: Phrase[] }) {
  /*
   * The slot has to reserve the widest phrase's width, and it has to do so on
   * the server: the box must exist before hydration or the headline reflows on
   * first paint. That rules out measuring, so the width is declared in the data
   * and only sanity-checked here.
   *
   * The previous longest-by-character-count pick is wrong in principle — it
   * happens to agree today, but a future phrase with fewer but wider glyphs
   * would under-size the slot and the caret would push the layout.
   */
  const flagged = phrases.filter((p) => p.widest);
  if (process.env.NODE_ENV !== "production" && flagged.length !== 1) {
    console.warn(
      `RoleRoll: expected exactly one phrase with widest:true, found ${flagged.length}. ` +
        `Falling back to longest-by-character-count, which under-sizes on wide glyphs.`,
    );
  }
  const sized =
    flagged[0] ??
    phrases.reduce((a, b) => (b.text.length > a.text.length ? b : a));

  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  // Server-render the first phrase whole; CSS holds the glyphs back until the
  // client takes over, so there is no flash before typing starts.
  const [count, setCount] = useState(phrases[0].text.length);
  const [mode, setMode] = useState<Mode>("typing");

  const rootRef = useRef<HTMLSpanElement>(null);
  const hovered = useRef(false);
  const onScreen = useRef(true);
  const timer = useRef<number | null>(null);
  const advanceRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    const isReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setReduced(isReduced);
    if (isReduced) setMode("holding");
    else setCount(0);
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
    let i = 0;
    let n = reduced ? phrases[0].text.length : 0;

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
    /** Waits out hover, a hidden tab, or being scrolled off-screen. */
    const whenLive = (fn: () => void, ms: number) =>
      tick(() => {
        if (hovered.current || document.hidden || !onScreen.current) {
          whenLive(fn, PAUSE_POLL_MS);
          return;
        }
        fn();
      }, ms);

    const next = () => {
      i = (i + 1) % phrases.length;
      setIndex(i);
    };

    const startTyping = () => {
      setMode("typing");
      type();
    };

    const type = () => {
      if (n < phrases[i].text.length) {
        n += 1;
        setCount(n);
        tick(type, TYPE_MS + Math.random() * TYPE_JITTER_MS);
        return;
      }
      setMode("holding");
      whenLive(startErasing, phrases[i].hold ?? HOLD_MS);
    };

    const startErasing = () => {
      setMode("erasing");
      erase();
    };

    const erase = () => {
      if (n > 0) {
        n -= 1;
        setCount(n);
        tick(erase, ERASE_MS);
        return;
      }
      next();
      tick(startTyping, BETWEEN_MS);
    };

    // Click-to-advance: wipe what is on screen and move on.
    advanceRef.current = () => {
      clear();
      if (reduced) {
        next();
        whenLive(advanceRef.current!, REDUCED_HOLD_MS);
        return;
      }
      startErasing();
    };

    const stop = () => {
      cancelled = true;
      clear();
      advanceRef.current = null;
    };

    if (reduced) {
      whenLive(function swap() {
        next();
        whenLive(swap, REDUCED_HOLD_MS);
      }, REDUCED_HOLD_MS);
      return stop;
    }

    // Wait for the real face: typing in a fallback font reflows mid-word.
    let raf = 0;
    const begin = () => {
      if (cancelled) return;
      raf = requestAnimationFrame(() => tick(startTyping, START_DELAY_MS));
    };
    if (typeof document !== "undefined" && document.fonts) {
      if (document.fonts.status === "loaded") begin();
      else document.fonts.ready.then(begin);
    } else {
      begin();
    }

    return () => {
      cancelAnimationFrame(raf);
      stop();
    };
  }, [reduced, mounted, phrases]);

  const phrase = phrases[index];
  const visible = reduced ? phrase.text : phrase.text.slice(0, count);

  return (
    <span
      ref={rootRef}
      className="roll"
      data-mode={mode}
      data-pretype={mounted ? undefined : "true"}
      aria-hidden="true"
      onPointerEnter={() => {
        hovered.current = true;
      }}
      onPointerLeave={() => {
        hovered.current = false;
      }}
      onClick={() => advanceRef.current?.()}
    >
      {/*
        Reserves the width of the widest phrase so the line never shifts.
        The caret is rendered HERE too, unconditionally: without it the sizer
        measures 0.12em narrower than the live copy, and the slot grew by
        exactly that much at the moment the widest phrase finished typing —
        an anchor drift that fired once per cycle and nowhere else.
      */}
      <span className="roll__sizer" aria-hidden="true">
        {sized.text}
        <span className="roll__caret" />
      </span>
      <span className="roll__live">
        <span className={phrase.accent ? "roll__text roll__text--accent" : "roll__text"}>
          {visible}
        </span>
        {mounted && <span className="roll__caret" />}
      </span>
    </span>
  );
}
