import HomeButton from "./home-button";
import { validateSession } from "@ascnd-gg/website/lib/validate-session";
import FileUploadTest from "./test";

export default async function Dashboard() {
  const session = await validateSession();

  const user = session.user;

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
        <FileUploadTest />
      </main>
    </div>
  );
}
