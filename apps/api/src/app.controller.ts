import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import z from "zod";
import { ApiResponse } from "@ascnd-gg/types";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("ping")
  ping(): z.infer<typeof ApiResponse> {
    return {
      data: {
        message: "pong",
      },
    };
  }
}
