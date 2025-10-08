import { type TeamInviteForUserViewModel } from "@ascnd-gg/types";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { headers } from "next/headers";
import InvitesList from "./invites-list";
import { validateSession } from "@ascnd-gg/website/lib/validate-session";

export default async function Invites() {
  const session = await validateSession();

  const user = session.user;

  // TODO: Fetch event and hub invites using Promise.allSettled
  const { data: teamInvites, error } = await fetchApi<
    Array<TeamInviteForUserViewModel>
  >("/me/teams/invites", await headers());

  if (error) {
    return <>Something went wrong</>;
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
      <InvitesList currentUserId={user.id} teamInvites={teamInvites ?? []} />
    </>
  );
}
