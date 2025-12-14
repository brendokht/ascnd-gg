import HomeButton from "./home-button";
import { validateSession } from "@ascnd-gg/website/lib/validate-session";
import FileUploadTest from "./test";

export default async function Dashboard() {
  const session = await validateSession();

  const user = session.user;

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">Welcome to the dashboard</h1>
        <p className="text-muted-foreground text-pretty">
          This is a dashboard!
        </p>
      </div>
      <pre className="rounded-md bg-neutral-300 p-8 text-pretty break-words dark:bg-neutral-700">
        {JSON.stringify(user, null, 2)}
      </pre>
      <div className="flex items-center justify-center gap-4">
        <HomeButton />
        <FileUploadTest />
      </div>
    </>
  );
}
