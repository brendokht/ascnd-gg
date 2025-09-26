import { z } from "zod";
import { Team } from "../types";
import { createZodDto } from "nestjs-zod";

export const createTeamSchema = z.object({
  ...Team.pick({ displayName: true }).shape,
  logo: z.instanceof(Blob).optional(),
  banner: z.instanceof(Blob).optional(),
});

export const editTeamSchema = z.object({
  ...Team.pick({ displayName: true }).shape,
  logo: z.instanceof(Blob).nullish(),
  banner: z.instanceof(Blob).nullish(),
});

const createTeamDto = createTeamSchema
  .omit({ banner: true, logo: true })
  .extend(Team.partial({ name: true }).pick({ name: true }).shape);

const editTeamDto = editTeamSchema
  .omit({ banner: true, logo: true })
  .extend(Team.partial({ name: true }).pick({ name: true }).shape)
  .partial({ displayName: true });

export class CreateTeamDto extends createZodDto(createTeamDto) {}
export class EditTeamDto extends createZodDto(editTeamDto) {}

export type createTeamSchemaType = z.infer<typeof createTeamSchema>;
export type editTeamSchemaType = z.infer<typeof editTeamSchema>;
