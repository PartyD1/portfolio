"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "@/components/Icon";

/**
 * Copies the address. A phone with no mail client configured opens nothing on
 * mailto:, and a recruiter should not have to retype an address. The control
 * says what it did for 1.6s, then returns; aria-live carries the same word to
 * a screen reader.
 */
export default function CopyEmail({ email }: { email: string }) {
  const [done, setDone] = useState(false);
  const timer = useRef<number | null>(null);
  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );
  return (
    <button
      type="button"
      className="copy"
      data-done={done || undefined}
      aria-label="Copy email address"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setDone(true);
          if (timer.current) window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => setDone(false), 1600);
        } catch {
          /* No clipboard permission: the address is selectable beside it. */
        }
      }}
    >
      <span className="copy__icon copy__icon--copy">
        <Copy />
      </span>
      <span className="copy__icon copy__icon--done">
        <Check />
      </span>
      <span className="sr-only" aria-live="polite">
        {done ? "Copied" : ""}
      </span>
    </button>
  );
}
