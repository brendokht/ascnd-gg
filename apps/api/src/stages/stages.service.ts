import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateStageDto,
  EditStageDto,
  EventIdParameterDto,
  StageIdParameterDto,
  StageTypeIdParameterDto,
  StageTypeViewModel,
  StageViewModel,
} from "@ascnd-gg/types";
import { User } from "@ascnd-gg/database";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getPublicUrl, parseKey } from "../utils";
import { StorageService } from "../storage/storage.service";

@Injectable()
export class StagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async getStageById(
    params: StageIdParameterDto,
    user: User,
  ): Promise<StageViewModel | null> {
    const stageSelect = await this.prismaService.stage.findFirst({
      where: { id: params.stageId },
      select: {
        id: true,
        displayName: true,
        name: true,
        description: true,
        status: true,
        logo: true,
        banner: true,
        // TOOD: Optimize this query
        event: {
          select: {
            hub: {
              select: {
                hubOwnerId: true,
              },
            },
          },
        },
        scheduledAt: true,
        scheduledEndAt: true,
      },
    });

    if (stageSelect) {
      return null;
    }

    const stage: StageViewModel = {
      id: stageSelect.id,
      displayName: stageSelect.displayName,
      name: stageSelect.name,
      description: stageSelect.description,
      status: stageSelect.status,
      logo: stageSelect.logo,
      banner: stageSelect.banner,
      isEventOwner: stageSelect.event.hub.hubOwnerId === user.id,
      scheduledAt: stageSelect.scheduledAt.toISOString(),
      scheduledEndAt: stageSelect.scheduledEndAt.toISOString(),
    };

    return stage;
  }

  async getStagesByEventId(
    params: EventIdParameterDto,
    user: User,
  ): Promise<Array<StageViewModel>> {
    const stagesSelect = await this.prismaService.stage.findMany({
      where: { eventId: params.eventId },
      select: {
        id: true,
        displayName: true,
        name: true,
        description: true,
        status: true,
        logo: true,
        banner: true,
        // TOOD: Optimize this query
        event: {
          select: {
            hub: {
              select: {
                hubOwnerId: true,
              },
            },
          },
        },
        scheduledAt: true,
        scheduledEndAt: true,
      },
    });

    if (stagesSelect) {
      return [];
    }

    const stages: Array<StageViewModel> = stagesSelect.map((stage) => {
      return {
        id: stage.id,
        displayName: stage.displayName,
        name: stage.name,
        description: stage.description,
        status: stage.status,
        logo: stage.logo,
        banner: stage.banner,
        isEventOwner: stage.event.hub.hubOwnerId === user.id,
        scheduledAt: stage.scheduledAt.toISOString(),
        scheduledEndAt: stage.scheduledEndAt.toISOString(),
      };
    });

    return stages;
  }

  async createStage(
    user: User,
    createStageDto: CreateStageDto,
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ): Promise<StageViewModel> {
    const stage = await this.prismaService.$transaction(async (tx) => {
      const { id: createdStageId } = await tx.stage.create({
        data: {
          name: createStageDto.displayName.toLowerCase(),
          displayName: createStageDto.displayName,
          description: createStageDto.description,
          scheduledAt: createStageDto.scheduledAt,
          scheduledEndAt: createStageDto.scheduledEndAt,
          event: {
            connect: {
              id: createStageDto.eventId,
            },
          },
          status:
            createStageDto.scheduledAt &&
            new Date(createStageDto.scheduledAt as string).getTime() >
              Date.now()
              ? "REGISTRATION_OPEN"
              : "PENDING",
          stageType: {
            connect: {
              id: createStageDto.typeId,
            },
          },
        },
        select: {
          id: true,
        },
      });

      let logoKey: string | undefined = undefined;

      if (files.logo) {
        logoKey = `stages/${createdStageId}/logo.${files.logo.at(0).mimetype.split("/")[1]}`;

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
        bannerKey = `stages/${createdStageId}/banner.${files.banner.at(0).mimetype.split("/")[1]}`;

        await this.storageService.client.send(
          new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: bannerKey,
            Body: files.banner.at(0).buffer,
            ContentType: files.banner.at(0).mimetype,
          }),
        );
      }

      const stage = await tx.stage.update({
        data: {
          logo: logoKey ? getPublicUrl(logoKey) : null,
          banner: bannerKey ? getPublicUrl(bannerKey) : null,
        },
        where: { id: createdStageId },
        include: {
          event: { select: { hub: { select: { hubOwnerId: true } } } },
        },
      });

      return stage;
    });

    return {
      id: stage.id,
      name: stage.name,
      displayName: stage.displayName,
      description: stage.description,
      status: stage.status,
      logo: stage.logo,
      banner: stage.banner,
      scheduledAt: stage.scheduledAt.toISOString(),
      scheduledEndAt: stage.scheduledEndAt.toISOString(),
      isEventOwner: stage.event.hub.hubOwnerId === user.id,
    };
  }
  async updateStage(
    user: User,
    params: StageIdParameterDto,
    editStageDto: EditStageDto,
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ): Promise<StageViewModel> {
    const {
      event: {
        hub: { hubOwnerId },
      },
    } = await this.prismaService.stage.findFirst({
      where: { id: params.stageId },
      select: { event: { select: { hub: { select: { hubOwnerId: true } } } } },
    });

    if (user.id !== hubOwnerId) {
      throw new UnauthorizedException(
        "You are not permitted to perform this action.",
      );
    }

    const stage = await this.prismaService.$transaction(async (tx) => {
      const { logo: oldLogoUrl, banner: oldBannerUrl } = await tx.stage.update({
        data: {
          displayName: editStageDto.displayName ?? undefined,
          name: editStageDto.displayName
            ? editStageDto.displayName.toLowerCase()
            : undefined,
          description: editStageDto.description,
          scheduledAt: editStageDto.scheduledAt,
          scheduledEndAt: editStageDto.scheduledEndAt,
          stageType: {
            connect: {
              id: editStageDto.typeId,
            },
          },
        },
        where: { id: params.stageId },
        select: { logo: true, banner: true },
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

          logoKey = `stages/${params.stageId}/logo.${files.logo.at(0).mimetype.split("/")[1]}`;
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

          bannerKey = `stages/${params.stageId}/banner.${files.banner.at(0).mimetype.split("/")[1]}`;
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

      const updatedStage = await tx.stage.update({
        data: {
          logo: logoKey ? getPublicUrl(logoKey) : logoKey,
          banner: bannerKey ? getPublicUrl(bannerKey) : bannerKey,
        },
        where: { id: params.stageId },
        include: {
          event: { select: { hub: { select: { hubOwnerId: true } } } },
        },
      });

      return updatedStage;
    });

    return {
      id: stage.id,
      name: stage.name,
      displayName: stage.displayName,
      description: stage.description,
      status: stage.status,
      logo: stage.logo,
      banner: stage.banner,
      scheduledAt: stage.scheduledAt.toISOString(),
      scheduledEndAt: stage.scheduledEndAt.toISOString(),
      isEventOwner: stage.event.hub.hubOwnerId === user.id,
    };
  }

  async getStageTypes(): Promise<Array<StageTypeViewModel> | null> {
    const stageTypesSelect = await this.prismaService.stageType.findMany({
      select: {
        id: true,
        name: true,
        displayName: true,
        description: true,
      },
    });

    if (!stageTypesSelect) {
      return null;
    }

    const stageTypes: Array<StageTypeViewModel> = stageTypesSelect.map(
      (stageType) => {
        return {
          id: stageType.id,
          name: stageType.name,
          displayName: stageType.displayName,
          description: stageType.description,
        };
      },
    );

    return stageTypes;
  }
  async getStageTypeById(
    params: StageTypeIdParameterDto,
  ): Promise<StageTypeViewModel | null> {
    const stageTypeSelect = await this.prismaService.stageType.findFirst({
      where: { id: params.stageTypeId },
      select: {
        id: true,
        name: true,
        displayName: true,
        description: true,
      },
    });

    if (!stageTypeSelect) {
      return null;
    }

    const stageType: StageTypeViewModel = {
      id: stageTypeSelect.id,
      name: stageTypeSelect.name,
      displayName: stageTypeSelect.displayName,
      description: stageTypeSelect.description,
    };

    return stageType;
  }
}
