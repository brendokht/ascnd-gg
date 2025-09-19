import Link from "next/link";
import UserMenu from "./user-menu";
import { auth } from "@ascnd-gg/auth";
import { headers } from "next/headers";
import { UserType } from "@ascnd-gg/types";

export default async function Header() {
  const session = await auth.api.getSession({ headers: await headers() });

  let user: UserType | undefined | null = undefined;

  if (!session) {
    user = null;
  } else {
    user = {
      email: session.user.email,
      createdAt: session.user.createdAt.toISOString(),
      name: session.user.name,
      username: session.user.username,
      displayUsername: session.user.displayUsername,
      profilePictureUrl: session.user.image ?? "",
      metadata: null,
    };
  }

  return (
    <header className="container flex items-center justify-between *:flex *:items-center *:gap-4">
      <Link href="/">
        <h1 className="text-2xl font-semibold">Asncd GG</h1>
      </Link>
      <div>
        <UserMenu user={user} />
      </div>
    </header>
  );
}
