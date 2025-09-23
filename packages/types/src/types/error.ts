import z from "zod";

export const ApiError = z.object({
  statusCode: z
    .literal([301, 302, 307, 308, 400, 401, 403, 404, 409, 429, 500, 501])
    .default(500),
  error: z.string(),
  message: z.string().optional(),
});

export type ApiErrorType = z.infer<typeof ApiError>;
