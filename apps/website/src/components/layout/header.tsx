import UserMenu from "./user-menu";

export default function Header() {
  return (
    <header className="container flex items-center justify-between border border-red-500 *:flex *:items-center *:gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Asncd GG</h1>
      </div>
      <div>
        <UserMenu />
      </div>
    </header>
  );
}
