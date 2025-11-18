import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseInterceptors,
} from "@nestjs/common";
import { StagesService } from "./stages.service";
import { Optional, Public } from "../auth/auth.decorator";
import {
  CreateStageDto,
  EditStageDto,
  StageIdParameterDto,
  StageTypeIdParameterDto,
  StageViewModel,
} from "@ascnd-gg/types";
import { User } from "@ascnd-gg/database";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

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

  @Get("/:stageId")
  @Optional()
  async getStageById(
    @Req() req: Request,
    @Param() params: StageIdParameterDto,
  ): Promise<StageViewModel> {
    const stage = await this.stageService.getStageById(
      params,
      req["user"] as User,
    );
    if (!stage) {
      throw new NotFoundException();
    }
    return stage;
  }

  @Post()
  async createStage(
    @Req() req: Request,
    @Body() createStageDto: CreateStageDto,
  ): Promise<StageViewModel> {
    const createdStage = await this.stageService.createStage(
      req["user"] as User,
      createStageDto,
    );
    return createdStage;
  }

  @Patch(":stageId")
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "logo", maxCount: 1 },
        { name: "banner", maxCount: 1 },
      ],
      { limits: { fileSize: 4 * 1024 * 1024 } },
    ),
  )
  async updateStage(
    @Req() req: Request,
    @Param() params: StageIdParameterDto,
    @Body() editStageDto: EditStageDto,
  ): Promise<Partial<StageViewModel>> {
    const updatedStage = await this.stageService.updateStage(
      req["user"] as User,
      params,
      editStageDto,
    );
    return updatedStage;
  }
}
