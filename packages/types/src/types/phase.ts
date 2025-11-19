import * as z from "zod";
import { MatchSummarySchema } from "./match";

export const PhaseSchema = z.object({
  id: z.uuidv7({ error: "Phase ID is required." }).trim(),
  stageId: z.uuidv7({ error: "Stage ID is required." }).trim(),
  formatId: z.uuidv7({ error: "Match format ID is required." }).trim(),
  matchIndexStart: z.preprocess(
    (val) => (val !== "" && val !== undefined ? Number(val) : val),
    z
      .int({ error: "Starting match index is required." })
      .min(0, { error: "Starting match index must be a positive number." }),
  ),
  matchIndexEnd: z.preprocess(
    (val) => (val !== "" && val !== undefined ? Number(val) : val),
    z
      .int({ error: "Ending match index is required." })
      .min(0, { error: "Ending match index must be a positive number." }),
  ),
  createdAt: z.iso
    .datetime({ error: "Phase creation date is required." })
    .optional(),
  mapVetoOrder: z.json().optional(),
  characterVetoOrder: z.json().optional(),
  itemVetoOrder: z.json().optional(),
  sideVetoOrder: z.json().optional(),
  get matches() {
    return z.array(MatchSummarySchema).optional();
  },
});

export const PhaseSummarySchema = PhaseSchema.pick({
  id: true,
  stageId: true,
  formatId: true,
  matchIndexStart: true,
  matchIndexEnd: true,
});

export const PhaseViewModelSchema = PhaseSchema.pick({
  id: true,
  stageId: true,
  formatId: true,
  matchIndexStart: true,
  matchIndexEnd: true,
  matches: true,
});

export type Phase = z.infer<typeof PhaseSchema>;

export type PhaseSummary = z.infer<typeof PhaseSummarySchema>;

export type PhaseViewModel = z.infer<typeof PhaseViewModelSchema>;
