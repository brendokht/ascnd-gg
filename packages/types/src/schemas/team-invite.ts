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

/**
 * @param {string} userId The ID of the user to invite - Required
 */
export class CreateTeamInviteDto extends createZodDto(createTeamInviteSchema) {}
/**
 * @param {string} userId The ID of the user to invite - Required
 * @param status The new status of the invite - Required
 */
export class UpdateTeamInviteDto extends createZodDto(updateTeamInviteSchema) {}
/**
 * @param {string} username The username of the user to search for - Required
 * @param {string} page The page of the set of users - Required
 * @param {string} limit The limit of how many users are returned - Required
 */
export class TeamInviteSearchQueryDto extends createZodDto(
  teamInviteSearchQuerySchema,
) {}
/**
 * @param {string} teamId The team's ID
 */
export class TeamInviteSearchParameterDto extends createZodDto(
  teamInviteSearchParameterSchema,
) {}
/**
 * @param {string} teamId The team's ID
 * @param {string} inviteId The invites's ID
 */
export class TeamInviteUpdateParameterDto extends createZodDto(
  teamInviteUpdateParameterSchema,
) {}
