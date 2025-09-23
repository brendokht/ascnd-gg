import { validateSession } from "@ascnd-gg/website/lib/validate-session";

export default async function BillingSettings() {
  await validateSession();
  return <>Billing Settings</>;
}
