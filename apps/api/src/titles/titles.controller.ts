import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { TitlesService } from "./titles.service";
import { Public } from "../auth/auth.decorator";
import {
  TitleCharacterGetParameterDto,
  TitleGamemodeGetParameterDto,
  TitleIdParameterDto,
  TitleItemGetParameterDto,
  TitleMapGetParameterDto,
} from "@ascnd-gg/types";

@Controller("titles")
export class TitlesController {
  constructor(private readonly titleService: TitlesService) {}

  @Get()
  @Public()
  async getTitles() {
    const titles = await this.titleService.getTitles();

    if (!titles) {
      throw new NotFoundException();
    }

    return titles;
  }

  @Get("/:titleId")
  @Public()
  async getTitleById(@Param() params: TitleIdParameterDto) {
    const title = await this.titleService.getTitleById(params);

    if (!title) {
      throw new NotFoundException();
    }

    return title;
  }

  @Get("/:titleId/maps")
  @Public()
  async getTitleMaps(@Param() params: TitleIdParameterDto) {
    const titleMaps = await this.titleService.getTitleMaps(params);

    if (!titleMaps) {
      throw new NotFoundException();
    }

    return titleMaps;
  }

  @Get("/maps/:titleMapId")
  @Public()
  async getTitleMapById(@Param() params: TitleMapGetParameterDto) {
    const titleMap = await this.titleService.getTitleMapById(params);

    if (!titleMap) {
      throw new NotFoundException();
    }

    return titleMap;
  }

  @Get("/:titleId/characters")
  @Public()
  async getTitleCharacters(@Param() params: TitleIdParameterDto) {
    const titleCharacters = await this.titleService.getTitleCharacters(params);

    if (!titleCharacters) {
      throw new NotFoundException();
    }

    return titleCharacters;
  }

  @Get("/characters/:titleCharacterId")
  @Public()
  async getTitleCharacterById(@Param() params: TitleCharacterGetParameterDto) {
    const titleCharacter =
      await this.titleService.getTitleCharacterById(params);

    if (!titleCharacter) {
      throw new NotFoundException();
    }

    return titleCharacter;
  }

  @Get("/:titleId/items")
  @Public()
  async getTitleItems(@Param() params: TitleIdParameterDto) {
    const titleItems = await this.titleService.getTitleItems(params);

    if (!titleItems) {
      throw new NotFoundException();
    }

    return titleItems;
  }

  @Get("/items/:titleItemId")
  @Public()
  async getTitleItemById(@Param() params: TitleItemGetParameterDto) {
    const titleItem = await this.titleService.getTitleItemById(params);

    if (!titleItem) {
      throw new NotFoundException();
    }

    return titleItem;
  }

  @Get("/:titleId/gamemodes")
  @Public()
  async getTitleGamemodes(@Param() params: TitleIdParameterDto) {
    const titleGamemodes = await this.titleService.getTitleGamemodes(params);

    if (!titleGamemodes) {
      throw new NotFoundException();
    }

    return titleGamemodes;
  }

  @Get("/gamemodes/:titleGamemodeId")
  @Public()
  async getTitleGamemodeById(@Param() params: TitleGamemodeGetParameterDto) {
    const titleGamemode = await this.titleService.getTitleGamemodeById(params);

    if (!titleGamemode) {
      throw new NotFoundException();
    }

    return titleGamemode;
  }
}
