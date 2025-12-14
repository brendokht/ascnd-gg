import { type TeamViewModel } from "@ascnd-gg/types";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { headers } from "next/headers";
import TeamsList from "./teams-list";
import { validateSession } from "@ascnd-gg/website/lib/validate-session";
import { notFound } from "next/navigation";

export default async function Teams() {
  const session = await validateSession();

  const user = session.user;

  const { data: teams, error } = await fetchApi<Array<TeamViewModel>>(
    "/me/teams",
    await headers(),
  );

  if (error) {
    return <>Something went wrong</>;
  }

  if (!teams || !teams.length) {
    notFound();
  }

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">Your Teams</h1>
        <p className="text-muted-foreground text-pretty">
          Manage and view all the teams you&apos;re part of. You can view team
          details or edit teams you own.
        </p>
      </div>
      <TeamsList userId={user.id} teams={teams} />
    </>
  );
}
