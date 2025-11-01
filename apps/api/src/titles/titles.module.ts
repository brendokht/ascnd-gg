import { Module } from "@nestjs/common";
import { TitlesService } from "./titles.service";
import { TitlesController } from "./titles.controller";

@Module({
  providers: [TitlesService],
  controllers: [TitlesController],
})
export class TitleModule {}
