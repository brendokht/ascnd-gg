import { CreateTeamDto, TeamViewModel } from "@ascnd-gg/types";
import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@ascnd-gg/database";
import { Prisma } from "@ascnd-gg/database";
@Injectable()
export class TeamService {
  private readonly logger = new Logger(TeamService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async createTeam(user: User, createTeamDto: CreateTeamDto) {
    // Set 'name' to normalized version of 'displayName'
    createTeamDto.name = createTeamDto.displayName.toLowerCase();

    try {
      const teamCreate = await this.prismaService.team.create({
        data: {
          displayName: createTeamDto.displayName,
          name: createTeamDto.name,
          logo: createTeamDto.logo,
          banner: createTeamDto.banner,
          teamOwner: { connect: { id: user.id } },
          members: {
            create: {
              userId: user.id,
            },
          },
        },
      });

      return teamCreate.name;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException(
            `Team with name ${createTeamDto.displayName} already exists. Please choose a different name.`,
          );
        }
      }
    }
  }

  async getTeamByName(
    name: string,
    userId: string | undefined,
  ): Promise<TeamViewModel | null> {
    const teamSelect = await this.prismaService.team.findFirst({
      where: { name: name },
      select: {
        displayName: true,
        logo: true,
        banner: true,
        createdAt: true,
        teamOwnerId: true,
      },
    });

    if (!teamSelect) {
      return null;
    }

    const team: TeamViewModel = {
      displayName: teamSelect.displayName,
      logo: teamSelect.logo,
      banner: teamSelect.banner,
      createdAt: teamSelect.createdAt.toISOString(),
      isTeamOwner: userId === teamSelect.teamOwnerId,
    };

    return team;
  }
}
