import { DrawResolutionPolicy } from "@ascnd-gg/database";
import * as z from "zod";

export const TitleSchema = z.object({
  id: z.uuidv7({ error: "Title ID is required." }).trim(),
  name: z.string().trim(),
  displayName: z.string().trim(),
  genreId: z.uuidv7().trim().optional(),
  allowsDraws: z.boolean().default(false),
  defaultDrawPolicy: z.enum(DrawResolutionPolicy),
  createdAt: z.iso.datetime().optional(),
});

export const TitleSummarySchema = TitleSchema.pick({
  id: true,
  name: true,
  displayName: true,
});

export const TitleViewModelSchema = TitleSchema.pick({
  id: true,
  name: true,
  displayName: true,
  genreId: true,
  allowsDraws: true,
  createdAt: true,
});

export type Title = z.infer<typeof TitleSchema>;

export type TitleSummary = z.infer<typeof TitleSummarySchema>;

export type TitleViewModel = z.infer<typeof TitleViewModelSchema>;
