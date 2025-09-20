import {
  TEAM_NAME_MAX_LENGTH,
  TEAM_NAME_MIN_LENGTH,
} from "@ascnd-gg/constants";
import { z } from "zod";

export const createTeamSchema = z.object({
  name: z
    .string({ error: "Team name is required" })
    .min(TEAM_NAME_MIN_LENGTH)
    .max(TEAM_NAME_MAX_LENGTH),
  logo: z.url().optional(),
  banner: z.url().optional(),
});
