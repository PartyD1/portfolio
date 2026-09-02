import type { Metadata } from "next";
import { Unbounded, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Wash from "@/components/Wash";
import Shell from "@/components/Shell";
import ScrollRing from "@/components/ScrollRing";
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

export const metadata: Metadata = {
  title: "Parth Doshi",
  description:
    "Computer science student at UC Santa Cruz building autonomous AI agents that do real work.",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
