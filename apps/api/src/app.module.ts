import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, PrismaModule, RedisModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
