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

export class UpdateNameDto extends createZodDto(updateNameSchema) {}
export class UpdateUsernameDto extends createZodDto(updateUsernameSchema) {}
export class UserSearchParameterDto extends createZodDto(
  userSearchParameterSchema,
) {}
