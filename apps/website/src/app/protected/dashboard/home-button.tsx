"use client";

import { Button } from "@ascnd-gg/ui/components/ui/button";
import { useRouter } from "next/navigation";

export default function HomeButton() {
  const router = useRouter();
  return <Button onClick={() => router.push("/")}>Go home</Button>;
}
