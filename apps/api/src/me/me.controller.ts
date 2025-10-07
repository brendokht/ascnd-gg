import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";
import type { User } from "@ascnd-gg/database";
import { MeService } from "./me.service";
import {
  type TeamInviteForUserViewModel,
  type TeamSummary,
} from "@ascnd-gg/types";

@Controller("me")
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get("teams")
  async getCurrentUserTeams(@Req() req: Request): Promise<Array<TeamSummary>> {
    const user: User = req["user"];

    const teams = await this.meService.getCurrentUserTeams(user.id);

    return teams;
  }

  @Get("teams/invites")
  async getCurrentUserTeamInvites(
    @Req() req: Request,
  ): Promise<Array<TeamInviteForUserViewModel>> {
    const user: User = req["user"];

    const teamInvites = await this.meService.getCurrentUserTeamInvites(user.id);

    return teamInvites;
  }
}
