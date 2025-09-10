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
        <Link
          className="bg-primary rounded-md px-4 py-2 text-sm font-medium hover:cursor-default"
          href={"/protected/dashboard"}
        >
          To Dashboard
        </Link>
      </div>
    </>
  );
}
