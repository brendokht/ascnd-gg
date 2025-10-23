import * as z from "zod";
import { EventSchema, StageSchema, StageSettingSchema } from "../types";
import { PhaseSchema } from "../types/phase";
import { createZodDto } from "nestjs-zod";

export const createEventSchema = z.object({
  event: z.object({
    ...EventSchema.pick({
      displayName: true,
      description: true,
      scheduledAt: true,
      scheduledEndAt: true,
      titleId: true,
    }).partial({
      description: true,
      scheduledAt: true,
      scheduledEndAt: true,
    }).shape,
    logo: z.instanceof(Blob).nullish(),
    banner: z.instanceof(Blob).nullish(),
  }),
  stages: z.array(
    z.object({
      ...StageSchema.pick({
        displayName: true,
        description: true,
        typeId: true,
        scheduledAt: true,
        scheduledEndAt: true,
      }).partial({
        description: true,
      }).shape,
      logo: z.instanceof(Blob).nullish(),
      banner: z.instanceof(Blob).nullish(),
      stageSettings: StageSettingSchema,
      phases: PhaseSchema,
    }),
  ),
});

export type CreateEvent = z.infer<typeof createEventSchema>;

/**
 * @param {string} displayName The event's display name - Required
 * @param {Blob} [logo] The Blob object for the event's logo - Optional
 * @param {Blob} [banner] The Blob object for the event's banner - Optional
 */
export class CreateEventDto extends createZodDto(createEventSchema) {}
