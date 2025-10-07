import {
  CreateTeamDto,
  CreateTeamInviteDto,
  EditTeamDto,
  type TeamInviteForTeamViewModel,
  type TeamInviteForUserViewModel,
  UpdateTeamInviteDto,
  type InviteUserSearchViewModel,
  type TeamViewModel,
  TeamInviteSearchQueryDto,
  TeamInviteSearchParameterDto,
} from "@ascnd-gg/types";
import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { TeamInviteStatus, User } from "@ascnd-gg/database";
import { Prisma } from "@ascnd-gg/database";
import { StorageService } from "../storage/storage.service";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { parseKey, getPublicUrl } from "../utils";

@Injectable()
export class TeamsService {
  private readonly logger = new Logger(TeamsService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async createTeam(
    user: User,
    createTeamDto: CreateTeamDto,
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ) {
    const newTeamName = await this.prismaService.$transaction(async (tx) => {
      try {
        const { id: newTeamId, name: newTeamName } = await tx.team.create({
          data: {
            displayName: createTeamDto.displayName,
            name: createTeamDto.displayName.toLowerCase(),
            teamOwner: { connect: { id: user.id } },
            members: {
              create: {
                userId: user.id,
              },
            },
          },
          select: { id: true, name: true },
        });

        let logoKey: string | undefined = undefined;

        if (files.logo) {
          logoKey = `teams/${newTeamId}/logo.${files.logo.at(0).mimetype.split("/")[1]}`;

          await this.storageService.client.send(
            new PutObjectCommand({
              Bucket: process.env.S3_BUCKET,
              Key: logoKey,
              Body: files.logo.at(0).buffer,
              ContentType: files.logo.at(0).mimetype,
            }),
          );
        }

        let bannerKey: string | undefined = undefined;

        if (files.banner) {
          bannerKey = `teams/${newTeamId}/banner.${files.banner.at(0).mimetype.split("/")[1]}`;

          await this.storageService.client.send(
            new PutObjectCommand({
              Bucket: process.env.S3_BUCKET,
              Key: bannerKey,
              Body: files.banner.at(0).buffer,
              ContentType: files.banner.at(0).mimetype,
            }),
          );
        }

        await tx.team.update({
          data: {
            logo: logoKey ? getPublicUrl(logoKey) : null,
            banner: bannerKey ? getPublicUrl(bannerKey) : null,
          },
          where: { id: newTeamId },
        });

        return newTeamName;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new ConflictException(
              `Team with name ${createTeamDto.displayName} already exists. Please choose a different name.`,
            );
          }
        }
        throw error;
      }
    });

