/**
 * Progression (03_GAMEPLAY_SYSTEMS.md), two parallel tracks driven by XP:
 *
 * - RANKS — the Mission Operator ladder, in granular I/II/III tiers so a
 *   promotion is earned, not tripped over. The top tier sits at ~90% of the
 *   maximum earnable XP (~32.9k across all campaigns, perfect and hint-free),
 *   so Mission Sovereign III is a completionist's badge of honour.
 * - LEVELS — game-flavoured operator codenames on a faster cadence, so the
 *   player levels up regularly even while the next rank tier is far away.
 */
export interface Rank {
  id: string;
  title: string;
  minXp: number;
}

export const RANKS: readonly Rank[] = [
  { id: 'junior-1', title: 'Deck Initiate I', minXp: 0 },
  { id: 'junior-2', title: 'Deck Initiate II', minXp: 120 },
  { id: 'junior-3', title: 'Deck Initiate III', minXp: 280 },
  { id: 'intermediate-1', title: 'Grid Runner I', minXp: 480 },
  { id: 'intermediate-2', title: 'Grid Runner II', minXp: 720 },
  { id: 'intermediate-3', title: 'Grid Runner III', minXp: 1000 },
  { id: 'senior-1', title: 'Systems Operative I', minXp: 1350 },
  { id: 'senior-2', title: 'Systems Operative II', minXp: 1750 },
  { id: 'senior-3', title: 'Systems Operative III', minXp: 5100 },
  { id: 'staff-1', title: 'Vector Commander I', minXp: 7100 },
  { id: 'staff-2', title: 'Vector Commander II', minXp: 9300 },
  { id: 'staff-3', title: 'Vector Commander III', minXp: 11700 },
  { id: 'principal-1', title: 'Nexus Overseer I', minXp: 14200 },
  { id: 'principal-2', title: 'Nexus Overseer II', minXp: 16800 },
  { id: 'principal-3', title: 'Nexus Overseer III', minXp: 19600 },
  { id: 'distinguished-1', title: 'Mission Sovereign I', minXp: 22400 },
  { id: 'distinguished-2', title: 'Mission Sovereign II', minXp: 26000 },
  { id: 'distinguished-3', title: 'Mission Sovereign III', minXp: 29600 },
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
  { level: 2, codename: 'Signal Spark', minXp: 150 },
  { level: 3, codename: 'First Light', minXp: 350 },
  { level: 4, codename: 'Nullspace Diver', minXp: 600 },
  { level: 5, codename: 'Glitch Hunter', minXp: 900 },
  { level: 6, codename: 'Static Breaker', minXp: 1250 },
  { level: 7, codename: 'Trace Walker', minXp: 1650 },
  { level: 8, codename: 'Circuit Rider', minXp: 2100 },
  { level: 9, codename: 'Thruster Pilot', minXp: 2600 },
  { level: 10, codename: 'Beacon Keeper', minXp: 3150 },
  { level: 11, codename: 'Cipher Sentinel', minXp: 3750 },
  { level: 12, codename: 'Grid Navigator', minXp: 4400 },
  { level: 13, codename: 'Vector Keeper', minXp: 5100 },
  { level: 14, codename: 'Edge Rider', minXp: 5850 },
  { level: 15, codename: 'Aether Whisperer', minXp: 6650 },
  { level: 16, codename: 'Pulse Commander', minXp: 7500 },
  { level: 17, codename: 'Relay Architect', minXp: 8300 },
  { level: 18, codename: 'Voidwatcher', minXp: 8900 },
  { level: 19, codename: 'Flux Alchemist', minXp: 9700 },
  { level: 20, codename: 'Aurora Sage', minXp: 10900 },
  { level: 21, codename: 'Storm Warden', minXp: 12300 },
  { level: 22, codename: 'Nova Weaver', minXp: 13900 },
  { level: 23, codename: 'Comet Hunter', minXp: 15600 },
  { level: 24, codename: 'Starfarer', minXp: 17400 },
  { level: 25, codename: 'Orbit Guardian', minXp: 19400 },
  { level: 26, codename: 'Eclipse Architect', minXp: 21500 },
  { level: 27, codename: 'Nebula Warden', minXp: 23800 },
  { level: 28, codename: 'Quantum Commander', minXp: 26000 },
  { level: 29, codename: 'Cosmic Architect', minXp: 28700 },
  { level: 30, codename: 'Mission Control Legend', minXp: 30000 },
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
