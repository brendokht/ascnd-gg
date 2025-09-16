import { z } from "zod";

// TODO: Set up minimum and maximum length, and regex
const updateNameSchema = z.object({
  name: z.string({ error: "Name is required" }),
});

export default updateNameSchema;
