import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });

  if (request.nextUrl.pathname.startsWith("/protected")) {
    if (!request.cookies.has("wos-session")) {
      console.error("middleware: no session");
      return NextResponse.redirect(new URL("/?unauthorized=true", request.url));
    } else {
      const authRes = await fetch("http://localhost:8080/v1/auth/me", {
        method: "GET",
        credentials: "include",
        headers: {
          "wos-session": request.cookies.get("wos-session")!.value,
        },
      });

      if (!authRes.ok) {
        console.error("middleware: authRes is not ok");
        if (authRes.status === 401) {
          console.error("middleware: user is unauthorized");
        } else if (authRes.status === 500) {
          console.error("middleware: authRes code 500; something went wrong");
        }
        return NextResponse.redirect(
          new URL("/?unauthorized=true", request.url),
        );
      }
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
