import {
  TEAM_NAME_MAX_LENGTH,
  TEAM_NAME_MIN_LENGTH,
} from "@ascnd-gg/constants";
import z from "zod";

export const Team = z.object({
  name: z
    .string({ error: "Team name is required" })
    .min(TEAM_NAME_MIN_LENGTH)
    .max(TEAM_NAME_MAX_LENGTH),
  displayName: z
    .string({ error: "Team display name is required" })
    .min(TEAM_NAME_MIN_LENGTH)
    .max(TEAM_NAME_MAX_LENGTH),
  logo: z.url(),
  banner: z.url(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type TeamType = z.infer<typeof Team>;

export type TeamViewModel = Pick<
  TeamType,
  "name" | "displayName" | "logo" | "banner" | "createdAt"
>;
