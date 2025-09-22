import { auth } from "@ascnd-gg/auth";
import UpdateNameForm from "@ascnd-gg/website/components/forms/update-name-form";
import UpdateUsernameForm from "@ascnd-gg/website/components/forms/update-username-form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AccountSettings() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in?unauthorized=true");
  }

  const user = session.user;

  return (
    <>
      <h1 className="text-2xl font-semibold">Account Settings</h1>
      <div className="flex w-full flex-col gap-3 rounded-md border p-4">
        <UpdateUsernameForm currentUsername={user.username ?? ""} />
      </div>
      <div className="flex w-full flex-col gap-3 rounded-md border p-4">
        <UpdateNameForm currentName={user.name ?? ""} />
      </div>
    </>
  );
}
