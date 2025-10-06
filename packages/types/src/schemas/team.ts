import * as z from "zod";
import { TeamSchema } from "../types";
import { createZodDto } from "nestjs-zod";

export const createTeamSchema = z.object({
  ...TeamSchema.pick({ id: true, displayName: true }).shape,
  logo: z.instanceof(Blob).nullish(),
  banner: z.instanceof(Blob).nullish(),
});

export const editTeamSchema = z.object({
  ...TeamSchema.pick({ id: true, displayName: true }).partial({
    displayName: true,
  }).shape,
  logo: z.instanceof(Blob).nullish(),
  banner: z.instanceof(Blob).nullish(),
});

export type createTeamSchemaType = z.infer<typeof createTeamSchema>;
export type editTeamSchemaType = z.infer<typeof editTeamSchema>;

export class CreateTeamDto extends createZodDto(createTeamSchema) {}
export class EditTeamDto extends createZodDto(editTeamSchema) {}
