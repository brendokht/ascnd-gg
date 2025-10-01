import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateTeamInviteDto,
  TeamInviteType,
  TeamInviteViewModel,
  UpdateTeamInviteDto,
} from "@ascnd-gg/types";
import { TeamInviteStatus } from "@ascnd-gg/database";

@Injectable()
export class InviteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTeamInvitesForUser(
    status: TeamInviteStatus,
    userId: string,
  ): Promise<Array<TeamInviteViewModel>> {
    const invitesSelect = await this.prismaService.teamInvite.findMany({
      where: {
        userId: userId,
        status: {
          equals: status,
        },
      },
      select: {
        status: true,
        createdAt: true,
        team: {
          select: {
            displayName: true,
            logo: true,
          },
        },
      },
    });

    const teamInvites: Array<TeamInviteViewModel> = invitesSelect.map(
      (teamInvite) => {
        return {
          team: {
            displayName: teamInvite.team.displayName,
            logo: teamInvite.team.logo,
          },
          status: teamInvite.status as TeamInviteType["status"],
          createdAt: teamInvite.createdAt.toISOString(),
        };
      },
    );

    return teamInvites;
  }

  async getTeamInvitesForTeam(
    status: TeamInviteStatus,
    teamName: string,
  ): Promise<Array<TeamInviteViewModel>> {
    const invitesSelect = await this.prismaService.teamInvite.findMany({
      where: {
        team: {
          name: teamName,
        },
        status: {
          equals: status,
        },
      },
      select: {
        status: true,
        createdAt: true,
        user: {
          select: {
            displayUsername: true,
            image: true,
          },
        },
      },
    });

    const teamInvites: Array<TeamInviteViewModel> = invitesSelect.map(
      (teamInvite) => {
        return {
          user: {
            displayUsername: teamInvite.user.displayUsername,
            logo: teamInvite.user.image,
          },
          status: teamInvite.status as TeamInviteType["status"],
          createdAt: teamInvite.createdAt.toISOString(),
        };
      },
    );

    return teamInvites;
  }

  async createTeamInvite(
    createTeamInviteDto: CreateTeamInviteDto,
  ): Promise<TeamInviteViewModel> {
    const inviteCreation = await this.prismaService.teamInvite.create({
      data: {
        status: "PENDING",
        team: {
          connect: {
            name: createTeamInviteDto.teamName,
          },
        },
        user: {
          connect: {
            username: createTeamInviteDto.username,
          },
        },
      },
      select: {
        createdAt: true,
        user: {
          select: {
            displayUsername: true,
            image: true,
          },
        },
      },
    });

    const invite: TeamInviteViewModel = {
      status: "Pending",
      user: {
        displayUsername: inviteCreation.user.displayUsername,
        profilePictureUrl: inviteCreation.user.image,
      },
      createdAt: inviteCreation.createdAt.toISOString(),
    };

    return invite;
  }

  async updateTeamInvite(updateTeamInviteDto: UpdateTeamInviteDto) {
    let newInviteStatus: TeamInviteType["status"];
    if (updateTeamInviteDto.accepted === true) {
      newInviteStatus = "Accepted";
    } else if (updateTeamInviteDto.accepted === false) {
      newInviteStatus = "Declined";
    } else if (updateTeamInviteDto.cancelled === true) {
      newInviteStatus = "Cancelled";
    } else {
      newInviteStatus = undefined;
    }

    const user = await this.prismaService.user.findUnique({
      where: { username: updateTeamInviteDto.username },
      select: { id: true },
    });

    const team = await this.prismaService.team.findUnique({
      where: { name: updateTeamInviteDto.teamName },
      select: { id: true },
    });

    await this.prismaService.teamInvite.update({
      data: {
        status: newInviteStatus as TeamInviteStatus | undefined,
      },
      where: {
        teamId_userId: {
          teamId: team.id,
          userId: user.id,
        },
      },
    });

    return;
  }
}
