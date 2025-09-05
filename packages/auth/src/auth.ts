import "dotenv/config";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@ascnd-gg/database";
import { toNodeHandler } from "better-auth/node";
import { username } from "better-auth/plugins";

export const auth = betterAuth({
  trustedOrigins: ["http://localhost:3000"],
  basePath: "/v1/auth",
  plugins: [username()],
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

export { toNodeHandler };
