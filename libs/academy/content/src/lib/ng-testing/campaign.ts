import { CampaignPack } from '@academy/content-model';
import { fnTe001WhyTests } from './mission-001-why-tests';
import { fnTe002UnitDiscipline } from './mission-002-unit-discipline';
import { fnTe003TestDoubles } from './mission-003-test-doubles';
import { fnTe004ComponentTests } from './mission-004-component-tests';
import { fnTe005IntegrationSeams } from './mission-005-integration-seams';
import { fnTe006WhatToTest } from './mission-006-what-to-test';
import { fnTe007E2eJourneys } from './mission-007-e2e-journeys';
import { fnTe008FlakyDiscipline } from './mission-008-flaky-discipline';
import { fnTe009BossCheckoutStrategy } from './mission-009-boss-checkout-strategy';

/**
 * DMM Field Notes campaign 12 — Testing. The promises block: tests as
 * executable promises, unit discipline, doubles with job titles, the
 * component bench, integration seams, coverage demoted to instrument,
 * the expensive few E2E journeys, and flake forensics — ending with the
 * checkout strategy signed end to end.
 */
export const ngTestingPack: CampaignPack = {
  campaign: {
    id: 'ng-testing',
    title: 'Testing: Unit, Integration & E2E',
    subtitle: 'Promises the build enforces',
    description:
      'The testing sessions end to end: suites valued by the promises they enforce, arrange-act-assert discipline, stubs/spies/fakes at honest seams, DOM-driven component benches, integration tests for the handshakes stubs fake, coverage as gap-finder, a hardened handful of E2E journeys, and same-day flake quarantine — closing on the checkout testing strategy.',
    track: 'field-notes',
    difficulty: 'advanced',
    requiredCampaignId: 'ng-component-architecture',
    tags: ['testing', 'angular'],
    missions: [
      'te-001-why-tests',
      'te-002-unit-discipline',
      'te-003-test-doubles',
      'te-004-component-tests',
      'te-005-integration-seams',
      'te-006-what-to-test',
      'te-007-e2e-journeys',
      'te-008-flaky-discipline',
      'te-009-boss-checkout-strategy',
    ],
    rewards: [{ type: 'badge', id: 'test-strategist', label: 'Test Strategist' }],
  },
  missions: [
    fnTe001WhyTests,
    fnTe002UnitDiscipline,
    fnTe003TestDoubles,
    fnTe004ComponentTests,
    fnTe005IntegrationSeams,
    fnTe006WhatToTest,
    fnTe007E2eJourneys,
    fnTe008FlakyDiscipline,
    fnTe009BossCheckoutStrategy,
  ],
};
