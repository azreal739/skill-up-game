import { CampaignPack } from '@academy/content-model';
import { fnRx001Streams } from './mission-001-streams';
import { fnRx002MapVsTap } from './mission-002-map-vs-tap';
import { fnRx003Cleanup } from './mission-003-cleanup';
import { fnRx004SwitchMap } from './mission-004-switchmap';
import { fnRx005Flattening } from './mission-005-flattening';
import { fnRx006CatchError } from './mission-006-catcherror';
import { fnRx007SignalsInterop } from './mission-007-signals-interop';
import { fnRx008NestedSubscribes } from './mission-008-nested-subscribes';
import { fnRx009BossLiveSearch } from './mission-009-boss-live-search';

/**
 * DMM Field Notes campaign 3 — RxJS & Reactive Thinking. The team's reactive
 * session: streams as values-over-time, the operator mistakes we actually
 * made, cancellation strategies, error placement, signals interop — ending
 * with the canonical live search assembled end to end.
 */
export const rxjsReactivePack: CampaignPack = {
  campaign: {
    id: 'rxjs-reactive',
    title: 'RxJS & Reactive Thinking',
    subtitle: 'Model change over time',
    description:
      'Streams, not values: laziness, map-vs-tap, subscription cleanup, switchMap and its siblings, catchError placement, and the RxJS↔signals bridge — closing with the reference typeahead built to the team’s five-line requirements sheet.',
    track: 'field-notes',
    difficulty: 'intermediate',
    requiredCampaignId: 'fp-typescript',
    tags: ['angular', 'typescript'],
    missions: [
      'rx-001-streams-not-values',
      'rx-002-map-vs-tap',
      'rx-003-subscription-cleanup',
      'rx-004-switchmap-search',
      'rx-005-flattening-strategies',
      'rx-006-catcherror-placement',
      'rx-007-signals-interop',
      'rx-008-nested-subscribes',
      'rx-009-boss-live-search',
    ],
    rewards: [{ type: 'badge', id: 'stream-navigator', label: 'Stream Navigator' }],
  },
  missions: [
    fnRx001Streams,
    fnRx002MapVsTap,
    fnRx003Cleanup,
    fnRx004SwitchMap,
    fnRx005Flattening,
    fnRx006CatchError,
    fnRx007SignalsInterop,
    fnRx008NestedSubscribes,
    fnRx009BossLiveSearch,
  ],
};
