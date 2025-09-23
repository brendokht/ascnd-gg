import { validateSession } from "@ascnd-gg/website/lib/validate-session";

export default async function NotificationsSettings() {
  await validateSession();

  return <>Notifications Settings</>;
}
