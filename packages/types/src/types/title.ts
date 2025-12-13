import { DrawResolutionPolicy } from "@ascnd-gg/database/browser";
import * as z from "zod";

export const TitleSchema = z.object({
  id: z.uuidv7({ error: "Title ID is required." }).trim(),
  name: z.string({ error: "Title name is required." }).trim(),
  displayName: z.string({ error: "Title display name is required." }).trim(),
  genreId: z.uuidv7().trim().optional(),
  allowsDraws: z.boolean().default(false),
  defaultDrawPolicy: z.enum(DrawResolutionPolicy, {
    error: "Default draw policy is required.",
  }),
  createdAt: z.iso.datetime().optional(),
});

export const TitleViewModelSchema = TitleSchema.pick({
  id: true,
  name: true,
  displayName: true,
  allowsDraws: true,
  genreId: true,
});

export const TitleCharacterSchema = z.object({
  id: z.uuidv7({ error: "Title character ID is required." }).trim(),
  titleId: z.uuidv7({ error: "Title ID is required." }).trim(),
  image: z
    .url({
      error: "Title character image is must be a URL pointing to an image.",
    })
    .trim()
    .optional(),
  name: z.string({ error: "Title character name is required." }).trim(),
  displayName: z
    .string({ error: "Title character display name is required." })
    .trim(),
  get roles() {
    return z.array(TitleRoleViewModelSchema).optional();
  },
  metadata: z.json().optional(),
  active: z.boolean().default(true),
  createdAt: z.iso.datetime().optional(),
});

export const TitleCharacterViewModelSchema = TitleCharacterSchema.pick({
  id: true,
  name: true,
  displayName: true,
  image: true,
  roles: true,
  active: true,
  metadata: true,
});

export const TitleGamemodeSchema = z.object({
  id: z.uuidv7({ error: "Title gamemode ID is required." }).trim(),
  titleId: z.uuidv7({ error: "Title ID is required." }).trim(),
  image: z
    .url({
      error: "Title gamemode image is must be a URL pointing to an image.",
    })
    .trim()
    .optional(),
  name: z.string({ error: "Title gamemode name is required." }).trim(),
  displayName: z
    .string({ error: "Title gamemode display name is required." })
    .trim(),
  metadata: z.json().optional(),
  active: z.boolean().default(true),
  createdAt: z.iso.datetime().optional(),
});

export const TitleGamemodeViewModelSchema = TitleGamemodeSchema.pick({
  id: true,
  name: true,
  displayName: true,
  image: true,
  active: true,
  metadata: true,
});

export const TitleGenreSchema = z.object({
  id: z.uuidv7({ error: "Title genre ID is required." }).trim(),
  name: z.string({ error: "Title genre name is required." }).trim(),
  displayName: z
    .string({ error: "Title genre display name is required." })
    .trim(),
  createdAt: z.iso.datetime().optional(),
});

export const TitleGenreViewModelSchema = TitleGenreSchema.pick({
  id: true,
  titleId: true,
  name: true,
  displayName: true,
  image: true,
  active: true,
});

export const TitleItemSchema = z.object({
  id: z.uuidv7({ error: "Title item ID is required." }).trim(),
  titleId: z.uuidv7({ error: "Title ID is required." }).trim(),
  image: z
    .url({
      error: "Title item image is must be a URL pointing to an image.",
    })
    .trim()
    .optional(),
  name: z.string({ error: "Title item name is required." }).trim(),
  displayName: z
    .string({ error: "Title item display name is required." })
    .trim(),
  payload: z.json().optional(),
  active: z.boolean().default(true),
  createdAt: z.iso.datetime().optional(),
});

export const TitleItemViewModelSchema = TitleItemSchema.pick({
  id: true,
  name: true,
  displayName: true,
  image: true,
  active: true,
  payload: true,
});

