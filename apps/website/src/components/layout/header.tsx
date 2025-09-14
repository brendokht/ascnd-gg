import Link from "next/link";
import UserMenu from "./user-menu";

export default function Header() {
  return (
    <header className="container flex items-center justify-between *:flex *:items-center *:gap-4">
      <Link href="/">
        <h1 className="text-2xl font-semibold">Asncd GG</h1>
      </Link>
      <div>
        <UserMenu />
      </div>
    </header>
  );
}
