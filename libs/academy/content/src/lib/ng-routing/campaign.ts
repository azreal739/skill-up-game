import { CampaignPack } from '@academy/content-model';
import { fnRt001RoutesAsConfig } from './mission-001-routes-as-config';
import { fnRt002RouteParams } from './mission-002-route-params';
import { fnRt003ChildRoutes } from './mission-003-child-routes';
import { fnRt004LazyLoading } from './mission-004-lazy-loading';
import { fnRt005Guards } from './mission-005-guards';
import { fnRt006Resolvers } from './mission-006-resolvers';
import { fnRt007LeavingSafely } from './mission-007-leaving-safely';
import { fnRt008Preloading } from './mission-008-preloading';
import { fnRt009BossAdminArea } from './mission-009-boss-admin-area';

/**
 * DMM Field Notes campaign 7 — Routing & Lazy Loading. The router block:
 * routes as config and the outlet swap, params as streams, nested children
 * and honest defaults, lazy chunks, guards in and out, resolvers' trade,
 * preloading strategies and route-scoped providers — ending with the admin
 * area rebuilt to a five-line sheet.
 */
export const ngRoutingPack: CampaignPack = {
  campaign: {
    id: 'ng-routing',
    title: 'Routing & Lazy Loading',
    subtitle: 'Navigate without rebooting',
    description:
      'The router sessions end to end: the Routes map and outlet swap versus href reboots, component reuse and param streams, child routes under shared layouts, lazy chunks and what import() splits, canActivate/canMatch/canDeactivate, the resolver trade, and preloading with route-scoped providers — closing on the admin area.',
    track: 'field-notes',
    difficulty: 'intermediate',
    requiredCampaignId: 'ng-di-providers',
    tags: ['angular'],
    missions: [
      'rt-001-routes-as-config',
      'rt-002-route-params',
      'rt-003-child-routes',
      'rt-004-lazy-loading',
      'rt-005-guards',
      'rt-006-resolvers',
      'rt-007-leaving-safely',
      'rt-008-preloading',
      'rt-009-boss-admin-area',
    ],
    rewards: [{ type: 'badge', id: 'route-navigator', label: 'Route Navigator' }],
  },
  missions: [
    fnRt001RoutesAsConfig,
    fnRt002RouteParams,
    fnRt003ChildRoutes,
    fnRt004LazyLoading,
    fnRt005Guards,
    fnRt006Resolvers,
    fnRt007LeavingSafely,
    fnRt008Preloading,
    fnRt009BossAdminArea,
  ],
};
