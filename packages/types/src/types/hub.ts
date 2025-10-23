import {
  HUB_DISPLAY_NAME_REGEX,
  HUB_NAME_MAX_LENGTH,
  HUB_NAME_MIN_LENGTH,
  HUB_NAME_REGEX,
} from "@ascnd-gg/constants";
import * as z from "zod";
import { UserSummarySchema } from "./user";
import { HubInviteForHubViewModelSchema } from "./hub-invites";

export const HubSchema = z.object({
  id: z.uuidv7({ error: "Hub ID is required." }).trim(),
  name: z
    .string({ error: "Hub name is required." })
    .trim()
    .toLowerCase()
    .min(HUB_NAME_MIN_LENGTH, {
      error: `Hub name must be at least ${HUB_NAME_MIN_LENGTH} characters.`,
    })
    .max(HUB_NAME_MAX_LENGTH, {
      error: `Hub name must be ${HUB_NAME_MAX_LENGTH} characters or less.`,
    })
    .regex(HUB_NAME_REGEX, {
      error:
        "Hub name can only contain alphanumeric characters, spaces, underscores, dots, and dashes, and must contain at least 1 letter.",
    }),
  displayName: z
    .string({ error: "Hub display name is required." })
    .trim()
    .min(HUB_NAME_MIN_LENGTH, {
      error: `Hub name must be at least ${HUB_NAME_MIN_LENGTH} characters.`,
    })
    .max(HUB_NAME_MAX_LENGTH, {
      error: `Hub name must be ${HUB_NAME_MAX_LENGTH} characters or less.`,
    })
    .regex(HUB_DISPLAY_NAME_REGEX, {
      error:
        "Hub name can only contain alphanumeric characters, spaces, underscores, dots, and dashes, and must contain at least 1 letter.",
    }),
  logo: z
    .url({ error: "Hub logo is must be a URL pointing to an image." })
    .trim()
    .optional(),
  banner: z
    .url({ error: "Hub banner is must be a URL pointing to an image." })
    .trim()
    .optional(),
  hubOwnerId: z.uuidv7({ error: "Hub owner ID is requied." }).trim(),
  get members() {
    return z.array(UserSummarySchema).optional();
  },
  get invites() {
    return z.array(HubInviteForHubViewModelSchema).optional();
  },
  createdAt: z.iso
    .datetime({ error: "Hub creation date is required." })
    .optional(),
});

export const HubSummarySchema = HubSchema.pick({
  id: true,
  name: true,
  displayName: true,
  logo: true,
  banner: true,
}).extend({
  isHubOwner: z.boolean().optional(),
});

export const HubViewModelSchema = HubSchema.pick({
  id: true,
  name: true,
  displayName: true,
  members: true,
  logo: true,
  banner: true,
  createdAt: true,
}).extend({
  isHubOwner: z.boolean().optional(),
});

export type Hub = z.infer<typeof HubSchema>;

export type HubSummary = z.infer<typeof HubSummarySchema>;

export type HubViewModel = z.infer<typeof HubViewModelSchema>;
