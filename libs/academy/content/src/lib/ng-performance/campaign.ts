import { CampaignPack } from '@academy/content-model';
import { fnPf001MeasureFirst } from './mission-001-measure-first';
import { fnPf002BundleSize } from './mission-002-bundle-size';
import { fnPf003AssetsLcp } from './mission-003-assets-lcp';
import { fnPf004RenderingLists } from './mission-004-rendering-lists';
import { fnPf005CdAtScale } from './mission-005-cd-at-scale';
import { fnPf006MemoryLeaks } from './mission-006-memory-leaks';
import { fnPf007NetworkPerf } from './mission-007-network-perf';
import { fnPf008WebVitals } from './mission-008-web-vitals';
import { fnPf009BossSlowDashboard } from './mission-009-boss-slow-dashboard';

/**
 * DMM Field Notes campaign 10 — Performance Optimisation. The measured
 * block: profiles before hunches, the double price of bundle bytes,
 * assets and layout stability, list identity and virtualisation, change
 * detection at scale, heap forensics, waterfall surgery and the vitals —
 * ending with the slow dashboard triaged by its own numbers.
 */
export const ngPerformancePack: CampaignPack = {
  campaign: {
    id: 'ng-performance',
    title: 'Performance Optimisation',
    subtitle: 'Measure, rank, then cut',
    description:
      'The performance sessions end to end: measurement as rule one, bundle bytes costing twice, right-sized assets and reserved space, track identity and virtual scrolling, ticks billed fairly, the three-snapshot leak hunt, staircases turned into fans, and lab-vs-field vitals — closing on the slow dashboard.',
    track: 'field-notes',
    difficulty: 'advanced',
    requiredCampaignId: 'ng-state-management',
    tags: ['angular'],
    missions: [
      'pf-001-measure-first',
      'pf-002-bundle-size',
      'pf-003-assets-lcp',
      'pf-004-rendering-lists',
      'pf-005-cd-at-scale',
      'pf-006-memory-leaks',
      'pf-007-network-perf',
      'pf-008-web-vitals',
      'pf-009-boss-slow-dashboard',
    ],
    rewards: [{ type: 'badge', id: 'perf-surgeon', label: 'Performance Surgeon' }],
  },
  missions: [
    fnPf001MeasureFirst,
    fnPf002BundleSize,
    fnPf003AssetsLcp,
    fnPf004RenderingLists,
    fnPf005CdAtScale,
    fnPf006MemoryLeaks,
    fnPf007NetworkPerf,
    fnPf008WebVitals,
    fnPf009BossSlowDashboard,
  ],
};
