import { Module } from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { TeamsController } from "./teams.controller";
import { AuthService } from "../auth/auth.service";
import { InvitesService } from "../invites/invites.service";

@Module({
  providers: [TeamsService, AuthService, InvitesService],
  controllers: [TeamsController],
})
export class TeamModule {}
