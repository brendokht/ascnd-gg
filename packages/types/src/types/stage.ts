import {
  DrawResolutionPolicy,
  StageJoinType,
  StageSeedingType,
  StageStatus,
} from "@ascnd-gg/database";
import {
  STAGE_DESCRIPTION_MAX_LENGTH,
  STAGE_DISPLAY_NAME_REGEX,
  STAGE_NAME_MAX_LENGTH,
  STAGE_NAME_MIN_LENGTH,
  STAGE_NAME_REGEX,
} from "@ascnd-gg/constants";
import * as z from "zod";

export const StageSchema = z.object({
  id: z.uuidv7({ error: "Stage ID is required." }).trim(),
  eventId: z.uuidv7({ error: "Event ID is required." }).trim(),
  name: z
    .string({ error: "Stage name is required." })
    .trim()
    .toLowerCase()
    .min(STAGE_NAME_MIN_LENGTH, {
      error: `Stage name must be at least ${STAGE_NAME_MIN_LENGTH} characters.`,
    })
    .max(STAGE_NAME_MAX_LENGTH, {
      error: `Stage name must be ${STAGE_NAME_MAX_LENGTH} characters or less.`,
    })
    .regex(STAGE_NAME_REGEX, {
      error:
        "Stage name can only contain alphanumeric characters, spaces, underscores, dots, and dashes, and must contain at least 1 letter.",
    }),
  displayName: z
    .string({ error: "Stage display name is required." })
    .trim()
    .min(STAGE_NAME_MIN_LENGTH, {
      error: `Stage name must be at least ${STAGE_NAME_MIN_LENGTH} characters.`,
    })
    .max(STAGE_NAME_MAX_LENGTH, {
      error: `Stage name must be ${STAGE_NAME_MAX_LENGTH} characters or less.`,
    })
    .regex(STAGE_DISPLAY_NAME_REGEX, {
      error:
        "Stage name can only contain alphanumeric characters, spaces, underscores, dots, and dashes, and must contain at least 1 letter.",
    }),
  description: z.string().trim().max(STAGE_DESCRIPTION_MAX_LENGTH).optional(),
  logo: z
    .url({ error: "Stage logo is must be a URL pointing to an image." })
    .trim()
    .optional(),
  banner: z
    .url({ error: "Stage banner is must be a URL pointing to an image." })
    .trim()
    .optional(),
  typeId: z.uuidv7({ error: "Stage type is required." }).trim(),
  status: z.enum(StageStatus, { error: "Stage status is required." }),
  createdAt: z.iso
    .datetime({ error: "Stage creation date is required." })
    .optional(),
});

// Canonical Schema
export const StageTypeSchema = z.object({
  id: z.uuidv7().trim(),
  name: z.string().trim().toLowerCase(),
  displayName: z.string().trim(),
  description: z.string().trim().optional(),
  createdAt: z.iso.datetime().optional(),
});

export const StageTypeSummarySchema = StageTypeSchema.pick({
  id: true,
  name: true,
  displayName: true,
});

export const StageTypeViewModelSchema = StageTypeSchema.pick({
  id: true,
  name: true,
  displayName: true,
  description: true,
});

export const StageSummarySchema = StageSchema.pick({
  id: true,
  name: true,
  displayName: true,
  logo: true,
  banner: true,
  status: true,
}).extend({
  isEventOwner: z.boolean().optional(),
});

export const StageViewModelSchema = StageSchema.pick({
  id: true,
  name: true,
  displayName: true,
  description: true,
  logo: true,
  banner: true,
  status: true,
  createdAt: true,
}).extend({
  isEventOwner: z.boolean().optional(),
});

export const StageSettingSchema = z.object({
  stageId: z.uuidv7({ error: "Stage ID is required." }).trim(),
  minTeams: z
    .int({ error: "Minimum number of teams required." })
    .min(2, { error: "Minimum number of teams must be 2 or more." }),
  maxTeams: z
    .int({ error: "Maximum number of teams required." })
    .max(256, { error: "Maximum number of teams must be less than 256." }),
  teamSize: z.int({ error: "Team size is required." }).min(1),
  numberOfSubstitutes: z
    .int({ error: "Number of substitutes is required." })
    .min(0),
  numberOfCoaches: z.int({ error: "Number of coaches is required." }).min(0),
  allowDraws: z.boolean().optional(),
  drawPolicy: z.enum(DrawResolutionPolicy).or(z.literal("")),
  gamemodePoolIds: z.array(z.uuidv7(), {
    error: "Game mode pool is required.",
  }),
  perGameGamemodeVeto: z.boolean({
    error: "Per game gamemode veto selection is required.",
  }),
  perMatchGamemodeVeto: z.boolean({
    error: "Per match gamemode veto selection is required.",
  }),
  mapPoolIds: z.array(z.uuidv7(), {
    error: "Map pool is required.",
  }),
  perGameMapVeto: z.boolean({
    error: "Per game map veto selection is required.",
  }),
  perMatchMapVeto: z.boolean({
    error: "Per game map veto selection is required.",
  }),
  characterPoolIds: z.array(z.uuidv7(), {
    error: "Character pool is required.",
  }),
  perGameCharacterVeto: z.boolean({
    error: "Per game character veto selection is required.",
  }),
  perMatchCharacterVeto: z.boolean({
    error: "Per game character veto selection is required.",
  }),
  itemPoolIds: z.array(z.uuidv7(), {
    error: "Item pool is required.",
  }),
  perGameItemVeto: z.boolean({
    error: "Per game item veto selection is required.",
  }),
  perMatchItemVeto: z.boolean({
    error: "Per match item veto selection is required.",
  }),
  perGameSideVeto: z.boolean({
    error: "Per game side veto selection is required.",
  }),
  perMatchSideVeto: z.boolean({
    error: "Per match side veto selection is required.",
  }),
  titleSettings: z.json().optional(),
  startDate: z.iso.datetime().optional(),
  endDate: z.iso.datetime().optional(),
  registrationStartDate: z.iso.datetime().optional(),
  registrationEndDate: z.iso.datetime().optional(),
  seedingType: z.enum(StageSeedingType, {
    error: "Stage seeding type is required.",
  }),
  joinType: z.enum(StageJoinType, {
    error: "Stage join type is required.",
  }),
  isLocked: z.boolean().optional(),
  stageSettingTemplateId: z.uuidv7().optional(),
});

export type Stage = z.infer<typeof StageSchema>;
export type StageSummary = z.infer<typeof StageSummarySchema>;
export type StageViewModel = z.infer<typeof StageViewModelSchema>;
export type StageType = z.infer<typeof StageTypeSchema>;
export type StageTypeSummary = z.infer<typeof StageTypeSummarySchema>;
export type StageTypeViewModel = z.infer<typeof StageTypeViewModelSchema>;
export type StageSetting = z.infer<typeof StageSettingSchema>;
