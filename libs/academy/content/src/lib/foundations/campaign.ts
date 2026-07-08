import { CampaignPack } from '@academy/content-model';
import { mission001Welcome } from './mission-001-welcome';
import { mission002FirstComponent } from './mission-002-first-component';
import { mission003TypeSafety } from './mission-003-type-safety';
import { mission004BrokenCard } from './mission-004-broken-card';
import { mission005BindingTheSignal } from './mission-005-binding-the-signal';
import { mission006InputOutputRelay } from './mission-006-input-output-relay';
import { mission007ScssContainment } from './mission-007-scss-containment';
import { mission008GitCheckpoint } from './mission-008-git-checkpoint';
import { mission009FirstTestRun } from './mission-009-first-test-run';
import { mission010BossLaunchDashboard } from './mission-010-boss-launch-dashboard';

/**
 * Campaign 1 — Foundations of the Platform (13_CAMPAIGN_CONTENT_PACKS.md).
 * Ten missions ending in the Launch the Dashboard boss. Play order follows
 * doc 13; mission IDs stay stable regardless of ordering (doc 06).
 */
export const foundationsPack: CampaignPack = {
  campaign: {
    id: 'foundations',
    title: 'Foundations of the Platform',
    subtitle: 'Begin your Academy journey',
    description:
      'Learn the Angular, TypeScript, SCSS, Git, testing and API-boundary basics needed to work safely on the platform — then run the Dashboard v2 launch yourself.',
    difficulty: 'beginner',
    tags: ['angular', 'typescript', 'scss', 'git', 'testing', 'api'],
    missions: [
      'foundations-001-welcome',
      'foundations-002-first-component',
      'foundations-005-binding-the-signal',
      'foundations-006-input-output-relay',
      'foundations-003-type-safety',
      'foundations-007-scss-containment',
      'foundations-008-git-checkpoint',
      'foundations-009-first-test-run',
      'foundations-004-broken-card',
      'foundations-010-boss-launch-dashboard',
    ],
    rewards: [{ type: 'badge', id: 'platform-initiate', label: 'Platform Initiate' }],
  },
  missions: [
    mission001Welcome,
    mission002FirstComponent,
    mission005BindingTheSignal,
    mission006InputOutputRelay,
    mission003TypeSafety,
    mission007ScssContainment,
    mission008GitCheckpoint,
    mission009FirstTestRun,
    mission004BrokenCard,
    mission010BossLaunchDashboard,
  ],
};
