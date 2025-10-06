import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";
import { User } from "@ascnd-gg/database";
import { MeService } from "./me.service";
import { TeamInviteForUserViewModel, TeamSummary } from "@ascnd-gg/types";

@Controller("me")
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get("team")
  async getCurrentUserTeams(@Req() req: Request): Promise<Array<TeamSummary>> {
    const user: User = req["user"];

    const teams = await this.meService.getCurrentUserTeams(user.id);

    return teams;
  }

  @Get("team/invite")
  async getCurrentUserTeamInvites(
    @Req() req: Request,
  ): Promise<Array<TeamInviteForUserViewModel>> {
    const user: User = req["user"];

    const teamInvites = await this.meService.getCurrentUserTeamInvites(user.id);

    return teamInvites;
  }
}
