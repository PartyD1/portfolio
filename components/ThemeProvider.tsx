"use client";

import { ThemeProvider as NextThemes } from "next-themes";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemes
      attribute="class"
      defaultTheme="system"
      enableSystem
      /* Without this, every transitioned property on the page animates at once
       * when the theme flips — the "everything animates" smear. */
      disableTransitionOnChange
    >
      {children}
    </NextThemes>
  );
}
