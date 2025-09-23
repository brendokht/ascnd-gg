import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MeService {
  private readonly logger = new Logger(MeService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async getCurrentUserTeams(userId: string) {
    this.logger.log(`userId = ${userId}`);

    const teamsSelect = await this.prismaService.userTeam.findMany({
      where: { userId: userId },
      select: {
        team: {
          select: {
            name: true,
            displayName: true,
            logo: true,
          },
        },
      },
    });

    this.logger.log(`teamsSelect = ${teamsSelect}`);

    return teamsSelect.flatMap((t) => t.team);
  }
}
