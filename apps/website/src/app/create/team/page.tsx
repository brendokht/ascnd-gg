import CreateTeamForm from "@ascnd-gg/website/components/forms/create-team-form";

export default function CreateTeam() {
  return (
    <>
      <h1 className="text-center text-2xl font-semibold">Create a Team</h1>
      <div className="flex grow flex-col">
        <CreateTeamForm />
      </div>
    </>
  );
}
