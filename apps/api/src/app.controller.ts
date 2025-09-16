import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { RedisService } from "./redis/redis.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService,
  ) {}

  @Get("ping")
  ping() {
    return { response: "pong" };
  }
}
