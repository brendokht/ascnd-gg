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

export type UpdateName = z.infer<typeof updateNameSchema>;
export type UpdateUsername = z.infer<typeof updateUsernameSchema>;

export class UpdateNameDto extends createZodDto(updateNameSchema) {}
export class UpdateUsernameDto extends createZodDto(updateUsernameSchema) {}
