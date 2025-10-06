import { TeamViewModel } from "@ascnd-gg/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ascnd-gg/ui/components/ui/avatar";
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
      <div className="aspect-rectangle relative">
        <Image
          src={
            teamData.banner ??
            "https://placehold.co/600x200/red/white/png?text=Banner&font=montersatt"
          }
          alt={`${teamData.displayName}'s banner`}
          fill
          priority
        />
      </div>
      <Avatar className="size-24">
        <AvatarImage
          src={teamData.logo ?? ""}
          alt={`${teamData.displayName!}'s logo`}
          className="object-fill"
        />
        <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-semibold">
          {teamData.displayName!.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-semibold">{teamData.displayName}</h1>
      {teamData.createdAt && (
        <p className="text-muted-foreground text-sm">
          Team active on Ascnd GG since{" "}
          {new Date(teamData.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
      <p>
        {teamData.isTeamOwner ? "You are the owner" : "You are not the owner"}
      </p>
    </>
  );
}
