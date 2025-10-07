import {
  DISPLAY_USERNAME_REGEX,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NAME_REGEX,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_REGEX,
} from "@ascnd-gg/constants";
import * as z from "zod";
import { TeamSummarySchema } from "./team";
import { TeamInviteForUserViewModelSchema } from "./team-invites";

// TODO: Support descriptions and banners

export const UserSchema = z.object({
  id: z.uuidv7({ error: "ID is required." }).trim(),
  email: z.email({ error: "Email is required." }).trim(),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(USERNAME_MIN_LENGTH, {
      error: `Username must be at least ${USERNAME_MIN_LENGTH} characters.`,
    })
    .max(USERNAME_MAX_LENGTH, {
      error: `Username must be ${USERNAME_MAX_LENGTH} characters or less.`,
    })
    .regex(USERNAME_REGEX, {
      error:
        "Username can only contain alphanumeric characters, spaces, underscores, dots, and dashes, and must contain at least 1 letter.",
    })
    .optional(),
  displayUsername: z
    .string()
    .trim()
    .min(USERNAME_MIN_LENGTH, {
      error: `Username must be at least ${USERNAME_MIN_LENGTH} characters.`,
    })
    .max(USERNAME_MAX_LENGTH, {
      error: `Username must be ${USERNAME_MAX_LENGTH} characters or less.`,
    })
    .regex(DISPLAY_USERNAME_REGEX, {
      error:
        "Username can only contain alphanumeric characters, spaces, underscores, dots, and dashes, and must contain at least 1 letter.",
    })
    .optional(),
  name: z
    .string()
    .trim()
    .min(NAME_MIN_LENGTH, {
      error: `Name must be at least ${NAME_MIN_LENGTH} characters.`,
    })
    .max(NAME_MAX_LENGTH, {
      error: `Name must be ${NAME_MAX_LENGTH} characters or less.`,
    })
    .regex(NAME_REGEX, {
      error:
        "Name can only include letters, spaces, hyphens, apostrophes, and periods, and must contain at least one letter.",
    })
    .optional(),
  // TODO: Change from profilePictureUrl to just image, to match better-auth
  profilePictureUrl: z
    .url({ error: "User avatar is must be a URL pointing to an image" })
    .trim()
    .optional(),
  get teams() {
    return z.array(TeamSummarySchema).optional();
  },
  get invites() {
    return z.array(TeamInviteForUserViewModelSchema).optional();
  },
  createdAt: z.iso
    .datetime({ error: "User creation date is required." })
    .optional(),
});

export const UserSummarySchema = UserSchema.pick({
  id: true,
  username: true,
  displayUsername: true,
  profilePictureUrl: true,
});

export const UserViewModelSchema = UserSchema.pick({
  id: true,
  username: true,
  displayUsername: true,
  profilePictureUrl: true,
  teams: true,
  createdAt: true,
});

export const InviteUserSearchViewModelSchema = UserSummarySchema.extend({
  isInvited: z.boolean().default(false),
  inviteId: z.uuidv7().optional(),
});

export type User = z.infer<typeof UserSchema>;

export type UserSummary = z.infer<typeof UserSummarySchema>;

export type UserViewModel = z.infer<typeof UserViewModelSchema>;

export type InviteUserSearchViewModel = z.infer<
  typeof InviteUserSearchViewModelSchema
>;
