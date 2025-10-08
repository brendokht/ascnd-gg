"use client";

import {
  type UpdateTeamInvite,
  type TeamInviteForUserViewModel,
} from "@ascnd-gg/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ascnd-gg/ui/components/ui/avatar";
import { Button } from "@ascnd-gg/ui/components/ui/button";
import { Card, CardContent } from "@ascnd-gg/ui/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@ascnd-gg/ui/components/ui/empty";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ascnd-gg/ui/components/ui/tabs";
import { patchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { Check, Share2, ShieldHalf, Trophy, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InvitesList({
  currentUserId,
  teamInvites,
}: {
  currentUserId: string;
  teamInvites: Array<TeamInviteForUserViewModel>;
}) {
  const router = useRouter();

  const [invites, setInvites] =
    useState<Array<TeamInviteForUserViewModel>>(teamInvites);

  const updateInvite = async (
    invite: TeamInviteForUserViewModel,
    accepted: boolean,
  ) => {
    // Optimistically remove invite
    const prevInvites = invites;
    const updatedInvites = prevInvites.filter((i) => i !== invite);
    setInvites(updatedInvites);

    const updatedInviteBody: UpdateTeamInvite = {
      status: accepted ? "ACCEPTED" : "DECLINED",
      userId: currentUserId,
    };

    const { error } = await patchApi<void>(
      `/teams/${invite.team.id}/invites/${invite.id}`,
      JSON.stringify(updatedInviteBody),
      "application/json",
    );

    if (error) {
      setInvites(prevInvites);
      console.error(error);
      return;
    }

    if (updatedInvites.length === 0) router.refresh();
  };

  return (
    <Tabs defaultValue="team">
      <TabsList>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="event">Events</TabsTrigger>
        <TabsTrigger value="hub">Hubs</TabsTrigger>
      </TabsList>
      <TabsContent value="team">
        {teamInvites && teamInvites.length > 0 ? (
          teamInvites.map((teamInvite) => {
            return (
              <Card key={teamInvite.team?.displayName}>
                <CardContent className="space-y-2">
                  <h3 className="text-foreground text-balance font-semibold">
                    {teamInvite.team?.displayName}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="size-9">
                        <AvatarImage
                          src={teamInvite.team?.logo ?? undefined}
                          alt={`${teamInvite.team?.displayName}'s logo`}
                          className="object-fill"
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                          {teamInvite.team?.displayName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateInvite(teamInvite, true)}
                        className="gap-2"
                      >
                        <Check /> Accept
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => updateInvite(teamInvite, false)}
                        className="gap-2"
                      >
                        <X /> Decline
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant={"icon"}>
                  <ShieldHalf />
                </EmptyMedia>
                <EmptyTitle>You have no team invites</EmptyTitle>
                <EmptyDescription>
                  Ask your friend(s) to invite you to their teams(s).
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </Card>
        )}
      </TabsContent>
      <TabsContent value="event">
        {false! ? (
          <Card>
            <CardContent>Event Invites</CardContent>
          </Card>
        ) : (
          <Card>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant={"icon"}>
                  <Trophy />
                </EmptyMedia>
                <EmptyTitle>You have no event invites</EmptyTitle>
                <EmptyDescription>
                  Ask the organizer(s) to invite you to their event(s).
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </Card>
        )}
      </TabsContent>
      <TabsContent value="hub">
        {false! ? (
          <Card>
            <CardContent>Hub Invites</CardContent>
          </Card>
        ) : (
          <Card>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant={"icon"}>
                  <Share2 />
                </EmptyMedia>
                <EmptyTitle>You have no hub invites</EmptyTitle>
                <EmptyDescription>
                  Ask the administrator(s) to invite you to their hub(s).
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
}
