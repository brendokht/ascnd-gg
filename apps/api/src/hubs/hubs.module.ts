import { Module } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { HubsService } from "./hubs.service";
import { HubsController } from "./hubs.controller";

@Module({
  providers: [HubsService, AuthService],
  controllers: [HubsController],
})
export class HubsModule {}
