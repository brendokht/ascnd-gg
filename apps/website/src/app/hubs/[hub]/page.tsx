import { type HubViewModel } from "@ascnd-gg/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ascnd-gg/ui/components/ui/avatar";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function HubProfile(props: PageProps<"/hubs/[hub]">) {
  const { hub } = await props.params;

  const { data: hubData, error } = await fetchApi<HubViewModel>(
    `/hubs/slug/${hub}`,
    await headers(),
  );

  if (error) {
    return <>Error</>;
  }

  if (!hubData) {
    notFound();
  }

  return (
    <>
      <div className="aspect-rectangle relative">
        <Image
          src={
            hubData.banner ??
            "https://placehold.co/1200x400/34a85a/white/png?text=Banner&font=montersatt"
          }
          alt={`${hubData.displayName}'s banner`}
          fill
          priority
        />
      </div>
      <Avatar className="size-24">
        <AvatarImage
          src={hubData.logo ?? ""}
          alt={`${hubData.displayName!}'s logo`}
          className="object-fill"
        />
        <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-semibold">
          {hubData.displayName!.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-semibold">{hubData.displayName}</h1>
      {hubData.description && (
        <p className="text-muted-foreground text-sm">{hubData.description}</p>
      )}
      {hubData.createdAt && (
        <p className="text-muted-foreground text-sm">
          Hub active on Ascnd GG since{" "}
          {new Date(hubData.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
      <p>
        {hubData.isHubOwner ? "You are the owner" : "You are not the owner"}
      </p>
    </>
  );
}
