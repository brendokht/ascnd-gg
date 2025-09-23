import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@ascnd-gg/constants";
import z from "zod";
import { Team } from "./team";

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
  teams: Team.pick({
    name: true,
    displayName: true,
    logo: true,
    isTeamOwner: true,
  })
    .array()
    .optional(),
});

export type UserType = z.infer<typeof User>;

export type UserViewModel = Pick<
  UserType,
  "displayUsername" | "profilePictureUrl" | "createdAt" | "teams"
>;

export type UserTeamViewModel = Pick<
  NonNullable<UserType["teams"]>[0],
  "name" | "displayName" | "logo" | "isTeamOwner"
>;
