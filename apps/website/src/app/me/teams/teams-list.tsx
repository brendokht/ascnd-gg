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
import { EditTeamDialog } from "@ascnd-gg/website/components/dialogs/edit-team-dialog";
import { LeaveTeamDialog } from "@ascnd-gg/website/components/dialogs/leave-team-dialog";
import { TeamInvitationDialog } from "@ascnd-gg/website/components/dialogs/team-invitation-dialog";
import { Crown, Edit, Eye, LogOut, MailPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TeamsList({
  teams,
  currentUser,
}: {
  teams: Array<UserTeamViewModel>;
  currentUser: string;
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
                  <AvatarImage
                    src={team.logo ?? undefined}
                    alt={`${team.displayName}'s logo`}
                    className="object-fill"
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {team.displayName.charAt(0).toUpperCase()}
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
                >
                  <Eye />
                </Button>
                {team.isTeamOwner ? (
                  <>
                    <TeamInvitationDialog teamName={team.displayName}>
                      <Button size={"icon"}>
                        <MailPlus />
                      </Button>
                    </TeamInvitationDialog>
                    <EditTeamDialog
                      defaultValues={{
                        name: team.name,
                        displayName: team.displayName,
                        logo: team.logo,
                        banner: team.banner,
                      }}
                    >
                      <Button size="icon">
                        <Edit />
                      </Button>
                    </EditTeamDialog>
                  </>
                ) : (
                  <LeaveTeamDialog
                    currentUser={currentUser}
                    teamName={team.displayName}
                  >
                    <Button variant={"destructive"} size={"icon"}>
                      <LogOut />
                    </Button>
                  </LeaveTeamDialog>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
