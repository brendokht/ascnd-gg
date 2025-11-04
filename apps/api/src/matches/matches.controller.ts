import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { Public } from "../auth/auth.decorator";
import { MatchesService } from "./matches.service";
import { MatchFormatIdParameterDto } from "@ascnd-gg/types";

@Controller("matches")
export class MatchesController {
  constructor(private readonly matchService: MatchesService) {}

  @Get("/formats")
  @Public()
  async getStageTypes() {
    const matchFormats = await this.matchService.getMatchFormats();

    if (!matchFormats) {
      throw new NotFoundException();
    }

    return matchFormats;
  }

  @Get("/formats/:matchFormatId")
  @Public()
  async getStageTypeById(@Param() params: MatchFormatIdParameterDto) {
    const matchFormat = await this.matchService.getMatchFormatById(params);

    if (!matchFormat) {
      throw new NotFoundException();
    }

    return matchFormat;
  }
}
