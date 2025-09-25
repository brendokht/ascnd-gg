import CreateTeamForm from "@ascnd-gg/website/components/forms/create-team-form";
import { validateSession } from "@ascnd-gg/website/lib/validate-session";

export default async function CreateTeam() {
  await validateSession();

  return (
    <>
      <h1 className="text-center text-2xl font-semibold">Create a Team</h1>
      <div className="flex justify-center *:h-full *:w-full *:gap-8 *:rounded-md *:border *:p-4 *:md:gap-16">
        <CreateTeamForm />
      </div>
    </>
  );
}
