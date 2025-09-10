"use client";

import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast, Toaster, ToasterProps } from "sonner";

export default function CustomToaster() {
  const searchParams = useSearchParams();
  const { theme } = useTheme();

  useEffect(() => {
    if (searchParams.has("unauthorized")) {
      toast.error("Unauthorized", {
        description: "You must sign in to access this page",
      });
    }
  }, [searchParams]);

  return (
    <Toaster richColors closeButton theme={theme as ToasterProps["theme"]} />
  );
}
