import { ImageResponse } from "next/og";
import { projects, bySlug } from "@/data/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
/* A static export, so it cannot name the project: the per-project title is
 * already carried by og:title beside it. */
export const alt = "A case study from Parth Doshi's portfolio";

/**
 * One social card per case study.
 *
 * It has to exist as its own file: a route that declares its own `openGraph`
 * in generateMetadata does not inherit the parent segment's file-based image,
 * so without this the seven case studies unfurled with a title and no picture
 * at all - the exact gap the site-level card was added to close.
 *
 * Same world as app/opengraph-image.tsx, one level quieter: the project's name
 * leads, its tagline follows, and the ribbon at the foot says whose work it
 * is. Nothing here is invented; both strings come from data/projects.ts.
 */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = bySlug(slug);
  const name = p?.name ?? "Parth Doshi";
  const tagline = p?.tagline ?? "";
  const label = p?.label ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#e9e6ee",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -260,
            left: -180,
            width: 780,
            height: 780,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, #b39ceb 0%, #6fc4ee 46%, rgba(178,149,234,0) 72%)",
            opacity: 0.82,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -300,
            right: -220,
            width: 800,
            height: 800,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, #f4a97e 0%, #eed878 46%, rgba(134,221,186,0) 73%)",
            opacity: 0.8,
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: 64,
            padding: "64px 72px",
            width: "100%",
            borderRadius: 40,
            border: "2px solid rgba(255,255,255,0.72)",
            background: "rgba(255,255,255,0.5)",
          }}
        >
          {label && (
            <div
              style={{
                display: "flex",
                fontSize: 26,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#4b4b73",
              }}
            >
              {label}
            </div>
          )}

          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: -1,
              textTransform: "uppercase",
              color: "#3f3f68",
            }}
          >
            {name}
          </div>

          {tagline && (
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 36,
                lineHeight: 1.3,
                color: "#4b4b73",
              }}
            >
              {tagline}
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginTop: 40,
            }}
          >
            <svg width="52" height="44" viewBox="0 0 48 40" fill="none">
              <path
                d="M10 33V8h8.5a6.5 6.5 0 0 1 0 13H10"
                stroke="#3f3f68"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25 33V15h6a9 9 0 0 1 0 18h-6"
                stroke="#3f3f68"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div style={{ display: "flex", fontSize: 30, color: "#3f3f68" }}>
              Parth Doshi
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
