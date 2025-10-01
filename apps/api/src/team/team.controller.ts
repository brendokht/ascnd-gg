import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { TeamService } from "./team.service";
import {
  CreateTeamDto,
  CreateTeamInviteDto,
  EditTeamDto,
  TeamInviteViewModel,
  TeamViewModel,
  UpdateTeamInviteDto,
} from "@ascnd-gg/types";
import { Request } from "express";
import { User } from "@ascnd-gg/database";
import { Optional } from "../auth/auth.decorator";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { InviteService } from "../invite/invite.service";

@Controller("team")
export class TeamController {
  private readonly logger = new Logger(TeamController.name);
  constructor(
    private readonly teamService: TeamService,
    private readonly inviteService: InviteService,
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

  @Put()
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
    @Body() editTeamDto: EditTeamDto,
    @UploadedFiles()
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ) {
    const updatedTeamName = await this.teamService.updateTeam(
      req["user"] as User,
      editTeamDto,
      files,
    );

    return { name: updatedTeamName };
  }

  // TODO: Create TeamRoles guard to ensure proper users can perform specfic actions

  // TODO: Allow input for invite status
  @Get("invite:name")
  async getTeamInvites(
    @Param() params: { name: string },
  ): Promise<Array<TeamInviteViewModel>> {
    const invites = await this.inviteService.getTeamInvitesForTeam(
      "PENDING",
      params.name,
    );

    return invites;
  }

  @Post("invite")
  async sendTeamInvite(
    @Req() req: Request,
    @Body() createTeamInviteDto: CreateTeamInviteDto,
  ): Promise<TeamInviteViewModel> {
    const invite =
      await this.inviteService.createTeamInvite(createTeamInviteDto);

    return invite;
  }

  @Put("invite")
  async updateTeamInvite(
    @Body() updateTeamInviteDto: UpdateTeamInviteDto,
  ): Promise<TeamInviteViewModel> {
    await this.inviteService.updateTeamInvite(updateTeamInviteDto);

    return;
  }
}
