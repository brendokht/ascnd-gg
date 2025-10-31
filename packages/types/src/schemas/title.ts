import { createZodDto } from "nestjs-zod";
import * as z from "zod";

export const titleIdParameterSchema = z
  .object({
    titleId: z.uuidv7({ error: "Title ID must be UUIDv7." }),
  })
  .required();

export const titleCharacterGetParameterSchema = z
  .object({
    titleCharacterId: z.uuidv7({ error: "Title Character ID must be UUIDv7." }),
  })
  .required();

export const titleMapGetParameterSchema = z
  .object({
    titleMapId: z.uuidv7({ error: "Title Map ID must be UUIDv7." }),
  })
  .required();

export const titleItemGetParameterSchema = z
  .object({
    titleItemId: z.uuidv7({ error: "Title Item ID must be UUIDv7." }),
  })
  .required();

export const titleGamemodeGetParameterSchema = z
  .object({
    titleGamemodeId: z.uuidv7({ error: "Title Gamemode ID must be UUIDv7." }),
  })
  .required();

/**
 * @param {string} titleId The title's ID - Required
 */
export class TitleIdParameterDto extends createZodDto(titleIdParameterSchema) {}

/**
 * @param {string} titleCharacterId The title characters's ID - Required
 */
export class TitleCharacterGetParameterDto extends createZodDto(
  titleCharacterGetParameterSchema,
) {}

/**
 * @param {string} titleMapId The title map's ID - Required
 */
export class TitleMapGetParameterDto extends createZodDto(
  titleMapGetParameterSchema,
) {}

/**
 * @param {string} titleItemId The title item's ID - Required
 */
export class TitleItemGetParameterDto extends createZodDto(
  titleItemGetParameterSchema,
) {}

/**
 * @param {string} titleGamemodeId The title gamemode's ID - Required
 */
export class TitleGamemodeGetParameterDto extends createZodDto(
  titleGamemodeGetParameterSchema,
) {}
