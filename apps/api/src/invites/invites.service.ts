import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateTeamInviteDto,
  type TeamInviteForTeamViewModel,
  type TeamInviteForUserViewModel,
  UpdateTeamInviteDto,
} from "@ascnd-gg/types";
import type { TeamInviteStatus, User } from "@ascnd-gg/database";

@Injectable()
export class InvitesService {
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
        id: true,
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
          id: teamInvite.id,
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
        id: true,
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
          id: teamInvite.id,
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
    currentUser: User,
    teamId: string,
    teamInviteBody: CreateTeamInviteDto,
  ): Promise<TeamInviteForTeamViewModel> {
    const { teamOwnerId } = await this.prismaService.team.findFirst({
      where: { id: teamId },
      select: { teamOwnerId: true },
    });

    if (teamOwnerId !== currentUser.id) {
      throw new UnauthorizedException(
        "You are not authorized to perform this action.",
      );
    }

    const inviteCreation = await this.prismaService.teamInvite.create({
      data: {
        status: "PENDING",
        team: {
          connect: {
            id: teamId,
          },
        },
        user: {
          connect: {
            id: teamInviteBody.userId,
          },
        },
      },
      select: {
        id: true,
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
      id: inviteCreation.id,
      user: inviteCreation.user,
      status: "PENDING",
      createdAt: inviteCreation.createdAt.toISOString(),
    };

    return invite;
  }

  async updateTeamInvite(
    currentUser: User,
    teamId: string,
    inviteId: string,
    updateTeamInviteDto: UpdateTeamInviteDto,
  ) {
    const { teamOwnerId } = await this.prismaService.team.findFirst({
      where: { id: teamId },
      select: { teamOwnerId: true },
    });

    // Only current users and (for now) team owners can update invitations
    if (
      currentUser.id !== updateTeamInviteDto.userId &&
      currentUser.id !== teamOwnerId
    ) {
      throw new UnauthorizedException(
        "You are not authorized to perform this action.",
      );
    }

    await this.prismaService.teamInvite.update({
      data: {
        status: updateTeamInviteDto.status,
      },
      where: {
        id: inviteId,
      },
    });

    if (updateTeamInviteDto.status === "ACCEPTED") {
      await this.prismaService.userTeam.create({
        data: {
          userId: updateTeamInviteDto.userId,
          teamId: teamId,
        },
      });
    }

    return;
  }
}
