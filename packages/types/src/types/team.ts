import {
  TEAM_NAME_MAX_LENGTH,
  TEAM_NAME_MIN_LENGTH,
} from "@ascnd-gg/constants";
import { createZodDto } from "nestjs-zod";
import z from "zod";

export const Team = z.object({
  name: z
    .string({ error: "Team name is required" })
    .min(TEAM_NAME_MIN_LENGTH)
    .max(TEAM_NAME_MAX_LENGTH)
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
});

export type TeamType = z.infer<typeof Team>;

export class CreateTeamDto extends createZodDto(
  Team.partial({ name: true }).pick({
    name: true,
    displayName: true,
    logo: true,
    banner: true,
  }),
) {}

export type TeamViewModel = Pick<
  TeamType,
  "displayName" | "logo" | "banner" | "createdAt"
>;
