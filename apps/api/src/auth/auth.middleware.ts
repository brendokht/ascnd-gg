import { Injectable, NestMiddleware } from "@nestjs/common";
import { WorkOS } from "@workos-inc/node";
import { Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly workos: WorkOS;

  constructor() {
    this.workos = new WorkOS(process.env.WORKOS_API_KEY, {
      clientId: process.env.WORKOS_CLIENT_ID,
    });
  }

  async use(req: Request, res: Response, next: () => void) {
    const session = this.workos.userManagement.loadSealedSession({
      sessionData: req.cookies["wos-session"],
      cookiePassword: process.env.WORKOS_COOKIE_PASSWORD,
    });

    const authRes = await session.authenticate();

    if (authRes.authenticated) {
      return next();
    }

    if (
      !authRes.authenticated &&
      "reason" in authRes &&
      authRes.reason === "no_session_cookie_provided"
    ) {
      return res.redirect("http://localhost:3000/login");
    }

    try {
      const refreshRes = await session.refresh();

      if (!refreshRes.authenticated) {
        return res.redirect("/login");
      }

      res.cookie("wos-session", refreshRes.sealedSession, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });

      return res.redirect(req.originalUrl);
    } catch (error) {
      console.error(error);
      res.clearCookie("wos-session");
      res.redirect("/login");
    }

    next();
  }
}
