import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { HttpAdapterHost } from "@nestjs/core";
import { toNodeHandler } from "@ascnd-gg/auth/src/auth";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {
  constructor(
    private readonly adapter: HttpAdapterHost,
    private readonly authService: AuthService,
  ) {
    this.adapter.httpAdapter.enableCors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    });
    this.adapter.httpAdapter.all(
      `/v1/auth/{*any}`,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      toNodeHandler(authService.client),
    );
  }
}
