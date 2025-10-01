import { Module } from "@nestjs/common";
import { TeamService } from "./team.service";
import { TeamController } from "./team.controller";
import { AuthService } from "../auth/auth.service";
import { InviteService } from "../invite/invite.service";

@Module({
  providers: [TeamService, AuthService, InviteService],
  controllers: [TeamController],
})
export class TeamModule {}
