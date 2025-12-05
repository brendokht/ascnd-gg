import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  UserIdParameterDto,
  UserSearchParameterDto,
  type UserViewModel,
} from "@ascnd-gg/types";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserById(params: UserIdParameterDto): Promise<UserViewModel | null> {
    const userSelect = await this.prismaService.user.findFirst({
      where: { id: params.userId },
      select: {
        id: true,
        username: true,
        displayUsername: true,
        description: true,
        image: true,
        banner: true,
        createdAt: true,
        teams: { select: { team: true } },
      },
    });

    if (!userSelect) {
      return null;
    }

    const user: UserViewModel = {
      id: userSelect.id,
      username: userSelect.username,
      displayUsername: userSelect.displayUsername,
      description: userSelect.description,
      avatar: userSelect.image,
      banner: userSelect.banner,
      createdAt: userSelect.createdAt.toISOString(),
      teams: userSelect.teams
        ? userSelect.teams.map((t) => {
            return {
              id: t.team.id,
              name: t.team.name,
              displayName: t.team.displayName,
              logo: t.team.logo,
              isTeamOwner: t.team.teamOwnerId === userSelect.id,
            };
          })
        : [],
    };

    return user;
  }

  async getUserByUsername(
    params: UserSearchParameterDto,
  ): Promise<UserViewModel | null> {
    const userSelect = await this.prismaService.user.findFirst({
      where: { username: params.userUsername },
      select: {
        id: true,
        username: true,
        displayUsername: true,
        description: true,
        image: true,
        banner: true,
        createdAt: true,
        teams: { select: { team: true } },
      },
    });

    if (!userSelect) {
      return null;
    }

    const user: UserViewModel = {
      id: userSelect.id,
      username: userSelect.username,
      displayUsername: userSelect.displayUsername,
      description: userSelect.description,
      avatar: userSelect.image,
      banner: userSelect.banner,
      createdAt: userSelect.createdAt.toISOString(),
      teams: userSelect.teams
        ? userSelect.teams.map((t) => {
            return {
              id: t.team.id,
              name: t.team.name,
              displayName: t.team.displayName,
              logo: t.team.logo,
              isTeamOwner: t.team.teamOwnerId === userSelect.id,
            };
          })
        : [],
    };

    return user;
  }
}
