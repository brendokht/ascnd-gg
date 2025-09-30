"use client";

import { type TeamInviteViewModel } from "@ascnd-gg/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ascnd-gg/ui/components/ui/avatar";
import { Button } from "@ascnd-gg/ui/components/ui/button";
import { Card, CardContent } from "@ascnd-gg/ui/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ascnd-gg/ui/components/ui/tabs";
import { Check, X } from "lucide-react";

export default function InvitesList({
  teamInvites,
}: {
  teamInvites: Array<TeamInviteViewModel>;
}) {
  return (
    <Tabs defaultValue="team">
      <TabsList>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="event">Events</TabsTrigger>
        <TabsTrigger value="hub">Hubs</TabsTrigger>
      </TabsList>
      <TabsContent value="team">
        {teamInvites.map((teamInvite) => {
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
                      onClick={() => console.log("accepted")}
                      className="gap-2"
                    >
                      <Check /> Accept
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => console.log("declined")}
                      className="gap-2"
                    >
                      <X /> Decline
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </TabsContent>
      <TabsContent value="event">
        <Card>
          <CardContent>Event Invites</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="hub">
        <Card>
          <CardContent>Hub Invites</CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
