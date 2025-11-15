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
import { EventsService } from "./events.service";
import { Optional } from "../auth/auth.decorator";
import { Request } from "express";
import {
  CreateEventDto,
  EditEventDto,
  EventIdParameterDto,
  EventNameParameterDto,
  EventViewModel,
} from "@ascnd-gg/types";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { User } from "@ascnd-gg/database";

@Controller("events")
export class EventsController {
  constructor(private readonly eventService: EventsService) {}
  @Get("/:eventId")
  @Optional()
  async getEventById(
    @Req() req: Request,
    @Param() params: EventIdParameterDto,
  ): Promise<EventViewModel> {
    const event = await this.eventService.getEventById(
      params,
      req["user"] as User,
    );
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }
  @Get("/slug/:eventName")
  @Optional()
  async getEventByName(
    @Req() req: Request,
    @Param() params: EventNameParameterDto,
  ): Promise<EventViewModel> {
    const event = await this.eventService.getEventByName(
      params,
      req["user"] as User,
    );
    if (!event) {
      throw new NotFoundException();
    }
    return event;
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
  async createEvent(
    @Req() req: Request,
    @Body() createEventDto: CreateEventDto,
    @UploadedFiles()
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ): Promise<EventViewModel> {
    const createdEvent = await this.eventService.createEvent(
      req["user"] as User,
      createEventDto,
      files,
    );
    return createdEvent;
  }
  @Patch(":hubId")
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "logo", maxCount: 1 },
        { name: "banner", maxCount: 1 },
      ],
      { limits: { fileSize: 4 * 1024 * 1024 } },
    ),
  )
  async updateEvent(
    @Req() req: Request,
    @Param() params: EventIdParameterDto,
    @Body() editHubDto: EditEventDto,
    @UploadedFiles()
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ): Promise<Partial<EventViewModel>> {
    const updatedEvent = await this.eventService.updateEvent(
      req["user"] as User,
      params,
      editHubDto,
      files,
    );
    return updatedEvent;
  }
}
