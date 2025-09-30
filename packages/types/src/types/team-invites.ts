import * as z from "zod";
import { Team } from "./team";
import { User } from "./user";

const TeamInviteStatus = [
  "Pending",
  "Declined",
  "Cancelled",
  "Accepted",
] as const;

export const TeamInvite = z.object({
  status: z.enum(TeamInviteStatus),
  team: Team.pick({ displayName: true, logo: true }).optional(),
  user: User.pick({
    displayUsername: true,
    profilePictureUrl: true,
  }).optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type TeamInviteType = z.infer<typeof TeamInvite>;

export type TeamInviteViewModel = Pick<
  TeamInviteType,
  "status" | "team" | "user" | "createdAt"
>;
