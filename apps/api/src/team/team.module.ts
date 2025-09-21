import { Module } from "@nestjs/common";
import { TeamService } from "./team.service";
import { TeamController } from "./team.controller";
import { AuthService } from "../auth/auth.service";

@Module({
  providers: [TeamService, AuthService],
  controllers: [TeamController],
})
export class TeamModule {}
