import z from "zod";

const User = z.object({
  email: z.email(),
  // Optional because user will pick username initially
  username: z.string().min(3).max(30).nullish(),
  displayUsername: z.string().min(3).max(30).nullish(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profilePictureUrl: z.url().optional(),
  createdAt: z.iso.datetime(),
  // TODO: Define metadata
  metadata: z.unknown().optional(),
});

export default User;
