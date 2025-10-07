import {
  TEAM_DISPLAY_USERNAME_REGEX,
  TEAM_NAME_MAX_LENGTH,
  TEAM_NAME_MIN_LENGTH,
  TEAM_NAME_REGEX,
} from "@ascnd-gg/constants";
import * as z from "zod";
import { UserSummarySchema } from "./user";
import { TeamInviteForTeamViewModelSchema } from "./team-invites";

export const TeamSchema = z.object({
  id: z.uuidv7({ error: "ID is required." }).trim(),
  name: z
    .string({ error: "Team name is required." })
    .trim()
    .toLowerCase()
    .min(TEAM_NAME_MIN_LENGTH, {
      error: `Team name must be at least ${TEAM_NAME_MIN_LENGTH} characters.`,
    })
    .max(TEAM_NAME_MAX_LENGTH, {
      error: `Team name must be ${TEAM_NAME_MAX_LENGTH} characters or less.`,
    })
    .regex(TEAM_NAME_REGEX, {
      error:
        "Team name can only contain alphanumeric characters, spaces, underscores, dots, and dashes, and must contain at least 1 letter.",
    }),
  displayName: z
    .string({ error: "Team display name is required" })
    .trim()
    .min(TEAM_NAME_MIN_LENGTH)
    .max(TEAM_NAME_MAX_LENGTH)
    .regex(TEAM_DISPLAY_USERNAME_REGEX, {
      error:
        "Team name can only contain alphanumeric characters, spaces, underscores, dots, and dashes, and must contain at least 1 letter.",
    }),
  logo: z
    .url({ error: "Team logo is must be a URL pointing to an image" })
    .trim()
    .optional(),
  banner: z
    .url({ error: "Team banner is must be a URL pointing to an image" })
    .trim()
    .optional(),
  teamOwnerId: z.uuidv7({ error: "Team owner ID is requied." }).trim(),
  get members() {
    return z.array(UserSummarySchema).optional();
  },
  get invites() {
    return z.array(TeamInviteForTeamViewModelSchema).optional();
  },
  createdAt: z.iso
    .datetime({ error: "Team creation date is required." })
    .optional(),
});

export const TeamSummarySchema = TeamSchema.pick({
  id: true,
  name: true,
  displayName: true,
  logo: true,
  banner: true,
}).extend({
  isTeamOwner: z.boolean().optional(),
});

export const TeamViewModelSchema = TeamSchema.pick({
  id: true,
  name: true,
  displayName: true,
  members: true,
  logo: true,
  banner: true,
  createdAt: true,
}).extend({
  isTeamOwner: z.boolean().optional(),
});

export type Team = z.infer<typeof TeamSchema>;

export type TeamSummary = z.infer<typeof TeamSummarySchema>;

export type TeamViewModel = z.infer<typeof TeamViewModelSchema>;
