"use client";

import { Button } from "@ascnd-gg/ui/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@ascnd-gg/types";
import z from "zod";

export default function Home() {
  const router = useRouter();

  return (
    <div className="container flex-1 flex flex-col justify-center items-center">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-center sm:text-left">
          <li>
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        <div className="flex gap-4">
          <Button
            onClick={async () => {
              const res = await fetch("http://localhost:8080/v1/auth/login", {
                method: "GET",
                credentials: "include",
              });

              if (!res.ok) {
                console.error(`Error ${res.status} : ${res.statusText}`);
              }

              const json: z.infer<typeof ApiResponse> = await res.json();

              const result = ApiResponse.safeParse(json);

              if (result.error?.issues) {
                console.error(result.error.message);
                return;
              }

              if (json.redirected) {
                router.push(json.redirect!);
              }
            }}
          >
            Login
          </Button>
          <Button
            onClick={async () => {
              const res = await fetch("http://localhost:8080/v1/auth/logout", {
                method: "GET",
                credentials: "include",
              });

              if (!res.ok) {
                console.error(`Error ${res.status} : ${res.statusText}`);
                return;
              }

              const json: z.infer<typeof ApiResponse> = await res.json();

              const result = ApiResponse.safeParse(json);

              if (result.error?.issues) {
                console.error(result.error.message);
                return;
              }

              if (json.redirected) {
                router.push(json.redirect!);
              }
            }}
          >
            Logout
          </Button>
          <Button onClick={() => router.push("/protected/dashboard")}>
            Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}
