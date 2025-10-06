import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserSearchViewModel, UserViewModel } from "@ascnd-gg/types";
import { User } from "@ascnd-gg/database";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByUsername(username: string): Promise<UserViewModel | null> {
    const userSelect = await this.prismaService.user.findFirst({
      where: { username: username },
      select: {
        id: true,
        username: true,
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
      id: userSelect.id,
      username: userSelect.username,
      displayUsername: userSelect.displayUsername,
      profilePictureUrl: userSelect.image,
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

  async searchUsersByUsername(
    currentUser: User,
    username: string,
    page?: number,
    limit?: number,
    teamName?: string,
  ): Promise<{
    users: Array<UserSearchViewModel> | null;
    totalCount: number;
  }> {
    // TODO: RBAC for ensuring users with proper roles can select a user's invitations
    const count = await this.prismaService.user.count({
      where: {
        username: { mode: "insensitive", contains: username },
        AND: {
          username: { not: currentUser.username },
          teams: {
            none: {
              team: {
                name: {
                  equals: teamName.toLowerCase(),
                },
              },
            },
          },
        },
      },
    });

    const usersSelect = await this.prismaService.user.findMany({
      where: {
        username: { mode: "insensitive", contains: username },
        AND: {
          username: { not: currentUser.username },
          teams: {
            none: {
              team: {
                name: {
                  equals: teamName.toLowerCase(),
                },
              },
            },
          },
        },
      },
      select: {
        id: true,
        username: true,
        displayUsername: true,
        image: true,
        createdAt: true,
        teams: {
          select: {
            team: true,
          },
        },
        invitations: {
          select: {
            team: {
              select: {
                id: true,
                name: true,
                displayName: true,
                logo: true,
              },
            },
            status: true,
            createdAt: true,
            updatedAt: true,
          },
          where: {
            ...(teamName ? { team: { name: teamName.toLowerCase() } } : {}),
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    if (!usersSelect) {
      return { users: [], totalCount: count };
    }

    const users: Array<UserSearchViewModel> = usersSelect.map((user) => {
      return {
        id: user.id,
        username: user.username,
        displayUsername: user.displayUsername,
        profilePictureUrl: user.image,
        createdAt: user.createdAt.toISOString(),
        isInvited: !!user.invitations.find(
          (invite) =>
            invite.status === "PENDING" &&
            invite.team.displayName.toLowerCase() === teamName.toLowerCase(),
        ),
      };
    });

    return { users: users, totalCount: count };
  }
}
