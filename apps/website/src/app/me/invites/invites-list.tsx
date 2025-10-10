"use client";

import {
  type UpdateTeamInvite,
  type TeamInviteForUserViewModel,
  HubInviteForUserViewModel,
  UpdateHubInvite,
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
  EmptyContent,
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
import { fetchApi, patchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { Check, Share2, ShieldHalf, Trophy, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { toast } from "sonner";

export default function InvitesList({
  currentUserId,
  teamInvitesData,
  hubInvitesData,
}: {
  currentUserId: string;
  teamInvitesData: Array<TeamInviteForUserViewModel> | null;
  hubInvitesData: Array<HubInviteForUserViewModel> | null;
}) {
  const isMobile = useIsMobile();
  const router = useRouter();

  const [teamInvites, setTeamInvites] =
    useState<Array<TeamInviteForUserViewModel> | null>(teamInvitesData);

  const [hubInvites, setHubInvites] =
    useState<Array<HubInviteForUserViewModel> | null>(hubInvitesData);

  const updateTeamInvite = async (
    invite: TeamInviteForUserViewModel,
    accepted: boolean,
  ) => {
    // Optimistically remove invite
    if (teamInvites === null) {
      toast.error("Error Updating Team Invite", {
        description:
          "Team invites failed to load. Please click refresh to try and load them.",
      });
      return;
    }
    const prevTeamInvites = teamInvites;
    const updatedTeamInvites = prevTeamInvites.filter((i) => i !== invite);
    setTeamInvites(updatedTeamInvites);

    const updatedTeamInviteBody: UpdateTeamInvite = {
      status: accepted ? "ACCEPTED" : "DECLINED",
      userId: currentUserId,
    };

    const { error } = await patchApi<void>(
      `/teams/${invite.team.id}/invites/${invite.id}`,
      JSON.stringify(updatedTeamInviteBody),
      "application/json",
    );

    if (error) {
      setTeamInvites(prevTeamInvites);
      toast.error("Error Updating Invite...", {
        description: error.message,
      });
      return;
    }

    toast.success("Success", {
      description: `You have successfully joined ${invite.team.displayName}`,
    });

    if (updatedTeamInvites.length === 0) router.refresh();
  };

  const updateHubInvite = async (
    invite: HubInviteForUserViewModel,
    accepted: boolean,
  ) => {
    // Optimistically remove invite
    if (hubInvites === null) {
      toast.error("Error Updating Hub Invite", {
        description:
          "Hub invites failed to load. Please click refresh to try and load them.",
      });
      return;
    }
    const prevHubInvites = hubInvites;
    const updatedHubInvites = prevHubInvites.filter((i) => i !== invite);
    setHubInvites(updatedHubInvites);

    const updatedHubInviteBody: UpdateHubInvite = {
      status: accepted ? "ACCEPTED" : "DECLINED",
      userId: currentUserId,
    };

    const { error } = await patchApi<void>(
      `/hubs/${invite.hub.id}/invites/${invite.id}`,
      JSON.stringify(updatedHubInviteBody),
      "application/json",
    );

    if (error) {
      setHubInvites(prevHubInvites);
      toast.error("Error Updating Invite...", {
        description: error.message,
      });
      return;
    }

    toast.success("Success", {
      description: `You have successfully joined ${invite.hub.displayName}`,
    });

    if (updatedHubInvites.length === 0) router.refresh();
  };

  const refetchTeamInvites = async () => {
    const { data: teamInvites, error } =
      await fetchApi<Array<TeamInviteForUserViewModel>>("/me/teams/invites");

    if (error) {
      toast.error("Error", {
        description:
          "Could not re-fetch your team invites. Please try again soon.",
      });
    }

    toast.success("Success", {
      description: "Team invites were succesfully fetched.",
    });

    setTeamInvites(teamInvites);
  };

  const refetchHubInvites = async () => {
    const { data: hubInvites, error } =
      await fetchApi<Array<HubInviteForUserViewModel>>("/me/hubs/invites");

    if (error) {
      toast.error("Error", {
        description:
          "Could not re-fetch your hub invites. Please try again soon.",
      });
    }

    toast.success("Success", {
      description: "Hub invites were succesfully fetched.",
    });

    setHubInvites(hubInvites);
  };

  return (
    <Tabs defaultValue="team">
      <TabsList>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="hub">Hubs</TabsTrigger>
        <TabsTrigger value="event">Events</TabsTrigger>
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
                            onClick={() => updateTeamInvite(teamInvite, true)}
                            className="gap-2"
                          >
                            <Check /> {isMobile ? null : "Accept"}
                          </Button>
                          <Button
                            variant="destructive"
                            size={isMobile ? "icon" : "sm"}
                            onClick={() => updateTeamInvite(teamInvite, false)}
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
        ) : teamInvites === null ? (
          <Item className="min-h-82" variant={"muted"}>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant={"icon"}>
                  <ShieldHalf />
                </EmptyMedia>
                <EmptyTitle>Could not load your team invites</EmptyTitle>
                <EmptyDescription>
                  Please try to re-fetch the invites.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button onClick={refetchTeamInvites}>Retry</Button>
              </EmptyContent>
            </Empty>
          </Item>
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
      <TabsContent value="hub">
        {hubInvites && hubInvites.length > 0 ? (
          <ScrollArea className="bg-muted/50 h-82 flex w-full flex-col gap-4 rounded-md px-4 py-2">
            <ItemGroup className="gap-4">
              {hubInvites.map((hubInvite) => {
                return (
                  <Fragment key={hubInvite.id}>
                    <Item variant="outline" role="listitem">
                      <ItemMedia>
                        <Avatar>
                          <AvatarImage
                            src={hubInvite.hub.logo ?? undefined}
                            alt={`${hubInvite.hub.displayName}'s logo`}
                            className="object-fill"
                          />
                          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                            {hubInvite.hub.displayName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle className="break-all">
                          {hubInvite.hub.displayName}
                        </ItemTitle>
                      </ItemContent>
                      <ItemActions>
                        <>
                          <Button
                            variant="outline"
                            size={isMobile ? "icon" : "sm"}
                            onClick={() => updateHubInvite(hubInvite, true)}
                            className="gap-2"
                          >
                            <Check /> {isMobile ? null : "Accept"}
                          </Button>
                          <Button
                            variant="destructive"
                            size={isMobile ? "icon" : "sm"}
                            onClick={() => updateHubInvite(hubInvite, false)}
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
        ) : hubInvites === null ? (
          <Item className="min-h-82" variant={"muted"}>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant={"icon"}>
                  <Share2 />
                </EmptyMedia>
                <EmptyTitle>Could not load your hub invites</EmptyTitle>
                <EmptyDescription>
                  Please try to re-fetch the invites.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button onClick={refetchHubInvites}>Retry</Button>
              </EmptyContent>
            </Empty>
          </Item>
        ) : (
          <Item className="min-h-82" variant={"muted"}>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant={"icon"}>
                  <Share2 />
                </EmptyMedia>
                <EmptyTitle>You have no hub invites</EmptyTitle>
                <EmptyDescription>
                  Ask the administrator(s) to invite you to their hubs(s).
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
    </Tabs>
  );
}
