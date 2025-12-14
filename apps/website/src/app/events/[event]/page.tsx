import { type EventViewModel } from "@ascnd-gg/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ascnd-gg/ui/components/ui/avatar";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function EventProfile(
  props: PageProps<"/events/[event]">,
) {
  const { event } = await props.params;

  const { data: eventData, error } = await fetchApi<EventViewModel>(
    `/events/slug/${event}`,
    await headers(),
  );

  if (error) {
    return <>Error</>;
  }

  if (!eventData) {
    notFound();
  }

  return (
    <>
      <div className="aspect-rectangle relative">
        <Image
          src={
            eventData.banner ??
            "https://placehold.co/1200x400/34a85a/white/png?text=Banner&font=montersatt"
          }
          alt={`${eventData.displayName}'s banner`}
          fill
          priority
        />
      </div>
      <Avatar className="size-24">
        <AvatarImage
          src={eventData.logo ?? ""}
          alt={`${eventData.displayName!}'s logo`}
          className="object-fill"
        />
        <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-semibold">
          {eventData.displayName!.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-semibold">{eventData.displayName}</h1>
      {eventData.description && (
        <p className="text-muted-foreground text-sm">{eventData.description}</p>
      )}
      {eventData.createdAt && (
        <p className="text-muted-foreground text-sm">
          Event created on{" "}
          {new Date(eventData.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
      <p>
        {eventData.isEventOwner ? "You are the owner" : "You are not the owner"}
      </p>
      <pre className="text-muted-foreground bg-muted rounded-md p-2 font-mono text-sm text-wrap">
        {JSON.stringify(eventData, null, 2)}
      </pre>
    </>
  );
}
