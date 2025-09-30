import { type TeamInviteViewModel } from "@ascnd-gg/types";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { headers } from "next/headers";
import InvitesList from "./invites-list";

export default async function Invites() {
  const { data: teamInvites, error } = await fetchApi<
    Array<TeamInviteViewModel>
  >("/me/team/invite", await headers());

  if (error) {
    return <>Something went wrong</>;
  }

  const today = new Date();

  // TODO: Remove after testing
  teamInvites?.push({
    team: {
      displayName: "Test",
      logo: null,
    },
    status: "Pending",
    createdAt: today.toISOString(),
  });

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
      <InvitesList teamInvites={teamInvites} />
    </>
  );
}
