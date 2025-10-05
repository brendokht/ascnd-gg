import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserViewModel } from "@ascnd-gg/types";
import { User } from "@ascnd-gg/database";

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

  async searchUsersByUsername(
    currentUser: User,
    username: string,
    page?: number,
    limit?: number,
    teamName?: string,
  ): Promise<{
    users: Array<UserViewModel> | null;
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
        username: true,
        displayUsername: true,
        image: true,
        createdAt: true,
        teams: true,
        invitations: {
          select: {
            team: {
              select: {
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

    const users: Array<UserViewModel> = usersSelect.map((user) => {
      return {
        username: user.username,
        displayUsername: user.displayUsername,
        profilePictureUrl: user.image,
        createdAt: user.createdAt.toISOString(),
        teams: user.teams
          ? user.teams.map((t) => {
              const team = (t as any).team ?? t;
              return {
                name: team?.name,
                displayName: team?.displayName,
                logo: team?.logo,
                isTeamOwner: false,
              };
            })
          : [],
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
