import {
  TitleCharacterGetParameterDto,
  TitleCharacterViewModel,
  TitleGamemodeGetParameterDto,
  TitleGamemodeViewModel,
  TitleIdParameterDto,
  TitleItemGetParameterDto,
  TitleItemViewModel,
  TitleMapGetParameterDto,
  TitleMapViewModel,
  TitleViewModel,
} from "@ascnd-gg/types";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TitlesService {
  constructor(private readonly prismaService: PrismaService) {}

  // TODO: Make character GET send role summary instead of full view model

  async getTitles(): Promise<Array<TitleViewModel> | null> {
    const titlesSelect = await this.prismaService.title.findMany({
      select: {
        id: true,
        name: true,
        displayName: true,
        allowsDraws: true,
        genreId: true,
      },
    });

    if (!titlesSelect) {
      return null;
    }

    const titles: Array<TitleViewModel> = titlesSelect.map((title) => {
      return {
        id: title.id,
        name: title.name,
        displayName: title.displayName,
        allowsDraws: title.allowsDraws,
        genreId: title.genreId,
      };
    });

    return titles;
  }

  async getTitleById(
    params: TitleIdParameterDto,
  ): Promise<TitleViewModel | null> {
    const titleSelect = await this.prismaService.title.findFirst({
      where: { id: params.titleId },
      select: {
        id: true,
        name: true,
        displayName: true,
        allowsDraws: true,
        genreId: true,
      },
    });

    if (!titleSelect) {
      return null;
    }

    const title: TitleViewModel = {
      id: titleSelect.id,
      name: titleSelect.name,
      displayName: titleSelect.displayName,
      allowsDraws: titleSelect.allowsDraws,
      genreId: titleSelect.genreId,
    };

    return title;
  }

  async getTitleCharacters(
    params: TitleIdParameterDto,
  ): Promise<Array<TitleCharacterViewModel>> {
    const charactersSelect = await this.prismaService.titleCharacter.findMany({
      where: { titleId: params.titleId },
      select: {
        id: true,
        name: true,
        displayName: true,
        image: true,
        active: true,
        metadata: true,
        characterRoles: {
          select: {
            role: {
              select: {
                id: true,
                name: true,
                displayName: true,
                image: true,
                active: true,
                payload: true,
              },
            },
          },
        },
      },
    });

    if (!charactersSelect) {
      return null;
    }

    const titleCharacters: Array<TitleCharacterViewModel> =
      charactersSelect.map((character) => {
        return {
          id: character.id,
          name: character.name,
          displayName: character.displayName,
          image: character.image,
          active: character.active,
          metadata: character.metadata,
          roles: character.characterRoles.map(({ role }) => {
            return {
              id: role.id,
              name: role.name,
              displayName: role.displayName,
              image: role.image,
              active: role.active,
              payload: role.payload,
            };
          }),
        };
      });

    return titleCharacters;
  }

  async getTitleCharacterById(
    params: TitleCharacterGetParameterDto,
  ): Promise<TitleCharacterViewModel> {
    const characterSelect = await this.prismaService.titleCharacter.findFirst({
      where: { id: params.titleCharacterId },
      select: {
        id: true,
        name: true,
        displayName: true,
        image: true,
        active: true,
        metadata: true,
        characterRoles: {
          select: {
            role: {
              select: {
                id: true,
                name: true,
                displayName: true,
                image: true,
                active: true,
                payload: true,
              },
            },
          },
        },
      },
    });

    if (!characterSelect) {
      return null;
    }

    const titleCharacter: TitleCharacterViewModel = {
      id: characterSelect.id,
      name: characterSelect.name,
      displayName: characterSelect.displayName,
      image: characterSelect.image,
      active: characterSelect.active,
      metadata: characterSelect.metadata,
      roles: characterSelect.characterRoles.map(({ role }) => {
        return {
          id: role.id,
          name: role.name,
          displayName: role.displayName,
          image: role.image,
          active: role.active,
          payload: role.payload,
        };
      }),
    };

    return titleCharacter;
  }

  async getTitleMaps(
    params: TitleIdParameterDto,
  ): Promise<Array<TitleMapViewModel>> {
    const mapsSelect = await this.prismaService.titleMap.findMany({
      where: { titleId: params.titleId },
      select: {
        id: true,
        name: true,
        displayName: true,
        image: true,
        active: true,
        metadata: true,
      },
    });

    if (!mapsSelect) {
      return null;
    }

    const titleMaps: Array<TitleCharacterViewModel> = mapsSelect.map((map) => {
      return {
        id: map.id,
        name: map.name,
        displayName: map.displayName,
        image: map.image,
        active: map.active,
        metadata: map.metadata,
      };
    });

    return titleMaps;
  }

  async getTitleMapById(
    params: TitleMapGetParameterDto,
  ): Promise<TitleMapViewModel> {
    const mapSelect = await this.prismaService.titleMap.findFirst({
      where: { id: params.titleMapId },
      select: {
        id: true,
        name: true,
        displayName: true,
        image: true,
        active: true,
        metadata: true,
      },
    });

    if (!mapSelect) {
      return null;
    }

    const titleMap: TitleMapViewModel = {
      id: mapSelect.id,
      name: mapSelect.name,
      displayName: mapSelect.displayName,
      image: mapSelect.image,
      active: mapSelect.active,
      metadata: mapSelect.metadata,
    };

    return titleMap;
  }

  async getTitleItems(
    params: TitleIdParameterDto,
  ): Promise<Array<TitleItemViewModel>> {
    const itemsSelect = await this.prismaService.titleItem.findMany({
      where: { titleId: params.titleId },
      select: {
        id: true,
        name: true,
        displayName: true,
        image: true,
        active: true,
        payload: true,
      },
    });

    if (!itemsSelect) {
      return null;
    }

    const titleMaps: Array<TitleItemViewModel> = itemsSelect.map((item) => {
      return {
        id: item.id,
        name: item.name,
        displayName: item.displayName,
        image: item.image,
        active: item.active,
        payload: item.payload,
      };
    });

    return titleMaps;
  }

  async getTitleItemById(
    params: TitleItemGetParameterDto,
  ): Promise<TitleItemViewModel> {
    const itemSelect = await this.prismaService.titleItem.findFirst({
      where: { id: params.titleItemId },
      select: {
        id: true,
        name: true,
        displayName: true,
        image: true,
        active: true,
        payload: true,
      },
    });

    if (!itemSelect) {
      return null;
    }

    const titleMap: TitleItemViewModel = {
      id: itemSelect.id,
      name: itemSelect.name,
      displayName: itemSelect.displayName,
      image: itemSelect.image,
      active: itemSelect.active,
      payload: itemSelect.payload,
    };

    return titleMap;
  }

  async getTitleGamemodes(
    params: TitleIdParameterDto,
  ): Promise<Array<TitleGamemodeViewModel>> {
    const gamemodeSelect = await this.prismaService.titleGamemode.findMany({
      where: { titleId: params.titleId },
      select: {
        id: true,
        name: true,
        displayName: true,
        image: true,
        active: true,
        metadata: true,
      },
    });

    if (!gamemodeSelect) {
      return null;
    }

    const titleGamemodes: Array<TitleGamemodeViewModel> = gamemodeSelect.map(
      (gamemode) => {
        return {
          id: gamemode.id,
          name: gamemode.name,
          displayName: gamemode.displayName,
          image: gamemode.image,
          active: gamemode.active,
          metadata: gamemode.metadata,
        };
      },
    );

    return titleGamemodes;
  }

  async getTitleGamemodeById(
    params: TitleGamemodeGetParameterDto,
  ): Promise<TitleItemViewModel> {
    const gamemodeSelect = await this.prismaService.titleGamemode.findFirst({
      where: { id: params.titleGamemodeId },
      select: {
        id: true,
        name: true,
        displayName: true,
        image: true,
        active: true,
        metadata: true,
      },
    });

    if (!gamemodeSelect) {
      return null;
    }

    const titleGamemode: TitleGamemodeViewModel = {
      id: gamemodeSelect.id,
      name: gamemodeSelect.name,
      displayName: gamemodeSelect.displayName,
      image: gamemodeSelect.image,
      active: gamemodeSelect.active,
      metadata: gamemodeSelect.metadata,
    };

    return titleGamemode;
  }
}
