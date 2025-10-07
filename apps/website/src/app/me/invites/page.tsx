import { type TeamInviteForUserViewModel } from "@ascnd-gg/types";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { headers } from "next/headers";
import InvitesList from "./invites-list";
import { validateSession } from "@ascnd-gg/website/lib/validate-session";

export default async function Invites() {
  const session = await validateSession();

  const user = session.user;

  const { data: teamInvites, error } = await fetchApi<
    Array<TeamInviteForUserViewModel>
  >("/me/teams/invites", await headers());

  if (error) {
    return <>Something went wrong</>;
  }

  // TODO: Add event and hub invites to this if statement
  if (!teamInvites || teamInvites.length <= 0) {
    return (
      <>
        <h1 className="text-center text-xl font-semibold">
          You currently have no invites.
        </h1>
        <p className="text-muted-foreground text-center text-sm">
          Ask your friends to invite you or create your own team.
        </p>
      </>
    );
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
      <InvitesList currentUser={user.username!} teamInvites={teamInvites} />
    </>
  );
}
