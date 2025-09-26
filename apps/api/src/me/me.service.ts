import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserTeamViewModel } from "@ascnd-gg/types";

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
}
