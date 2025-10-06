import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TeamInviteForUserViewModel, TeamSummary } from "@ascnd-gg/types";
import { InviteService } from "../invite/invite.service";

@Injectable()
export class MeService {
  private readonly logger = new Logger(MeService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly inviteService: InviteService,
  ) {}

  async getCurrentUserTeams(userId: string): Promise<Array<TeamSummary>> {
    const teamsSelect = await this.prismaService.userTeam.findMany({
      where: { userId: userId },
      select: {
        team: {
          select: {
            id: true,
            name: true,
            displayName: true,
            logo: true,
            banner: true,
            teamOwnerId: true,
          },
        },
      },
    });

    const teams: Array<TeamSummary> = teamsSelect.map(({ team }) => {
      return {
        id: team.id,
        name: team.name,
        displayName: team.displayName,
        logo: team.logo,
        banner: team.banner,
        isTeamOwner: userId === team.teamOwnerId,
      };
    });

    return teams;
  }

  // TODO: Insert parameter to allow user to pass the correct status as a query parameter
  async getCurrentUserTeamInvites(
    userId: string,
  ): Promise<Array<TeamInviteForUserViewModel>> {
    const teamInvites = await this.inviteService.getTeamInvitesForUser(
      "PENDING",
      userId,
    );

    return teamInvites;
  }
}
