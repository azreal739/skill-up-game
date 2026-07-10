import { CampaignPack } from '@academy/content-model';
import { fnFp001PureFunctions } from './mission-001-pure-functions';
import { fnFp002Immutability } from './mission-002-immutability';
import { fnFp003Map } from './mission-003-map';
import { fnFp004FilterReduce } from './mission-004-filter-reduce';
import { fnFp005UnderTheHood } from './mission-005-under-the-hood';
import { fnFp006Composition } from './mission-006-composition';
import { fnFp007PureCore } from './mission-007-pure-core';
import { fnFp008ValidatorPipelines } from './mission-008-validator-pipelines';
import { fnFp009BossCalculator } from './mission-009-boss-calculator';

/**
 * DMM Field Notes campaign 2 — Functional Programming. The team's calculator
 * exercise in full: pure functions, immutability, the HOF pipeline, closures,
 * a framework-free core, and validators as Result pipelines.
 */
export const fpTypescriptPack: CampaignPack = {
  campaign: {
    id: 'fp-typescript',
    title: 'Functional Programming',
    subtitle: 'From imperative to predictable',
    description:
      'The calculator exercise, replayed end to end: pure functions and immutability first, then map/filter/reduce (and building them yourself), composition, a framework-free core, and validator pipelines — finishing with loop-versus-pipeline parity.',
    track: 'field-notes',
    difficulty: 'beginner',
    requiredCampaignId: 'ts-fundamentals',
    tags: ['typescript'],
    missions: [
      'fp-001-pure-functions',
      'fp-002-immutability',
      'fp-003-map',
      'fp-004-filter-reduce',
      'fp-005-under-the-hood',
      'fp-006-composition',
      'fp-007-pure-core',
      'fp-008-validator-pipelines',
      'fp-009-boss-calculator',
    ],
    rewards: [{ type: 'badge', id: 'functional-artisan', label: 'Functional Artisan' }],
  },
  missions: [
    fnFp001PureFunctions,
    fnFp002Immutability,
    fnFp003Map,
    fnFp004FilterReduce,
    fnFp005UnderTheHood,
    fnFp006Composition,
    fnFp007PureCore,
    fnFp008ValidatorPipelines,
    fnFp009BossCalculator,
  ],
};
