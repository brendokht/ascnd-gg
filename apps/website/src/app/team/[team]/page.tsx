import { TeamViewModel } from "@ascnd-gg/types";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { headers } from "next/headers";
import Image from "next/image";

export default async function TeamProfile(props: PageProps<"/team/[team]">) {
  const { team } = await props.params;

  const { data: teamData, error } = await fetchApi<TeamViewModel>(
    `/team/${team}`,
    await headers(),
  );

  if (error) {
    return <>Error</>;
  }

  if (!teamData) {
    return <>Team, &apos;{team}&apos; was not found</>;
  }

  return (
    <>
      {teamData.logo ? (
        <Image
          src={teamData.logo}
          alt={`${teamData.displayName}'s photo`}
          width={96}
          height={96}
          className="rounded-full"
        />
      ) : (
        <div className="bg-primary flex size-24 items-center justify-center rounded-full text-4xl font-semibold">
          {teamData.displayName.charAt(0)}
        </div>
      )}
      <h1 className="text-2xl font-semibold">{teamData.displayName}</h1>
      <p className="text-muted-foreground text-sm">
        Team active on Ascnd GG since{" "}
        {new Date(teamData.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p>
        {teamData.isTeamOwner ? "You are the owner" : "You are not the owner"}
      </p>
    </>
  );
}
