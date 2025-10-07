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
    name: z.string({ error: "Team Name is required." }),
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

export class CreateTeamDto extends createZodDto(createTeamSchema) {}
export class EditTeamDto extends createZodDto(editTeamSchema) {}
export class TeamIdParameterDto extends createZodDto(teamIdParameterSchema) {}
export class TeamNameParameterDto extends createZodDto(
  teamNameParameterSchema,
) {}
export class TeamMemberDeleteParameterDto extends createZodDto(
  teamMemberDeleteParameterSchema,
) {}
