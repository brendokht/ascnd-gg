import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, NextRequest } from "next/server";
import { protectedPathnames } from "./lib/protected-routes";

export async function middleware(request: NextRequest) {
  console.log("Middleware: Started");

  const response = NextResponse.next({ request });

  console.log(
    "Middleware: `request.nextUrl.pathname` is",
    request.nextUrl.pathname,
  );

  /*
   * Get the first part of the pathname
   * Ex. `/protected/dashboard` -> `/protected`
   * or: `/settings` -> `/settings`
   */
  const path = request.nextUrl.pathname.split("/")[1]
    ? `/${request.nextUrl.pathname.split("/")[1]}`
    : "/";

  console.log("Middleware: Path is", path || "empty");

  if (protectedPathnames.includes(path)) {
    console.log("Middleware: Protecting");
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      return NextResponse.redirect(
        new URL("/sign-in?unauthorized=true", request.url),
      );
    }
  }

  console.log("Middleware: Success");

  return response;
}
// TODO: Set up React Query; Ensure client side and server fetching utility is set up
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
