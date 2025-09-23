import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { fromNodeHeaders } from "@ascnd-gg/auth";
import { IncomingHttpHeaders } from "http";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { Optional, Public } from "./auth.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const session = await this.authService.client.api.getSession({
      headers: fromNodeHeaders(req.headers as IncomingHttpHeaders),
    });
    req["session"] = session?.session;
    req["user"] = session?.user ?? null;

    const isPublic = this.reflector.getAllAndOverride<boolean>(Public, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const isOptional = this.reflector.getAllAndOverride<boolean>(Optional, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isOptional && !session) return true;

    // using ["active"] due to issues with type inference
    if (!session || !session.user["active"]) throw new UnauthorizedException();

    return true;
  }
}
