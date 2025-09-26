import { UserViewModel } from "@ascnd-gg/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ascnd-gg/ui/components/ui/avatar";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import Image from "next/image";

export default async function UserProfile(props: PageProps<"/user/[user]">) {
  const { user } = await props.params;

  const { data: userData, error } = await fetchApi<UserViewModel>(
    `/user/${user}`,
  );

  if (error) {
    return <>Error</>;
  }

  if (!userData) {
    return <>User &apos;{user}&apos; was not found</>;
  }

  return (
    <>
      <div className="aspect-rectangle relative">
        <Image
          src="https://placehold.co/600x200/red/white/png?text=Banner&font=montersatt"
          alt="placeholder"
          fill
          priority
        />
      </div>
      <Avatar className="size-24">
        <AvatarImage
          src={userData.profilePictureUrl}
          alt={`${userData.displayUsername!}'s logo`}
          className="object-fill"
        />
        <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-semibold">
          {userData.displayUsername!.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-semibold">{userData.displayUsername}</h1>
      <p className="text-muted-foreground text-sm">
        Member since{" "}
        {new Date(userData.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </>
  );
}
