import * as z from "zod";
import { StageSchema, StageSettingSchema } from "../types";
import { PhaseSchema } from "../types/phase";
import { createZodDto } from "nestjs-zod";

export const createPhaseSchema = z.object({
  phases: z
    .array(
      z.object({
        ...PhaseSchema.pick({
          formatId: true,
          matchIndexStart: true,
          matchIndexEnd: true,
        }).shape,
      }),
    )
    .min(1, { error: "A stage needs at least 1 phase." }),
});

export const createStageSchema = z.object({
  stages: z
    .array(
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
        stageSettings: StageSettingSchema.omit({
          isLocked: true,
          stageId: true,
        }),
        ...createPhaseSchema.shape,
      }),
    )
    .min(1, { error: "An event needs at least 1 stage." }),
});

export type CreateStage = z.infer<typeof createStageSchema>;
export type CreatePhase = z.infer<typeof createPhaseSchema>;

/**
 * @param {string} displayName The event's display name - Required
 * @param {Blob} [logo] The Blob object for the event's logo - Optional
 * @param {Blob} [banner] The Blob object for the event's banner - Optional
 */
export class CreateStageDto extends createZodDto(createStageSchema) {}
