import * as z from "zod";
import { StageSchema, StageSettingSchema } from "../types";
import { createZodDto } from "nestjs-zod";
import { createPhaseSchema } from "./phase";

export const createStageSchema = z
  .object({
    ...StageSchema.pick({
      displayName: true,
      description: true,
      eventId: true,
      typeId: true,
      scheduledAt: true,
      scheduledEndAt: true,
      registrationStartDate: true,
      registrationEndDate: true,
    }).shape,
    stageSettings: StageSettingSchema.omit({
      isLocked: true,
      stageId: true,
    }),
    phases: z
      .array(createPhaseSchema.omit({ stageId: true }))
      .min(1, { error: "A stage needs at least 1 phase." }),
  })
  .refine(
    (stage) =>
      !stage.stageSettings.allowDraws || !stage.stageSettings.drawPolicy,
    {
      error: "Draw policy must be set when allowing draws",
      path: ["stageSettings.drawPolicy"],
    },
  );
export const editStageSchema = createStageSchema.partial();

export const stageIdParameterSchema = z
  .object({
    stageId: z.uuidv7({ error: "Stage ID must be UUIDv7." }),
  })
  .required();

export const stageTypeIdParameterSchema = z
  .object({
    stageTypeId: z.uuidv7({ error: "Stage Type ID must be UUIDv7." }),
  })
  .required();

export type CreateStage = z.infer<typeof createStageSchema>;

/**
 *
 */
export class CreateStageDto extends createZodDto(createStageSchema) {}

export type EditStage = z.infer<typeof editStageSchema>;

/**
 *
 */
export class EditStageDto extends createZodDto(editStageSchema) {}

/**
 * @param {string} stageId The stage's ID - Required
 */
export class StageIdParameterDto extends createZodDto(stageIdParameterSchema) {}

/**
 * @param {string} stageTypeId The stage type's ID - Required
 */
export class StageTypeIdParameterDto extends createZodDto(
  stageTypeIdParameterSchema,
) {}
