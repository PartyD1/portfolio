import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "./globals.css";
import Wash from "@/components/Wash";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const gabarito = Gabarito({
  subsets: ["latin"],
  variable: "--font-gabarito",
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
    <html lang="en" className={gabarito.variable}>
      <body>
        <Wash />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
