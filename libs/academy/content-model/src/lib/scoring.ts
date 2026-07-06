/**
 * Pure XP scoring rules (03_GAMEPLAY_SYSTEMS.md, 10_HELP_CENTRE_AND_HINT_SYSTEM.md).
 */
import { Difficulty, HintDefinition } from './types';

export const XP_BY_DIFFICULTY: Record<Difficulty, number> = {
  intro: 10,
  easy: 10,
  medium: 25,
  hard: 50,
  boss: 100,
};

export const HINT_COST_BY_LEVEL: Record<1 | 2 | 3 | 4, number> = {
  1: 0,
  2: 5,
  3: 10,
  4: 20,
};

export const PERFECT_MISSION_BONUS = 50;
export const NO_HINT_BONUS = 25;

export function hintCost(hint: HintDefinition): number {
  return hint.cost ?? HINT_COST_BY_LEVEL[hint.level];
}

export interface ChallengeScoreInput {
  difficulty: Difficulty;
  /** 0..1 from evaluation. */
  scoreRatio: number;
  /** Hints the player revealed for this challenge. */
  hintsUsed: HintDefinition[];
}

/**
 * XP for one challenge: base XP scaled by the score, minus hint costs.
 * Hints reduce the reward but never push it negative — hints must never
 * block progress.
 */
export function challengeXp(input: ChallengeScoreInput): number {
  const base = XP_BY_DIFFICULTY[input.difficulty];
  const earned = Math.round(base * input.scoreRatio);
  const costs = input.hintsUsed.reduce((sum, hint) => sum + hintCost(hint), 0);
  return Math.max(0, earned - costs);
}

export interface MissionScoreInput {
  challenges: ChallengeScoreInput[];
  /** True when every challenge was answered correctly on the first attempt. */
  perfect: boolean;
}

export interface MissionScore {
  challengeXp: number;
  perfectBonus: number;
  noHintBonus: number;
  totalXp: number;
}

export function missionScore(input: MissionScoreInput): MissionScore {
  const base = input.challenges.reduce((sum, c) => sum + challengeXp(c), 0);
  const usedAnyHint = input.challenges.some((c) => c.hintsUsed.length > 0);
  const perfectBonus = input.perfect ? PERFECT_MISSION_BONUS : 0;
  const noHintBonus = usedAnyHint ? 0 : NO_HINT_BONUS;
  return {
    challengeXp: base,
    perfectBonus,
    noHintBonus,
    totalXp: base + perfectBonus + noHintBonus,
  };
}
