import {
  TEAM_NAME_MAX_LENGTH,
  TEAM_NAME_MIN_LENGTH,
} from "@ascnd-gg/constants";
import * as z from "zod";

export const Team = z.object({
  name: z
    .string({ error: "Team name is required" })
    .min(TEAM_NAME_MIN_LENGTH, {
      error: "Team name must be at least 3 characters",
    })
    .max(TEAM_NAME_MAX_LENGTH, {
      error: "Team name must be 30 characters or less",
    })
    .regex(/^[a-zA-Z0-9.-_]+$/, {
      error:
        "Team name can only contain alphanumeric characters, underscores, dots, and dashes",
    }),
  displayName: z
    .string({ error: "Team display name is required" })
    .min(TEAM_NAME_MIN_LENGTH)
    .max(TEAM_NAME_MAX_LENGTH)
    .regex(/^[a-zA-Z0-9.-_]+$/, {
      error:
        "Team display name can only contain alphanumeric characters, underscores, dots, and dashes",
    }),
  logo: z.url().nullable(),
  banner: z.url().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  isTeamOwner: z.boolean().prefault(false),
});

export type TeamType = z.infer<typeof Team>;

export type TeamViewModel = Pick<
  TeamType,
  "displayName" | "logo" | "banner" | "createdAt" | "isTeamOwner"
>;
