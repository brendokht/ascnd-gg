import UpdateNameForm from "@ascnd-gg/website/components/forms/update-name-form";
import UpdateUsernameForm from "@ascnd-gg/website/components/forms/update-username-form";
import { validateSession } from "@ascnd-gg/website/lib/validate-session";

export default async function AccountSettings() {
  const session = await validateSession();

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
