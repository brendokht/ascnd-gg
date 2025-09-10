import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import z from "zod";
import { ApiResponse } from "@ascnd-gg/types";
import { RedisService } from "./redis/redis.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService,
  ) {}

  @Get("ping")
  ping(): z.infer<typeof ApiResponse> {
    return {
      data: {
        message: "pong",
      },
    };
  }
}
