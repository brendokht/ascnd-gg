"use client";

import { type TeamSummary } from "@ascnd-gg/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ascnd-gg/ui/components/ui/avatar";
import { Badge } from "@ascnd-gg/ui/components/ui/badge";
import { Button } from "@ascnd-gg/ui/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@ascnd-gg/ui/components/ui/item";
import { useIsMobile } from "@ascnd-gg/ui/hooks/use-mobile";
import { EditTeamDialog } from "@ascnd-gg/website/components/dialogs/edit-team-dialog";
import { LeaveTeamDialog } from "@ascnd-gg/website/components/dialogs/leave-team-dialog";
import { TeamInvitationDialog } from "@ascnd-gg/website/components/dialogs/team-invitation-dialog";
import { Crown, Edit, Eye, LogOut, MailPlus, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

export default function TeamsList({
  teams,
  userId,
}: {
  teams: Array<TeamSummary>;
  userId: string;
}) {
  const isMobile = useIsMobile();
  const router = useRouter();

  return (
    <div className="flex w-full flex-col gap-4">
      <ItemGroup className="gap-4">
        {teams.map((team) => (
          <Fragment key={team.id}>
            <Item variant="muted" role="listitem">
              <ItemMedia>
                <Avatar>
                  <AvatarImage
                    src={team.logo ?? undefined}
                    alt={`${team.displayName}'s logo`}
                    className="object-fill"
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {team.displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{team.displayName}</ItemTitle>
                <ItemDescription>
                  <Badge>
                    {team.isTeamOwner ? (
                      <>
                        <Crown />
                        Owner
                      </>
                    ) : (
                      <>
                        <User />
                        Member
                      </>
                    )}
                  </Badge>
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  variant="outline"
                  size={isMobile ? "icon" : "sm"}
                  onClick={() => router.push(`/teams/${team.name}`)}
                >
                  <Eye />
                  {isMobile ? null : "View"}
                </Button>
                {team.isTeamOwner ? (
                  <>
                    <TeamInvitationDialog team={team}>
                      <Button size={isMobile ? "icon" : "sm"}>
                        <MailPlus />
                        {isMobile ? null : "Invite"}
                      </Button>
                    </TeamInvitationDialog>
                    <EditTeamDialog defaultValues={team}>
                      <Button size={isMobile ? "icon" : "sm"}>
                        <Edit />
                        {isMobile ? null : "Edit"}
                      </Button>
                    </EditTeamDialog>
                  </>
                ) : (
                  <LeaveTeamDialog userId={userId} team={team}>
                    <Button
                      variant={"destructive"}
                      size={isMobile ? "icon" : "sm"}
                    >
                      <LogOut />
                      {isMobile ? null : "Leave"}
                    </Button>
                  </LeaveTeamDialog>
                )}
              </ItemActions>
            </Item>
          </Fragment>
        ))}
      </ItemGroup>
    </div>
  );
}
