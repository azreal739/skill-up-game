import { CampaignPack } from '@academy/content-model';
import { fnSys001Requirements } from './mission-001-requirements';
import { fnSys002RenderingStrategies } from './mission-002-rendering-strategies';
import { fnSys003DataLayer } from './mission-003-data-layer';
import { fnSys004Realtime } from './mission-004-realtime';
import { fnSys005ScalingFrontend } from './mission-005-scaling-frontend';
import { fnSys006PerformanceAtScale } from './mission-006-performance-at-scale';
import { fnSys007Resilience } from './mission-007-resilience';
import { fnSys008Tradeoffs } from './mission-008-tradeoffs';
import { fnSys009BossDesignReview } from './mission-009-boss-design-review';

/**
 * DMM Field Notes campaign 16 — System Design for Front-End Engineers.
 * The architecture block: requirements before boxes, rendering strategies
 * per surface, the data layer as architecture, real-time transports,
 * scaling to teams, performance as a budget, designing for failure, and
 * articulating tradeoffs — ending with a full system design defended.
 */
export const feSystemDesignPack: CampaignPack = {
  campaign: {
    id: 'fe-system-design',
    title: 'System Design for Front-End',
    subtitle: 'Requirements first, tradeoffs named',
    description:
      'The system-design sessions end to end: clarify requirements before architecture, choose rendering per surface (CSR/SSR/SSG/hydration), design the client data layer (caching, normalization, invalidation), pick real-time transports (poll/SSE/WebSocket), scale the codebase to teams (module boundaries, micro-frontends), treat performance as a budget, design for failure, and defend every choice by its tradeoff — closing on a full system design.',
    track: 'field-notes',
    difficulty: 'expert',
    requiredCampaignId: 'ng-production-debugging',
    tags: ['angular'],
    missions: [
      'sys-001-requirements',
      'sys-002-rendering-strategies',
      'sys-003-data-layer',
      'sys-004-realtime',
      'sys-005-scaling-frontend',
      'sys-006-performance-at-scale',
      'sys-007-resilience',
      'sys-008-tradeoffs',
      'sys-009-boss-design-review',
    ],
    rewards: [{ type: 'badge', id: 'systems-architect', label: 'Systems Architect' }],
  },
  missions: [
    fnSys001Requirements,
    fnSys002RenderingStrategies,
    fnSys003DataLayer,
    fnSys004Realtime,
    fnSys005ScalingFrontend,
    fnSys006PerformanceAtScale,
    fnSys007Resilience,
    fnSys008Tradeoffs,
    fnSys009BossDesignReview,
  ],
};
