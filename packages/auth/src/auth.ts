import "dotenv/config";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@ascnd-gg/database";
import { username } from "better-auth/plugins";
import { toNodeHandler } from "better-auth/node";

export const auth: BetterAuthType = betterAuth({
  trustedOrigins: ["http://localhost:3000"],
  plugins: [username()],
  basePath: "/v1/auth",
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 10 * 60,
    },
  },
});

export type BetterAuthType = ReturnType<typeof betterAuth>;

export { toNodeHandler };
