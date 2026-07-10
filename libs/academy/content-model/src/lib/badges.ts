/**
 * Badge catalogue (03_GAMEPLAY_SYSTEMS.md). Content awards badges by ID via
 * mission/campaign rewards; unknown IDs fail content validation.
 */
export interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const BADGES: readonly BadgeDefinition[] = [
  {
    id: 'platform-initiate',
    title: 'Platform Initiate',
    description: 'Completed the Foundations of the Platform campaign.',
    icon: '🎓',
  },
  {
    id: 'type-guardian',
    title: 'Type Guardian',
    description: 'Strengthened the platform with sound TypeScript models.',
    icon: '🛡️',
  },
  {
    id: 'component-crafter',
    title: 'Component Crafter',
    description: 'Built and reviewed well-structured Angular components.',
    icon: '🧩',
  },
  {
    id: 'zod-gatekeeper',
    title: 'Zod Gatekeeper',
    description: 'Defended a runtime boundary with schema validation.',
    icon: '🚧',
  },
  {
    id: 'api-diplomat',
    title: 'API Diplomat',
    description: 'Resolved a front-end / back-end contract dispute.',
    icon: '🤝',
  },
  {
    id: 'nx-cartographer',
    title: 'Nx Cartographer',
    description: 'Mapped and enforced monorepo boundaries.',
    icon: '🗺️',
  },
  {
    id: 'cdn-detective',
    title: 'CDN Detective',
    description: 'Traced stale content to the edge cache.',
    icon: '🔎',
  },
  {
    id: 'production-defender',
    title: 'Production Defender',
    description: 'Restored production during a live incident.',
    icon: '🚨',
  },
  {
    id: 'refactor-ranger',
    title: 'Refactor Ranger',
    description: 'Paid down technical debt without breaking behaviour.',
    icon: '🌲',
  },
  {
    id: 'accessibility-advocate',
    title: 'Accessibility Advocate',
    description: 'Kept the platform usable for everyone.',
    icon: '♿',
  },
  {
    id: 'ci-champion',
    title: 'CI Champion',
    description: 'Kept the pipeline green under pressure.',
    icon: '✅',
  },
  {
    id: 'compiler-ally',
    title: 'Compiler Ally',
    description: 'Completed the TypeScript Fundamentals field notes — the compiler is your teammate now.',
    icon: '📐',
  },
  {
    id: 'functional-artisan',
    title: 'Functional Artisan',
    description: 'Completed the Functional Programming field notes — predictable, composable, testable.',
    icon: '🧮',
  },
  {
    id: 'stream-navigator',
    title: 'Stream Navigator',
    description: 'Completed the RxJS field notes — change over time, modelled on purpose.',
    icon: '🌊',
  },
  {
    id: 'form-warden',
    title: 'Form Warden',
    description: 'Completed the Typed Forms field notes — user input, modelled safely.',
    icon: '📋',
  },
  {
    id: 'signal-operator',
    title: 'Signal Operator',
    description: 'Completed the Change Detection & Signals field notes — the view updates on purpose.',
    icon: '📡',
  },
  {
    id: 'injection-architect',
    title: 'Injection Architect',
    description: 'Completed the Dependency Injection field notes — dependencies declared, never hard-wired.',
    icon: '🔌',
  },
  {
    id: 'route-navigator',
    title: 'Route Navigator',
    description: 'Completed the Routing field notes — navigation without reboots, chunks on demand.',
    icon: '🧭',
  },
  {
    id: 'api-craftsman',
    title: 'API Craftsman',
    description: 'Completed the HTTP & API field notes — requests shaped, contracts honoured.',
    icon: '📨',
  },
  {
    id: 'state-steward',
    title: 'State Steward',
    description: 'Completed the State Management field notes — every piece of state in its right home.',
    icon: '🗃️',
  },
  // Programmatic achievements (Review Loop spec 08) — awarded by
  // GameStateService from play history, not by content rewards.
  {
    id: 'first-attempt-hero',
    title: 'First Attempt Hero',
    description: 'Cleared a mission with every first decision correct.',
    icon: '🎯',
  },
  {
    id: 'lesson-learned',
    title: 'Lesson Learned',
    description: 'Remediated every Technical Debt item from a mission in Academy Review.',
    icon: '📘',
  },
  {
    id: 'debt-destroyer',
    title: 'Debt Destroyer',
    description: 'Remediated every Technical Debt item across a whole campaign.',
    icon: '💥',
  },
  {
    id: 'review-champion',
    title: 'Review Champion',
    description: 'Remediated ten Technical Debt items in Academy Review.',
    icon: '🔁',
  },
] as const;

export function badgeById(id: string): BadgeDefinition | undefined {
  return BADGES.find((badge) => badge.id === id);
}
