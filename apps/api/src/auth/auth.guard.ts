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
    console.log("AuthGuard: started");
    const req = context.switchToHttp().getRequest<Request>();

    const authState = req["authState"];

    if (!authState || !authState.authenticated || authState.refresh) {
      console.error("AuthGuard: authState is invalid");
      throw new UnauthorizedException("Session invalid");
    }

    console.log("AuthGuard: Passing user into current request");
    req["user"] = authState.user;

    console.error("AuthGuard: Success");
    return true;
  }
}
