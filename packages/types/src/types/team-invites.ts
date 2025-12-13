import * as z from "zod";
import { TeamSummarySchema } from "./team";
import { InviteStatus } from "@ascnd-gg/database/browser";
import { UserSummarySchema } from "./user";

export const TeamInviteSchema = z.object({
  id: z.uuidv7({ error: "Team invite ID is requied." }).trim(),
  status: z.enum(InviteStatus, { error: "Team invite status is required." }),
  get user() {
    return UserSummarySchema;
  },
  get team() {
    return TeamSummarySchema;
  },
  createdAt: z.iso.datetime({
    error: "Team invitation creation date is required.",
  }),
});

export const TeamInviteForUserViewModelSchema = TeamInviteSchema.omit({
  user: true,
});

export const TeamInviteForTeamViewModelSchema = TeamInviteSchema.omit({
  team: true,
});

export type TeamInvite = z.infer<typeof TeamInviteSchema>;

export type TeamInviteForUserViewModel = z.infer<
  typeof TeamInviteForUserViewModelSchema
>;

export type TeamInviteForTeamViewModel = z.infer<
  typeof TeamInviteForTeamViewModelSchema
>;
