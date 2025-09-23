import CreateTeamForm from "@ascnd-gg/website/components/forms/create-team-form";
import { validateSession } from "@ascnd-gg/website/lib/validate-session";

export default async function CreateTeam() {
  await validateSession();

  return (
    <>
      <h1 className="text-center text-2xl font-semibold">Create a Team</h1>
      <div className="flex grow flex-col">
        <CreateTeamForm />
      </div>
    </>
  );
}
