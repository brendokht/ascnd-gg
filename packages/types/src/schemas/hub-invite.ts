import { createZodDto } from "nestjs-zod";
import * as z from "zod";
import { HubInviteSchema } from "../types";

export const createHubInviteSchema = z.object({
  userId: z.uuidv7({ error: "User ID is required." }),
});

export const updateHubInviteSchema = HubInviteSchema.pick({
  status: true,
}).extend(createHubInviteSchema.shape);

export const hubInviteSearchQuerySchema = z
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

export const hubInviteSearchParameterSchema = z
  .object({
    hubId: z.uuidv7({ error: "Hub ID must be UUIDv7." }),
  })
  .required();

export const hubInviteUpdateParameterSchema = z
  .object({
    hubId: z.uuidv7({ error: "Hub ID must be UUIDv7." }),
    inviteId: z.uuidv7({ error: "Invite ID must be UUIDv7." }),
  })
  .readonly();

export type CreateHubInvite = z.infer<typeof createHubInviteSchema>;
export type UpdateHubInvite = z.infer<typeof updateHubInviteSchema>;
export type HubInviteUpdateParameter = z.infer<
  typeof hubInviteUpdateParameterSchema
>;

/**
 * @param {string} userId The ID of the user to invite - Required
 */
export class CreateHubInviteDto extends createZodDto(createHubInviteSchema) {}
/**
 * @param {string} userId The ID of the user to invite - Required
 * @param status The new status of the invite - Required
 */
export class UpdateHubInviteDto extends createZodDto(updateHubInviteSchema) {}
/**
 * @param {string} username The username of the user to search for - Required
 * @param {string} page The page of the set of users - Required
 * @param {string} limit The limit of how many users are returned - Required
 */
export class HubInviteSearchQueryDto extends createZodDto(
  hubInviteSearchQuerySchema,
) {}
/**
 * @param {string} hubId The hub's ID
 */
export class HubInviteSearchParameterDto extends createZodDto(
  hubInviteSearchParameterSchema,
) {}
/**
 * @param {string} hubId The hub's ID
 * @param {string} inviteId The invites's ID
 */
export class HubInviteUpdateParameterDto extends createZodDto(
  hubInviteUpdateParameterSchema,
) {}
