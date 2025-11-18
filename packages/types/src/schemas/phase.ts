import * as z from "zod";
import { PhaseSchema } from "../types";
import { createZodDto } from "nestjs-zod";

export const createPhaseSchema = z.object({
  ...PhaseSchema.pick({
    formatId: true,
    stageId: true,
    matchIndexStart: true,
    matchIndexEnd: true,
  }).shape,
});

export const editPhaseSchema = createPhaseSchema.partial();

export const phaseIdParameterSchema = z
  .object({
    phaseId: z.uuidv7({ error: "Phase ID must be UUIDv7." }),
  })
  .required();

export type CreatePhase = z.infer<typeof createPhaseSchema>;

/**
 *
 */
export class CreatePhaseDto extends createZodDto(createPhaseSchema) {}

export type EditPhase = z.infer<typeof editPhaseSchema>;

/**
 *
 */
export class EditPhaseDto extends createZodDto(editPhaseSchema) {}

/**
 * @param {string} phaseId The phase's ID - Required
 */
export class PhaseIdParameterDto extends createZodDto(phaseIdParameterSchema) {}
