import { createZodDto } from "nestjs-zod";
import { UserSchema } from "../types";
import * as z from "zod";

export const updateNameSchema = UserSchema.pick({ name: true }).required({
  name: true,
});

export const updateUsernameSchema = UserSchema.pick({
  displayUsername: true,
}).required({
  displayUsername: true,
});

export const userSearchParameterSchema = z
  .object({
    username: z.string({ error: "Username is required." }),
  })
  .required();

export type UpdateName = z.infer<typeof updateNameSchema>;
export type UpdateUsername = z.infer<typeof updateUsernameSchema>;
export type UserSearchParameter = z.infer<typeof userSearchParameterSchema>;

/**
 * @param {string} name The user's full name - Required
 */
export class UpdateNameDto extends createZodDto(updateNameSchema) {}
/**
 * @param {string} username The user's username - Required
 */
export class UpdateUsernameDto extends createZodDto(updateUsernameSchema) {}
/**
 * @param {string} username The full username to search - Required
 */
export class UserSearchParameterDto extends createZodDto(
  userSearchParameterSchema,
) {}
