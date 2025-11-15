import { Module } from "@nestjs/common";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";
import { StagesService } from "../stages/stages.service";
import { PhasesService } from "../phases/phases.service";

@Module({
  controllers: [EventsController],
  providers: [EventsService, StagesService, PhasesService],
})
export class EventsModule {}
