import { CampaignPack } from '@academy/content-model';
import { zodMission001RuntimeBoundary } from './mission-001-runtime-boundary';
import { zodMission002SafeParse } from './mission-002-safe-parse';
import { zodMission003SchemaDrift } from './mission-003-schema-drift';
import { zodMission004FallbackUi } from './mission-004-fallback-ui';
import { zodMission005ErrorMapping } from './mission-005-error-mapping';
import { zodMission006TransformingResponses } from './mission-006-transforming-responses';
import { zodMission007ContractTestThinking } from './mission-007-contract-test-thinking';
import { zodMission008BossBrokenDashboard } from './mission-008-boss-broken-dashboard';

/**
 * Campaign 2 — Zod Gate (13_CAMPAIGN_CONTENT_PACKS.md). Unlocks once
 * Foundations is complete. Eight missions ending in the Stop the Broken
 * Dashboard boss. Pure content — no engine changes beyond the campaign
 * unlock gate.
 */
export const zodGatePack: CampaignPack = {
  campaign: {
    id: 'zod-gate',
    title: 'Zod Gate',
    subtitle: 'Defend the runtime boundary',
    description:
      'The Java API keeps returning unexpected data. Stand the gate: validate at the boundary, transform quirks away, design honest failure states, and catch drift in CI before customers do.',
    track: 'mission-control',
    difficulty: 'intermediate',
    requiredCampaignId: 'typescript-trials',
    tags: ['zod', 'api', 'typescript', 'testing'],
    missions: [
      'zod-gate-001-runtime-boundary',
      'zod-gate-002-safe-parse',
      'zod-gate-003-schema-drift',
      'zod-gate-004-fallback-ui',
      'zod-gate-005-error-mapping',
      'zod-gate-006-transforming-responses',
      'zod-gate-007-contract-test-thinking',
      'zod-gate-008-boss-broken-dashboard',
    ],
    rewards: [{ type: 'badge', id: 'zod-gatekeeper', label: 'Zod Gatekeeper' }],
  },
  missions: [
    zodMission001RuntimeBoundary,
    zodMission002SafeParse,
    zodMission003SchemaDrift,
    zodMission004FallbackUi,
    zodMission005ErrorMapping,
    zodMission006TransformingResponses,
    zodMission007ContractTestThinking,
    zodMission008BossBrokenDashboard,
  ],
};
