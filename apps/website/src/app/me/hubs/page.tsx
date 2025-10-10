import { type HubSummary } from "@ascnd-gg/types";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { headers } from "next/headers";
import HubsList from "./hubs-list";
import { validateSession } from "@ascnd-gg/website/lib/validate-session";
import { notFound } from "next/navigation";

export default async function Hubs() {
  const session = await validateSession();

  const user = session.user;

  const { data: hubs, error } = await fetchApi<Array<HubSummary>>(
    "/me/hubs",
    await headers(),
  );

  if (error) {
    return <>Something went wrong</>;
  }

  if (!hubs || !hubs.length) {
    notFound();
  }

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">Your Hubs</h1>
        <p className="text-muted-foreground text-pretty">
          Manage and view all the hubs you&apos;re part of. You can view hub
          details or edit hubs you own.
        </p>
      </div>
      <HubsList userId={user.id} hubs={hubs} />
    </>
  );
}
