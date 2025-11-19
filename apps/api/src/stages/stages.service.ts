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
import { PhasesService } from "../phases/phases.service";

@Injectable()
export class StagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly phaseService: PhasesService,
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

    if (!stageSelect) {
      return null;
    }

    const stage: StageViewModel = {
      id: stageSelect.id,
      displayName: stageSelect.displayName,
      name: stageSelect.name,
      description: stageSelect.description,
      status: stageSelect.status,
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

    if (!stagesSelect) {
      return [];
    }

    const stages: Array<StageViewModel> = stagesSelect.map((stage) => {
      return {
        id: stage.id,
        displayName: stage.displayName,
        name: stage.name,
        description: stage.description,
        status: stage.status,
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
  ): Promise<StageViewModel> {
    const stage = await this.prismaService.$transaction(async (tx) => {
      const stage = await tx.stage.create({
        data: {
          name: createStageDto.displayName.toLowerCase(),
          displayName: createStageDto.displayName,
          description: createStageDto.description,
          scheduledAt: createStageDto.scheduledAt,
          scheduledEndAt: createStageDto.scheduledEndAt,
          registrationStartDate: createStageDto.registrationStartDate,
          registrationEndDate: createStageDto.registrationEndDate,
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
          phases: {
            create: createStageDto.phases.map((phase) => ({
              matchFormatId: phase.formatId,
              matchIndexStart: phase.matchIndexStart,
              matchIndexEnd: phase.matchIndexEnd,
            })),
          },
        },
        select: {
          id: true,
          name: true,
          displayName: true,
          description: true,
          status: true,
          scheduledAt: true,
          scheduledEndAt: true,
          event: {
            select: {
              hub: {
                select: {
                  hubOwnerId: true,
                },
              },
            },
          },
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
      scheduledAt: stage.scheduledAt.toISOString(),
      scheduledEndAt: stage.scheduledEndAt.toISOString(),
      isEventOwner: stage.event.hub.hubOwnerId === user.id,
    };
  }

  async createStages(
    user: User,
    createStageDto: Array<CreateStageDto>,
  ): Promise<Array<StageViewModel>> {
    const createdStages = await this.prismaService.$transaction(async (tx) => {
      const stages = await Promise.all(
        createStageDto.map((dto) =>
          tx.stage.create({
            data: {
              name: dto.displayName.toLowerCase(),
              displayName: dto.displayName,
              description: dto.description,
              scheduledAt: dto.scheduledAt,
              scheduledEndAt: dto.scheduledEndAt,
              registrationStartDate: dto.registrationStartDate,
              registrationEndDate: dto.registrationEndDate,
              event: { connect: { id: dto.eventId } },
              status:
                dto.scheduledAt &&
                new Date(dto.scheduledAt as string).getTime() > Date.now()
                  ? "REGISTRATION_OPEN"
                  : "PENDING",
              stageType: { connect: { id: dto.typeId } },
            },
            select: {
              id: true,
              name: true,
              displayName: true,
              description: true,
              status: true,
              scheduledAt: true,
              scheduledEndAt: true,
              event: { select: { hub: { select: { hubOwnerId: true } } } },
            },
          }),
        ),
      );

      return stages;
    });

    await Promise.all(
      createdStages.map((stage, i) => {
        const phaseInputs =
          createStageDto[i].phases?.map((p) => ({
            ...p,
            stageId: stage.id,
          })) ?? [];

        if (phaseInputs.length === 0) {
          return Promise.resolve([]);
        }

        return this.phaseService.createPhases(user, phaseInputs);
      }),
    );

    return createdStages.map((stage) => {
      return {
        id: stage.id,
        name: stage.name,
        displayName: stage.displayName,
        description: stage.description,
        status: stage.status,
        scheduledAt: stage.scheduledAt.toISOString(),
        scheduledEndAt: stage.scheduledEndAt.toISOString(),
        isEventOwner: stage.event.hub.hubOwnerId === user.id,
      };
    });
  }
  async updateStage(
    user: User,
    params: StageIdParameterDto,
    editStageDto: EditStageDto,
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

    const updatedStage = await this.prismaService.$transaction(async (tx) => {
      const stage = await tx.stage.update({
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
        select: {
          id: true,
          name: true,
          displayName: true,
          description: true,
          status: true,
          scheduledAt: true,
          scheduledEndAt: true,
          event: { select: { hub: { select: { hubOwnerId: true } } } },
        },
      });

      return stage;
    });

    return {
      id: updatedStage.id,
      name: updatedStage.name,
      displayName: updatedStage.displayName,
      description: updatedStage.description,
      status: updatedStage.status,
      scheduledAt: updatedStage.scheduledAt.toISOString(),
      scheduledEndAt: updatedStage.scheduledEndAt.toISOString(),
      isEventOwner: updatedStage.event.hub.hubOwnerId === user.id,
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
