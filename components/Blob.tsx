/**
 * The iridescent blobs the world is built on.
 *
 * Deterministic organic paths (generated once by a seeded Catmull-Rom through
 * jittered radial points, then frozen here — nothing is computed at runtime).
 * Each carries a three-stop gradient along its own axis plus a soft specular
 * highlight, so it reads as an inflated object rather than a flat shape. The
 * highlight is a radial gradient, not a blur filter: same look, no filter pass.
 */

export type BlobName = "a" | "b" | "c" | "d";

const PATHS: Record<BlobName, string> = {
  a: "M152.4,100.0C153.1,122.3 164.4,161.6 153.1,172.5C141.8,183.3 103.5,172.9 84.5,165.2C65.4,157.4 46.9,142.6 38.9,126.1C30.8,109.6 28.3,78.9 36.2,66.2C44.1,53.4 67.7,54.3 86.5,49.7C105.2,45.1 137.6,30.2 148.6,38.5C159.6,46.9 151.6,77.7 152.4,100.0Z",
  b: "M148.3,100.0C147.1,117.5 159.7,138.7 151.7,147.3C143.6,155.8 116.6,149.8 100.0,151.5C83.4,153.2 65.9,165.9 52.2,157.3C38.6,148.7 19.1,117.4 18.0,100.0C16.9,82.6 32.2,62.5 45.8,52.8C59.5,43.1 81.2,43.5 100.0,41.8C118.8,40.0 150.4,32.6 158.4,42.3C166.5,52.0 149.4,82.5 148.3,100.0Z",
  c: "M180.1,100.0C179.7,121.6 157.3,154.2 137.2,165.7C117.2,177.2 79.8,180.1 59.9,169.2C40.1,158.2 16.5,120.9 18.2,100.0C20.0,79.1 50.0,54.4 70.3,43.7C90.5,33.1 121.5,26.8 139.8,36.2C158.1,45.6 180.6,78.4 180.1,100.0Z",
  d: "M181.8,100.0C184.2,113.5 168.3,127.1 157.0,143.8C145.8,160.5 130.6,196.2 114.5,200.2C98.4,204.1 75.7,179.2 60.3,167.5C44.8,155.9 26.7,146.4 21.9,130.4C17.2,114.3 23.1,84.0 31.7,71.2C40.4,58.3 61.0,57.8 73.8,53.3C86.6,48.9 97.0,43.0 108.6,44.5C120.1,46.1 130.9,53.3 143.1,62.5C155.3,71.8 179.5,86.5 181.8,100.0Z",
};

/** Gradient direction per blob, so four blobs don't read as one repeated object. */
const AXES: Record<BlobName, [string, string, string, string]> = {
  a: ["8%", "0%", "92%", "100%"],
  b: ["100%", "10%", "0%", "90%"],
  c: ["0%", "20%", "100%", "80%"],
  d: ["20%", "100%", "80%", "0%"],
};

export default function Blob({
  name,
  className,
}: {
  name: BlobName;
  className?: string;
}) {
  const id = `blob-${name}`;
  const [x1, y1, x2, y2] = AXES[name];
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-fill`} x1={x1} y1={y1} x2={x2} y2={y2}>
          <stop offset="0%" stopColor={`var(--blob-${name}-1)`} />
          <stop offset="52%" stopColor={`var(--blob-${name}-2)`} />
          <stop offset="100%" stopColor={`var(--blob-${name}-3)`} />
        </linearGradient>
        <radialGradient id={`${id}-gloss`} cx="34%" cy="28%" r="46%">
          <stop offset="0%" stopColor="var(--blob-gloss)" />
          <stop offset="100%" stopColor="var(--blob-gloss-out)" />
        </radialGradient>
        <clipPath id={`${id}-clip`}>
          <path d={PATHS[name]} />
        </clipPath>
      </defs>
      <path d={PATHS[name]} fill={`url(#${id}-fill)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <rect width="200" height="200" fill={`url(#${id}-gloss)`} />
      </g>
    </svg>
  );
}
