import { UserTeamViewModel } from "@ascnd-gg/types";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { headers } from "next/headers";
import TeamsList from "./teams-list";
import Link from "next/link";
import { validateSession } from "@ascnd-gg/website/lib/validate-session";

export default async function Teams() {
  const session = await validateSession();

  const user = session.user;

  const { data: teams, error } = await fetchApi<Array<UserTeamViewModel>>(
    "/me/team",
    await headers(),
  );

  if (error) {
    return <>Something went wrong</>;
  }

  if (!teams || !teams.length) {
    return (
      <>
        <h1 className="text-center text-xl font-semibold">
          You are a member of no teams.
        </h1>
        <p className="text-muted-foreground text-center text-sm">
          Join or{" "}
          <Link className="text-primary underline" href={"/create/team"}>
            create a team
          </Link>{" "}
          to view the teams you&apos;re on
        </p>
      </>
    );
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
      <TeamsList currentUser={user.username!} teams={teams} />
    </>
  );
}
