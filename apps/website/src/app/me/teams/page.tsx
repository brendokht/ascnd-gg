import { UserTeamViewModel } from "@ascnd-gg/types";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { Edit, Plus, View } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Teams() {
  const { data: teams, error } = await fetchApi<Array<UserTeamViewModel>>(
    "/me/teams",
    await headers(),
  );

  if (error) {
    return <>Something went wrong</>;
  }

  return (
    <>
      <h1 className="text-center text-4xl font-semibold">Your Teams</h1>
      <div className="grid gap-8 md:justify-center">
        {teams && teams.length > 0 ? (
          teams.map((team) => {
            return (
              <div
                key={team.name}
                className="flex max-w-lg items-center justify-between gap-16"
              >
                <div className="flex items-center gap-4">
                  {team.logo ? (
                    <Image
                      src={team.logo}
                      alt={`${team.displayName}'s photo`}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="bg-primary flex size-16 items-center justify-center rounded-full text-2xl font-semibold">
                      {team.displayName.charAt(0)}
                    </div>
                  )}
                  <p className="text-lg font-semibold">{team.displayName}</p>
                </div>
                <div className="flex gap-4">
                  {team.isTeamOwner && (
                    <Link
                      href="/"
                      className="bg-primary flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium hover:cursor-default"
                    >
                      Edit
                      <Edit size={16} />
                    </Link>
                  )}
                  <Link
                    href={`/team/${team.name}`}
                    className="bg-primary flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium hover:cursor-default"
                  >
                    View <View size={16} />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">You are a member of no teams</p>
        )}
      </div>
      <div className="flex justify-center">
        <Link
          href={"/create/team"}
          className="bg-primary flex w-full max-w-sm items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium hover:cursor-default"
        >
          Create a team <Plus size={16} />
        </Link>
      </div>
    </>
  );
}
