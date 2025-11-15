import { Prisma, User } from "@ascnd-gg/database";
import {
  CreateEventDto,
  EditEventDto,
  EventIdParameterDto,
  EventNameParameterDto,
  EventViewModel,
} from "@ascnd-gg/types";
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { StorageService } from "../storage/storage.service";
import { StagesService } from "../stages/stages.service";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getPublicUrl, parseKey } from "../utils";

@Injectable()
export class EventsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
    private readonly stageService: StagesService,
  ) {}

  async getEventById(
    params: EventIdParameterDto,
    user: User,
  ): Promise<EventViewModel | null> {
    const eventSelect = await this.prismaService.event.findFirst({
      where: { id: params.eventId },
      select: {
        id: true,
        name: true,
        displayName: true,
        description: true,
        status: true,
        logo: true,
        banner: true,
        hub: { select: { hubOwnerId: true } },
        createdAt: true,
        stages: true,
      },
    });

    if (eventSelect) {
      return null;
    }

    const event: EventViewModel = {
      id: eventSelect.id,
      name: eventSelect.name,
      displayName: eventSelect.displayName,
      description: eventSelect.description,
      status: eventSelect.status,
      logo: eventSelect.logo,
      banner: eventSelect.banner,
      isEventOwner: eventSelect.hub.hubOwnerId === user.id,
      stages: eventSelect.stages.map((stage) => {
        return {
          id: stage.id,
          name: stage.name,
          displayName: stage.displayName,
          logo: stage.logo,
          banner: stage.banner,
          status: stage.status,
          isEventOwner: eventSelect.hub.hubOwnerId === user.id,
        };
      }),
      createdAt: eventSelect.createdAt.toISOString(),
    };

    return event;
  }

  async getEventByName(params: EventNameParameterDto, user: User) {
    const eventSelect = await this.prismaService.event.findFirst({
      where: { displayName: params.eventName },
      select: {
        id: true,
        name: true,
        displayName: true,
        description: true,
        status: true,
        logo: true,
        banner: true,
        hub: { select: { hubOwnerId: true } },
        createdAt: true,
        stages: true,
      },
    });

    if (eventSelect) {
      return null;
    }

    const event: EventViewModel = {
      id: eventSelect.id,
      name: eventSelect.name,
      displayName: eventSelect.displayName,
      description: eventSelect.description,
      status: eventSelect.status,
      logo: eventSelect.logo,
      banner: eventSelect.banner,
      isEventOwner: eventSelect.hub.hubOwnerId === user.id,
      stages: eventSelect.stages.map((stage) => {
        return {
          id: stage.id,
          name: stage.name,
          displayName: stage.displayName,
          logo: stage.logo,
          banner: stage.banner,
          status: stage.status,
          isEventOwner: eventSelect.hub.hubOwnerId === user.id,
        };
      }),
      createdAt: eventSelect.createdAt.toISOString(),
    };

    return event;
  }

  async createEvent(
    user: User,
    createEventDto: CreateEventDto,
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ): Promise<EventViewModel> {
    const newEvent = await this.prismaService.$transaction(async (tx) => {
      try {
        const { id: newEventId } = await tx.event.create({
          data: {
            name: createEventDto.displayName.toLowerCase(),
            displayName: createEventDto.displayName,
            description: createEventDto.description,
            status:
              new Date(createEventDto.stages.at(0).scheduledAt) > new Date()
                ? "REGISTRATION_OPEN"
                : "REGISTRATION_CLOSED",
            scheduledAt: createEventDto.stages.at(0).scheduledAt,
            scheduledEndAt: createEventDto.stages.at(
              createEventDto.stages.length - 1,
            ).scheduledEndAt,
            // TODO: Allow selection of Hub for Event
            hubId: "temp",
            titleId: createEventDto.titleId,
          },
          select: { id: true },
        });

        let logoKey: string | undefined = undefined;

        if (files.logo) {
          logoKey = `events/${newEventId}/logo.${files.logo.at(0).mimetype.split("/")[1]}`;

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
          bannerKey = `events/${newEventId}/banner.${files.banner.at(0).mimetype.split("/")[1]}`;

          await this.storageService.client.send(
            new PutObjectCommand({
              Bucket: process.env.S3_BUCKET,
              Key: bannerKey,
              Body: files.banner.at(0).buffer,
              ContentType: files.banner.at(0).mimetype,
            }),
          );
        }

        await this.stageService.createStages(
          user,
          createEventDto.stages,
          // TODO: Fix file input for event creation
          undefined,
        );

        const event = await tx.event.update({
          data: {
            logo: logoKey ? getPublicUrl(logoKey) : null,
            banner: bannerKey ? getPublicUrl(bannerKey) : null,
          },
          where: { id: newEventId },

          include: {
            hub: {
              select: {
                hubOwnerId: true,
              },
            },
          },
        });

        return event;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new ConflictException(
              `Event with name ${createEventDto.displayName} already exists. Please choose a different name.`,
            );
          }
        }
        throw error;
      }
    });

    return {
      id: newEvent.id,
      name: newEvent.id,
      displayName: newEvent.id,
      description: newEvent.description,
      status: newEvent.status,
      logo: newEvent.logo,
      banner: newEvent.banner,
      createdAt: newEvent.createdAt.toISOString(),
      isEventOwner: newEvent.hub.hubOwnerId == user.id,
    };
  }
  async updateEvent(
    user: User,
    params: EventIdParameterDto,
    editEventDto: EditEventDto,
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ): Promise<EventViewModel> {
    const {
      hub: { hubOwnerId },
    } = await this.prismaService.event.findFirst({
      where: { id: params.eventId },
      select: { hub: { select: { hubOwnerId: true } } },
    });

    if (user.id !== hubOwnerId) {
      throw new UnauthorizedException(
        "You are not permitted to perform this action.",
      );
    }

    const event = await this.prismaService.$transaction(async (tx) => {
      const { logo: oldLogoUrl, banner: oldBannerUrl } = await tx.event.update({
        data: {
          displayName: editEventDto.displayName ?? undefined,
          name: editEventDto.displayName
            ? editEventDto.displayName.toLowerCase()
            : undefined,
          description: editEventDto.description,
        },
        where: { id: params.eventId },
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

          logoKey = `events/${params.eventId}/logo.${files.logo.at(0).mimetype.split("/")[1]}`;
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

          bannerKey = `events/${params.eventId}/banner.${files.banner.at(0).mimetype.split("/")[1]}`;
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

      const updatedEvent = await tx.event.update({
        data: {
          logo: logoKey ? getPublicUrl(logoKey) : logoKey,
          banner: bannerKey ? getPublicUrl(bannerKey) : bannerKey,
        },
        where: { id: params.eventId },
        include: {
          hub: { select: { hubOwnerId: true } },
        },
      });

      return updatedEvent;
    });

    return {
      id: event.id,
      name: event.name,
      displayName: event.displayName,
      description: event.description,
      status: event.status,
      logo: event.logo,
      banner: event.banner,
      createdAt: event.createdAt.toISOString(),
      isEventOwner: event.hub.hubOwnerId === user.id,
    };
  }
}
