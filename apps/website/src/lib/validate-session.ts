"use server";

import { auth } from "@ascnd-gg/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function validateSession() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in?unauthorized=true");
  }

  return session;
}