    return newTeamName;
  }

  async updateTeam(
    currentUser: User,
    teamId: string,
    editTeamDto: EditTeamDto,
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ) {
    const { teamOwnerId } = await this.prismaService.team.findFirst({
      where: { id: teamId },
      select: { teamOwnerId: true },
    });

    if (currentUser.id !== teamOwnerId) {
      throw new UnauthorizedException(
        "You are not permitted to perform this action.",
      );
    }

    const updatedTeamName = await this.prismaService.$transaction(
      async (tx) => {
        try {
          const {
            name: updatedTeamName,
            logo: oldLogoUrl,
            banner: oldBannerUrl,
          } = await tx.team.update({
            data: {
              displayName: editTeamDto.displayName ?? undefined,
              name: editTeamDto.displayName
                ? editTeamDto.displayName.toLowerCase()
                : undefined,
            },
            where: { id: teamId },
            select: { name: true, logo: true, banner: true },
          });

          let logoKey: string | undefined | null = undefined;
          if (files.logo) {
            if (files.logo.at(0).size > 0) {
              if (oldLogoUrl) {
                await this.storageService.client.send(
                  new DeleteObjectCommand({
                    Bucket: process.env.S3_BUCKET,
                    Key: parseKey(oldLogoUrl),
                  }),
                );
              }

              logoKey = `teams/${teamId}/logo.${files.logo.at(0).mimetype.split("/")[1]}`;
              await this.storageService.client.send(
                new PutObjectCommand({
                  Bucket: process.env.S3_BUCKET,
                  Key: logoKey,
                  Body: files.logo.at(0).buffer,
                  ContentType: files.logo.at(0).mimetype,
                }),
              );
            } else {
              logoKey = null;
              await this.storageService.client.send(
                new DeleteObjectCommand({
                  Bucket: process.env.S3_BUCKET,
                  Key: parseKey(oldLogoUrl),
                }),
              );
            }
          }

          let bannerKey: string | undefined | null = undefined;

          if (files.banner) {
            if (files.banner[0].size > 0) {
              if (oldBannerUrl) {
                await this.storageService.client.send(
                  new DeleteObjectCommand({
                    Bucket: process.env.S3_BUCKET,
                    Key: parseKey(oldBannerUrl),
                  }),
                );
              }

              bannerKey = `teams/${teamId}/banner.${files.banner.at(0).mimetype.split("/")[1]}`;
              await this.storageService.client.send(
                new PutObjectCommand({
                  Bucket: process.env.S3_BUCKET,
                  Key: bannerKey,
                  Body: files.banner.at(0).buffer,
                  ContentType: files.banner.at(0).mimetype,
                }),
              );
            } else {
              bannerKey = null;
              await this.storageService.client.send(
                new DeleteObjectCommand({
                  Bucket: process.env.S3_BUCKET,
                  Key: parseKey(oldBannerUrl),
                }),
              );
            }
          }

          await tx.team.update({
            data: {
              logo: logoKey ? getPublicUrl(logoKey) : logoKey,
              banner: bannerKey ? getPublicUrl(bannerKey) : bannerKey,
            },
            where: { id: teamId },
          });

          return updatedTeamName;
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
              throw new ConflictException(
                `Team with name ${editTeamDto.displayName} already exists. Please choose a different name.`,
              );
            }
          }
          throw error;
        }
      },
    );

    return { name: updatedTeamName };
  }

  async getTeamByName(
    name: string,
    userId: string | undefined,
  ): Promise<TeamViewModel | null> {
    const teamSelect = await this.prismaService.team.findFirst({
      where: { name: name },
      select: {
        id: true,
        name: true,
        displayName: true,
        logo: true,
        banner: true,
        createdAt: true,
        teamOwnerId: true,
        members: {
          select: {
            user: true,
          },
        },
      },
    });

    if (!teamSelect) {
      return null;
    }

    const team: TeamViewModel = {
      id: teamSelect.id,
      name: teamSelect.name,
      displayName: teamSelect.displayName,
      logo: teamSelect.logo,
      banner: teamSelect.banner,
      members: teamSelect.members.map(({ user }) => {
        return {
          id: user.id,
          username: user.username,
          displayUsername: user.displayUsername,
          profilePictureUrl: user.image,
        };
      }),
      createdAt: teamSelect.createdAt.toISOString(),
      isTeamOwner: userId === teamSelect.teamOwnerId,
    };

    return team;
  }

  async removeMemberFromTeam(
    currentUser: User,
    teamId: string,
    userId: string,
  ) {
    const { teamOwnerId } = await this.prismaService.team.findFirst({
      where: { id: teamId },
      select: { teamOwnerId: true },
    });

    if (teamOwnerId === currentUser.id) {
      throw new ConflictException(
        "Owner cannot remove themselves from the team. Please delete the team to perform this action.",
      );
    }

    await this.prismaService.userTeam.delete({
      where: {
        teamId_userId: { teamId, userId },
      },
    });

    return;
  }

  async searchInvitableUsers(
    currentUser: User,
    query: TeamInviteSearchQueryDto,
    params: TeamInviteSearchParameterDto,
  ): Promise<{
    users: Array<InviteUserSearchViewModel> | null;
    totalCount: number;
  }> {
    // TODO: RBAC for ensuring users with proper roles can select a user's invitations
    const count = await this.prismaService.user.count({
      where: {
        username: { mode: "insensitive", contains: query.username },
        AND: {
          username: { not: currentUser.username },
          teams: {
            none: {
              team: {
                id: {
                  equals: params.teamId,
                },
              },
            },
          },
        },
      },
    });

    const usersSelect = await this.prismaService.user.findMany({
      where: {
        username: { mode: "insensitive", contains: query.username },
        AND: {
          username: { not: currentUser.username },
          teams: {
            none: {
              team: {
                id: {
                  equals: params.teamId,
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
        invitations: {
          select: {
            id: true,
            status: true,
            createdAt: true,
            updatedAt: true,
          },
          where: {
            team: { id: params.teamId },
            AND: { status: "PENDING" },
          },
        },
      },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    if (!usersSelect) {
      return { users: [], totalCount: count };
    }

    usersSelect.forEach((user) => {
      console.log(
        `"user ${user.displayUsername}'s invites: `,
        user.invitations,
      );
    });

    const users: Array<InviteUserSearchViewModel> = usersSelect.map((user) => {
      return {
        id: user.id,
        username: user.username,
        displayUsername: user.displayUsername,
        profilePictureUrl: user.image,
        createdAt: user.createdAt.toISOString(),
        isInvited: user.invitations.length > 0,
        inviteId:
          user.invitations.length > 0 ? user.invitations.at(0).id : undefined,
      };
    });

    return { users: users, totalCount: count };
  }

  async getTeamInvitesForUser(
    status: TeamInviteStatus,
    userId: string,
  ): Promise<Array<TeamInviteForUserViewModel>> {
    const invitesSelect = await this.prismaService.teamInvite.findMany({
      where: {
        userId: userId,
        status: {
          equals: status,
        },
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        team: {
          select: {
            id: true,
            name: true,
            displayName: true,
            logo: true,
            teamOwnerId: true,
          },
        },
      },
    });

    const teamInvites: Array<TeamInviteForUserViewModel> = invitesSelect.map(
      (teamInvite) => {
        return {
          id: teamInvite.id,
          team: {
            id: teamInvite.team.id,
            name: teamInvite.team.name,
            displayName: teamInvite.team.displayName,
            logo: teamInvite.team.logo,
          },
          status: teamInvite.status,
          createdAt: teamInvite.createdAt.toISOString(),
        };
      },
    );

    return teamInvites;
  }

  async getTeamInvitesForTeam(
    status: TeamInviteStatus,
    teamName: string,
  ): Promise<Array<TeamInviteForTeamViewModel>> {
    const invitesSelect = await this.prismaService.teamInvite.findMany({
      where: {
        team: {
          name: teamName,
        },
        status: {
          equals: status,
        },
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            displayUsername: true,
            image: true,
          },
        },
      },
    });

    const teamInvites: Array<TeamInviteForTeamViewModel> = invitesSelect.map(
      (teamInvite) => {
        return {
          id: teamInvite.id,
          user: {
            id: teamInvite.user.id,
            username: teamInvite.user.username,
            displayUsername: teamInvite.user.displayUsername,
            logo: teamInvite.user.image,
          },
          status: teamInvite.status,
          createdAt: teamInvite.createdAt.toISOString(),
        };
      },
    );

    return teamInvites;
  }

  async createTeamInvite(
    currentUser: User,
    teamId: string,
    teamInviteBody: CreateTeamInviteDto,
  ): Promise<TeamInviteForTeamViewModel> {
    const { teamOwnerId } = await this.prismaService.team.findFirst({
      where: { id: teamId },
      select: { teamOwnerId: true },
    });

    if (teamOwnerId !== currentUser.id) {
      throw new UnauthorizedException(
        "You are not authorized to perform this action.",
      );
    }

    const inviteCreation = await this.prismaService.teamInvite.create({
      data: {
        status: "PENDING",
        team: {
          connect: {
            id: teamId,
          },
        },
        user: {
          connect: {
            id: teamInviteBody.userId,
          },
        },
      },
      select: {
        id: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            displayUsername: true,
            image: true,
          },
        },
      },
    });

    const invite: TeamInviteForTeamViewModel = {
      id: inviteCreation.id,
      user: inviteCreation.user,
      status: "PENDING",
      createdAt: inviteCreation.createdAt.toISOString(),
    };

    return invite;
  }

  async updateTeamInvite(
    currentUser: User,
    teamId: string,
    inviteId: string,
    updateTeamInviteDto: UpdateTeamInviteDto,
  ) {
    const { teamOwnerId } = await this.prismaService.team.findFirst({
      where: { id: teamId },
      select: { teamOwnerId: true },
    });

    // Only current users and (for now) team owners can update invitations
    if (
      currentUser.id !== updateTeamInviteDto.userId &&
      currentUser.id !== teamOwnerId
    ) {
      throw new UnauthorizedException(
        "You are not authorized to perform this action.",
      );
    }

    await this.prismaService.teamInvite.update({
      data: {
        status: updateTeamInviteDto.status,
      },
      where: {
        id: inviteId,
      },
    });

    if (updateTeamInviteDto.status === "ACCEPTED") {
      await this.prismaService.userTeam.create({
        data: {
          userId: updateTeamInviteDto.userId,
          teamId: teamId,
        },
      });
    }

    return;
  }
}
