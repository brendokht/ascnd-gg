import { DrawResolutionPolicy, Result } from "@ascnd-gg/database/browser";
import * as z from "zod";

export const MatchSchema = z.object({
  id: z.uuidv7({ error: "Match ID is required." }).trim(),
  phaseId: z.uuidv7({ error: "Phase ID is required." }).trim(),
  matchIndex: z.int({ error: "Match index ID is required." }),
  team1Id: z.uuidv7({ error: "Team 1 ID is required." }).trim(),
  team2Id: z.uuidv7({ error: "Team 2 ID is required." }).trim(),
  team1Score: z.int({ error: "Team 1 Score is required." }),
  team2Score: z.int({ error: "Team 2 Score is required." }),
  gameWinsNeeded: z.int({ error: "Game wins needed is required." }),
  result: z.enum(Result, {
    error: "Match Result is must be value from Result enum.",
  }),
  startDate: z.iso
    .datetime({ error: "Match date must be a valid ISO datetime." })
    .optional(),
  mapVeto: z.boolean({ error: "Map veto choice is required." }),
  characterVeto: z.boolean({ error: "Character veto choice is required." }),
  itemVeto: z.boolean({ error: "Item veto choice is required." }),
  sideVeto: z.boolean({ error: "Side veto choice is required." }),
  mapVetoOrder: z.json().optional(),
  characterVetoOrder: z.json().optional(),
  itemVetoOrder: z.json().optional(),
  sideVetoOrder: z.json().optional(),
  playerStatistics: z.json().optional(),
  drawPolicy: z
    .enum(DrawResolutionPolicy, {
      error:
        "Draw resolution policy must be value from DrawResolutionPolicy enum.",
    })
    .optional(),
  createdAt: z.iso
    .datetime({ error: "Match creation date must be valid ISO datetime." })
    .optional(),
  get games() {
    return z.array(GameSummarySchema);
  },
});

export const MatchFormatSchema = z.object({
  id: z.uuidv7({ error: "Match Format ID is required." }).trim(),
  name: z
    .string({ error: "Match Format name is required." })
    .trim()
    .toLowerCase(),
  displayName: z
    .string({ error: "Match Format display name is required." })
    .trim(),
  shortName: z.string({ error: "Match Format short name is required." }).trim(),
  targetScore: z.int({
    error: "Match Format target score must be an integer.",
  }),
  gamesPerMatch: z
    .int({ error: "Match Format games per match must be an integer." })
    .optional(),
  gamesSettingTemplateRequired: z
    .boolean({ error: "Match Format games per match must be a boolean." })
    .optional(),
  metadata: z.json().optional(),
  createdAt: z.iso
    .datetime({
      error: "Match Format creation date must be valid ISO datetime.",
    })
    .optional(),
});

export const MatchSummarySchema = MatchSchema.pick({
  id: true,
  team1Id: true,
  team2Id: true,
  team1Score: true,
  team2Score: true,
  result: true,
});

export const MatchViewModelSchema = MatchSchema.pick({
  id: true,
  team1Id: true,
  team2Id: true,
  team1Score: true,
  team2Score: true,
  result: true,
  games: true,
  matchIndex: true,
});

export const MatchFormatViewModelSchema = MatchFormatSchema.pick({
  id: true,
  name: true,
  displayName: true,
  shortName: true,
});

export const GameSchema = z.object({
  id: z.uuidv7({ error: "Game ID is required." }).trim(),
  matchId: z.uuidv7({ error: "Match ID is required." }).trim(),
  team1Score: z.int({ error: "Team 1 Score is required." }),
  team2Score: z.int({ error: "Team 2 Score is required." }),
  result: z.enum(Result, { error: "Game Result is required." }),
  drawPolicy: z
    .enum(DrawResolutionPolicy, {
      error: "Draw resolution policy is required.",
    })
    .optional(),
  mapVeto: z.boolean({ error: "Map veto choice is required." }),
  characterVeto: z.boolean({ error: "Character veto choice is required." }),
  itemVeto: z.boolean({ error: "Item veto choice is required." }),
  sideVeto: z.boolean({ error: "Side veto choice is required." }),
  mapVetoOrder: z.json().optional(),
  characterVetoOrder: z.json().optional(),
  itemVetoOrder: z.json().optional(),
  sideVetoOrder: z.json().optional(),
  playerStatistics: z.object().optional(),
  createdAt: z.iso
    .datetime({ error: "Game creation date is required." })
    .optional(),
});

export const GameSummarySchema = GameSchema.pick({
  id: true,
  team1Score: true,
  team2Score: true,
  result: true,
});

export const GameViewModelSchema = GameSchema.pick({
  id: true,
  team1Score: true,
  team2Score: true,
  result: true,
  matchId: true,
});

export type Match = z.infer<typeof MatchSchema>;

export type MatchSummary = z.infer<typeof MatchSummarySchema>;

export type MatchViewModel = z.infer<typeof MatchViewModelSchema>;
export type MatchFormat = z.infer<typeof MatchFormatSchema>;
export type MatchFormatViewModel = z.infer<typeof MatchFormatViewModelSchema>;

export type Game = z.infer<typeof GameSchema>;

export type GameSummary = z.infer<typeof GameSummarySchema>;

export type GameViewModel = z.infer<typeof GameViewModelSchema>;
