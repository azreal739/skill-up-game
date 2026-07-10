import { CampaignPack } from '@academy/content-model';
import { fnTs001Primitives } from './mission-001-primitives';
import { fnTs002Unions } from './mission-002-unions';
import { fnTs003Narrowing } from './mission-003-narrowing';
import { fnTs004DiscriminatedUnions } from './mission-004-discriminated-unions';
import { fnTs005InterfacesAliases } from './mission-005-interfaces-aliases';
import { fnTs006NullUndefined } from './mission-006-null-undefined';
import { fnTs007Generics } from './mission-007-generics';
import { fnTs008UnknownAny } from './mission-008-unknown-any';
import { fnTs009BossLegacyService } from './mission-009-boss-legacy-service';

/**
 * DMM Field Notes campaign 1 — TypeScript Fundamentals. Root of the
 * field-notes track. Authored from the team's own skill-up knowledge pack:
 * the sessions, exercises and real mistakes are all genuine.
 */
export const tsFundamentalsPack: CampaignPack = {
  campaign: {
    id: 'ts-fundamentals',
    title: 'TypeScript Fundamentals',
    subtitle: 'Make the compiler your teammate',
    description:
      'The team’s first skill-up series, replayed: model valid states accurately with primitives, unions, narrowing, Result types, generics and honest boundaries — every mistake in here was really made.',
    track: 'field-notes',
    difficulty: 'beginner',
    tags: ['typescript'],
    missions: [
      'ts-fund-001-primitives',
      'ts-fund-002-unions',
      'ts-fund-003-narrowing',
      'ts-fund-004-discriminated-unions',
      'ts-fund-005-interfaces-aliases',
      'ts-fund-006-null-undefined',
      'ts-fund-007-generics',
      'ts-fund-008-unknown-any',
      'ts-fund-009-boss-legacy-service',
    ],
    rewards: [{ type: 'badge', id: 'compiler-ally', label: 'Compiler Ally' }],
  },
  missions: [
    fnTs001Primitives,
    fnTs002Unions,
    fnTs003Narrowing,
    fnTs004DiscriminatedUnions,
    fnTs005InterfacesAliases,
    fnTs006NullUndefined,
    fnTs007Generics,
    fnTs008UnknownAny,
    fnTs009BossLegacyService,
  ],
};
