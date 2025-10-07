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

export type CreateTeam = z.infer<typeof createTeamSchema>;
export type EditTeam = z.infer<typeof editTeamSchema>;

export class CreateTeamDto extends createZodDto(createTeamSchema) {}
export class EditTeamDto extends createZodDto(editTeamSchema) {}
