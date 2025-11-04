import * as z from "zod";
import { StageSchema, StageSettingSchema } from "../types";
import { PhaseSchema } from "../types/phase";
import { createZodDto } from "nestjs-zod";

export const createStageSchema = z.object({
  stages: z
    .array(
      z
        .object({
          ...StageSchema.pick({
            displayName: true,
            description: true,
            typeId: true,
          }).partial({
            description: true,
          }).shape,
          logo: z.instanceof(Blob).nullish(),
          banner: z.instanceof(Blob).nullish(),
          stageSettings: StageSettingSchema.omit({
            isLocked: true,
            stageId: true,
          }),
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
        })
        .refine(
          (stage) =>
            !stage.stageSettings.allowDraws ||
            stage.stageSettings.drawPolicy !== "",
          {
            error: "Draw policy must be set when allowing draws",
            path: ["stageSettings.drawPolicy"],
          },
        ),
    )
    .min(1, { error: "An event needs at least 1 stage." }),
});

export const stageTypeIdParameterSchema = z
  .object({
    stageTypeId: z.uuidv7({ error: "Stage Type ID must be UUIDv7." }),
  })
  .required();

export type CreateStage = z.infer<typeof createStageSchema>;

/**
 * @param {string} displayName The event's display name - Required
 * @param {Blob} [logo] The Blob object for the event's logo - Optional
 * @param {Blob} [banner] The Blob object for the event's banner - Optional
 */
export class CreateStageDto extends createZodDto(createStageSchema) {}

/**
 * @param {string} stageTypeId The stage type's ID - Required
 */
export class StageTypeIdParameterDto extends createZodDto(
  stageTypeIdParameterSchema,
) {}
