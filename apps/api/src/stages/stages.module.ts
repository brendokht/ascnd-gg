import { Module } from "@nestjs/common";
import { StagesService } from "./stages.service";
import { StagesController } from "./stages.controller";
import { PhasesService } from "../phases/phases.service";

@Module({
  providers: [StagesService, PhasesService],
  controllers: [StagesController],
})
export class StagesModule {}
