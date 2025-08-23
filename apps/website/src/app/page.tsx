import Image from "next/image";

export default async function Home() {
  const allAlbumsRes = await fetch("http://localhost:8080/api/v1/albums");
  const allAlbumsJson = await allAlbumsRes.json();

  const albumRes = await fetch("http://localhost:8080/api/v1/albums/1");
  const albumJson = await albumRes.json();

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
        <pre className="border-2 p-4 max-w-full text-pretty text-xs sm:text-sm rounded-md bg-black/[.05] dark:bg-white/[.06] ">
          {"GET http://localhost:8080/api/v1/albums\n"}
          {JSON.stringify(allAlbumsJson, null, 2)}
          {"\n\n"}
          {"GET http://localhost:8080/api/v1/albums/1\n"}
          {JSON.stringify(albumJson, null, 2)}
        </pre>
      </main>
    </div>
  );
}
