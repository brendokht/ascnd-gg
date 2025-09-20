import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@ascnd-gg/constants";
import z from "zod";

export const User = z.object({
  email: z.email(),
  // Optional because user will pick username initially
  username: z
    .string()
    .min(USERNAME_MIN_LENGTH)
    .max(USERNAME_MAX_LENGTH)
    .nullish(),
  displayUsername: z
    .string()
    .min(USERNAME_MIN_LENGTH)
    .max(USERNAME_MAX_LENGTH)
    .nullish(),
  name: z.string().optional(),
  profilePictureUrl: z.url().optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type UserType = z.infer<typeof User>;

export type UserViewModel = Pick<
  UserType,
  "displayUsername" | "profilePictureUrl" | "createdAt"
>;
