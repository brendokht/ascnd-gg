import { EventStatus } from "@ascnd-gg/database";
import {
  EVENT_DESCRIPTION_MAX_LENGTH,
  EVENT_DISPLAY_NAME_REGEX,
  EVENT_NAME_MAX_LENGTH,
  EVENT_NAME_MIN_LENGTH,
  EVENT_NAME_REGEX,
} from "@ascnd-gg/constants";
import * as z from "zod";
import { StageSummarySchema } from "./stage";

export const EventSchema = z.object({
  id: z.uuidv7({ error: "Event ID is required." }).trim(),
  hubId: z.uuidv7({ error: "Hub ID is required." }).trim(),
  name: z
    .string({ error: "Event name is required." })
    .trim()
    .toLowerCase()
    .min(EVENT_NAME_MIN_LENGTH, {
      error: `Event name must be at least ${EVENT_NAME_MIN_LENGTH} characters.`,
    })
    .max(EVENT_NAME_MAX_LENGTH, {
      error: `Event name must be ${EVENT_NAME_MAX_LENGTH} characters or less.`,
    })
    .regex(EVENT_NAME_REGEX, {
      error:
        "Event name can only contain alphanumeric characters, spaces, underscores, dots, and dashes, and must contain at least 1 letter.",
    }),
  displayName: z
    .string({ error: "Event display name is required." })
    .trim()
    .min(EVENT_NAME_MIN_LENGTH, {
      error: `Event name must be at least ${EVENT_NAME_MIN_LENGTH} characters.`,
    })
    .max(EVENT_NAME_MAX_LENGTH, {
      error: `Event name must be ${EVENT_NAME_MAX_LENGTH} characters or less.`,
    })
    .regex(EVENT_DISPLAY_NAME_REGEX, {
      error:
        "Event name can only contain alphanumeric characters, spaces, underscores, dots, and dashes, and must contain at least 1 letter.",
    }),
  description: z.string().trim().max(EVENT_DESCRIPTION_MAX_LENGTH).optional(),
  logo: z
    .url({ error: "Event logo is must be a URL pointing to an image." })
    .trim()
    .optional(),
  banner: z
    .url({ error: "Event banner is must be a URL pointing to an image." })
    .trim()
    .optional(),
  titleId: z.uuidv7({ error: "Title ID is required." }).trim(),
  status: z.enum(EventStatus, { error: "Event status is required." }),
  scheduledAt: z.iso.datetime({ error: "Event start date is required." }),
  scheduledEndAt: z.iso.datetime({ error: "Event end date is required." }),
  createdAt: z.iso
    .datetime({ error: "Event creation date is required." })
    .optional(),
  get stages() {
    return z.array(StageSummarySchema).optional();
  },
});

export const EventSummarySchema = EventSchema.pick({
  id: true,
  name: true,
  displayName: true,
  logo: true,
  banner: true,
  status: true,
}).extend({
  isEventOwner: z.boolean().optional(),
});

export const EventViewModelSchema = EventSchema.pick({
  id: true,
  name: true,
  displayName: true,
  description: true,
  members: true,
  logo: true,
  banner: true,
  status: true,
  stages: true,
  createdAt: true,
}).extend({
  isEventOwner: z.boolean().optional(),
});

export type Event = z.infer<typeof EventSchema>;

export type EventSummary = z.infer<typeof EventSummarySchema>;

export type EventViewModel = z.infer<typeof EventViewModelSchema>;
