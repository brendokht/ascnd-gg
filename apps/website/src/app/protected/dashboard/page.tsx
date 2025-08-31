import { cookies } from "next/headers";
import HomeButton from "./home-button";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();

  if (!cookieStore.has("wos-session")) redirect("/?unauthorized=true");

  const session = cookieStore.get("wos-session")!.value;

  const res = await fetch("http://localhost:8080/v1/auth/me", {
    method: "GET",
    credentials: "include",
    headers: {
      "wos-session": session,
    },
  });

  const user = await res.json();

  return (
    <div className="container flex-1 flex flex-col justify-center items-center">
      <main className="flex flex-col gap-[32px] items-center">
        <h1 className="text-2xl font-semibold">Welcome to the dashboard</h1>
        <pre className="dark:bg-neutral-700 bg-neutral-300 p-8 rounded-md w-full max-w-lg text-pretty break-words">
          {JSON.stringify(user, null, 2)}
        </pre>
        <div className="flex gap-4">
          <HomeButton />
        </div>
      </main>
    </div>
  );
}
