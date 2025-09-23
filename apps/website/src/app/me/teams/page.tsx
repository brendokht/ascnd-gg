import { UserTeamViewModel } from "@ascnd-gg/types";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { Edit, View } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Teams() {
  const teams: Array<UserTeamViewModel> = await fetchApi(
    "/me/teams",
    await headers(),
  );

  return (
    <>
      <h1 className="text-center text-4xl font-semibold">Your Teams</h1>
      <div className="grid gap-8">
        {teams.map((team) => {
          return (
            <div
              key={team.name}
              className="flex items-center justify-between gap-4"
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
                <Link
                  href="/"
                  className="bg-primary flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium hover:cursor-default"
                >
                  Edit
                  <Edit size={16} />
                </Link>
                <Link
                  href={`/team/${team.name}`}
                  className="bg-primary flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium hover:cursor-default"
                >
                  View <View size={16} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
