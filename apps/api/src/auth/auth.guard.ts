import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { fromNodeHeaders } from "@ascnd-gg/auth";
import { IncomingHttpHeaders } from "http";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const session = await this.authService.client.api.getSession({
      headers: fromNodeHeaders(req.headers as IncomingHttpHeaders),
    });
    req["session"] = session?.session;
    req["user"] = session?.user ?? null;

    // using ["active"] due to issues with type inference
    if (!session || !session.user["active"]) throw new UnauthorizedException();

    return true;
  }
}
