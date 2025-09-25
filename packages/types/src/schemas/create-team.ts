import { z } from "zod";
import { Team } from "../types";
import { createZodDto } from "nestjs-zod";

export const createTeamSchema = z.object({
  ...Team.pick({ displayName: true }).shape,
  logo: z.instanceof(Blob).optional(),
  banner: z.instanceof(Blob).optional(),
});

const createTeamDto = createTeamSchema
  .omit({ banner: true, logo: true })
  .extend(Team.partial({ name: true }).pick({ name: true }).shape);

export class CreateTeamDto extends createZodDto(createTeamDto) {}

export type createTeamSchemaType = z.infer<typeof createTeamSchema>;
