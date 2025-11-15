import type {
  HubSummary,
  MatchFormatViewModel,
  StageTypeViewModel,
  TitleViewModel,
} from "@ascnd-gg/types";
import { Card, CardContent } from "@ascnd-gg/ui/components/ui/card";
import CreateEventForm from "@ascnd-gg/website/components/forms/create-event-form";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { validateSession } from "@ascnd-gg/website/lib/validate-session";
import { headers } from "next/headers";

export default async function CreateHub() {
  await validateSession();

  const userHubsPromise = fetchApi<Array<HubSummary>>(
    "/me/hubs",
    await headers(),
  );

  const titlesPromise = fetchApi<Array<TitleViewModel>>(
    "/titles",
    await headers(),
  );

  const stageTypesPromise = fetchApi<Array<StageTypeViewModel>>(
    "/stages/types",
    await headers(),
  );

  const matchFormatsPromise = fetchApi<Array<MatchFormatViewModel>>(
    "/matches/formats",
    await headers(),
  );

  const [userHubsResult, titlesResult, stageTypesResult, matchFormatsResult] =
    await Promise.allSettled([
      userHubsPromise,
      titlesPromise,
      stageTypesPromise,
      matchFormatsPromise,
    ]);

  let hubs: Array<HubSummary> | null = null;
  let titles: Array<TitleViewModel> | null = null;
  let stageTypes: Array<StageTypeViewModel> | null = null;
  let matchFormats: Array<MatchFormatViewModel> | null = null;

  if (userHubsResult?.status === "fulfilled") {
    const { data: userHubsData, error: userHubsError } = userHubsResult.value;

    if (userHubsError) hubs = null;
    else hubs = userHubsData ?? [];
  }

  if (titlesResult?.status === "fulfilled") {
    const { data: teamInvitesData, error: teamInvitesError } =
      titlesResult.value;

    if (teamInvitesError) titles = null;
    else titles = teamInvitesData ?? [];
  }

  if (stageTypesResult?.status === "fulfilled") {
    const { data: stageTypesData, error: stageTypesError } =
      stageTypesResult.value;

    if (stageTypesError) stageTypes = null;
    else stageTypes = stageTypesData ?? [];
  }

  if (matchFormatsResult?.status === "fulfilled") {
    const { data: matchFormatsData, error: matchFormatsError } =
      matchFormatsResult.value;

    if (matchFormatsError) matchFormats = null;
    else matchFormats = matchFormatsData ?? [];
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
          <CreateEventForm
            hubs={hubs}
            titles={titles}
            stageTypes={stageTypes}
            matchFormats={matchFormats}
          />
        </CardContent>
      </Card>
    </>
  );
}
