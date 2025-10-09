import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@ascnd-gg/ui/components/ui/item";
import { validateSession } from "@ascnd-gg/website/lib/validate-session";
import { Bell, CreditCard, Eye, User } from "lucide-react";
import Link from "next/link";

export default async function Settings() {
  await validateSession();
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">Settings</h1>
        <p className="text-muted-foreground text-pretty">
          Manage your acccount settings, notifications, billing, and privacy
        </p>
      </div>
      <ItemGroup className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Item asChild variant={"muted"}>
          <Link href={"/me/settings/account"}>
            <ItemHeader>
              <ItemMedia variant={"icon"}>
                <User />
              </ItemMedia>
            </ItemHeader>
            <ItemContent>
              <ItemTitle>Account</ItemTitle>
              <ItemDescription>
                Your account details, including username, email, etc.
              </ItemDescription>
            </ItemContent>
          </Link>
        </Item>
        <Item asChild variant={"muted"}>
          <Link href={"/me/settings/notifications"}>
            <ItemHeader>
              <ItemMedia variant={"icon"}>
                <Bell />
              </ItemMedia>
            </ItemHeader>
            <ItemContent>
              <ItemTitle>Notifications</ItemTitle>
              <ItemDescription>
                Your notifications settings for where you recieve notifications,
                what notifications you recieve, etc.
              </ItemDescription>
            </ItemContent>
          </Link>
        </Item>
        <Item asChild variant={"muted"}>
          <Link href={"/me/settings/billing"}>
            <ItemHeader>
              <ItemMedia variant={"icon"}>
                <CreditCard />
              </ItemMedia>
            </ItemHeader>
            <ItemContent>
              <ItemTitle>Billing</ItemTitle>
              <ItemDescription>
                Your billing details, managing subscriptions and purchases, etc.
              </ItemDescription>
            </ItemContent>
          </Link>
        </Item>
        <Item asChild variant={"muted"}>
          <Link href={"/me/settings/privacy"}>
            <ItemHeader>
              <ItemMedia variant={"icon"}>
                <Eye />
              </ItemMedia>
            </ItemHeader>
            <ItemContent>
              <ItemTitle>Privacy</ItemTitle>
              <ItemDescription>
                Your privacy settings, such as cookie settings, anonymous
                tracking, etc.
              </ItemDescription>
            </ItemContent>
          </Link>
        </Item>
      </ItemGroup>
    </>
  );
}
