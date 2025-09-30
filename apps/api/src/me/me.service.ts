import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TeamInviteViewModel, UserTeamViewModel } from "@ascnd-gg/types";

@Injectable()
export class MeService {
  private readonly logger = new Logger(MeService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async getCurrentUserTeams(userId: string): Promise<Array<UserTeamViewModel>> {
    const teamsSelect = await this.prismaService.userTeam.findMany({
      where: { userId: userId },
      select: {
        team: {
          select: {
            name: true,
            displayName: true,
            logo: true,
            banner: true,
            teamOwnerId: true,
          },
        },
      },
    });

    const teams: Array<UserTeamViewModel> = teamsSelect.map(({ team }) => {
      return {
        name: team.name,
        displayName: team.displayName,
        logo: team.logo,
        banner: team.banner,
        isTeamOwner: userId === team.teamOwnerId,
      };
    });

    return teams;
  }

  async getCurrentUserTeamInvites(
    userId: string,
  ): Promise<Array<TeamInviteViewModel>> {
    const teamInvitesSelect = await this.prismaService.teamInvite.findMany({
      where: {
        userId: userId,
        status: {
          equals: "PENDING",
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

    const teamInvites: Array<TeamInviteViewModel> = teamInvitesSelect.map(
      (teamInvite) => {
        return {
          team: {
            displayName: teamInvite.team.displayName,
            logo: teamInvite.team.logo,
          },
          status: teamInvite.status as
            | "Pending"
            | "Declined"
            | "Cancelled"
            | "Accepted",
          createdAt: teamInvite.createdAt.toISOString(),
        };
      },
    );

    return teamInvites;
  }
}
