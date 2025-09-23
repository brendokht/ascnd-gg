import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";
import { User } from "@ascnd-gg/database";
import { MeService } from "./me.service";
import { UserTeamViewModel } from "@ascnd-gg/types";

@Controller("me")
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get("teams")
  async getCurrentUserTeams(
    @Req() req: Request,
  ): Promise<Array<UserTeamViewModel>> {
    const user: User = req["user"];

    const teams = await this.meService.getCurrentUserTeams(user.id);

    return teams;
  }
}
