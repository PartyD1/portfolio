export default function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0c0 7.5 4.5 12 12 12-7.5 0-12 4.5-12 12 0-7.5-4.5-12-12-12 7.5 0 12-4.5 12-12Z" />
    </svg>
  );
}
