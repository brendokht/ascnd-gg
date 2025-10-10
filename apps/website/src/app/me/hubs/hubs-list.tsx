/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { type HubSummary } from "@ascnd-gg/types";
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
// import { EditHubDialog } from "@ascnd-gg/website/components/dialogs/edit-hub-dialog";
// import { LeaveHubDialog } from "@ascnd-gg/website/components/dialogs/leave-hub-dialog";
// import { HubInvitationDialog } from "@ascnd-gg/website/components/dialogs/hub-invitation-dialog";
import { Crown, Edit, Eye, LogOut, MailPlus, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

export default function HubsList({
  hubs,
  userId,
}: {
  hubs: Array<HubSummary>;
  userId: string;
}) {
  const isMobile = useIsMobile();
  const router = useRouter();

  return (
    <div className="flex w-full flex-col gap-4">
      <ItemGroup className="gap-4">
        {hubs.map((hub) => (
          <Fragment key={hub.id}>
            <Item variant="muted" role="listitem">
              <ItemMedia>
                <Avatar>
                  <AvatarImage
                    src={hub.logo ?? undefined}
                    alt={`${hub.displayName}'s logo`}
                    className="object-fill"
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {hub.displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{hub.displayName}</ItemTitle>
                <ItemDescription>
                  <Badge>
                    {hub.isHubOwner ? (
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
                  onClick={() => router.push(`/hubs/${hub.name}`)}
                >
                  <Eye />
                  {isMobile ? null : "View"}
                </Button>
                {/* {hub.isHubOwner ? (
                  <>
                    <HubInvitationDialog hub={hub}>
                      <Button size={isMobile ? "icon" : "sm"}>
                        <MailPlus />
                        {isMobile ? null : "Invite"}
                      </Button>
                    </HubInvitationDialog>
                    <EditHubDialog defaultValues={hub}>
                      <Button size={isMobile ? "icon" : "sm"}>
                        <Edit />
                        {isMobile ? null : "Edit"}
                      </Button>
                    </EditHubDialog>
                  </>
                ) : (
                  <LeaveHubDialog userId={userId} hub={hub}>
                    <Button
                      variant={"destructive"}
                      size={isMobile ? "icon" : "sm"}
                    >
                      <LogOut />
                      {isMobile ? null : "Leave"}
                    </Button>
                  </LeaveHubDialog>
                )} */}
              </ItemActions>
            </Item>
          </Fragment>
        ))}
      </ItemGroup>
    </div>
  );
}
