import { Injectable } from "@nestjs/common";
import { auth, type BetterAuthType } from "@ascnd-gg/auth/src/auth";

@Injectable()
export class AuthService {
  readonly client: BetterAuthType;

  constructor() {
    this.client = auth;
  }
}
