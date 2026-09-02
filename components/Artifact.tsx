/**
 * Crisp geometric marks, one per project. Vector geometry only — no
 * illustration. Each is drawn in currentColor so it takes the card's ink.
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function OperationsAgent() {
  // A booking schedule: five rows, one flagged, one being fixed by the agent.
  const rows = [22, 64, 106, 148, 190];
  return (
    <svg viewBox="0 0 320 240" aria-hidden="true">
      {rows.map((y, i) => (
        <g key={y}>
          <rect
            x="16"
            y={y}
            width="240"
            height="30"
            rx="15"
            {...stroke}
            strokeDasharray={i === 2 ? "6 8" : undefined}
            strokeWidth={i === 2 ? 3 : 2.5}
          />
          <circle
            cx="36"
            cy={y + 15}
            r="6"
            fill={i === 2 ? "none" : "currentColor"}
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <rect
            x="58"
            y={y + 10}
            width={[120, 96, 140, 84, 112][i]}
            height="10"
            rx="5"
            fill="currentColor"
            opacity={i === 2 ? 0.35 : 0.55}
          />
        </g>
      ))}
      {/* the agent: a circle off to the right, reaching into the flagged row */}
      <circle cx="292" cy="60" r="14" {...stroke} strokeWidth="3" />
      <circle cx="292" cy="60" r="4" fill="currentColor" />
      <path d="M292 78c0 30-6 43-30 43" {...stroke} strokeWidth="3" />
      <path d="M270 114l-8 7 8 7" {...stroke} strokeWidth="3" />
      {/* the flag */}
      <path d="M236 106v30" {...stroke} strokeWidth="3" />
      <path d="M236 106h20l-5 7 5 7h-20" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Scorely() {
  const rows = [12, 40, 68, 96];
  const widths = [70, 88, 56, 80];
  const done = [true, true, false, false];
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      {rows.map((y, i) => (
        <g key={y}>
          <rect
            x="6"
            y={y}
            width="18"
            height="18"
            rx="5"
            {...stroke}
            fill={done[i] ? "currentColor" : "none"}
          />
          {done[i] && (
            <path
              d="M10 21l4 4 8-9"
              transform={`translate(0 ${y - 12})`}
              fill="none"
              /* Knocked out against whatever is actually painted behind the
                 mark. That is --media-well in both the card frame and the
                 case-study well; --card was a token with no relationship to
                 this surface and only happened to look right. */
              stroke="var(--media-well)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          <rect
            x="32"
            y={y + 4}
            width={widths[i]}
            height="10"
            rx="5"
            fill="currentColor"
            opacity={done[i] ? 0.6 : 0.3}
          />
        </g>
      ))}
    </svg>
  );
}

function SantaClaws() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <rect
        x="30"
        y="8"
        width="82"
        height="60"
        rx="10"
        {...stroke}
        strokeDasharray="5 6"
        opacity="0.6"
      />
      <rect x="8" y="44" width="82" height="66" rx="10" {...stroke} />
      <path d="M8 62h82" {...stroke} />
      <circle cx="20" cy="53" r="2.5" fill="currentColor" />
      <circle cx="29" cy="53" r="2.5" fill="currentColor" />
      <circle cx="38" cy="53" r="2.5" fill="currentColor" />
      <rect x="20" y="74" width="34" height="22" rx="6" fill="currentColor" opacity="0.5" />
      <rect x="60" y="74" width="20" height="6" rx="3" fill="currentColor" opacity="0.5" />
      <rect x="60" y="86" width="14" height="6" rx="3" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function WaveFunction() {
  // 5x5 grid; 0 = uncollapsed (outline), 1 = collapsed (filled), 2 = superposition (half)
  const cells = [
    [1, 1, 1, 2, 0],
    [1, 1, 2, 0, 0],
    [1, 2, 0, 0, 0],
    [2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  const size = 18;
  const gap = 5;
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      {cells.map((row, r) =>
        row.map((v, c) => (
          <rect
            key={`${r}-${c}`}
            x={6 + c * (size + gap)}
            y={6 + r * (size + gap)}
            width={size}
            height={size}
            rx="5"
            fill={v === 0 ? "none" : "currentColor"}
            opacity={v === 2 ? 0.4 : 1}
            stroke="currentColor"
            strokeWidth="2.5"
          />
        )),
      )}
    </svg>
  );
}

function Pewter() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <rect x="4" y="100" width="38" height="10" rx="5" fill="currentColor" />
      <rect x="46" y="72" width="36" height="10" rx="5" fill="currentColor" />
      <rect x="86" y="44" width="30" height="10" rx="5" fill="currentColor" />
      <path d="M22 92C30 50 52 34 70 36" {...stroke} strokeDasharray="4 6" />
      <circle cx="72" cy="34" r="8" {...stroke} strokeWidth="3" />
    </svg>
  );
}

function Gestura() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <path d="M20 110A80 80 0 0 1 110 20" {...stroke} strokeWidth="3" />
      <path d="M40 110A60 60 0 0 1 110 40" {...stroke} strokeWidth="3" opacity="0.65" />
      <path d="M60 110A40 40 0 0 1 110 60" {...stroke} strokeWidth="3" opacity="0.4" />
      <circle cx="16" cy="110" r="7" fill="currentColor" />
      <circle cx="110" cy="16" r="7" fill="currentColor" />
    </svg>
  );
}

function WordPlay() {
  const rows: Array<Array<0 | 1 | 2>> = [
    [1, 2, 1, 1, 1],
    [2, 0, 0, 0, 0],
  ];
  const size = 19;
  const gap = 4;
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      {rows.map((row, r) =>
        row.map((v, c) => (
          <rect
            key={`${r}-${c}`}
            x={4 + c * (size + gap)}
            y={30 + r * (size + gap)}
            width={size}
            height={size}
            rx="5"
            fill={v === 0 ? "none" : "currentColor"}
            opacity={v === 2 ? 0.45 : 1}
            stroke="currentColor"
            strokeWidth="2.5"
          />
        )),
      )}
    </svg>
  );
}

const marks: Record<string, () => React.JSX.Element> = {
  "operations-agent": OperationsAgent,
  "scorely-ai": Scorely,
  santaclaws: SantaClaws,
  "wave-function-collapse": WaveFunction,
  "pewter-platformer": Pewter,
  gestura: Gestura,
  wordplay: WordPlay,
};

export default function Artifact({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Mark = marks[slug];
  if (!Mark) return null;
  return (
    <div className={className}>
      <Mark />
    </div>
  );
}
