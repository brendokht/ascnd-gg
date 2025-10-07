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
  Query,
  NotImplementedException,
} from "@nestjs/common";
import { TeamsService } from "./teams.service";
import {
  CreateTeamDto,
  CreateTeamInviteDto,
  EditTeamDto,
  type TeamInviteForTeamViewModel,
  type TeamViewModel,
  UpdateTeamInviteDto,
  type InviteUserSearchViewModel,
  TeamInviteSearchQueryDto,
  TeamInviteSearchParameterDto,
  TeamNameParameterDto,
  TeamIdParameterDto,
  TeamMemberDeleteParameterDto,
  TeamInviteUpdateParameterDto,
} from "@ascnd-gg/types";
import { type Request } from "express";
import type { User } from "@ascnd-gg/database";
import { Optional } from "../auth/auth.decorator";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller("teams")
export class TeamsController {
  private readonly logger = new Logger(TeamsController.name);
  constructor(private readonly teamService: TeamsService) {}

  @Get(":name")
  @Optional()
  async getTeamByName(
    @Req() req: Request,
    @Param() params: TeamNameParameterDto,
  ): Promise<TeamViewModel> {
    const teamName: string = params.name;

    const team = await this.teamService.getTeamByName(
      teamName,
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
    @Param() params: TeamIdParameterDto,
    @Body() editTeamDto: EditTeamDto,
    @UploadedFiles()
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ) {
    const teamId: string = params.teamId;
    const { name: updatedTeamName } = await this.teamService.updateTeam(
      req["user"] as User,
      teamId,
      editTeamDto,
      files,
    );

    return { name: updatedTeamName };
  }

  @Delete(":teamId")
  async deleteTeam() {
    throw new NotImplementedException();
  }

  // TODO: Create TeamRoles guard to ensure proper users can perform specfic actions

  @Get(":teamId/invites/search")
  async searchInvitableUsers(
    @Req() req: Request,
    @Param() parmas: TeamInviteSearchParameterDto,
    @Query() searchQuery: TeamInviteSearchQueryDto,
  ): Promise<{
    users: Array<InviteUserSearchViewModel> | null;
    totalCount: number;
  }> {
    const user = req["user"] as User;

    const { users, totalCount } = await this.teamService.searchInvitableUsers(
      user,
      searchQuery,
      parmas,
    );

    return { users, totalCount };
  }

  @Post(":teamId/invites")
  async sendTeamInvite(
    @Req() req: Request,
    @Param() parmas: TeamIdParameterDto,
    @Body() createTeamInviteDto: CreateTeamInviteDto,
  ): Promise<TeamInviteForTeamViewModel> {
    const teamId: string = parmas.teamId;

    const invite = await this.teamService.createTeamInvite(
      req["user"] as User,
      teamId,
      createTeamInviteDto,
    );

    return invite;
  }

  @Patch(":teamId/invites/:inviteId")
  async updateTeamInvite(
    @Req() req: Request,
    @Param() params: TeamInviteUpdateParameterDto,
    @Body() updateTeamInviteDto: UpdateTeamInviteDto,
  ): Promise<TeamInviteForTeamViewModel> {
    const { teamId, inviteId }: { teamId: string; inviteId: string } = params;

    await this.teamService.updateTeamInvite(
      req["user"] as User,
      teamId,
      inviteId,
      updateTeamInviteDto,
    );

    return;
  }

  @Patch(":teamId/members/:userId")
  async updateMember() {
    throw new NotImplementedException();
  }

  @Delete(":teamId/members/:userId")
  async removeMemberFromTeam(
    @Req() req: Request,
    @Param() params: TeamMemberDeleteParameterDto,
  ) {
    const { teamId, userId }: { teamId: string; userId: string } = params;
    // TODO: RBAC
    await this.teamService.removeMemberFromTeam(
      req["user"] as User,
      teamId,
      userId,
    );
  }
}
