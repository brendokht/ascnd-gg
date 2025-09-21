import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { TeamService } from "./team.service";
import { CreateTeamDto, TeamViewModel } from "@ascnd-gg/types";
import { Request } from "express";
import { AuthGuard } from "../auth/auth.guard";
import { User } from "@ascnd-gg/database";

@Controller("team")
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get(":name")
  async getTeamByName(
    @Param() parmas: { name: string },
  ): Promise<TeamViewModel> {
    const team = await this.teamService.getTeamByName(parmas.name);

    if (!team) {
      throw new NotFoundException();
    }

    return team;
  }

  @UseGuards(AuthGuard)
  @Post()
  async createTeam(@Req() req: Request, @Body() createTeamDto: CreateTeamDto) {
    await this.teamService.createTeam(req["user"] as User, createTeamDto);
  }
}
