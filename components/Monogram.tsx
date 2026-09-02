/**
 * "PD" drawn as two ribbon strokes sharing one stem rhythm, in the spirit of
 * the reference's hand-drawn S mark.
 */
export default function Monogram({ className }: { className?: string }) {
  return (
    <a href="#top" className={className} aria-label="Parth Doshi — back to top">
      <svg
        viewBox="0 0 48 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* P: stem, then bowl */}
        <path d="M10 33V8h8.5a6.5 6.5 0 0 1 0 13H10" />
        {/* D: shares the counter's rhythm, closing back toward the stem */}
        <path d="M25 33V15h6a9 9 0 0 1 0 18h-6" />
      </svg>
    </a>
  );
}
