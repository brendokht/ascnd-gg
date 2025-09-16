import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH } from "@ascnd-gg/constants";
import { z } from "zod";

const updateUsernameSchema = z.object({
  username: z
    .string({ error: "Username is required" })
    .min(USERNAME_MIN_LENGTH, {
      error: `Username must be at least ${USERNAME_MIN_LENGTH} characters`,
    })
    .max(USERNAME_MAX_LENGTH, {
      error: `Username must be ${USERNAME_MAX_LENGTH} characters or shorter`,
    })
    .regex(/^[a-zA-Z0-9.-_]+$/, {
      error:
        "Username can only contain alphanumeric characters, underscores, dots, and dashes",
    }),
});

export default updateUsernameSchema;
