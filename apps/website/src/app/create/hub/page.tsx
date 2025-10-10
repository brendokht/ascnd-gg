import { Card, CardContent } from "@ascnd-gg/ui/components/ui/card";
import CreateHubForm from "@ascnd-gg/website/components/forms/create-hub-form";
import { validateSession } from "@ascnd-gg/website/lib/validate-session";

export default async function CreateHub() {
  await validateSession();

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">Create a Hub</h1>
        <p className="text-muted-foreground text-pretty">
          Create a new hub to compete with in events
        </p>
      </div>
      <Card>
        <CardContent>
          <CreateHubForm />
        </CardContent>
      </Card>
    </>
  );
}
