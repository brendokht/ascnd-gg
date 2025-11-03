import type { StageTypeViewModel, TitleViewModel } from "@ascnd-gg/types";
import { Card, CardContent } from "@ascnd-gg/ui/components/ui/card";
import CreateEventForm from "@ascnd-gg/website/components/forms/create-event-form";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { validateSession } from "@ascnd-gg/website/lib/validate-session";
import { headers } from "next/headers";

export default async function CreateHub() {
  await validateSession();

  const titlesPromise = fetchApi<Array<TitleViewModel>>(
    "/titles",
    await headers(),
  );

  const stageTypesPromise = fetchApi<Array<StageTypeViewModel>>(
    "/stages/types",
    await headers(),
  );

  const [titlesResult, stageTypesResult] = await Promise.allSettled([
    titlesPromise,
    stageTypesPromise,
  ]);

  let titles: Array<TitleViewModel> | null = null;
  let stageTypes: Array<StageTypeViewModel> | null = null;

  if (titlesResult?.status === "fulfilled") {
    const { data: teamInvitesData, error: teamInvitesError } =
      titlesResult.value;

    if (teamInvitesError) titles = null;
    else titles = teamInvitesData ?? [];
  }

  if (stageTypesResult?.status === "fulfilled") {
    const { data: hubInvitesData, error: hubInvitesError } =
      stageTypesResult.value;

    if (hubInvitesError) stageTypes = null;
    else stageTypes = hubInvitesData ?? [];
  }

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">Create an Event</h1>
        <p className="text-muted-foreground text-pretty">
          Create a new event to host for other teams.
        </p>
      </div>
      <Card>
        <CardContent>
          <CreateEventForm titles={titles} stageTypes={stageTypes} />
        </CardContent>
      </Card>
    </>
  );
}
