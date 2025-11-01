import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { StagesService } from "./stages.service";
import { Public } from "../auth/auth.decorator";
import { StageTypeIdParameterDto } from "@ascnd-gg/types";

@Controller("stages")
export class StagesController {
  constructor(private readonly stageService: StagesService) {}

  @Get("/types")
  @Public()
  async getStageTypes() {
    const stageTypes = await this.stageService.getStageTypes();

    if (!stageTypes) {
      throw new NotFoundException();
    }

    return stageTypes;
  }

  @Get("/types/:stageTypeId")
  @Public()
  async getStageTypeById(@Param() params: StageTypeIdParameterDto) {
    const stageType = await this.stageService.getStageTypeById(params);

    if (!stageType) {
      throw new NotFoundException();
    }

    return stageType;
  }
}
