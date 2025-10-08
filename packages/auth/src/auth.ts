import "dotenv/config";

import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@ascnd-gg/database";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { username } from "better-auth/plugins";
import {
  DISPLAY_USERNAME_REGEX,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_REGEX,
} from "@ascnd-gg/constants";
import { redis } from "@ascnd-gg/redis";

const authConfig = {
  trustedOrigins: ["http://localhost:3000"],
  basePath: "/v1/auth",
  plugins: [
    username({
      usernameValidator: (username) => {
        return USERNAME_REGEX.test(username);
      },
      displayUsernameValidator(displayUsername) {
        return DISPLAY_USERNAME_REGEX.test(displayUsername);
      },
      minUsernameLength: USERNAME_MIN_LENGTH,
      maxUsernameLength: USERNAME_MAX_LENGTH,
    }),
  ],
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
  secondaryStorage: {
    get: async (key) => {
      return await redis.get(key);
    },
    set: async (key, value, ttl) => {
      if (ttl) await redis.set(key, value, "EX", ttl);
      else await redis.set(key, value);
    },
    delete: async (key) => {
      await redis.del(key);
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
          return { data: { ...userData } };
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
  advanced: {
    database: { generateId: false },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 10 * 60,
    },
  },
} satisfies BetterAuthOptions;

export const auth = betterAuth(authConfig);

export type Session = typeof auth.$Infer.Session;

export { toNodeHandler, fromNodeHeaders };
