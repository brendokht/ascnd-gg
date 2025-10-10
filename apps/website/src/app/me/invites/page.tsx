import {
  HubInviteForUserViewModel,
  type TeamInviteForUserViewModel,
} from "@ascnd-gg/types";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { headers } from "next/headers";
import InvitesList from "./invites-list";
import { validateSession } from "@ascnd-gg/website/lib/validate-session";

export default async function Invites() {
  const session = await validateSession();

  const user = session.user;

  const teamInvitesPromise = fetchApi<Array<TeamInviteForUserViewModel>>(
    "/me/teams/invites",
    await headers(),
  );

  const hubInvitesPromise = fetchApi<Array<HubInviteForUserViewModel>>(
    "/me/hubs/invites",
    await headers(),
  );

  const [teamInvitesResult, hubInvitesResult] = await Promise.allSettled([
    teamInvitesPromise,
    hubInvitesPromise,
  ]);

  let teamInvites: Array<TeamInviteForUserViewModel> | null = null;
  let hubInvites: Array<HubInviteForUserViewModel> | null = null;

  if (teamInvitesResult?.status === "fulfilled") {
    const { data: teamInvitesData, error: teamInvitesError } =
      teamInvitesResult.value;

    if (teamInvitesError) teamInvites = null;
    else teamInvites = teamInvitesData ?? [];
  }

  if (hubInvitesResult?.status === "fulfilled") {
    const { data: hubInvitesData, error: hubInvitesError } =
      hubInvitesResult.value;

    if (hubInvitesError) hubInvites = null;
    else hubInvites = hubInvitesData ?? [];
  }

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">Your Invites</h1>
        <p className="text-muted-foreground text-pretty">
          Manage and view all the invites have received for teams, events, and
          hubs. You can accept or decline the invites you have received.
        </p>
      </div>
      <InvitesList
        currentUserId={user.id}
        teamInvitesData={teamInvites}
        hubInvitesData={hubInvites}
      />
    </>
  );
}
