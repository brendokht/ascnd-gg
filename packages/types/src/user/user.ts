import z from "zod";

const User = z.object({
  email: z.email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profilePictureUrl: z.url().optional(),
  createdAt: z.iso.datetime(),
  // TODO: Define metadata
  metadata: z.unknown().optional(),
});

export default User;
