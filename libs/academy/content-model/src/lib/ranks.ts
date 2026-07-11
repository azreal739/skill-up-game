/**
 * Progression (03_GAMEPLAY_SYSTEMS.md), two parallel tracks driven by XP:
 *
 * - RANKS — the engineering career ladder, in granular I/II/III tiers so a
 *   promotion is earned, not tripped over. The top tier sits at ~90% of the
 *   maximum earnable XP (~27.3k across all campaigns, perfect and hint-free),
 *   so Distinguished III is a completionist's badge of honour.
 * - LEVELS — game-flavoured operator codenames on a faster cadence, so the
 *   player levels up regularly even while the next rank tier is far away.
 */
export interface Rank {
  id: string;
  title: string;
  minXp: number;
}

export const RANKS: readonly Rank[] = [
  { id: 'junior-1', title: 'Junior Engineer I', minXp: 0 },
  { id: 'junior-2', title: 'Junior Engineer II', minXp: 120 },
  { id: 'junior-3', title: 'Junior Engineer III', minXp: 280 },
  { id: 'intermediate-1', title: 'Intermediate Engineer I', minXp: 480 },
  { id: 'intermediate-2', title: 'Intermediate Engineer II', minXp: 720 },
  { id: 'intermediate-3', title: 'Intermediate Engineer III', minXp: 1000 },
  { id: 'senior-1', title: 'Senior Engineer I', minXp: 1350 },
  { id: 'senior-2', title: 'Senior Engineer II', minXp: 1750 },
  { id: 'senior-3', title: 'Senior Engineer III', minXp: 4200 },
  { id: 'staff-1', title: 'Staff Engineer I', minXp: 5700 },
  { id: 'staff-2', title: 'Staff Engineer II', minXp: 7400 },
  { id: 'staff-3', title: 'Staff Engineer III', minXp: 9300 },
  { id: 'principal-1', title: 'Principal Engineer I', minXp: 11300 },
  { id: 'principal-2', title: 'Principal Engineer II', minXp: 13400 },
  { id: 'principal-3', title: 'Principal Engineer III', minXp: 15600 },
  { id: 'distinguished-1', title: 'Distinguished Engineer I', minXp: 17900 },
  { id: 'distinguished-2', title: 'Distinguished Engineer II', minXp: 20300 },
  { id: 'distinguished-3', title: 'Distinguished Engineer III', minXp: 22700 },
] as const;

export function rankForXp(xp: number): Rank {
  let current = RANKS[0];
  for (const rank of RANKS) {
    if (xp >= rank.minXp) {
      current = rank;
    }
  }
  return current;
}

export function nextRank(xp: number): Rank | null {
  return RANKS.find((rank) => rank.minXp > xp) ?? null;
}

/** 0..1 progress from the current rank towards the next one. */
export function rankProgress(xp: number): number {
  const current = rankForXp(xp);
  const next = nextRank(xp);
  if (!next) {
    return 1;
  }
  return (xp - current.minXp) / (next.minXp - current.minXp);
}

export interface PlayerLevel {
  /** 1-based level number. */
  level: number;
  codename: string;
  minXp: number;
}

export const LEVELS: readonly PlayerLevel[] = [
  { level: 1, codename: 'Bootloader', minXp: 0 },
  { level: 2, codename: 'Init Process', minXp: 150 },
  { level: 3, codename: 'Hello World', minXp: 350 },
  { level: 4, codename: 'Null Checker', minXp: 600 },
  { level: 5, codename: 'Bug Squasher', minXp: 900 },
  { level: 6, codename: 'Merge Conflict Survivor', minXp: 1250 },
  { level: 7, codename: 'Debugger', minXp: 1650 },
  { level: 8, codename: 'Refactorer', minXp: 2100 },
  { level: 9, codename: 'Pipeline Pilot', minXp: 2600 },
  { level: 10, codename: 'Code Reviewer', minXp: 3150 },
  { level: 11, codename: 'Schema Sentinel', minXp: 3750 },
  { level: 12, codename: 'Graph Navigator', minXp: 4400 },
  { level: 13, codename: 'Contract Keeper', minXp: 5100 },
  { level: 14, codename: 'Edge Rider', minXp: 5850 },
  { level: 15, codename: 'Cache Whisperer', minXp: 6650 },
  { level: 16, codename: 'Incident Commander', minXp: 7500 },
  { level: 17, codename: 'Architect of the Grid', minXp: 8300 },
  { level: 18, codename: 'Legend of Production', minXp: 8900 },
  { level: 19, codename: 'Type Alchemist', minXp: 9700 },
  { level: 20, codename: 'Pipeline Sage', minXp: 10900 },
  { level: 21, codename: 'Form Warden Prime', minXp: 12300 },
  { level: 22, codename: 'Dependency Weaver', minXp: 13900 },
  { level: 23, codename: 'Latency Hunter', minXp: 15600 },
  { level: 24, codename: 'Keeper of Contracts', minXp: 17400 },
  { level: 25, codename: 'Frame Budget Guardian', minXp: 19400 },
  { level: 26, codename: 'Inclusive Architect', minXp: 21500 },
] as const;

export function levelForXp(xp: number): PlayerLevel {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (xp >= level.minXp) {
      current = level;
    }
  }
  return current;
}

export function nextLevel(xp: number): PlayerLevel | null {
  return LEVELS.find((level) => level.minXp > xp) ?? null;
}

/** 0..1 progress from the current level towards the next one. */
export function levelProgress(xp: number): number {
  const current = levelForXp(xp);
  const next = nextLevel(xp);
  if (!next) {
    return 1;
  }
  return (xp - current.minXp) / (next.minXp - current.minXp);
}
