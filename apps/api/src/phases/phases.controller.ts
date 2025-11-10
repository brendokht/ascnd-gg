import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
} from "@nestjs/common";
import { PhasesService } from "./phases.service";
import {
  CreatePhaseDto,
  EditPhaseDto,
  PhaseIdParameterDto,
  PhaseViewModel,
} from "@ascnd-gg/types";
import { User } from "@ascnd-gg/database";
import { Optional } from "../auth/auth.decorator";

@Controller("phases")
export class PhasesController {
  constructor(private readonly phaseService: PhasesService) {}

  @Get("/:phaseId")
  @Optional()
  async getPhaseById(
    @Req() req: Request,
    @Param() params: PhaseIdParameterDto,
  ): Promise<PhaseViewModel> {
    const phase = await this.phaseService.getPhaseById(params);

    if (!phase) {
      throw new NotFoundException();
    }

    return phase;
  }

  @Post()
  async createPhase(
    @Req() req: Request,
    @Body() createPhaseDto: CreatePhaseDto,
  ): Promise<PhaseViewModel> {
    const createdPhase = await this.phaseService.createPhase(
      req["user"] as User,
      createPhaseDto,
    );

    return createdPhase;
  }

  @Patch(":phaseId")
  async updatePhase(
    @Req() req: Request,
    @Param() params: PhaseIdParameterDto,
    @Body() editPhaseDto: EditPhaseDto,
  ): Promise<Partial<PhaseViewModel>> {
    const updatedPhase = await this.phaseService.updatePhase(
      req["user"] as User,
      params,
      editPhaseDto,
    );

    return updatedPhase;
  }
}
