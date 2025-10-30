import * as z from "zod";
import { EventSchema } from "../types";
import { createZodDto } from "nestjs-zod";
import { createStageSchema } from "./stage";

export const createEventDataSchema = EventSchema.pick({
  displayName: true,
  description: true,
  scheduledAt: true,
  scheduledEndAt: true,
  titleId: true,
})
  .partial({
    description: true,
    scheduledAt: true,
    scheduledEndAt: true,
  })
  .extend({
    logo: z.instanceof(Blob).nullish(),
    banner: z.instanceof(Blob).nullish(),
  });

export const createEventSchema = z.object({
  createEventDataSchema,
  ...createStageSchema.shape,
});

export type CreateEventData = z.infer<typeof createEventDataSchema>;
export type CreateEvent = z.infer<typeof createEventSchema>;

/**
 * @param {string} displayName The event's display name - Required
 * @param {Blob} [logo] The Blob object for the event's logo - Optional
 * @param {Blob} [banner] The Blob object for the event's banner - Optional
 */
export class CreateEventDto extends createZodDto(createEventSchema) {}
