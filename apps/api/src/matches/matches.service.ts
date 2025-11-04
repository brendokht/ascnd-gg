import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  MatchFormatIdParameterDto,
  MatchFormatViewModel,
} from "@ascnd-gg/types";

@Injectable()
export class MatchesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMatchFormats() {
    const matchFormatsSelect = await this.prismaService.matchFormat.findMany({
      select: {
        id: true,
        name: true,
        displayName: true,
      },
    });

    if (!matchFormatsSelect) {
      return null;
    }

    const matchFormats: Array<MatchFormatViewModel> = matchFormatsSelect.map(
      (stageType) => {
        return {
          id: stageType.id,
          name: stageType.name,
          displayName: stageType.displayName,
        };
      },
    );

    return matchFormats;
  }
  async getMatchFormatById(params: MatchFormatIdParameterDto) {
    const matchFormatSelect = await this.prismaService.matchFormat.findFirst({
      where: { id: params.matchFormatId },
      select: {
        id: true,
        name: true,
        displayName: true,
      },
    });

    if (!matchFormatSelect) {
      return null;
    }

    const matchFormat: MatchFormatViewModel = {
      id: matchFormatSelect.id,
      name: matchFormatSelect.name,
      displayName: matchFormatSelect.displayName,
    };

    return matchFormat;
  }
}
