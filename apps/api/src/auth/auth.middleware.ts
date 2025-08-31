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
    if (!req.cookies["wos-session"] && !req.headers["wos-session"]) {
      console.error("no session cookie or header");
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
      return next();
    }

    try {
      const refreshRes = await session.refresh();

      if (!refreshRes.authenticated) {
        // AuthGuard will protect the endpoint
        return next();
      }

      res.cookie("wos-session", refreshRes.sealedSession, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
    } catch (error) {
      console.error(error);
      res.clearCookie("wos-session");
      // AuthGuard will protect the endpoint
    }

    next();
  }
}
