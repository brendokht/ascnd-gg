import z from "zod";

const ApiResponse = z
  .object({
    ok: z.boolean().default(true).optional(),
    status: z
      .literal([
        200, 201, 202, 301, 302, 307, 308, 400, 401, 403, 404, 409, 429, 500,
        501,
      ])
      .default(200)
      .optional(),
    message: z.string().optional(),
    errorCode: z.string().optional(),
    data: z.unknown().optional(),
    redirect: z.url().optional(),
    redirected: z.boolean().default(false).optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
  })
  .refine((res) => !res.redirected && !res.redirect, {
    error: "Redirect URL is required when being redirected",
  });

export default ApiResponse;
