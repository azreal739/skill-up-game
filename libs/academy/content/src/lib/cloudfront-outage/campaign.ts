import { CampaignPack } from '@academy/content-model';
import { cdnMission001StaticHosting } from './mission-001-static-hosting-basics';
import { cdnMission002HashedAssets } from './mission-002-hashed-assets';
import { cdnMission003CacheBehaviour } from './mission-003-cache-behaviour';
import { cdnMission004Invalidation } from './mission-004-invalidation';
import { cdnMission005OldBundle } from './mission-005-old-bundle-mystery';
import { cdnMission006EnvironmentConfig } from './mission-006-environment-config';
import { cdnMission007DeploymentVerification } from './mission-007-deployment-verification';
import { cdnMission008BossRestoreTheEdge } from './mission-008-boss-restore-the-edge';

/**
 * Campaign 7 — CloudFront Outage (13_CAMPAIGN_CONTENT_PACKS.md). Unlocks after
 * API Contract Crisis. Eight missions on static hosting, hashed assets, cache
 * behaviour, invalidation, environment config and deployment verification,
 * ending in the Restore the Edge boss.
 */
export const cloudfrontOutagePack: CampaignPack = {
  campaign: {
    id: 'cloudfront-outage',
    title: 'CloudFront Outage',
    subtitle: 'A deploy went out — users still see the old app',
    description:
      'Static hosting looks simple until a deploy will not appear. Learn how a built SPA is served from the edge, why bundles are hashed, how cache TTLs and invalidation decide what users see, and how to verify a deploy is genuinely live — then restore a real stale-edge outage.',
    requiredCampaignId: 'api-contract-crisis',
    tags: ['cicd', 'incident-response'],
    missions: [
      'cloudfront-outage-001-static-hosting-basics',
      'cloudfront-outage-002-hashed-assets',
      'cloudfront-outage-003-cache-behaviour',
      'cloudfront-outage-004-invalidation',
      'cloudfront-outage-005-old-bundle-mystery',
      'cloudfront-outage-006-environment-config',
      'cloudfront-outage-007-deployment-verification',
      'cloudfront-outage-008-boss-restore-the-edge',
    ],
    rewards: [{ type: 'badge', id: 'cdn-detective', label: 'CDN Detective' }],
  },
  missions: [
    cdnMission001StaticHosting,
    cdnMission002HashedAssets,
    cdnMission003CacheBehaviour,
    cdnMission004Invalidation,
    cdnMission005OldBundle,
    cdnMission006EnvironmentConfig,
    cdnMission007DeploymentVerification,
    cdnMission008BossRestoreTheEdge,
  ],
};
