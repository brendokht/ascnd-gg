import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { WorkOS } from "@workos-inc/node";
import type { Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly workos: WorkOS;

  constructor() {
    this.workos = new WorkOS(process.env.WORKOS_API_KEY, {
      clientId: process.env.WORKOS_CLIENT_ID,
    });
  }

  /*
   * This middleware simply tries to refresh the session if needed,
   * the AuthGuard is responsible for protecting API endpoints
   */

  async use(req: Request, res: Response, next: () => void) {
    console.log("AuthMiddleware: Started");
    if (!req.cookies["wos-session"] && !req.headers["wos-session"]) {
      console.error("AuthMiddleware: No session cookie or header");
      throw new UnauthorizedException();
    }

    const wosSession: string =
      (req.headers["wos-session"] as string) ??
      (req.cookies["wos-session"] as string);

    const session = this.workos.userManagement.loadSealedSession({
      sessionData: wosSession,
      cookiePassword: process.env.WORKOS_COOKIE_PASSWORD,
    });

    const authRes = await session.authenticate();

    if (authRes.authenticated) {
      console.log("AuthMiddleware: authRes.user", authRes.user);
      console.log("AuthMiddleware: Authenticated");
      req["authState"] = {
        refresh: false,
        authenticated: true,
        user: authRes.user,
        sessionData: wosSession,
      };
      return next();
    }

    try {
      console.log("AuthMiddleware: Refreshing session");

      const refreshRes = await session.refresh();

      if (!refreshRes.authenticated) {
        console.log("AuthMiddleware: Not authenticated");
        // AuthGuard will protect the endpoint
        return next();
      }

      console.log("AuthMiddleware: Updating cookie");

      res.cookie("wos-session", refreshRes.sealedSession, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      req["authState"] = {
        refresh: true,
        authenticated: true,
        user: refreshRes.user,
        sessionData: refreshRes.sealedSession,
      };
    } catch (error) {
      console.error(error);
      console.log("AuthMiddleware: Caught error");
      res.clearCookie("wos-session");
      // AuthGuard will protect the endpoint
    }

    console.log("AuthMiddleware: Moving to next");
    next();
  }
}
