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
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@ascnd-gg/ui/components/ui/item";
import { ScrollArea } from "@ascnd-gg/ui/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ascnd-gg/ui/components/ui/tabs";
import { useIsMobile } from "@ascnd-gg/ui/hooks/use-mobile";
import { patchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { Check, Share2, ShieldHalf, Trophy, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { toast } from "sonner";

export default function InvitesList({
  currentUserId,
  teamInvites,
}: {
  currentUserId: string;
  teamInvites: Array<TeamInviteForUserViewModel>;
}) {
  const isMobile = useIsMobile();
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
      toast.error("Error Updating Invite...", {
        description: error.message,
      });
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
          <ScrollArea className="bg-muted/50 h-82 flex w-full flex-col gap-4 rounded-md px-4 py-2">
            <ItemGroup className="gap-4">
              {teamInvites.map((teamInvite) => {
                return (
                  <Fragment key={teamInvite.id}>
                    <Item variant="outline" role="listitem">
                      <ItemMedia>
                        <Avatar>
                          <AvatarImage
                            src={teamInvite.team.logo ?? undefined}
                            alt={`${teamInvite.team.displayName}'s logo`}
                            className="object-fill"
                          />
                          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                            {teamInvite.team.displayName
                              .charAt(0)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle className="break-all">
                          {teamInvite.team.displayName}
                        </ItemTitle>
                      </ItemContent>
                      <ItemActions>
                        <>
                          <Button
                            variant="outline"
                            size={isMobile ? "icon" : "sm"}
                            onClick={() => updateInvite(teamInvite, true)}
                            className="gap-2"
                          >
                            <Check /> {isMobile ? null : "Accept"}
                          </Button>
                          <Button
                            variant="destructive"
                            size={isMobile ? "icon" : "sm"}
                            onClick={() => updateInvite(teamInvite, false)}
                            className="gap-2"
                          >
                            <X /> {isMobile ? null : "Decline"}
                          </Button>
                        </>
                      </ItemActions>
                    </Item>
                  </Fragment>
                );
              })}
            </ItemGroup>
          </ScrollArea>
        ) : (
          <Item className="min-h-82" variant={"muted"}>
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
          </Item>
        )}
      </TabsContent>
      <TabsContent value="event">
        {false! ? (
          <Card>
            <CardContent>Event Invites</CardContent>
          </Card>
        ) : (
          <Item className="min-h-82" variant={"muted"}>
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
          </Item>
        )}
      </TabsContent>
      <TabsContent value="hub">
        {false! ? (
          <Card>
            <CardContent>Hub Invites</CardContent>
          </Card>
        ) : (
          <Item className="min-h-82" variant={"muted"}>
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
          </Item>
        )}
      </TabsContent>
    </Tabs>
  );
}
