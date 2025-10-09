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

export const userIdParameterSchema = z
  .object({
    userId: z.string({ error: "ID is required." }),
  })
  .required();

export const userSearchParameterSchema = z
  .object({
    userUsername: z.string({ error: "Username is required." }),
  })
  .required();

export type UpdateName = z.infer<typeof updateNameSchema>;
export type UpdateUsername = z.infer<typeof updateUsernameSchema>;
export type UserIdParameter = z.infer<typeof userIdParameterSchema>;
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
 * @param {string} userId The user's ID - Required
 */
export class UserIdParameterDto extends createZodDto(userIdParameterSchema) {}
/**
 * @param {string} userUsername The user's username - Required
 */
export class UserSearchParameterDto extends createZodDto(
  userSearchParameterSchema,
) {}
