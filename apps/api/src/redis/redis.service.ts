import { redis } from "@ascnd-gg/redis";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RedisService {
  readonly client: typeof redis;

  constructor() {
    this.client = redis;
  }
}
