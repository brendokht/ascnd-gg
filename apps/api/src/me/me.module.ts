import { Module } from "@nestjs/common";
import { MeService } from "./me.service";
import { MeController } from "./me.controller";
import { AuthService } from "../auth/auth.service";
import { TeamsService } from "../teams/teams.service";

@Module({
  providers: [MeService, AuthService, TeamsService],
  controllers: [MeController],
})
export class MeModule {}
