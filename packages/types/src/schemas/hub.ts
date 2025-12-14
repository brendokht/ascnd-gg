import * as z from "zod";
import { HubSchema } from "../types";
import { createZodDto } from "nestjs-zod";

// TODO: Make displayName required
export const createHubSchema = z.object({
  ...HubSchema.pick({ displayName: true, description: true }).partial({
    displayName: true,
    description: true,
  }).shape,
  logo: z.instanceof(Blob).nullish(),
  banner: z.instanceof(Blob).nullish(),
});

export const editHubSchema = z.object({
  ...HubSchema.pick({ displayName: true, description: true }).partial({
    displayName: true,
    description: true,
  }).shape,
  logo: z.instanceof(Blob).nullish(),
  banner: z.instanceof(Blob).nullish(),
});

export const hubIdParameterSchema = z
  .object({
    hubId: z.uuidv7({ error: "Hub ID must be UUIDv7." }),
  })
  .required();

export const hubNameParameterSchema = z
  .object({
    hubName: z.string({ error: "Hub Name is required." }),
  })
  .required();

export const hubMemberDeleteParameterSchema = z
  .object({
    hubId: z.uuidv7({ error: "Hub ID must be UUIDv7." }),
    userId: z.uuidv7({ error: "User ID must be UUIDv7." }),
  })
  .readonly();

export type CreateHub = z.infer<typeof createHubSchema>;
export type EditHub = z.infer<typeof editHubSchema>;
export type HubIdParameter = z.infer<typeof hubIdParameterSchema>;
export type HubNameParameter = z.infer<typeof hubNameParameterSchema>;
export type HubMemberDeleteParameter = z.infer<
  typeof hubMemberDeleteParameterSchema
>;

/**
 * @param {string} displayName The hub's display name - Required
 * @param {Blob} [logo] The Blob object for the hub's logo - Optional
 * @param {Blob} [banner] The Blob object for the hub's banner - Optional
 */
export class CreateHubDto extends createZodDto(createHubSchema) {}
/**
 * @param {string} [displayName] The hub's updated display name - Optional
 * @param {Blob} [logo] The Blob object for the updated hub's logo - Optional
 * @param {Blob} [banner] The Blob object for the updated hub's banner - Optional
 */
export class EditHubDto extends createZodDto(editHubSchema) {}
/**
 * @param {string} hubId The hub's ID - Required
 */
export class HubIdParameterDto extends createZodDto(hubIdParameterSchema) {}
/**
 * @param {string} hubName The hub's name - Required
 */
export class HubNameParameterDto extends createZodDto(hubNameParameterSchema) {}
/**
 * @param {string} hubId The hub's ID - Required
 * @param {string} userId The user's ID - Required
 */
export class HubMemberDeleteParameterDto extends createZodDto(
  hubMemberDeleteParameterSchema,
) {}
