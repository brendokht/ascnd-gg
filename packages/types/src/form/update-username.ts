import { z } from "zod";

// TODO: Set up constants package
const MIN_LENGTH = 3;
const MAX_LENGTH = 30;

// TODO: Set up validation Regex to ensure proper characters
const updateUsernameSchema = z.object({
  username: z
    .string({ error: "Username is required" })
    .min(MIN_LENGTH, {
      error: `Username must be at least ${MIN_LENGTH} characters`,
    })
    .max(MAX_LENGTH, {
      error: `Username must be ${MAX_LENGTH} characters or shorter`,
    })
    .regex(/^[a-zA-Z0-9.-_]+$/, {
      error:
        "Username can only contain alphanumeric characters, underscores, dots, and dashes",
    }),
});

export default updateUsernameSchema;
