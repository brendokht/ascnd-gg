import {
  Body,
  Controller,
  Get,
  Logger,
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
  private readonly logger = new Logger(TeamController.name);
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
  async createTeam(
    @Req() req: Request,
    @Body() createTeamDto: CreateTeamDto,
  ): Promise<{ name: string }> {
    this.logger.log("TeamController.createTeam(): Starting");
    this.logger.log('TeamController.createTeam(): req["user"] =', req["user"]);
    this.logger.log(
      "TeamController.createTeam(): createTeamDto =",
      createTeamDto,
    );

    const createdTeamName = await this.teamService.createTeam(
      req["user"] as User,
      createTeamDto,
    );

    this.logger.log(
      "TeamController.createTeam(): createdTeamName =",
      createdTeamName,
    );

    return { name: createdTeamName };
  }
}
