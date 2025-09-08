import { usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8080",
  basePath: "/v1/auth",
  plugins: [usernameClient()],
  fetchOptions: {
    onResponse: async (context) => {
      if (!context.response.ok) {
        throw new Error(
          `${context.response.url}: ${context.response.status} ${context.response.statusText}`,
        );
      }
    },
    credentials: "include",
  },
});
