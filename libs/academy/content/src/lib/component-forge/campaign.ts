import { CampaignPack } from '@academy/content-model';
import { cfMission001UiBlueprint } from './mission-001-ui-blueprint';
import { cfMission002Presentational } from './mission-002-presentational-components';
import { cfMission003Container } from './mission-003-container-components';
import { cfMission004Accessibility } from './mission-004-accessibility-sweep';
import { cfMission005Responsive } from './mission-005-responsive-layout';
import { cfMission006SharedLibrary } from './mission-006-shared-library-decision';
import { cfMission007ComponentReview } from './mission-007-component-review';
import { cfMission008BossTileSystem } from './mission-008-boss-tile-system';

/**
 * Campaign 2 — Component Forge (13_CAMPAIGN_CONTENT_PACKS.md). Unlocks after
 * Foundations. Eight missions on building reusable, typed, accessible
 * components with clean Nx boundaries, ending in the Reusable Tile System boss.
 */
export const componentForgePack: CampaignPack = {
  campaign: {
    id: 'component-forge',
    title: 'Component Forge',
    subtitle: 'Build the reusable tile system',
    description:
      'The UI guild needs reusable components for the platform. Separate smart from dumb, keep components typed and accessible, respect monorepo boundaries, and forge a tile system every team can build on.',
    track: 'mission-control',
    difficulty: 'beginner',
    requiredCampaignId: 'foundations',
    tags: ['angular', 'scss', 'a11y', 'nx'],
    missions: [
      'component-forge-001-ui-blueprint',
      'component-forge-002-presentational-components',
      'component-forge-003-container-components',
      'component-forge-004-accessibility-sweep',
      'component-forge-005-responsive-layout',
      'component-forge-006-shared-library-decision',
      'component-forge-007-component-review',
      'component-forge-008-boss-tile-system',
    ],
    rewards: [{ type: 'badge', id: 'accessibility-advocate', label: 'Accessibility Advocate' }],
  },
  missions: [
    cfMission001UiBlueprint,
    cfMission002Presentational,
    cfMission003Container,
    cfMission004Accessibility,
    cfMission005Responsive,
    cfMission006SharedLibrary,
    cfMission007ComponentReview,
    cfMission008BossTileSystem,
  ],
};
