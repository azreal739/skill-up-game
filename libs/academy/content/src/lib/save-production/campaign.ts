import { CampaignPack } from '@academy/content-model';
import { prodMission001IncidentDeclared } from './mission-001-incident-declared';
import { prodMission002ImpactAssessment } from './mission-002-impact-assessment';
import { prodMission003LogsAndMetrics } from './mission-003-logs-and-metrics';
import { prodMission004FeatureFlagDecision } from './mission-004-feature-flag-decision';
import { prodMission005RollbackOrHotfix } from './mission-005-rollback-or-hotfix';
import { prodMission006CommunicationUpdate } from './mission-006-communication-update';
import { prodMission007ValidateRecovery } from './mission-007-validate-recovery';
import { prodMission008PostIncidentReview } from './mission-008-post-incident-review';
import { prodMission009BossProductionRestored } from './mission-009-boss-production-restored';

/**
 * Campaign 8 — Save Production (13_CAMPAIGN_CONTENT_PACKS.md). The capstone
 * campaign, unlocking after CloudFront Outage. Nine missions taking a live
 * incident from declaration through impact assessment, diagnosis, mitigation,
 * communication, recovery validation and a blameless review, ending in the
 * Production Restored boss.
 */
export const saveProductionPack: CampaignPack = {
  campaign: {
    id: 'save-production',
    title: 'Save Production',
    subtitle: 'A live incident — bring the platform back',
    description:
      'Production is degraded and you are the incident commander. Declare and size the incident, let logs and metrics find the cause, mitigate with a feature flag or rollback, keep stakeholders informed, validate recovery with real signals, and run a blameless review — then survive a fresh Sev1 end to end.',
    difficulty: 'expert',
    requiredCampaignId: 'cloudfront-outage',
    tags: ['incident-response'],
    missions: [
      'save-production-001-incident-declared',
      'save-production-002-impact-assessment',
      'save-production-003-logs-and-metrics',
      'save-production-004-feature-flag-decision',
      'save-production-005-rollback-or-hotfix',
      'save-production-006-communication-update',
      'save-production-007-validate-recovery',
      'save-production-008-post-incident-review',
      'save-production-009-boss-production-restored',
    ],
    rewards: [{ type: 'badge', id: 'production-defender', label: 'Production Defender' }],
  },
  missions: [
    prodMission001IncidentDeclared,
    prodMission002ImpactAssessment,
    prodMission003LogsAndMetrics,
    prodMission004FeatureFlagDecision,
    prodMission005RollbackOrHotfix,
    prodMission006CommunicationUpdate,
    prodMission007ValidateRecovery,
    prodMission008PostIncidentReview,
    prodMission009BossProductionRestored,
  ],
};
