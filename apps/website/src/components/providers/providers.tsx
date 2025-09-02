"use client";

import { AuthContextProvider } from "@ascnd-gg/website/context/auth-context";
import { ThemeProvider } from "../theme/theme-provider";
import { type ReactNode } from "react";

export default function Providers({ children }: { children?: ReactNode }) {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthContextProvider>{children}</AuthContextProvider>
    </ThemeProvider>
  );
}
