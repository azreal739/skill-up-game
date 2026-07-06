/**
 * Rank ladder (03_GAMEPLAY_SYSTEMS.md). Progression is XP-threshold based in
 * the vertical slice; campaign-milestone requirements can be layered on when
 * more campaigns ship.
 */
export interface Rank {
  id: string;
  title: string;
  minXp: number;
}

export const RANKS: readonly Rank[] = [
  { id: 'graduate-engineer', title: 'Graduate Engineer', minXp: 0 },
  { id: 'junior-engineer', title: 'Junior Engineer', minXp: 100 },
  { id: 'software-engineer', title: 'Software Engineer', minXp: 250 },
  { id: 'intermediate-engineer', title: 'Intermediate Engineer', minXp: 450 },
  { id: 'senior-engineer', title: 'Senior Engineer', minXp: 700 },
  { id: 'senior-specialist', title: 'Senior Specialist', minXp: 1000 },
  { id: 'technical-lead', title: 'Technical Lead', minXp: 1400 },
  { id: 'principal-engineer', title: 'Principal Engineer', minXp: 1900 },
  { id: 'staff-engineer', title: 'Staff Engineer', minXp: 2500 },
  { id: 'architect', title: 'Architect', minXp: 3200 },
  { id: 'chief-architect', title: 'Chief Architect', minXp: 4000 },
  { id: 'distinguished-engineer', title: 'Distinguished Engineer', minXp: 5000 },
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
