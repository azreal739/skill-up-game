import { CampaignPack } from '@academy/content-model';
import { fnCa001ComponentsHaveJobs } from './mission-001-components-have-jobs';
import { fnCa002IoContracts } from './mission-002-io-contracts';
import { fnCa003ContentProjection } from './mission-003-content-projection';
import { fnCa004Composition } from './mission-004-composition';
import { fnCa005ReuseBoundaries } from './mission-005-reuse-boundaries';
import { fnCa006Communication } from './mission-006-communication';
import { fnCa007Encapsulation } from './mission-007-encapsulation';
import { fnCa008TestingContracts } from './mission-008-testing-contracts';
import { fnCa009BossDesignSystemCard } from './mission-009-boss-design-system-card';

/**
 * DMM Field Notes campaign 11 — Component Architecture. The composition
 * block: jobs separated, contracts as API, projection and templates and
 * directives as the composition kit, reuse earned by evidence, honest
 * communication routes, walls with doors, and contract specs — ending
 * with the design-system card.
 */
export const ngComponentArchitecturePack: CampaignPack = {
  campaign: {
    id: 'ng-component-architecture',
    title: 'Component Architecture',
    subtitle: 'Compose parts that outlive their pages',
    description:
      'The component sessions end to end: presentational vs container jobs, inputs and outputs designed like REST APIs, ng-content and templates-with-context and directives as the composition kit, the rule of three against welded abstractions, sibling communication routed honestly, style walls with custom-property doors, and specs that test contracts — closing on the design-system card.',
    track: 'field-notes',
    difficulty: 'advanced',
    requiredCampaignId: 'ng-performance',
    tags: ['angular'],
    missions: [
      'ca-001-components-have-jobs',
      'ca-002-io-contracts',
      'ca-003-content-projection',
      'ca-004-composition',
      'ca-005-reuse-boundaries',
      'ca-006-communication',
      'ca-007-encapsulation',
      'ca-008-testing-contracts',
      'ca-009-boss-design-system-card',
    ],
    rewards: [{ type: 'badge', id: 'component-composer', label: 'Component Composer' }],
  },
  missions: [
    fnCa001ComponentsHaveJobs,
    fnCa002IoContracts,
    fnCa003ContentProjection,
    fnCa004Composition,
    fnCa005ReuseBoundaries,
    fnCa006Communication,
    fnCa007Encapsulation,
    fnCa008TestingContracts,
    fnCa009BossDesignSystemCard,
  ],
};
