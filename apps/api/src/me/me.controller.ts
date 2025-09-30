import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";
import { User } from "@ascnd-gg/database";
import { MeService } from "./me.service";
import { TeamInviteViewModel, UserTeamViewModel } from "@ascnd-gg/types";

@Controller("me")
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get("team")
  async getCurrentUserTeams(
    @Req() req: Request,
  ): Promise<Array<UserTeamViewModel>> {
    const user: User = req["user"];

    const teams = await this.meService.getCurrentUserTeams(user.id);

    return teams;
  }

  @Get("team/invite")
  async getCurrentUserTeamInvites(
    @Req() req: Request,
  ): Promise<Array<TeamInviteViewModel>> {
    const user: User = req["user"];

    const teamInvites = await this.meService.getCurrentUserTeamInvites(user.id);

    return teamInvites;
  }
}
