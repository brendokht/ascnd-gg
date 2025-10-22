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
import { HubsService } from "./hubs.service";
import {
  CreateHubDto,
  CreateHubInviteDto,
  EditHubDto,
  type HubInviteForHubViewModel,
  type HubViewModel,
  UpdateHubInviteDto,
  type InviteUserSearchViewModel,
  HubInviteSearchQueryDto,
  HubInviteSearchParameterDto,
  HubNameParameterDto,
  HubIdParameterDto,
  HubMemberDeleteParameterDto,
  HubInviteUpdateParameterDto,
} from "@ascnd-gg/types";
import { type Request } from "express";
import type { User } from "@ascnd-gg/database";
import { Optional } from "../auth/auth.decorator";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller("hubs")
export class HubsController {
  private readonly logger = new Logger(HubsController.name);
  constructor(private readonly hubService: HubsService) {}

  @Get("/:hubId")
  @Optional()
  async getHubById(
    @Req() req: Request,
    @Param() params: HubIdParameterDto,
  ): Promise<HubViewModel> {
    const hub = await this.hubService.getHubById(
      params,
      (req["user"] as User)?.id ?? undefined,
    );

    if (!hub) {
      throw new NotFoundException();
    }

    return hub;
  }

  @Get("/slug/:hubName")
  @Optional()
  async getHubByName(
    @Req() req: Request,
    @Param() params: HubNameParameterDto,
  ): Promise<HubViewModel> {
    const hub = await this.hubService.getHubByName(
      params,
      (req["user"] as User)?.id ?? undefined,
    );

    if (!hub) {
      throw new NotFoundException();
    }

    return hub;
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
  async createHub(
    @Req() req: Request,
    @Body() createHubDto: CreateHubDto,
    @UploadedFiles()
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ): Promise<{ name: string }> {
    const createdHubName = await this.hubService.createHub(
      req["user"] as User,
      createHubDto,
      files,
    );

    return { name: createdHubName };
  }

  @Patch(":hubId")
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "logo", maxCount: 1 },
        { name: "banner", maxCount: 1 },
      ],
      { limits: { fileSize: 4 * 1024 * 1024 } },
    ),
  )
  async updateHub(
    @Req() req: Request,
    @Param() params: HubIdParameterDto,
    @Body() editHubDto: EditHubDto,
    @UploadedFiles()
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ) {
    const { name: updatedHubName } = await this.hubService.updateHub(
      req["user"] as User,
      params,
      editHubDto,
      files,
    );

    return { name: updatedHubName };
  }

  @Delete(":hubId")
  async deleteHub() {
    throw new NotImplementedException();
  }

  @Get(":hubId/invites/search")
  async searchInvitableUsers(
    @Req() req: Request,
    @Param() parmas: HubInviteSearchParameterDto,
    @Query() searchQuery: HubInviteSearchQueryDto,
  ): Promise<{
    users: Array<InviteUserSearchViewModel> | null;
    totalCount: number;
  }> {
    const user = req["user"] as User;

    const { users, totalCount } = await this.hubService.searchInvitableUsers(
      user,
      searchQuery,
      parmas,
    );

    return { users, totalCount };
  }

  @Post(":hubId/invites")
  async sendHubInvite(
    @Req() req: Request,
    @Param() parmas: HubIdParameterDto,
    @Body() createHubInviteDto: CreateHubInviteDto,
  ): Promise<HubInviteForHubViewModel> {
    const invite = await this.hubService.createHubInvite(
      req["user"] as User,
      parmas,
      createHubInviteDto,
    );

    return invite;
  }

  @Patch(":hubId/invites/:inviteId")
  async updateHubInvite(
    @Req() req: Request,
    @Param() params: HubInviteUpdateParameterDto,
    @Body() updateHubInviteDto: UpdateHubInviteDto,
  ): Promise<HubInviteForHubViewModel> {
    await this.hubService.updateHubInvite(
      req["user"] as User,
      params,
      updateHubInviteDto,
    );

    return;
  }

  @Patch(":hubId/members/:userId")
  async updateMember() {
    throw new NotImplementedException();
  }

  @Delete(":hubId/members/:userId")
  async removeMemberFromHub(
    @Req() req: Request,
    @Param() params: HubMemberDeleteParameterDto,
  ) {
    await this.hubService.removeMemberFromHub(req["user"] as User, params);
  }
}
