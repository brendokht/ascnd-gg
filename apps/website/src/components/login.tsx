"use client";

import { Button } from "@ascnd-gg/ui/components/ui/button";
import { useRouter } from "next/navigation";

export function Login() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("http://localhost:8080/auth/login")}>
      Login
    </Button>
  );
}
