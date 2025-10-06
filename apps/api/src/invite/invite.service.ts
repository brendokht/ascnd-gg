import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateTeamInviteDto,
  TeamInviteForTeamViewModel,
  TeamInviteForUserViewModel,
  UpdateTeamInviteDto,
} from "@ascnd-gg/types";
import { TeamInviteStatus } from "@ascnd-gg/database";

@Injectable()
export class InviteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTeamInvitesForUser(
    status: TeamInviteStatus,
    userId: string,
  ): Promise<Array<TeamInviteForUserViewModel>> {
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
            id: true,
            name: true,
            displayName: true,
            logo: true,
            teamOwnerId: true,
          },
        },
      },
    });

    const teamInvites: Array<TeamInviteForUserViewModel> = invitesSelect.map(
      (teamInvite) => {
        return {
          team: {
            id: teamInvite.team.id,
            name: teamInvite.team.name,
            displayName: teamInvite.team.displayName,
            logo: teamInvite.team.logo,
          },
          status: teamInvite.status,
          createdAt: teamInvite.createdAt.toISOString(),
        };
      },
    );

    return teamInvites;
  }

  async getTeamInvitesForTeam(
    status: TeamInviteStatus,
    teamName: string,
  ): Promise<Array<TeamInviteForTeamViewModel>> {
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
            id: true,
            username: true,
            displayUsername: true,
            image: true,
          },
        },
      },
    });

    const teamInvites: Array<TeamInviteForTeamViewModel> = invitesSelect.map(
      (teamInvite) => {
        return {
          user: {
            id: teamInvite.user.id,
            username: teamInvite.user.username,
            displayUsername: teamInvite.user.displayUsername,
            logo: teamInvite.user.image,
          },
          status: teamInvite.status,
          createdAt: teamInvite.createdAt.toISOString(),
        };
      },
    );

    return teamInvites;
  }

  async createTeamInvite(
    createTeamInviteDto: CreateTeamInviteDto,
  ): Promise<TeamInviteForTeamViewModel> {
    const inviteCreation = await this.prismaService.teamInvite.create({
      data: {
        status: "PENDING",
        team: {
          connect: {
            id: createTeamInviteDto.teamId,
          },
        },
        user: {
          connect: {
            id: createTeamInviteDto.userId,
          },
        },
      },
      select: {
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            displayUsername: true,
            image: true,
          },
        },
      },
    });

    const invite: TeamInviteForTeamViewModel = {
      user: inviteCreation.user,
      status: "PENDING",
      createdAt: inviteCreation.createdAt.toISOString(),
    };

    return invite;
  }

  async updateTeamInvite(updateTeamInviteDto: UpdateTeamInviteDto) {
    await this.prismaService.teamInvite.update({
      data: {
        status: updateTeamInviteDto.status,
      },
      where: {
        teamId_userId: {
          teamId: updateTeamInviteDto.teamId,
          userId: updateTeamInviteDto.userId,
        },
      },
    });

    if (updateTeamInviteDto.status === "ACCEPTED") {
      await this.prismaService.userTeam.create({
        data: {
          userId: updateTeamInviteDto.userId,
          teamId: updateTeamInviteDto.teamId,
        },
      });
    }

    return;
  }
}
