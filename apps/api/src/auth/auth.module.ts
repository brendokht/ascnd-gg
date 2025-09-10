import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { HttpAdapterHost } from "@nestjs/core";
import { toNodeHandler } from "@ascnd-gg/auth";
import { CORS_OPTIONS } from "@ascnd-gg/constants";

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
    this.adapter.httpAdapter.enableCors(CORS_OPTIONS);
    this.adapter.httpAdapter.all(
      `/v1/auth/{*any}`,
      toNodeHandler(authService.client),
    );
  }
}
