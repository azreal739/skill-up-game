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
] as const;

export function badgeById(id: string): BadgeDefinition | undefined {
  return BADGES.find((badge) => badge.id === id);
}
