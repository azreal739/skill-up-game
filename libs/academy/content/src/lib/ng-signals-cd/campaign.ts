import { CampaignPack } from '@academy/content-model';
import { fnSig001SignalsAsValues } from './mission-001-signals-as-values';
import { fnSig002Computed } from './mission-002-computed';
import { fnSig003Effects } from './mission-003-effects';
import { fnSig004ImmutableUpdates } from './mission-004-immutable-updates';
import { fnSig005CdCycle } from './mission-005-cd-cycle';
import { fnSig006OnPush } from './mission-006-onpush';
import { fnSig007SignalsOnPush } from './mission-007-signals-onpush';
import { fnSig008RxjsInterop } from './mission-008-rxjs-interop';
import { fnSig009BossCalculator } from './mission-009-boss-calculator';

/**
 * DMM Field Notes campaign 5 — Angular Change Detection & Signals. The
 * reactivity block: signals as value containers, computed and effects with
 * their borders drawn, the equality trap, how change detection actually
 * runs, OnPush's contract, signals marking their own components, the RxJS
 * bridges — ending with the calculator's reactive final form.
 */
export const ngSignalsCdPack: CampaignPack = {
  campaign: {
    id: 'ng-signals-cd',
    title: 'Change Detection & Signals',
    subtitle: 'Make the view update on purpose',
    description:
      'The reactivity sessions end to end: signals read by calling, computed derivations that cannot drift, effects at the edge, referential equality and immutable updates, the zone.js machine, the OnPush contract, precise signal-driven repaints and the RxJS bridges — closing on the reactive calculator.',
    track: 'field-notes',
    difficulty: 'intermediate',
    requiredCampaignId: 'ng-typed-forms',
    tags: ['angular'],
    missions: [
      'sig-001-signals-as-values',
      'sig-002-computed',
      'sig-003-effects',
      'sig-004-immutable-updates',
      'sig-005-cd-cycle',
      'sig-006-onpush',
      'sig-007-signals-onpush',
      'sig-008-rxjs-interop',
      'sig-009-boss-calculator',
    ],
    rewards: [{ type: 'badge', id: 'signal-operator', label: 'Signal Operator' }],
  },
  missions: [
    fnSig001SignalsAsValues,
    fnSig002Computed,
    fnSig003Effects,
    fnSig004ImmutableUpdates,
    fnSig005CdCycle,
    fnSig006OnPush,
    fnSig007SignalsOnPush,
    fnSig008RxjsInterop,
    fnSig009BossCalculator,
  ],
};
