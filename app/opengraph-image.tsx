import { ImageResponse } from "next/og";
import { availability } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Parth Doshi — computer science student building autonomous AI agents";

/**
 * The card a link to this site unfurls into, drawn in the site's own world:
 * the light ground, three of the four blobs bled off the corners, and one
 * glass panel carrying the name.
 *
 * Set in the OG renderer's bundled face rather than Unbounded. next/font
 * resolves at build inside the app bundle and cannot be handed to satori
 * without shipping the font file separately, and a social card that fails to
 * render is worse than one set in a different face. The geometry and the
 * palette are what make it recognisable at thumbnail size anyway.
 *
 * Static: no dynamic segment, so it is generated once at build.
 */
export default function OpengraphImage() {
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
        {/* The wash. Same three blob axes as .wash__blob, bled off the edges
            so none of them reads as a shape in its own right. */}
        <div
          style={{
            position: "absolute",
            top: -240,
            left: -160,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, #7fe0b4 0%, #6fc4ee 45%, rgba(178,149,234,0) 72%)",
            opacity: 0.85,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -200,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, #f4a97e 0%, #eed878 46%, rgba(134,221,186,0) 73%)",
            opacity: 0.8,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -300,
            left: 300,
            width: 820,
            height: 820,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, #b39ceb 0%, #ee9dc0 45%, rgba(244,185,140,0) 72%)",
            opacity: 0.78,
          }}
        />

        {/* One glass panel: the same vocabulary as every card on the site,
            an edge and a fill, no shadow. */}
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
            background: "rgba(255,255,255,0.46)",
          }}
        >
          {/* The PD mark alone. A tracked-caps "PORTFOLIO" above the name was
              an eyebrow over a heading, which this system bans twice over (The
              No-Eyebrow Rule, The Tracked-Caps-In-The-Foot Rule), and the mark
              says the same thing without breaking its own rules. */}
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <svg width="84" height="70" viewBox="0 0 48 40" fill="none">
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
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 34,
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: -2,
              color: "#3f3f68",
            }}
          >
            Parth Doshi
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 40,
              lineHeight: 1.3,
              color: "#4b4b73",
            }}
          >
            Computer science at UC Santa Cruz, building autonomous AI agents
            that do real work.
          </div>

          {availability.gradTerm && (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                marginTop: 34,
                padding: "14px 26px",
                borderRadius: 999,
                border: "2px solid rgba(255,255,255,0.8)",
                background: "rgba(255,255,255,0.7)",
                fontSize: 26,
                color: "#3f3f68",
              }}
            >
              {availability.gradTerm}
            </div>
          )}
        </div>
      </div>
    ),
    size,
  );
}
