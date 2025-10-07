import { createZodDto } from "nestjs-zod";
import * as z from "zod";
import { TeamInviteSchema } from "../types";

export const createTeamInviteSchema = z.object({
  userId: z.uuidv7({ error: "User ID is required." }),
});

export const updateTeamInviteSchema = TeamInviteSchema.pick({
  status: true,
}).extend(createTeamInviteSchema.shape);

export const teamInviteSearchQuerySchema = z
  .object({
    username: z.string({ error: "Username is required." }),
    page: z.preprocess(
      (page) => {
        if (typeof page === "string") {
          return parseInt(page);
        }
      },
      z.int({ error: "Page must be an integer." }),
    ),
    limit: z.preprocess(
      (page) => {
        if (typeof page === "string") {
          return parseInt(page);
        }
      },
      z.int({ error: "Limit must be an integer." }),
    ),
  })
  .required();

export const teamInviteSearchParameterSchema = z
  .object({
    teamId: z.uuidv7({ error: "Team ID must be UUIDv7." }),
  })
  .required();

export const teamInviteUpdateParameterSchema = z
  .object({
    teamId: z.uuidv7({ error: "Team ID must be UUIDv7." }),
    inviteId: z.uuidv7({ error: "Invite ID must be UUIDv7." }),
  })
  .readonly();

export type CreateTeamInvite = z.infer<typeof createTeamInviteSchema>;
export type UpdateTeamInvite = z.infer<typeof updateTeamInviteSchema>;
export type TeamInviteUpdateParameter = z.infer<
  typeof teamInviteUpdateParameterSchema
>;

export class CreateTeamInviteDto extends createZodDto(createTeamInviteSchema) {}
export class UpdateTeamInviteDto extends createZodDto(updateTeamInviteSchema) {}
export class TeamInviteSearchQueryDto extends createZodDto(
  teamInviteSearchQuerySchema,
) {}
export class TeamInviteSearchParameterDto extends createZodDto(
  teamInviteSearchParameterSchema,
) {}
export class TeamInviteUpdateParameterDto extends createZodDto(
  teamInviteUpdateParameterSchema,
) {}
