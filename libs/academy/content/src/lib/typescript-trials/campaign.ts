import { CampaignPack } from '@academy/content-model';
import { ttMission001UnknownData } from './mission-001-unknown-data';
import { ttMission002UnionGate } from './mission-002-union-gate';
import { ttMission003Narrowing } from './mission-003-narrowing-corridor';
import { ttMission004Generic } from './mission-004-generic-utility';
import { ttMission005OptionalTrap } from './mission-005-optional-trap';
import { ttMission006Refactor } from './mission-006-refactor-without-fear';
import { ttMission007TypeReview } from './mission-007-type-review';
import { ttMission008BossStabilise } from './mission-008-boss-stabilise-model-layer';

/**
 * Campaign 3 — TypeScript Trials (13_CAMPAIGN_CONTENT_PACKS.md). Unlocks after
 * Component Forge. Eight missions strengthening the type system — unknown,
 * unions, narrowing, generics, optionals — ending in the Stabilise the Model
 * Layer boss.
 */
export const typescriptTrialsPack: CampaignPack = {
  campaign: {
    id: 'typescript-trials',
    title: 'TypeScript Trials',
    subtitle: 'Strengthen the codebase',
    description:
      'Weak typing has let defects into the platform. Trade loose strings for unions, any for unknown and generics, and assertions for narrowing — then stabilise the whole model layer.',
    difficulty: 'intermediate',
    requiredCampaignId: 'component-forge',
    tags: ['typescript'],
    missions: [
      'typescript-trials-001-unknown-data',
      'typescript-trials-002-union-gate',
      'typescript-trials-003-narrowing-corridor',
      'typescript-trials-004-generic-utility',
      'typescript-trials-005-optional-trap',
      'typescript-trials-006-refactor-without-fear',
      'typescript-trials-007-type-review',
      'typescript-trials-008-boss-stabilise-model-layer',
    ],
    rewards: [{ type: 'badge', id: 'type-guardian', label: 'Type Guardian' }],
  },
  missions: [
    ttMission001UnknownData,
    ttMission002UnionGate,
    ttMission003Narrowing,
    ttMission004Generic,
    ttMission005OptionalTrap,
    ttMission006Refactor,
    ttMission007TypeReview,
    ttMission008BossStabilise,
  ],
};
