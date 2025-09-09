import "dotenv/config";

import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@ascnd-gg/database";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { username } from "better-auth/plugins";

const authConfig = {
  trustedOrigins: ["http://localhost:3000"],
  basePath: "/v1/auth",
  plugins: [username({})],
  user: {
    additionalFields: {
      active: {
        type: "boolean",
        required: true,
        defaultValue: false,
        input: false,
      },
    },
  },
  databaseHooks: {
    user: {
      update: {
        before: async (userData) => {
          /*
           * Ensure that if the user has a username and displayUsername,
           * they are listed as active
           */
          if (userData["username"] && userData["displayUsername"])
            userData["active"] = true;
          return { data: { ...userData, updatedAt: new Date() } };
        },
      },
    },
  },
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
} satisfies BetterAuthOptions;

export const auth = betterAuth(authConfig) as ReturnType<
  typeof betterAuth<typeof authConfig>
>;

type Session = typeof auth.$Infer.Session;

export { toNodeHandler, fromNodeHeaders, type Session };
