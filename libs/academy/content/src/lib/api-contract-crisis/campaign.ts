import { CampaignPack } from '@academy/content-model';
import { apiMission001ReadTheDto } from './mission-001-read-the-dto';
import { apiMission002HttpStatus } from './mission-002-http-status-investigation';
import { apiMission003ErrorPayloadDrift } from './mission-003-error-payload-drift';
import { apiMission004JavaAssumption } from './mission-004-java-service-assumption';
import { apiMission005Alignment } from './mission-005-fe-be-alignment';
import { apiMission006ContractReview } from './mission-006-contract-review';
import { apiMission007ReleaseRisk } from './mission-007-release-risk';
import { apiMission008BossSaveTheIntegration } from './mission-008-boss-save-the-integration';

/**
 * Campaign 6 — API Contract Crisis (13_CAMPAIGN_CONTENT_PACKS.md). Unlocks
 * after Nx Monorepo Maze. Eight missions on reading DTOs, status and error
 * payloads, contract drift, boundary adapters and safe release, ending in the
 * Save the Integration boss.
 */
export const apiContractCrisisPack: CampaignPack = {
  campaign: {
    id: 'api-contract-crisis',
    title: 'API Contract Crisis',
    subtitle: 'Front end and back end have drifted apart',
    description:
      'A live integration is failing on real data. Read the DTO the API actually sends, decode its status and error payloads, reconcile front-end and back-end contracts, adapt cleanly at the boundary, and release the fix without causing a second incident.',
    requiredCampaignId: 'nx-monorepo-maze',
    tags: ['api', 'java'],
    missions: [
      'api-contract-crisis-001-read-the-dto',
      'api-contract-crisis-002-http-status-investigation',
      'api-contract-crisis-003-error-payload-drift',
      'api-contract-crisis-004-java-service-assumption',
      'api-contract-crisis-005-fe-be-alignment',
      'api-contract-crisis-006-contract-review',
      'api-contract-crisis-007-release-risk',
      'api-contract-crisis-008-boss-save-the-integration',
    ],
    rewards: [{ type: 'badge', id: 'api-diplomat', label: 'API Diplomat' }],
  },
  missions: [
    apiMission001ReadTheDto,
    apiMission002HttpStatus,
    apiMission003ErrorPayloadDrift,
    apiMission004JavaAssumption,
    apiMission005Alignment,
    apiMission006ContractReview,
    apiMission007ReleaseRisk,
    apiMission008BossSaveTheIntegration,
  ],
};
