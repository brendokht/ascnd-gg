"use client";

import { ThemeProvider } from "./theme-provider";
import { type ReactNode } from "react";

export default function Providers({ children }: { children?: ReactNode }) {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
