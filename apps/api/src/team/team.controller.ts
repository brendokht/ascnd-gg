import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Req,
} from "@nestjs/common";
import { TeamService } from "./team.service";
import { CreateTeamDto, TeamViewModel } from "@ascnd-gg/types";
import { Request } from "express";
import { User } from "@ascnd-gg/database";
import { Optional } from "../auth/auth.decorator";

@Controller("team")
export class TeamController {
  private readonly logger = new Logger(TeamController.name);
  constructor(private readonly teamService: TeamService) {}

  @Get(":name")
  @Optional()
  async getTeamByName(
    @Req() req: Request,
    @Param() parmas: { name: string },
  ): Promise<TeamViewModel> {
    const team = await this.teamService.getTeamByName(
      parmas.name,
      (req["user"] as User)?.id ?? undefined,
    );

    if (!team) {
      throw new NotFoundException();
    }

    return team;
  }

  @Post()
  async createTeam(
    @Req() req: Request,
    @Body() createTeamDto: CreateTeamDto,
  ): Promise<{ name: string }> {
    const createdTeamName = await this.teamService.createTeam(
      req["user"] as User,
      createTeamDto,
    );

    return { name: createdTeamName };
  }
}
