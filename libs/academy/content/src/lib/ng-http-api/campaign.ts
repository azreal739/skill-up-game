import { CampaignPack } from '@academy/content-model';
import { fnHt001ColdRequests } from './mission-001-cold-requests';
import { fnHt002TypedBoundaries } from './mission-002-typed-boundaries';
import { fnHt003StatusCodes } from './mission-003-status-codes';
import { fnHt004Interceptors } from './mission-004-interceptors';
import { fnHt005Resilience } from './mission-005-resilience';
import { fnHt006QueryDesign } from './mission-006-query-design';
import { fnHt007Caching } from './mission-007-caching';
import { fnHt008ContractDesign } from './mission-008-contract-design';
import { fnHt009BossOrdersClient } from './mission-009-boss-orders-client';

/**
 * DMM Field Notes campaign 8 — HTTP & API Design. The wire block: cold
 * requests, generics as promises, status codes as blame, interceptors,
 * aimed resilience, list design, caching with mutation-owned resets and
 * contract discipline — ending with the orders client rebuilt.
 */
export const ngHttpApiPack: CampaignPack = {
  campaign: {
    id: 'ng-http-api',
    title: 'HTTP & API Design',
    subtitle: 'Honest requests, honoured contracts',
    description:
      'The HTTP sessions end to end: cold observables and one-execution mutations, typed-but-unverified boundaries, status codes as blame assignment, interceptors and immutable requests, retries that respect idempotency, pagination that survives inserts, caches reset by their mutations, and contract changes classified by blast radius — closing on the orders client.',
    track: 'field-notes',
    difficulty: 'intermediate',
    requiredCampaignId: 'ng-routing',
    tags: ['angular', 'api'],
    missions: [
      'ht-001-cold-requests',
      'ht-002-typed-boundaries',
      'ht-003-status-codes',
      'ht-004-interceptors',
      'ht-005-resilience',
      'ht-006-query-design',
      'ht-007-caching',
      'ht-008-contract-design',
      'ht-009-boss-orders-client',
    ],
    rewards: [{ type: 'badge', id: 'api-craftsman', label: 'API Craftsman' }],
  },
  missions: [
    fnHt001ColdRequests,
    fnHt002TypedBoundaries,
    fnHt003StatusCodes,
    fnHt004Interceptors,
    fnHt005Resilience,
    fnHt006QueryDesign,
    fnHt007Caching,
    fnHt008ContractDesign,
    fnHt009BossOrdersClient,
  ],
};
