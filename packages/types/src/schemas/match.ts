import { createZodDto } from "nestjs-zod";
import * as z from "zod";

export const matchFormatIdParameterSchema = z
  .object({
    matchFormatId: z.uuidv7({ error: "Match Format ID must be UUIDv7." }),
  })
  .required();

/**
 * @param {string} matchFormatId The match format's ID - Required
 */
export class MatchFormatIdParameterDto extends createZodDto(
  matchFormatIdParameterSchema,
) {}
