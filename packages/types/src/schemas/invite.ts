import { createZodDto } from "nestjs-zod";
import * as z from "zod";
import { TeamInviteSchema } from "../types";

export const createTeamInviteSchema = z.object({
  userId: z.uuidv7({ error: "User ID is required." }),
});

export const updateTeamInviteSchema = TeamInviteSchema.pick({
  status: true,
}).extend(createTeamInviteSchema.shape);

export type CreateTeamInvite = z.infer<typeof createTeamInviteSchema>;
export type UpdateTeamInvite = z.infer<typeof updateTeamInviteSchema>;

export class CreateTeamInviteDto extends createZodDto(createTeamInviteSchema) {}
export class UpdateTeamInviteDto extends createZodDto(updateTeamInviteSchema) {}
