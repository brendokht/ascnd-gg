import { CreateTeamDto, TeamViewModel } from "@ascnd-gg/types";
import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@ascnd-gg/database";
import { Prisma } from "@ascnd-gg/database";
import { StorageService } from "../storage/storage.service";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getPublicUrl } from "../utils/get-public-url";

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
    // Set 'name' to normalized version of 'displayName'
    createTeamDto.name = createTeamDto.displayName.toLowerCase();

    const newTeamName = await this.prismaService.$transaction(async (tx) => {
      try {
        const { id: newTeamId } = await tx.team.create({
          data: {
            displayName: createTeamDto.displayName,
            name: createTeamDto.name,
            teamOwner: { connect: { id: user.id } },
            members: {
              create: {
                userId: user.id,
              },
            },
          },
          select: { id: true },
        });

        const logoKey = `teams/${newTeamId}/logo.${files.logo.at(0).mimetype.split("/")[1]}`;
        const bannerKey = `teams/${newTeamId}/banner.${files.banner.at(0).mimetype.split("/")[1]}`;

        await this.storageService.client.send(
          new PutObjectCommand({
            Bucket: "ascnd-gg",
            Key: logoKey,
            Body: files.logo.at(0).buffer,
            ContentType: files.logo.at(0).mimetype,
          }),
        );

        await this.storageService.client.send(
          new PutObjectCommand({
            Bucket: "ascnd-gg",
            Key: bannerKey,
            Body: files.banner.at(0).buffer,
            ContentType: files.banner.at(0).mimetype,
          }),
        );

        await tx.team.update({
          data: {
            logo: getPublicUrl(logoKey),
            banner: getPublicUrl(bannerKey),
          },
          where: { id: newTeamId },
        });

        this.logger.log("Team and assets created successfully");

        return createTeamDto.name;
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
