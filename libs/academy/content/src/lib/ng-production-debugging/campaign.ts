import { CampaignPack } from '@academy/content-model';
import { fnDbg001ReproduceFirst } from './mission-001-reproduce-first';
import { fnDbg002DevTools } from './mission-002-devtools';
import { fnDbg003SourceMaps } from './mission-003-source-maps';
import { fnDbg004Monitoring } from './mission-004-monitoring';
import { fnDbg005Heisenbugs } from './mission-005-heisenbugs';
import { fnDbg006Bisection } from './mission-006-bisection';
import { fnDbg007IncidentResponse } from './mission-007-incident-response';
import { fnDbg008PostMortems } from './mission-008-post-mortems';
import { fnDbg009BossLiveIncident } from './mission-009-boss-live-incident';

/**
 * DMM Field Notes campaign 15 — Production Debugging. The 2am block:
 * reproduce before you fix, DevTools as instruments, source maps and
 * prod-only bugs, error monitoring, intermittent races, binary-search
 * isolation, incident response (mitigate first), and blameless
 * post-mortems — ending with a live incident run end to end.
 */
export const ngProductionDebuggingPack: CampaignPack = {
  campaign: {
    id: 'ng-production-debugging',
    title: 'Production Debugging',
    subtitle: 'Reproduce, mitigate, prevent',
    description:
      'The 2am sessions end to end: a reliable repro as the primary asset, DevTools and conditional breakpoints, source maps and prod-only builds, error monitoring with context and impact, intermittent races and environment bugs, git bisect and one-change-at-a-time, incident response that mitigates before diagnosing, and blameless post-mortems — closing on a live incident.',
    track: 'field-notes',
    difficulty: 'expert',
    requiredCampaignId: 'ng-security',
    tags: ['incident-response', 'angular'],
    missions: [
      'dbg-001-reproduce-first',
      'dbg-002-devtools',
      'dbg-003-source-maps',
      'dbg-004-monitoring',
      'dbg-005-heisenbugs',
      'dbg-006-bisection',
      'dbg-007-incident-response',
      'dbg-008-post-mortems',
      'dbg-009-boss-live-incident',
    ],
    rewards: [{ type: 'badge', id: 'incident-responder', label: 'Incident Responder' }],
  },
  missions: [
    fnDbg001ReproduceFirst,
    fnDbg002DevTools,
    fnDbg003SourceMaps,
    fnDbg004Monitoring,
    fnDbg005Heisenbugs,
    fnDbg006Bisection,
    fnDbg007IncidentResponse,
    fnDbg008PostMortems,
    fnDbg009BossLiveIncident,
  ],
};
