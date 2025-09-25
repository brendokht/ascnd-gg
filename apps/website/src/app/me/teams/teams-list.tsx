"use client";

import { type UserTeamViewModel } from "@ascnd-gg/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ascnd-gg/ui/components/ui/avatar";
import { Badge } from "@ascnd-gg/ui/components/ui/badge";
import { Button } from "@ascnd-gg/ui/components/ui/button";
import { Card, CardContent } from "@ascnd-gg/ui/components/ui/card";
import { Crown, Edit, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TeamsList({
  teams,
}: {
  teams: Array<UserTeamViewModel>;
}) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      {teams.map((team) => (
        <Card key={team.name}>
          <CardContent>
            <h3 className="text-foreground text-balance font-semibold">
              {team.displayName}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="size-9">
                  {team.logo && (
                    <AvatarImage
                      src={team.logo}
                      alt={`${team.displayName}'s logo`}
                      className="object-fill"
                    />
                  )}
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {team.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="mt-1 flex items-center gap-4">
                    {team.isTeamOwner && (
                      <Badge>
                        <Crown />
                        Owner
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => router.push(`/team/${team.name}`)}
                  className="gap-2"
                >
                  <Eye />
                </Button>
                {team.isTeamOwner && (
                  <Button
                    size="icon"
                    onClick={() => console.log(`Editing team ${team.name}`)}
                    className="gap-2"
                  >
                    <Edit />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
