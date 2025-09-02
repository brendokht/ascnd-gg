import { ApiResponse } from "@ascnd-gg/types/api";
import { NextResponse, NextRequest } from "next/server";
import z from "zod";

export async function middleware(request: NextRequest) {
  console.log("Middleware: Started");

  const response = NextResponse.next({ request });

  if (request.nextUrl.pathname.startsWith("/protected")) {
    if (!request.cookies.has("wos-session")) {
      console.error("Middleware: No session");
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
        console.log("Middleware: authRes is not ok, forwarding to refresh");
        try {
          console.log("Middleware: Refresh starting");

          const refreshRes = await fetch(
            "http://localhost:8080/v1/auth/refresh",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "wos-session": request.cookies.get("wos-session")!.value,
              },
            },
          );

          if (refreshRes.ok) {
            console.log("Middleware: refreshRes is ok");

            const { data }: z.infer<typeof ApiResponse> =
              await refreshRes.json();

            response.cookies.set("wos-session", data.session, {
              path: "/",
              httpOnly: true,
              secure: true,
              sameSite: "none",
            });
          } else {
            console.log(`Middleware: Redirecting home`);

            return NextResponse.redirect(
              new URL("/?unauthorized=true", request.url),
            );
          }
        } catch (error) {
          console.error(error);
          console.error(`Middleware: Redirecting home`);
          return NextResponse.redirect(
            new URL("/?unauthorized=true", request.url),
          );
        }
      }
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