export const TitleMapSchema = z.object({
  id: z.uuidv7({ error: "Title map ID is required." }).trim(),
  titleId: z.uuidv7({ error: "Title ID is required." }).trim(),
  image: z
    .url({
      error: "Title map image is must be a URL pointing to an image.",
    })
    .trim()
    .optional(),
  name: z.string({ error: "Title map name is required." }).trim(),
  displayName: z
    .string({ error: "Title map display name is required." })
    .trim(),
  metadata: z.json().optional(),
  active: z.boolean().default(true),
  createdAt: z.iso.datetime().optional(),
});

export const TitleMapViewModelSchema = TitleMapSchema.pick({
  id: true,
  name: true,
  displayName: true,
  image: true,
  active: true,
  metadata: true,
});

export const TitleRoleSchema = z.object({
  id: z.uuidv7({ error: "Title role ID is required." }).trim(),
  titleId: z.uuidv7({ error: "Title ID is required." }).trim(),
  image: z
    .url({
      error: "Title role image is must be a URL pointing to an image.",
    })
    .trim()
    .optional(),
  name: z.string({ error: "Title role name is required." }).trim(),
  displayName: z
    .string({ error: "Title role display name is required." })
    .trim(),
  payload: z.json().optional(),
  active: z.boolean().default(true),
  createdAt: z.iso.datetime().optional(),
});

export const TitleRoleViewModelSchema = TitleRoleSchema.pick({
  id: true,
  name: true,
  displayName: true,
  image: true,
  active: true,
  payload: true,
});

export const TitleSettingSchema = z.object({
  id: z.uuidv7({ error: "Title setting ID is required." }).trim(),
  titleId: z.uuidv7({ error: "Title ID is required." }).trim(),
  image: z
    .url({
      error: "Title setting image is must be a URL pointing to an image.",
    })
    .trim()
    .optional(),
  name: z.string({ error: "Title setting name is required." }).trim(),
  displayName: z
    .string({ error: "Title setting display name is required." })
    .trim(),
  payload: z.json().optional(),
  active: z.boolean().default(true),
  createdAt: z.iso.datetime().optional(),
});

export const TitleSideSchema = z.object({
  id: z.uuidv7({ error: "Title setting ID is required." }).trim(),
  titleId: z.uuidv7({ error: "Title ID is required." }).trim(),
  image: z
    .url({
      error: "Title setting image is must be a URL pointing to an image.",
    })
    .trim()
    .optional(),
  name: z.string({ error: "Title setting name is required." }).trim(),
  displayName: z
    .string({ error: "Title setting display name is required." })
    .trim(),
  payload: z.json().optional(),
  active: z.boolean().default(true),
  createdAt: z.iso.datetime().optional(),
});

export const TitleDataSchema = z.object({
  maps: z.array(TitleMapViewModelSchema).optional(),
  characters: z.array(TitleCharacterViewModelSchema).optional(),
  items: z.array(TitleItemViewModelSchema).optional(),
  gamemodes: z.array(TitleGamemodeViewModelSchema).optional(),
});

export type Title = z.infer<typeof TitleSchema>;

export type TitleViewModel = z.infer<typeof TitleViewModelSchema>;
export type TitleCharacterViewModel = z.infer<
  typeof TitleCharacterViewModelSchema
>;
export type TitleGamemodeViewModel = z.infer<
  typeof TitleGamemodeViewModelSchema
>;
export type TitleGenreViewModel = z.infer<typeof TitleGenreViewModelSchema>;
export type TitleItemViewModel = z.infer<typeof TitleItemViewModelSchema>;
export type TitleMapViewModel = z.infer<typeof TitleMapViewModelSchema>;
export type TitleRole = z.infer<typeof TitleRoleViewModelSchema>;
export type TitleSetting = z.infer<typeof TitleSettingSchema>;
export type TitleSide = z.infer<typeof TitleSideSchema>;
export type TitleData = z.infer<typeof TitleDataSchema>;
