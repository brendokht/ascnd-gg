import Link from "next/link";
import UserMenu from "./user-menu";
import { auth } from "@ascnd-gg/auth";
import { headers } from "next/headers";
import { type UserViewModel } from "@ascnd-gg/types";

export default async function Header() {
  const session = await auth.api.getSession({ headers: await headers() });

  let user: UserViewModel | null;

  if (!session) {
    user = null;
  } else {
    user = {
      id: session.user.id,
      username: session.user.username ?? undefined,
      displayUsername: session.user.displayUsername ?? undefined,
      profilePictureUrl: session.user.image ?? undefined,
      createdAt: session.user.createdAt.toISOString(),
    };
  }

  return (
    <header className="container flex items-center justify-between *:flex *:items-center *:gap-8">
      <Link href="/">
        <h1 className="text-2xl font-semibold">Asncd GG</h1>
      </Link>
      <div>
        <UserMenu user={user} />
      </div>
    </header>
  );
}
