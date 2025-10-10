import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";
import type { User } from "@ascnd-gg/database";
import { MeService } from "./me.service";
import {
  HubInviteForUserViewModel,
  HubSummary,
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

  @Get("hubs")
  async getCurrentUserHubs(@Req() req: Request): Promise<Array<HubSummary>> {
    const user: User = req["user"];

    const hubs = await this.meService.getCurrentUserHubs(user.id);

    return hubs;
  }

  @Get("teams/invites")
  async getCurrentUserTeamInvites(
    @Req() req: Request,
  ): Promise<Array<TeamInviteForUserViewModel>> {
    const user: User = req["user"];

    const teamInvites = await this.meService.getCurrentUserTeamInvites(user.id);

    return teamInvites;
  }

  @Get("hubs/invites")
  async getCurrentUserHubInvites(
    @Req() req: Request,
  ): Promise<Array<HubInviteForUserViewModel>> {
    const user: User = req["user"];

    const hubInvites = await this.meService.getCurrentUserHubInvites(user.id);

    return hubInvites;
  }
}
