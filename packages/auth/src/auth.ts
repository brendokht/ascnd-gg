import "dotenv/config";

import { betterAuth, type Session } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@ascnd-gg/database";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { username } from "better-auth/plugins";

type Auth = ReturnType<typeof betterAuth>;

export const auth: Auth = betterAuth({
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

export { toNodeHandler, fromNodeHeaders, type Session };
