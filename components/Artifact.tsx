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

/**
 * ScorelyAI's own mark, redrawn.
 *
 * The product's icon is three centred rules that widen as they descend: the
 * document getting longer, the score climbing. Geometry traced from
 * scorely-ai/frontend/app/icon.svg — rules at y 8/16/24 of a 32 box, half
 * widths 3/7/11 — scaled into this 120 box and re-inked. Brand GEOMETRY ships
 * and brand COLOUR does not, which is the rule the tech row already runs on.
 */
function Scorely() {
  const rules: Array<[number, number]> = [
    [24, 14],
    [60, 33],
    [96, 52],
  ];
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      {rules.map(([y, half]) => (
        <line
          key={y}
          x1={60 - half}
          y1={y}
          x2={60 + half}
          y2={y}
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/**
 * OpenClaw's lobster in a Santa hat, which is the joke the project's name is
 * already making and so the only honest mark for it.
 *
 * DRAWN, not the tech row's silhouette rescaled. That mark
 * (components/tech-marks.local.ts) is a solid single path tuned to read at
 * 20px in a row of logos; blown up to 400px in a card it is a dark blob whose
 * claws have collapsed into nubs. So the lobster is redrawn here in this
 * file's own open-stroke geometry, at the size it is actually seen, with the
 * two pincers opening OUTWARD where they can be read.
 *
 * SOLID HAT ON AN OUTLINED BODY. One ink, two materials, and the contrast is
 * doing the work a second colour would otherwise do: the hat is the only
 * filled thing in the mark, so it separates from the head without a knockout
 * — which matters, because this frame is translucent glass over a moving
 * gradient and there is no reliable colour to knock out against.
 */
function SantaClaws() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      {/* Body. Open at the top: the hat is the head's crown, so drawing one
          under it would only show through the fur. */}
      <path
        d="M40 52C34 62 32 74 35 85c4 14 14 21 25 21s21-7 25-21c3-11 1-23-5-33"
        {...stroke}
      />
      <circle cx="51" cy="68" r="3.5" fill="currentColor" />
      <circle cx="69" cy="68" r="3.5" fill="currentColor" />
      {/* The two claws, each an arc left OPEN on its outward side. That gap is
          the entire reason this reads as a claw and not as a bead.
          LOW AND OUT, on a visible arm: level with the eyes and stubbed
          straight onto the head they read as ears, which is exactly what the
          first pass drew. A claw is a thing on the end of an arm. */}
      <path d="M9 85a10 10 0 1 1 0 14" {...stroke} />
      <path d="M26 90l11-5" {...stroke} />
      <path d="M111 85a10 10 0 1 0 0 14" {...stroke} />
      <path d="M94 90l-11-5" {...stroke} />
      <path d="M53 106v8M60 106v9M67 106v8" {...stroke} />
      {/* The cap leans right and its tip flops, which is the whole difference
          between a Santa hat and a beanie once the colour is gone. */}
      <path
        d="M32 44C31 26 42 14 58 13c14-1 28 2 36 5-4 6-8 16-10 26Z"
        fill="currentColor"
      />
      <circle cx="99" cy="18" r="7.5" {...stroke} />
      <rect x="30" y="42" width="58" height="12" rx="6" {...stroke} />
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
