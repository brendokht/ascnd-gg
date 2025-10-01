import { Module } from "@nestjs/common";
import { MeService } from "./me.service";
import { MeController } from "./me.controller";
import { AuthService } from "../auth/auth.service";
import { InviteService } from "../invite/invite.service";

@Module({
  providers: [MeService, AuthService, InviteService],
  controllers: [MeController],
})
export class MeModule {}
