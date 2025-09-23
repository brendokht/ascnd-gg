import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserViewModel } from "@ascnd-gg/types";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByUsername(username: string): Promise<UserViewModel | null> {
    const userSelect = await this.prismaService.user.findFirst({
      where: { username: username },
      select: {
        id: true,
        displayUsername: true,
        image: true,
        createdAt: true,
        teams: { select: { team: true } },
      },
    });

    if (!userSelect) {
      return null;
    }

    const user: UserViewModel = {
      displayUsername: userSelect.displayUsername,
      profilePictureUrl: userSelect.image,
      createdAt: userSelect.createdAt.toISOString(),
      teams: userSelect.teams.map((t) => {
        return {
          name: t.team.name,
          displayName: t.team.displayName,
          logo: t.team.logo,
          isTeamOwner: t.team.teamOwnerId === userSelect.id,
        };
      }),
    };

    return user;
  }
}
