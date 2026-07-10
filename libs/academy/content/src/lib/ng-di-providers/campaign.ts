import { CampaignPack } from '@academy/content-model';
import { fnDi001WhyInject } from './mission-001-why-inject';
import { fnDi002ProvidedInRoot } from './mission-002-provided-in-root';
import { fnDi003InjectorTree } from './mission-003-injector-tree';
import { fnDi004ProviderRecipes } from './mission-004-provider-recipes';
import { fnDi005InjectionToken } from './mission-005-injection-token';
import { fnDi006ResolutionModifiers } from './mission-006-resolution-modifiers';
import { fnDi007InjectionContext } from './mission-007-injection-context';
import { fnDi008TestingWithDi } from './mission-008-testing-with-di';
import { fnDi009BossLogger } from './mission-009-boss-logger';

/**
 * DMM Field Notes campaign 6 — Dependency Injection & Providers. The DI
 * block: ask-don't-build, providedIn root and lazy singletons, the injector
 * tree, the four provider recipes, InjectionToken, resolution steering,
 * the injection context, and the testing payoff — ending with the logging
 * stack designed entirely in providers.
 */
export const ngDiProvidersPack: CampaignPack = {
  campaign: {
    id: 'ng-di-providers',
    title: 'Dependency Injection & Providers',
    subtitle: 'Ask, don’t build',
    description:
      'The DI sessions end to end: why classes ask instead of construct, lazy tree-shakable singletons, the injector tree and deliberate scoping, useClass/useValue/useFactory/useExisting, typed InjectionTokens, resolution modifiers and NullInjectorError, the injection context window, and provider overrides in tests — closing on the environment-aware logging stack.',
    track: 'field-notes',
    difficulty: 'intermediate',
    requiredCampaignId: 'ng-signals-cd',
    tags: ['angular'],
    missions: [
      'di-001-why-inject',
      'di-002-provided-in-root',
      'di-003-injector-tree',
      'di-004-provider-recipes',
      'di-005-injection-token',
      'di-006-resolution-modifiers',
      'di-007-injection-context',
      'di-008-testing-with-di',
      'di-009-boss-logger',
    ],
    rewards: [{ type: 'badge', id: 'injection-architect', label: 'Injection Architect' }],
  },
  missions: [
    fnDi001WhyInject,
    fnDi002ProvidedInRoot,
    fnDi003InjectorTree,
    fnDi004ProviderRecipes,
    fnDi005InjectionToken,
    fnDi006ResolutionModifiers,
    fnDi007InjectionContext,
    fnDi008TestingWithDi,
    fnDi009BossLogger,
  ],
};
