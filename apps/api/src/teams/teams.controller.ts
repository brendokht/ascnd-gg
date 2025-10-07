import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Patch,
  Req,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { TeamsService } from "./teams.service";
import {
  CreateTeamDto,
  CreateTeamInviteDto,
  EditTeamDto,
  type TeamInviteForTeamViewModel,
  type TeamViewModel,
  UpdateTeamInviteDto,
} from "@ascnd-gg/types";
import { type Request } from "express";
import type { User } from "@ascnd-gg/database";
import { Optional } from "../auth/auth.decorator";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { InvitesService } from "../invites/invites.service";

@Controller("teams")
export class TeamsController {
  private readonly logger = new Logger(TeamsController.name);
  constructor(
    private readonly teamService: TeamsService,
    private readonly inviteService: InvitesService,
  ) {}

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
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "logo", maxCount: 1 },
        { name: "banner", maxCount: 1 },
      ],
      { limits: { fileSize: 4 * 1024 * 1024 } },
    ),
  )
  async createTeam(
    @Req() req: Request,
    @Body() createTeamDto: CreateTeamDto,
    @UploadedFiles()
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ): Promise<{ name: string }> {
    const createdTeamName = await this.teamService.createTeam(
      req["user"] as User,
      createTeamDto,
      files,
    );

    return { name: createdTeamName };
  }

  @Patch(":teamId")
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "logo", maxCount: 1 },
        { name: "banner", maxCount: 1 },
      ],
      { limits: { fileSize: 4 * 1024 * 1024 } },
    ),
  )
  async updateTeam(
    @Req() req: Request,
    @Param() parmas: { teamId: string },
    @Body() editTeamDto: EditTeamDto,
    @UploadedFiles()
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ) {
    const { name: updatedTeamName } = await this.teamService.updateTeam(
      req["user"] as User,
      parmas.teamId,
      editTeamDto,
      files,
    );

    return { name: updatedTeamName };
  }

  // TODO: Create TeamRoles guard to ensure proper users can perform specfic actions

  @Post(":teamId/invites")
  async sendTeamInvite(
    @Req() req: Request,
    @Param() parmas: { teamId: string },
    @Body() createTeamInviteDto: CreateTeamInviteDto,
  ): Promise<TeamInviteForTeamViewModel> {
    const invite = await this.inviteService.createTeamInvite(
      req["user"] as User,
      parmas.teamId,
      createTeamInviteDto,
    );

    return invite;
  }

  // TODO: Put teamId as param
  @Patch(":teamId/invites/:inviteId")
  async updateTeamInvite(
    @Req() req: Request,
    @Param() parmas: { teamId: string; inviteId: string },
    @Body() updateTeamInviteDto: UpdateTeamInviteDto,
  ): Promise<TeamInviteForTeamViewModel> {
    await this.inviteService.updateTeamInvite(
      req["user"] as User,
      parmas.teamId,
      parmas.inviteId,
      updateTeamInviteDto,
    );

    return;
  }

  // TODO: Put teamId as param
  @Delete(":teamId/members/:userId")
  async removeUserFromTeam(
    @Req() req: Request,
    @Param() parmas: { teamId: string; userId: string },
  ) {
    // TODO: RBAC
    await this.teamService.removeMemberFromTeam(
      req["user"] as User,
      parmas.teamId,
      parmas.userId,
    );
  }
}
