import {
  CreateHubDto,
  CreateHubInviteDto,
  EditHubDto,
  type HubInviteForHubViewModel,
  type HubInviteForUserViewModel,
  UpdateHubInviteDto,
  type InviteUserSearchViewModel,
  type HubViewModel,
  HubInviteSearchQueryDto,
  HubInviteSearchParameterDto,
  HubInviteUpdateParameterDto,
  HubIdParameterDto,
  HubNameParameterDto,
  HubMemberDeleteParameterDto,
} from "@ascnd-gg/types";
import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { InviteStatus, User } from "@ascnd-gg/database";
import { Prisma } from "@ascnd-gg/database";
import { StorageService } from "../storage/storage.service";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { parseKey, getPublicUrl } from "../utils";

@Injectable()
export class HubsService {
  private readonly logger = new Logger(HubsService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async createHub(
    user: User,
    createHubDto: CreateHubDto,
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ) {
    const newHubName = await this.prismaService.$transaction(async (tx) => {
      try {
        const { id: newHubId, name: newHubName } = await tx.hub.create({
          data: {
            displayName: createHubDto.displayName,
            name: createHubDto.displayName.toLowerCase(),
            hubOwner: { connect: { id: user.id } },
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
          logoKey = `hubs/${newHubId}/logo.${files.logo.at(0).mimetype.split("/")[1]}`;

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
          bannerKey = `hubs/${newHubId}/banner.${files.banner.at(0).mimetype.split("/")[1]}`;

          await this.storageService.client.send(
            new PutObjectCommand({
              Bucket: process.env.S3_BUCKET,
              Key: bannerKey,
              Body: files.banner.at(0).buffer,
              ContentType: files.banner.at(0).mimetype,
            }),
          );
        }

        await tx.hub.update({
          data: {
            logo: logoKey ? getPublicUrl(logoKey) : null,
            banner: bannerKey ? getPublicUrl(bannerKey) : null,
          },
          where: { id: newHubId },
        });

        return newHubName;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new ConflictException(
              `Hub with name ${createHubDto.displayName} already exists. Please choose a different name.`,
            );
          }
        }
        throw error;
      }
    });

    return newHubName;
  }

  async updateHub(
    currentUser: User,
    params: HubIdParameterDto,
    editHubDto: EditHubDto,
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ) {
    const { hubOwnerId } = await this.prismaService.hub.findFirst({
      where: { id: params.hubId },
      select: { hubOwnerId: true },
    });

    if (currentUser.id !== hubOwnerId) {
      throw new UnauthorizedException(
        "You are not permitted to perform this action.",
      );
    }

    const updatedHubName = await this.prismaService.$transaction(async (tx) => {
      try {
        const {
          name: updatedHubName,
          logo: oldLogoUrl,
          banner: oldBannerUrl,
        } = await tx.hub.update({
          data: {
            displayName: editHubDto.displayName ?? undefined,
            name: editHubDto.displayName
              ? editHubDto.displayName.toLowerCase()
              : undefined,
          },
          where: { id: params.hubId },
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

            logoKey = `hubs/${params.hubId}/logo.${files.logo.at(0).mimetype.split("/")[1]}`;
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

            bannerKey = `hubs/${params.hubId}/banner.${files.banner.at(0).mimetype.split("/")[1]}`;
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

        await tx.hub.update({
          data: {
            logo: logoKey ? getPublicUrl(logoKey) : logoKey,
            banner: bannerKey ? getPublicUrl(bannerKey) : bannerKey,
          },
          where: { id: params.hubId },
        });

        return updatedHubName;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new ConflictException(
              `Hub with name ${editHubDto.displayName} already exists. Please choose a different name.`,
            );
          }
        }
        throw error;
      }
    });

    return { name: updatedHubName };
  }

  async getHubByName(
    params: HubNameParameterDto,
    userId: string | undefined,
  ): Promise<HubViewModel | null> {
    const hubSelect = await this.prismaService.hub.findFirst({
      where: { name: params.hubName },
      select: {
        id: true,
        name: true,
        displayName: true,
        logo: true,
        banner: true,
        createdAt: true,
        hubOwnerId: true,
        members: {
          select: {
            user: true,
          },
        },
      },
    });

    if (!hubSelect) {
      return null;
    }

    const hub: HubViewModel = {
      id: hubSelect.id,
      name: hubSelect.name,
      displayName: hubSelect.displayName,
      logo: hubSelect.logo,
      banner: hubSelect.banner,
      members: hubSelect.members.map(({ user }) => {
        return {
          id: user.id,
          username: user.username,
          displayUsername: user.displayUsername,
          profilePictureUrl: user.image,
        };
      }),
      createdAt: hubSelect.createdAt.toISOString(),
      isHubOwner: userId === hubSelect.hubOwnerId,
    };

    return hub;
  }

  async getHubById(
    params: HubIdParameterDto,
    userId: string | undefined,
  ): Promise<HubViewModel | null> {
    const hubSelect = await this.prismaService.hub.findFirst({
      where: { id: params.hubId },
      select: {
        id: true,
        name: true,
        displayName: true,
        logo: true,
        banner: true,
        createdAt: true,
        hubOwnerId: true,
        members: {
          select: {
            user: true,
          },
        },
      },
    });

    if (!hubSelect) {
      return null;
    }

    const hub: HubViewModel = {
      id: hubSelect.id,
      name: hubSelect.name,
      displayName: hubSelect.displayName,
      logo: hubSelect.logo,
      banner: hubSelect.banner,
      members: hubSelect.members.map(({ user }) => {
        return {
          id: user.id,
          username: user.username,
          displayUsername: user.displayUsername,
          profilePictureUrl: user.image,
        };
      }),
      createdAt: hubSelect.createdAt.toISOString(),
      isHubOwner: userId === hubSelect.hubOwnerId,
    };

    return hub;
  }

  async removeMemberFromHub(
    currentUser: User,
    params: HubMemberDeleteParameterDto,
  ) {
    const { hubOwnerId } = await this.prismaService.hub.findFirst({
      where: { id: params.hubId },
      select: { hubOwnerId: true },
    });

    if (hubOwnerId === params.userId) {
      throw new ConflictException(
        "Owner cannot remove themselves from the hub. Please delete the hub to perform this action.",
      );
    } else if (
      hubOwnerId !== currentUser.id &&
      currentUser.id !== params.userId
    ) {
      throw new UnauthorizedException(
        "You are not permitted to perform this action.",
      );
    }

    await this.prismaService.userHub.delete({
      where: {
        hubId_userId: { hubId: params.hubId, userId: params.userId },
      },
    });

    return;
  }

  async searchInvitableUsers(
    currentUser: User,
    query: HubInviteSearchQueryDto,
    params: HubInviteSearchParameterDto,
  ): Promise<{
    users: Array<InviteUserSearchViewModel> | null;
    totalCount: number;
  }> {
    const count = await this.prismaService.user.count({
      where: {
        username: { mode: "insensitive", contains: query.username },
        AND: {
          username: { not: currentUser.username },
          hubs: {
            none: {
              hub: {
                id: {
                  equals: params.hubId,
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
          hubs: {
            none: {
              hub: {
                id: {
                  equals: params.hubId,
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
        hubInvitations: {
          select: {
            id: true,
            status: true,
            createdAt: true,
            updatedAt: true,
          },
          where: {
            hub: { id: params.hubId },
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

    const users: Array<InviteUserSearchViewModel> = usersSelect.map((user) => {
      return {
        id: user.id,
        username: user.username,
        displayUsername: user.displayUsername,
        profilePictureUrl: user.image,
        createdAt: user.createdAt.toISOString(),
        isInvited: user.hubInvitations.length > 0,
        inviteId:
          user.hubInvitations.length > 0
            ? user.hubInvitations.at(0).id
            : undefined,
      };
    });

    return { users: users, totalCount: count };
  }

  async getHubInvitesForUser(
    status: InviteStatus,
    userId: string,
  ): Promise<Array<HubInviteForUserViewModel>> {
    const invitesSelect = await this.prismaService.hubInvite.findMany({
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
        hub: {
          select: {
            id: true,
            name: true,
            displayName: true,
            logo: true,
            hubOwnerId: true,
          },
        },
      },
    });

    const hubInvites: Array<HubInviteForUserViewModel> = invitesSelect.map(
      (hubInvite) => {
        return {
          id: hubInvite.id,
          hub: {
            id: hubInvite.hub.id,
            name: hubInvite.hub.name,
            displayName: hubInvite.hub.displayName,
            logo: hubInvite.hub.logo,
          },
          status: hubInvite.status,
          createdAt: hubInvite.createdAt.toISOString(),
        };
      },
    );

    return hubInvites;
  }

  async createHubInvite(
    currentUser: User,
    params: HubIdParameterDto,
    hubInviteBody: CreateHubInviteDto,
  ): Promise<HubInviteForHubViewModel> {
    const { hubOwnerId } = await this.prismaService.hub.findFirst({
      where: { id: params.hubId },
      select: { hubOwnerId: true },
    });

    if (hubOwnerId !== currentUser.id) {
      throw new UnauthorizedException(
        "You are not authorized to perform this action.",
      );
    }

    const inviteCreation = await this.prismaService.hubInvite.create({
      data: {
        status: "PENDING",
        hub: {
          connect: {
            id: params.hubId,
          },
        },
        user: {
          connect: {
            id: hubInviteBody.userId,
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

    const invite: HubInviteForHubViewModel = {
      id: inviteCreation.id,
      user: inviteCreation.user,
      status: "PENDING",
      createdAt: inviteCreation.createdAt.toISOString(),
    };

    return invite;
  }

  async updateHubInvite(
    currentUser: User,
    params: HubInviteUpdateParameterDto,
    updateHubInviteDto: UpdateHubInviteDto,
  ) {
    const { hubOwnerId } = await this.prismaService.hub.findFirst({
      where: { id: params.hubId },
      select: { hubOwnerId: true },
    });

    // Only current users and (for now) hub owners can update invitations
    if (
      currentUser.id !== updateHubInviteDto.userId &&
      currentUser.id !== hubOwnerId
    ) {
      throw new UnauthorizedException(
        "You are not authorized to perform this action.",
      );
    }

    await this.prismaService.hubInvite.update({
      data: {
        status: updateHubInviteDto.status,
      },
      where: {
        id: params.inviteId,
      },
    });

    if (updateHubInviteDto.status === "ACCEPTED") {
      await this.prismaService.userHub.create({
        data: {
          userId: updateHubInviteDto.userId,
          hubId: params.hubId,
        },
      });
    }

    return;
  }
}
