import { type UserViewModel } from "@ascnd-gg/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ascnd-gg/ui/components/ui/avatar";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function UserProfile(props: PageProps<"/users/[user]">) {
  const { user } = await props.params;

  const { data: userData, error } = await fetchApi<UserViewModel>(
    `/users/slug/${user}`,
  );

  if (error) {
    return <>Error</>;
  }

  if (!userData) {
    notFound();
  }

  return (
    <>
      <div className="aspect-rectangle relative">
        <Image
          src={
            userData.banner ??
            "https://placehold.co/1200x400/34a85a/white/png?text=Banner&font=montersatt"
          }
          alt={`${userData.displayUsername}'s banner`}
          fill
          priority
        />
      </div>
      <Avatar className="size-24">
        <AvatarImage
          src={userData.avatar}
          alt={`${userData.displayUsername!}'s logo`}
          className="object-fill"
        />
        <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-semibold">
          {userData.displayUsername!.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-semibold">{userData.displayUsername}</h1>
      {userData.description && (
        <p className="text-sm">{userData.description}</p>
      )}
      {userData.createdAt && (
        <p className="text-muted-foreground text-sm">
          Member since{" "}
          {new Date(userData.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
    </>
  );
}
