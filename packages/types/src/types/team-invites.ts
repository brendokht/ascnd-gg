import * as z from "zod";
import { Team } from "./team";

const TeamInviteStatus = [
  "PENDING",
  "DECLINED",
  "CANCELLED",
  "ACCEPTED",
] as const;

export const TeamInvite = z.object({
  status: z.enum(TeamInviteStatus),
  team: Team.pick({ displayName: true, logo: true }).optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  isInvited: z.boolean().prefault(false).optional(),
});

export type TeamInviteType = z.infer<typeof TeamInvite>;

export type TeamInviteViewModel = Pick<
  TeamInviteType,
  "status" | "team" | "createdAt"
>;
