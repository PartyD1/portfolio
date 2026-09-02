import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Wash from "@/components/Wash";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
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
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Wash />
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
