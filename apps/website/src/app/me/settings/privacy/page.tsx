import { validateSession } from "@ascnd-gg/website/lib/validate-session";

export default async function PrivacySettings() {
  await validateSession();

  return <>Privacy Settings</>;
}
