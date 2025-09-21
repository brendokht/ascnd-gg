import { CreateTeamDto, TeamViewModel } from "@ascnd-gg/types";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@ascnd-gg/database";

@Injectable()
export class TeamService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTeam(user: User, createTeamDto: CreateTeamDto) {
    // Set 'name' to normalized version of 'displayName'
    createTeamDto.name = createTeamDto.displayName.toLowerCase();

    await this.prismaService.team.create({
      data: {
        displayName: createTeamDto.displayName,
        name: createTeamDto.name,
        logo: createTeamDto.logo,
        banner: createTeamDto.banner,
        members: {
          create: {
            userId: user.id,
          },
        },
      },
    });
  }

  async getTeamByName(name: string): Promise<TeamViewModel | null> {
    const teamSelect = await this.prismaService.team.findFirst({
      where: { name: name },
      select: { displayName: true, logo: true, banner: true, createdAt: true },
    });

    if (!teamSelect) {
      return null;
    }

    const team: TeamViewModel = {
      displayName: teamSelect.displayName,
      logo: teamSelect.logo,
      banner: teamSelect.banner,
      createdAt: teamSelect.createdAt.toISOString(),
    };

    return team;
  }
}
