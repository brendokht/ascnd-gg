"use client";

import { Button } from "@ascnd-gg/ui/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="container flex-1 flex flex-col justify-center items-center">
      <main className="flex flex-col gap-[32px] items-center">
        <h1 className="text-2xl font-semibold">You have been logged out</h1>
        <div className="flex gap-4">
          <Button onClick={() => router.push("/")}>Go home</Button>
        </div>
      </main>
    </div>
  );
}
