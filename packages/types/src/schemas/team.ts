import * as z from "zod";
import { TeamSchema } from "../types";
import { createZodDto } from "nestjs-zod";

export const createTeamSchema = z.object({
  ...TeamSchema.pick({ displayName: true }).partial({
    displayName: true,
  }).shape,
  logo: z.instanceof(Blob).nullish(),
  banner: z.instanceof(Blob).nullish(),
});

export const editTeamSchema = z.object({
  ...TeamSchema.pick({ displayName: true }).partial({
    displayName: true,
  }).shape,
  logo: z.instanceof(Blob).nullish(),
  banner: z.instanceof(Blob).nullish(),
});

export const teamIdParameterSchema = z
  .object({
    teamId: z.uuidv7({ error: "Team ID must be UUIDv7." }),
  })
  .required();

export const teamNameParameterSchema = z
  .object({
    teamName: z.string({ error: "Team Name is required." }),
  })
  .required();

export const teamMemberDeleteParameterSchema = z
  .object({
    teamId: z.uuidv7({ error: "Team ID must be UUIDv7." }),
    userId: z.uuidv7({ error: "User ID must be UUIDv7." }),
  })
  .readonly();

export type CreateTeam = z.infer<typeof createTeamSchema>;
export type EditTeam = z.infer<typeof editTeamSchema>;
export type TeamIdParameter = z.infer<typeof teamIdParameterSchema>;
export type TeamNameParameter = z.infer<typeof teamNameParameterSchema>;
export type TeamMemberDeleteParameter = z.infer<
  typeof teamMemberDeleteParameterSchema
>;

/**
 * @param {string} displayName The team's display name - Required
 * @param {Blob} [logo] The Blob object for the team's logo - Optional
 * @param {Blob} [banner] The Blob object for the team's banner - Optional
 */
export class CreateTeamDto extends createZodDto(createTeamSchema) {}
/**
 * @param {string} [displayName] The team's updated display name - Optional
 * @param {Blob} [logo] The Blob object for the updated team's logo - Optional
 * @param {Blob} [banner] The Blob object for the updated team's banner - Optional
 */
export class EditTeamDto extends createZodDto(editTeamSchema) {}
/**
 * @param {string} teamId The team's ID - Required
 */
export class TeamIdParameterDto extends createZodDto(teamIdParameterSchema) {}
/**
 * @param {string} teamName The team's name - Required
 */
export class TeamNameParameterDto extends createZodDto(
  teamNameParameterSchema,
) {}
/**
 * @param {string} teamId The team's ID - Required
 * @param {string} userId The user's ID - Required
 */
export class TeamMemberDeleteParameterDto extends createZodDto(
  teamMemberDeleteParameterSchema,
) {}
