import { Card, CardContent } from "@ascnd-gg/ui/components/ui/card";
import UpdateNameForm from "@ascnd-gg/website/components/forms/update-name-form";
import UpdateUsernameForm from "@ascnd-gg/website/components/forms/update-username-form";
import { validateSession } from "@ascnd-gg/website/lib/validate-session";

export default async function AccountSettings() {
  const session = await validateSession();

  const user = session.user;

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">Account Settings</h1>
        <p className="text-muted-foreground text-pretty">
          Update your accounts settings like username, and full name
        </p>
      </div>
      <Card>
        <CardContent>
          <UpdateUsernameForm currentUsername={user.username ?? ""} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <UpdateNameForm currentName={user.name ?? ""} />
        </CardContent>
      </Card>
    </>
  );
}
