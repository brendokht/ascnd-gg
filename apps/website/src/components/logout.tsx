"use client";

import { Button } from "@ascnd-gg/ui/components/ui/button";
import { useRouter } from "next/navigation";

export function Logout() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("http://localhost:8080/auth/logout")}>
      Logout
    </Button>
  );
}
