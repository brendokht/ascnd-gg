import { Button } from "@ascnd-gg/ui/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
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
          <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
            src/app/page.tsx
          </code>
          .
        </li>
        <li>Save and see your changes instantly.</li>
      </ol>
      <div className="flex gap-4">
        <Button>
          <Link href={"/protected/dashboard"}>Dashboard</Link>
        </Button>
      </div>
    </>
  );
}
