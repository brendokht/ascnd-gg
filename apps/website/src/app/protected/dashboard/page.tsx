"use client";

import HomeButton from "./home-button";
import { useAuth } from "@ascnd-gg/website/context/auth-context";

export default function Page() {
  const { user } = useAuth();

  return (
    <div className="container flex flex-1 flex-col items-center justify-center">
      <main className="flex flex-col items-center gap-[32px]">
        <h1 className="text-2xl font-semibold">Welcome to the dashboard</h1>
        <pre className="w-[90vw] max-w-lg text-pretty break-words rounded-md bg-neutral-300 p-8 dark:bg-neutral-700">
          {JSON.stringify(user, null, 2)}
        </pre>
        <div className="flex gap-4">
          <HomeButton />
        </div>
      </main>
    </div>
  );
}
