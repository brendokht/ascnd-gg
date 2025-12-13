import * as z from "zod";
import { HubSummarySchema } from "./hub";
import { UserSummarySchema } from "./user";

// runtime values for the invite status enum — keep these local so importing types
// from `@ascnd-gg/database` doesn't pull server-only runtime code into consumer bundles.
const InviteStatusValues = [
  "PENDING",
  "DECLINED",
  "CANCELLED",
  "ACCEPTED",
] as const;

export const HubInviteSchema = z.object({
  id: z.uuidv7({ error: "Hub invite ID is requied." }).trim(),
  status: z.enum(InviteStatusValues, {
    error: "Hub invite status is required.",
  }),
  get user() {
    return UserSummarySchema;
  },
  get hub() {
    return HubSummarySchema;
  },
  createdAt: z.iso.datetime({
    error: "Hub invitation creation date is required.",
  }),
});

export const HubInviteForUserViewModelSchema = HubInviteSchema.omit({
  user: true,
});

export const HubInviteForHubViewModelSchema = HubInviteSchema.omit({
  hub: true,
});

export type HubInvite = z.infer<typeof HubInviteSchema>;

export type HubInviteForUserViewModel = z.infer<
  typeof HubInviteForUserViewModelSchema
>;

export type HubInviteForHubViewModel = z.infer<
  typeof HubInviteForHubViewModelSchema
>;
