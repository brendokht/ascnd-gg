"use client";

import { Button } from "@ascnd-gg/ui/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <>
      <h1 className="text-2xl font-semibold">You have been logged out</h1>
      <div className="flex gap-4">
        <Button onClick={() => router.push("/")}>Go home</Button>
      </div>
    </>
  );
}
