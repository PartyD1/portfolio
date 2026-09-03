type IconProps = { className?: string };

export function ArrowRight({ className = "icon" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

/**
 * The arrow grammar, third case: a LEADING arrow means the link stays on the
 * site; a TRAILING ArrowUpRight means it leaves. That distinction is what makes
 * "back to the work" and "GitHub ↗" read as different promises.
 */
export function ArrowLeft({ className = "icon" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 10H4M9 5l-5 5 5 5" />
    </svg>
  );
}

export function ArrowDown({ className = "icon" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 3v13M5 11l5 5 5-5" />
    </svg>
  );
}

export function ArrowUpRight({ className = "icon" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  );
}
