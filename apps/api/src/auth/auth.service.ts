import { Injectable } from "@nestjs/common";
import { auth } from "@ascnd-gg/auth";

@Injectable()
export class AuthService {
  readonly client: typeof auth;

  constructor() {
    this.client = auth;
  }
}
