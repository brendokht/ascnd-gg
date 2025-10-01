import { createZodDto } from "nestjs-zod";
import * as z from "zod";

export const sendTeamInviteSchema = z.object({
  username: z.string(),
  teamName: z.string(),
});

export const updateTeamInviteSchema = z.object({
  ...sendTeamInviteSchema.shape,
  accepted: z.boolean().optional(),
  cancelled: z.boolean().optional(),
});

export class CreateTeamInviteDto extends createZodDto(sendTeamInviteSchema) {}
export class UpdateTeamInviteDto extends createZodDto(updateTeamInviteSchema) {}
