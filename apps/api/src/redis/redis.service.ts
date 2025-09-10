import { redis } from "@ascnd-gg/redis";
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class RedisService implements OnModuleInit {
  private client: typeof redis;
  onModuleInit() {
    this.client = redis;
  }

  async set(key: string, otp: string, ttlInSeconds: number): Promise<void> {
    await this.client.set(key, otp, "EX", ttlInSeconds);
  }
  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }
  async delete(key: string): Promise<number> {
    return this.client.del(key);
  }
}
