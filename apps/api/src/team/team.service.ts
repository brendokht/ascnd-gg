import { CreateTeamDto, EditTeamDto, TeamViewModel } from "@ascnd-gg/types";
import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@ascnd-gg/database";
import { Prisma } from "@ascnd-gg/database";
import { StorageService } from "../storage/storage.service";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { parseKey, getPublicUrl } from "../utils";

@Injectable()
export class TeamService {
  private readonly logger = new Logger(TeamService.name);
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
    user: User,
    editTeamDto: EditTeamDto,
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ) {
    const { teamOwnerId } = await this.prismaService.team.findFirst({
      where: { id: editTeamDto.id },
      select: { teamOwnerId: true },
    });

    // TODO: Eventually have more complex authorization rules
    if (user.id !== teamOwnerId) {
      throw new UnauthorizedException(
        "You are not permitted to update this team.",
      );
    }

    const updatedTeamName = await this.prismaService.$transaction(
      async (tx) => {
        try {
          const {
            id: updatedTeamId,
            name: updatedTeamName,
            logo: oldLogoUrl,
            banner: oldBannerUrl,
          } = await tx.team.update({
            data: {
              displayName: editTeamDto.displayName,
              name: editTeamDto.displayName.toLowerCase(),
            },
            where: { id: editTeamDto.id },
            select: { id: true, name: true, logo: true, banner: true },
          });

          let logoKey: string | undefined | null = undefined;
          if (files.logo) {
            if (files.logo.at(0).size > 0) {
              logoKey = `teams/${updatedTeamId}/logo.${files.logo.at(0).mimetype.split("/")[1]}`;

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
              bannerKey = `teams/${updatedTeamId}/banner.${files.banner.at(0).mimetype.split("/")[1]}`;

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
            where: { id: updatedTeamId },
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

    return updatedTeamName;
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

  async removeMemberFromTeam(teamName: string, username: string) {
    const { id: teamId, teamOwnerId } = await this.prismaService.team.findFirst(
      {
        where: { name: teamName.toLowerCase() },
        select: { id: true, teamOwnerId: true },
      },
    );

    const { id: userId } = await this.prismaService.user.findFirst({
      where: { username: username.toLowerCase() },
      select: { id: true },
    });

    if (teamOwnerId === userId) {
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
}
