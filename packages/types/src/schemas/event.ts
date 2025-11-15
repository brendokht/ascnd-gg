import * as z from "zod";
import { EventSchema } from "../types";
import { createZodDto } from "nestjs-zod";
import { createStageSchema } from "./stage";

export const createEventDataSchema = EventSchema.pick({
  displayName: true,
  description: true,
  titleId: true,
})
  .partial({
    description: true,
  })
  .extend({
    logo: z.instanceof(Blob).nullish(),
    banner: z.instanceof(Blob).nullish(),
  });

export const createEventSchema = z.object({
  ...createEventDataSchema.shape,
  stages: z
    .array(createStageSchema)
    .min(1, { error: "An event needs at least 1 stage." }),
});

export const editEventSchema = createEventSchema.partial();

export const eventIdParameterSchema = z
  .object({
    eventId: z.uuidv7({ error: "Event ID must be UUIDv7." }),
  })
  .required();

export const eventNameParameterSchema = z
  .object({
    eventName: z.string({ error: "Event name is required." }),
  })
  .required();

export type CreateEventData = z.infer<typeof createEventDataSchema>;
export type CreateEvent = z.infer<typeof createEventSchema>;
export type EditEvent = z.infer<typeof editEventSchema>;

/**
 *
 */
export class CreateEventDto extends createZodDto(createEventSchema) {}

/**
 *
 */
export class EditEventDto extends createZodDto(editEventSchema) {}

/**
 * @param {string} eventId The event's ID - Required
 */
export class EventIdParameterDto extends createZodDto(eventIdParameterSchema) {}

/**
 * @param {string} eventName The events's name - Required
 */
export class EventNameParameterDto extends createZodDto(
  eventNameParameterSchema,
) {}
