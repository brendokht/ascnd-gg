import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
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
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "logo", maxCount: 1 },
        { name: "banner", maxCount: 1 },
      ],
      { limits: { fileSize: 4 * 1024 * 1024 } },
    ),
  )
  async createStage(
    @Req() req: Request,
    @Body() createStageDto: CreateStageDto,
    @UploadedFiles()
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ): Promise<StageViewModel> {
    const createdStage = await this.stageService.createStage(
      req["user"] as User,
      createStageDto,
      files,
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
    @UploadedFiles()
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ): Promise<Partial<StageViewModel>> {
    const updatedStage = await this.stageService.updateStage(
      req["user"] as User,
      params,
      editStageDto,
      files,
    );
    return updatedStage;
  }
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
