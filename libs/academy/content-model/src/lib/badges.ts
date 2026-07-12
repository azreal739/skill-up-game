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
  {
    id: 'perf-surgeon',
    title: 'Performance Surgeon',
    description: 'Completed the Performance field notes — measured first, cut where the numbers pointed.',
    icon: '⚡',
  },
  {
    id: 'component-composer',
    title: 'Component Composer',
    description: 'Completed the Component Architecture field notes — parts with contracts, composed to outlive their pages.',
    icon: '🧱',
  },
  {
    id: 'test-strategist',
    title: 'Test Strategist',
    description: 'Completed the Testing field notes — promises placed at their cheapest level, red meaning news.',
    icon: '🧪',
  },
  {
    id: 'access-champion',
    title: 'Access Champion',
    description: 'Completed the Accessibility field notes — usable by everyone, proven not assumed.',
    icon: '♿',
  },
  {
    id: 'security-sentinel',
    title: 'Security Sentinel',
    description: 'Completed the Security field notes — hostile input assumed, defended in depth.',
    icon: '🛡️',
  },
  {
    id: 'incident-responder',
    title: 'Incident Responder',
    description: 'Completed the Production Debugging field notes — reproduce, mitigate, prevent.',
    icon: '🚒',
  },
  {
    id: 'systems-architect',
    title: 'Systems Architect',
    description: 'Completed the System Design field notes — requirements first, every tradeoff named.',
    icon: '🏛️',
  },
  {
    id: 'ai-collaborator',
    title: 'AI Collaborator',
    description: 'Completed the AI-Assisted Engineering field notes — amplify judgement, stay accountable.',
    icon: '🤖',
  },
  // Dance Academy — Judge Path
  {
    id: 'judge-foundations',
    title: 'Judge Foundations',
    description: 'Completed Core Judging Fundamentals — the six lenses every dance is judged through.',
    icon: '⚖️',
  },
  {
    id: 'waltz-judge',
    title: 'Waltz Judge',
    description: 'Completed the Waltz module — 3/4 time, rise and fall, and regal character read on sight.',
    icon: '🎩',
  },
  {
    id: 'nightclub-judge',
    title: 'Nightclub Judge',
    description: 'Completed the Nightclub module — slow-quick-quick, base-driven sway, and contained romantic geometry.',
    icon: '🌙',
  },
  {
    id: 'wcs-judge',
    title: 'West Coast Swing Judge',
    description: 'Completed the West Coast Swing module — the slot, anchor, and push/pass/whip read with confidence.',
    icon: '🎸',
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
