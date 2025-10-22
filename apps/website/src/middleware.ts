import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, NextRequest } from "next/server";
import { protectedPathnames } from "./lib/protected-routes";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });

  /*
   * Get the first part of the pathname
   * Ex. `/protected/dashboard` -> `/protected`
   * or: `/settings` -> `/settings`
   */
  const path = request.nextUrl.pathname.split("/")[1]
    ? `/${request.nextUrl.pathname.split("/")[1]}`
    : "/";

  if (protectedPathnames.includes(path)) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      return NextResponse.redirect(
        new URL("/sign-in?unauthorized=true", request.url),
      );
    }
  }

  return response;
}
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
