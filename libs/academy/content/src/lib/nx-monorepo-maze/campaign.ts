import { CampaignPack } from '@academy/content-model';
import { nxMission001AppsVsLibs } from './mission-001-apps-vs-libs';
import { nxMission002SharedUi } from './mission-002-shared-ui-library';
import { nxMission003FeatureBoundary } from './mission-003-feature-library-boundary';
import { nxMission004Circular } from './mission-004-circular-dependency';
import { nxMission005Affected } from './mission-005-affected-build';
import { nxMission006Graph } from './mission-006-dependency-graph';
import { nxMission007TagRules } from './mission-007-tag-rules';
import { nxMission008BossRestoreOrder } from './mission-008-boss-restore-order';

/**
 * Campaign 5 — Nx Monorepo Maze (13_CAMPAIGN_CONTENT_PACKS.md). Unlocks after
 * Zod Gate. Eight missions on apps vs libs, boundaries, cycles, affected
 * builds and tag rules, ending in the Restore Monorepo Order boss.
 */
export const nxMonorepoMazePack: CampaignPack = {
  campaign: {
    id: 'nx-monorepo-maze',
    title: 'Nx Monorepo Maze',
    subtitle: 'Restore order to the workspace',
    description:
      'The monorepo is growing and, without rules, heading for chaos. Place code in the right libraries, break cycles, scope CI with affected builds, and enforce boundaries with tags so the workspace stays maintainable.',
    requiredCampaignId: 'zod-gate',
    tags: ['nx', 'cicd'],
    missions: [
      'nx-monorepo-maze-001-apps-vs-libs',
      'nx-monorepo-maze-002-shared-ui-library',
      'nx-monorepo-maze-003-feature-library-boundary',
      'nx-monorepo-maze-004-circular-dependency',
      'nx-monorepo-maze-005-affected-build',
      'nx-monorepo-maze-006-dependency-graph',
      'nx-monorepo-maze-007-tag-rules',
      'nx-monorepo-maze-008-boss-restore-order',
    ],
    rewards: [{ type: 'badge', id: 'nx-cartographer', label: 'Nx Cartographer' }],
  },
  missions: [
    nxMission001AppsVsLibs,
    nxMission002SharedUi,
    nxMission003FeatureBoundary,
    nxMission004Circular,
    nxMission005Affected,
    nxMission006Graph,
    nxMission007TagRules,
    nxMission008BossRestoreOrder,
  ],
};
