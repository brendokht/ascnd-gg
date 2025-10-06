import { createZodDto } from "nestjs-zod";
import * as z from "zod";
import { TeamInviteSchema } from "../types";

export const createTeamInviteSchema = TeamInviteSchema.pick({
  status: true,
}).extend({
  userId: z.uuidv7({ error: "User ID is required." }),
  teamId: z.uuidv7({ error: "Team ID is required." }),
});

export const updateTeamInviteSchema = createTeamInviteSchema;

export type CreateTeamInvite = z.infer<typeof createTeamInviteSchema>;
export type UpdateTeamInvite = z.infer<typeof updateTeamInviteSchema>;

export class CreateTeamInviteDto extends createZodDto(createTeamInviteSchema) {}
export class UpdateTeamInviteDto extends createZodDto(updateTeamInviteSchema) {}
