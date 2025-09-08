import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("Middleware: Started");

  const response = NextResponse.next({ request });

  if (request.nextUrl.pathname.startsWith("/protected")) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/?unauthorized=true", request.url));
    }
  }

  console.log("Middleware: Success");

  return response;
}
// TODO: Ensure session can be refreshed in morning, continue with auth context/provider
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
