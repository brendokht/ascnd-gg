import {
  ArgumentsHost,
  Catch,
  HttpException,
  Logger,
  Module,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RedisModule } from "./redis/redis.module";
import { UsersService } from "./users/users.service";
import { UsersController } from "./users/users.controller";
import { UsersModule } from "./users/users.module";
import { StorageModule } from "./storage/storage.module";
import { TeamModule } from "./teams/teams.module";
import {
  ZodSerializationException,
  ZodSerializerInterceptor,
  ZodValidationPipe,
} from "nestjs-zod";
import {
  APP_GUARD,
  APP_INTERCEPTOR,
  APP_PIPE,
  BaseExceptionFilter,
} from "@nestjs/core";
import { ZodError } from "@ascnd-gg/types";
import { MeModule } from "./me/me.module";
import { AuthGuard } from "./auth/auth.guard";
import { HubsController } from "./hubs/hubs.controller";
import { HubsService } from "./hubs/hubs.service";
import { HubsModule } from "./hubs/hubs.module";
import { TitlesController } from "./titles/titles.controller";
import { TitlesService } from "./titles/titles.service";
import { TitleModule } from "./titles/titles.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    PrismaModule,
    RedisModule,
    UsersModule,
    StorageModule,
    TeamModule,
    MeModule,
    HubsModule,
    TitleModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    HubsController,
    TitlesController,
  ],
  providers: [
    AppService,
    AuthService,
    UsersService,
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
    { provide: APP_GUARD, useClass: AuthGuard },
    HubsService,
    TitlesService,
  ],
})
export class AppModule {}

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    if (exception instanceof ZodSerializationException) {
      const zodError = exception.getZodError();
      if (zodError instanceof ZodError) {
        this.logger.error(`ZodSerializationException: ${zodError.message}`);
      }
    }
    super.catch(exception, host);
  }
}
