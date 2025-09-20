import { z } from "zod";

// TODO: Set up minimum and maximum length, and regex
export const updateNameSchema = z.object({
  name: z.string({ error: "Name is required" }),
});
