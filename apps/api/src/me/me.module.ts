import { Module } from "@nestjs/common";
import { MeService } from "./me.service";
import { MeController } from "./me.controller";
import { AuthService } from "../auth/auth.service";
import { InvitesService } from "../invites/invites.service";

@Module({
  providers: [MeService, AuthService, InvitesService],
  controllers: [MeController],
})
export class MeModule {}
