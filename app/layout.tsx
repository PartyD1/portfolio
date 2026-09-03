import type { Metadata, Viewport } from "next";
import { Unbounded, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Wash from "@/components/Wash";
import Shell from "@/components/Shell";
import ScrollRing from "@/components/ScrollRing";
import ScrollScrub from "@/components/ScrollScrub";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const display = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const description =
  "Computer science student at UC Santa Cruz building autonomous AI agents that do real work.";

/**
 * A portfolio's whole job is to be pasted into a message, so the unfurl is not
 * decoration: without this block a link to the site rendered a bare title and
 * no image in LinkedIn, iMessage and Slack alike.
 *
 * metadataBase is what makes the relative OG paths absolute. Every value comes
 * from Vercel rather than being typed here, because a hard-coded domain is a
 * claim about where this is served that only the deployment knows: production
 * unfurls against its own production URL, a preview against itself.
 */
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Parth Doshi",
    template: "%s · Parth Doshi",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "Parth Doshi",
    title: "Parth Doshi",
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parth Doshi",
    description,
  },
};

/* One per scheme, so the phone browser's chrome joins the page's ground
 * instead of sitting on the other side of a seam from it. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9e6ee" },
    { media: "(prefers-color-scheme: dark)", color: "#191a2e" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <Wash />
          <Shell />
          <main>{children}</main>
          <Footer />
          <ScrollRing />
          <ScrollScrub />
        </ThemeProvider>
      </body>
    </html>
  );
}
