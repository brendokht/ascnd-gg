"use server";

import { auth } from "@ascnd-gg/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/*
 * TODO: Cache this response using "use cache"
 * https://nextjs.org/docs/app/api-reference/directives/use-cache
 */
export async function validateSession() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in?unauthorized=true");
  }

  return session;
}
