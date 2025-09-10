import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@ascnd-gg/constants";
import z from "zod";

const User = z.object({
  email: z.email(),
  // Optional because user will pick username initially
  username: z
    .string()
    .min(USERNAME_MIN_LENGTH)
    .max(USERNAME_MAX_LENGTH)
    .nullish(),
  displayUsername: z
    .string()
    .min(USERNAME_MIN_LENGTH)
    .max(USERNAME_MAX_LENGTH)
    .nullish(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profilePictureUrl: z.url().optional(),
  createdAt: z.iso.datetime(),
  // TODO: Define metadata
  metadata: z.unknown().optional(),
});

export default User;
