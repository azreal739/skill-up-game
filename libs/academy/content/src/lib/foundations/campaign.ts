import { CampaignPack } from '@academy/content-model';
import { mission001Welcome } from './mission-001-welcome';
import { mission002FirstComponent } from './mission-002-first-component';
import { mission003TypeSafety } from './mission-003-type-safety';
import { mission004BrokenCard } from './mission-004-broken-card';

/**
 * Campaign 1 — Foundations of the Platform (13_CAMPAIGN_CONTENT_PACKS.md).
 * Vertical-slice content: four of the planned ten missions; the rest are
 * added as pure data without engine changes.
 */
export const foundationsPack: CampaignPack = {
  campaign: {
    id: 'foundations',
    title: 'Foundations of the Platform',
    subtitle: 'Begin your Academy journey',
    description:
      'Learn the Angular, TypeScript and API-boundary basics needed to work safely on the platform — and handle your first mini incident.',
    tags: ['angular', 'typescript', 'api', 'zod'],
    missions: [
      'foundations-001-welcome',
      'foundations-002-first-component',
      'foundations-003-type-safety',
      'foundations-004-broken-card',
    ],
    rewards: [{ type: 'badge', id: 'platform-initiate', label: 'Platform Initiate' }],
  },
  missions: [
    mission001Welcome,
    mission002FirstComponent,
    mission003TypeSafety,
    mission004BrokenCard,
  ],
};
