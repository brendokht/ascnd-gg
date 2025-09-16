import { Bell, CreditCard, Eye, User } from "lucide-react";
import Link from "next/link";

export default function Settings() {
  return (
    <>
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="*:bg-primary *:hover:scale-98 grid grid-cols-2 gap-4 *:flex *:aspect-square *:min-w-36 *:items-center *:justify-center *:gap-4 *:rounded-md *:p-4 *:text-lg *:font-semibold *:duration-150 lg:grid-cols-4">
        <Link href="/settings/account">
          <User />
          Account
        </Link>
        <Link href="/settings/notifications">
          <Bell /> Notifications
        </Link>
        <Link href="/settings/billing">
          <CreditCard /> Billing
        </Link>
        <Link href="/settings/privacy">
          <Eye /> Privacy
        </Link>
      </div>
    </>
  );
}
