import { UserTeamViewModel } from "@ascnd-gg/types";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { headers } from "next/headers";
import TeamsList from "./teams-list";

export default async function Teams() {
  const { data: teams, error } = await fetchApi<Array<UserTeamViewModel>>(
    "/me/teams",
    await headers(),
  );

  if (error) {
    return <>Something went wrong</>;
  }

  if (!teams) {
    return (
      <>
        <h1 className="text-center text-xl font-semibold">
          You are a member of no teams.
        </h1>
        <p className="text-muted-foreground text-center text-sm">
          Join or create a team to view the teams you&apos;re on
        </p>
      </>
    );
  }

  teams.push({
    isTeamOwner: false,
    name: "thisisaveryveryverylongteamname",
    displayName: "ThisIsAVeryVeryVeryLongTeamName",
    logo: null,
  });

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">Your Teams</h1>
        <p className="text-muted-foreground text-pretty">
          Manage and view all the teams you&apos;re part of. You can view team
          details or edit teams you own.
        </p>
      </div>
      <TeamsList teams={teams} />
    </>
  );
}
