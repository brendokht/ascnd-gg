import { Injectable } from "@nestjs/common";
import { WorkOS } from "@workos-inc/node";

@Injectable()
export class AuthService {
  private readonly workos: WorkOS;
  constructor() {
    this.workos = new WorkOS(process.env.WORKOS_API_KEY, {
      clientId: process.env.WORKOS_CLIENT_ID,
    });
  }

  login(): string {
    const googleUrl = this.workos.userManagement.getAuthorizationUrl({
      provider: "GoogleOAuth",
      redirectUri: "http://localhost:8080/v1/auth/callback",
      clientId: process.env.WORKOS_CLIENT_ID,
    });

    return googleUrl;
  }

  async logout(sessionData: string): Promise<string | undefined> {
    const session = this.workos.userManagement.loadSealedSession({
      sessionData,
      cookiePassword: process.env.WORKOS_COOKIE_PASSWORD,
    });

    const test = await session.authenticate();

    if (!test.authenticated) return undefined;

    const url = await session.getLogoutUrl();

    return url;
  }

  async callback(code: string | undefined): Promise<string> {
    const authRes = await this.workos.userManagement.authenticateWithCode({
      code,
      clientId: process.env.WORKOS_CLIENT_ID,
      session: {
        sealSession: true,
        cookiePassword: process.env.WORKOS_COOKIE_PASSWORD,
      },
    });

    const { sealedSession } = authRes;

    return sealedSession;
  }
}
