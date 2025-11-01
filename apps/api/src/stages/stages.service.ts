import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { StageTypeIdParameterDto, StageTypeViewModel } from "@ascnd-gg/types";

@Injectable()
export class StagesService {
  constructor(private readonly prismaService: PrismaService) {}

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
