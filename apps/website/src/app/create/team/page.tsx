import { Card, CardContent } from "@ascnd-gg/ui/components/ui/card";
import CreateTeamForm from "@ascnd-gg/website/components/forms/create-team-form";
import { validateSession } from "@ascnd-gg/website/lib/validate-session";

export default async function CreateTeam() {
  await validateSession();

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">Create a Team</h1>
        <p className="text-muted-foreground text-pretty">
          Create a new team to compete with in events
        </p>
      </div>
      <Card>
        <CardContent>
          <CreateTeamForm />
        </CardContent>
      </Card>
    </>
  );
}
