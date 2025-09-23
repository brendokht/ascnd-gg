import { Module } from "@nestjs/common";
import { MeService } from "./me.service";
import { MeController } from "./me.controller";
import { AuthService } from "../auth/auth.service";

@Module({
  providers: [MeService, AuthService],
  controllers: [MeController],
})
export class MeModule {}
