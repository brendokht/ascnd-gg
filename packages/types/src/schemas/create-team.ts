import {
  TEAM_NAME_MAX_LENGTH,
  TEAM_NAME_MIN_LENGTH,
} from "@ascnd-gg/constants";
import { z } from "zod";

export const createTeamSchema = z.object({
  displayName: z
    .string({ error: "Team name is required" })
    .min(TEAM_NAME_MIN_LENGTH, {
      error: "Team name must be at least 3 characters",
    })
    .max(TEAM_NAME_MAX_LENGTH, {
      error: "Team name must be 30 characters or less",
    }),
  logo: z.url().optional(),
  banner: z.url().optional(),
});

export type createTeamSchemaType = z.infer<typeof createTeamSchema>;
