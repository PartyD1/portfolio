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
      /* Every visit opens in light, whatever the OS prefers; dark is one
       * click away, and a choice made with the toggle is remembered. */
      defaultTheme="light"
      enableSystem={false}
      /* Without this, every transitioned property on the page animates at once
       * when the theme flips — the "everything animates" smear. */
      disableTransitionOnChange
    >
      {children}
    </NextThemes>
  );
}
