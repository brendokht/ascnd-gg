import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreatePhaseDto,
  EditPhaseDto,
  PhaseIdParameterDto,
  PhaseViewModel,
} from "@ascnd-gg/types";
import { User } from "@ascnd-gg/database";

@Injectable()
export class PhasesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPhaseById(
    params: PhaseIdParameterDto,
  ): Promise<PhaseViewModel | null> {
    const phaseSelect = await this.prismaService.phase.findFirst({
      where: { id: params.phaseId },
      select: {
        id: true,
        stageId: true,
        matchFormatId: true,
        matchIndexStart: true,
        matchIndexEnd: true,
        matches: {
          select: {
            id: true,
            team1Id: true,
            team2Id: true,
            team1Score: true,
            team2Score: true,
            result: true,
          },
        },
      },
    });

    if (!phaseSelect) {
      return null;
    }

    const phase: PhaseViewModel = {
      id: phaseSelect.id,
      stageId: phaseSelect.stageId,
      formatId: phaseSelect.matchFormatId,
      matchIndexStart: phaseSelect.matchIndexStart,
      matchIndexEnd: phaseSelect.matchIndexEnd,
      matches: phaseSelect.matches.map((match) => {
        return {
          id: match.id,
          team1Id: match.team1Id,
          team2Id: match.team2Id,
          team1Score: match.team1Score,
          team2Score: match.team2Score,
          result: match.result,
        };
      }),
    };

    return phase;
  }
  async createPhase(
    user: User,
    createHubDto: CreatePhaseDto,
  ): Promise<PhaseViewModel> {
    const phaseCreate = await this.prismaService.$transaction(async (tx) => {
      const createRes = await tx.phase.create({
        data: {
          stageId: createHubDto.stageId,
          matchFormatId: createHubDto.formatId,
          matchIndexStart: createHubDto.matchIndexStart,
          matchIndexEnd: createHubDto.matchIndexEnd,
        },
        select: {
          id: true,
          stageId: true,
          matchFormatId: true,
          matchIndexStart: true,
          matchIndexEnd: true,
        },
      });

      return createRes;
    });

    const createdPhase: PhaseViewModel = {
      id: phaseCreate.id,
      stageId: phaseCreate.stageId,
      formatId: phaseCreate.matchFormatId,
      matchIndexStart: phaseCreate.matchIndexStart,
      matchIndexEnd: phaseCreate.matchIndexEnd,
    };

    return createdPhase;
  }
  async createPhases(
    user: User,
    createPhaseDto: Array<CreatePhaseDto>,
  ): Promise<Array<PhaseViewModel>> {
    if (!createPhaseDto || createPhaseDto.length === 0) {
      return [];
    }

    const createdPhases = await this.prismaService.$transaction(async (tx) => {
      const createdRecords = await Promise.all(
        createPhaseDto.map((dto) =>
          tx.phase.create({
            data: {
              stageId: dto.stageId,
              matchFormatId: dto.formatId,
              matchIndexStart: dto.matchIndexStart,
              matchIndexEnd: dto.matchIndexEnd,
            },
            select: {
              id: true,
              stageId: true,
              matchFormatId: true,
              matchIndexStart: true,
              matchIndexEnd: true,
            },
          }),
        ),
      );

      return createdRecords;
    });

    const phases = createdPhases.map((rec) => {
      return {
        id: rec.id,
        stageId: rec.stageId,
        formatId: rec.matchFormatId,
        matchIndexStart: rec.matchIndexStart,
        matchIndexEnd: rec.matchIndexEnd,
      };
    });

    return phases;
  }
  async updatePhase(
    user: User,
    params: PhaseIdParameterDto,
    editHubDto: EditPhaseDto,
  ) {
    // TODO: RBAC to ensure user has proper permissions to perform update (event's hub owner for now)

    const phaseUpdate = await this.prismaService.$transaction(async (tx) => {
      const updateRes = await tx.phase.update({
        where: { id: params.phaseId },
        data: {
          stageId: editHubDto.stageId,
          matchFormatId: editHubDto.formatId,
          matchIndexStart: editHubDto.matchIndexStart,
          matchIndexEnd: editHubDto.matchIndexEnd,
        },
        select: {
          id: true,
          stageId: true,
          matchFormatId: true,
          matchIndexStart: true,
          matchIndexEnd: true,
        },
      });

      return updateRes;
    });

    const updatedPhase: PhaseViewModel = {
      id: phaseUpdate.id,
      stageId: phaseUpdate.stageId,
      formatId: phaseUpdate.matchFormatId,
      matchIndexStart: phaseUpdate.matchIndexStart,
      matchIndexEnd: phaseUpdate.matchIndexEnd,
    };

    return updatedPhase;
  }
}
