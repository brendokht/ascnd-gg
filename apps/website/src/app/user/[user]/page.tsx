import { UserViewModel } from "@ascnd-gg/types";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";
import Image from "next/image";

export default async function UserProfile(props: PageProps<"/user/[user]">) {
  const { user } = await props.params;

  const userData: UserViewModel = await fetchApi(`/user/${user}`);

  if (!userData) {
    return <>User &apos;{user}&apos; was not found</>;
  }

  return (
    <>
      {userData.profilePictureUrl ? (
        <Image
          src={userData.profilePictureUrl}
          alt={`${userData.displayUsername}'s photo`}
          width={96}
          height={96}
          className="rounded-full"
        />
      ) : null}
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
