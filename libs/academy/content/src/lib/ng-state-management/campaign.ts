import { CampaignPack } from '@academy/content-model';
import { fnSt001KindsOfState } from './mission-001-kinds-of-state';
import { fnSt002LiftWhenShared } from './mission-002-lift-when-shared';
import { fnSt003SignalStore } from './mission-003-signal-store';
import { fnSt004SingleSource } from './mission-004-single-source';
import { fnSt005WhenNgrx } from './mission-005-when-ngrx';
import { fnSt006NgrxDiscipline } from './mission-006-ngrx-discipline';
import { fnSt007ServerState } from './mission-007-server-state';
import { fnSt008ChoosingPerFeature } from './mission-008-choosing-per-feature';
import { fnSt009BossProjectBoard } from './mission-009-boss-project-board';

/**
 * DMM Field Notes campaign 9 — State Management. The referee block: the
 * four kinds of state, scope as a reasoning tool, the house signal store,
 * single source of truth and honest drafts, what NgRx actually buys and
 * its disciplines, server state as a cache, and per-feature decisions —
 * ending with the project board that survived its third rewrite.
 */
export const ngStateManagementPack: CampaignPack = {
  campaign: {
    id: 'ng-state-management',
    title: 'State Management',
    subtitle: 'Signals, stores and NgRx — chosen, not believed',
    description:
      'The state sessions end to end: server/UI/derived/URL state named apart, promotion by consumers not prophecy, the private-writable house store, copies that drift versus drafts that diverge on purpose, actions-as-facts and pure reducers, Remote<T> caches with mutation-owned invalidation, and the decision matrix — closing on the project board.',
    track: 'field-notes',
    difficulty: 'advanced',
    requiredCampaignId: 'ng-http-api',
    tags: ['angular'],
    missions: [
      'st-001-kinds-of-state',
      'st-002-lift-when-shared',
      'st-003-signal-store',
      'st-004-single-source',
      'st-005-when-ngrx',
      'st-006-ngrx-discipline',
      'st-007-server-state',
      'st-008-choosing-per-feature',
      'st-009-boss-project-board',
    ],
    rewards: [{ type: 'badge', id: 'state-steward', label: 'State Steward' }],
  },
  missions: [
    fnSt001KindsOfState,
    fnSt002LiftWhenShared,
    fnSt003SignalStore,
    fnSt004SingleSource,
    fnSt005WhenNgrx,
    fnSt006NgrxDiscipline,
    fnSt007ServerState,
    fnSt008ChoosingPerFeature,
    fnSt009BossProjectBoard,
  ],
};
