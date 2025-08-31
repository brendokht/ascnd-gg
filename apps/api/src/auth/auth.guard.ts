import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { WorkOS } from "@workos-inc/node";
import type { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly workos: WorkOS;
  constructor() {
    this.workos = new WorkOS(process.env.WORKOS_API_KEY, {
      clientId: process.env.WORKOS_CLIENT_ID,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    if (!req.cookies["wos-session"] && !req.headers["wos-session"]) {
      console.error("no session cookie or header");
      throw new UnauthorizedException();
    }

    const wosSession: string =
      (req.headers["wos-session"] as string) ??
      (req.cookies["wos-session"] as string);

    try {
      const session = this.workos.userManagement.loadSealedSession({
        sessionData: wosSession,
        cookiePassword: process.env.WORKOS_COOKIE_PASSWORD,
      });

      const authRes = await session.authenticate();

      if (authRes.authenticated) {
        req["user"] = authRes.user;
        return true;
      }
    } catch {
      throw new UnauthorizedException();
    }

    throw new UnauthorizedException();
  }
}
