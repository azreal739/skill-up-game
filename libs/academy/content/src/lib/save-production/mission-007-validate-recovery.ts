import { MissionDefinition } from '@academy/content-model';

/** Save Production 7 — "Validate Recovery" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const prodMission007ValidateRecovery: MissionDefinition = {
  id: 'save-production-007-validate-recovery',
  campaignId: 'save-production',
  title: 'Validate Recovery',
  summary:
    'It looks fixed. Prove it with data before declaring the incident over.',
  difficulty: 'medium',
  learningObjectives: [
    'Confirm recovery with metrics, not optimism',
    'Verify against real user signals',
    'Resist declaring "all clear" prematurely',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The flag is off, pricing is rolled back, and your own test checkout succeeded. The channel wants to stand down. Before you declare the incident resolved, prove the recovery held for real users.',
    },
  ],
  contextArtefacts: [
    {
      id: 'signals',
      type: 'dashboard',
      title: 'Post-mitigation signals',
      content:
        'checkout_error_rate: back to ~1% and stable for 15 minutes\nPricing totals: sampled orders correct\nOne engineer’s manual test: passed\nSupport: new failure tickets stopped ~14:40',
    },
  ],
  challenges: [
    {
      id: 'save-production-007-c1',
      type: 'multiple-choice',
      title: 'Prove It Held',
      difficulty: 'medium',
      tags: ['incident-response'],
      storyContext:
        'Recovery is validated by real, sustained signals across users — not one passing manual test.',
      prompt: 'What justifies declaring the incident recovered?',
      options: [
        {
          id: 'b',
          label:
            'Your single manual checkout passed — that is enough to close it',
          isCorrect: false,
          feedback:
            'One manual test can pass while a cohort still fails. Confirm with aggregate, sustained user metrics before standing down.',
        },
        {
          id: 'c',
          label:
            'The error rate dipped for one minute right after the change — declare it resolved immediately',
          isCorrect: false,
          feedback:
            'A one-minute dip can be noise. Recovery needs to hold for a sustained window before you trust it.',
        },
        {
          id: 'a',
          label:
            'Error rate back to baseline and stable for a sustained window, correct sampled totals, and support tickets stopped — real user signals agreeing, not just one manual test',
          isCorrect: true,
          feedback:
            'Recovery is proven by sustained, converging signals: baseline error rate held over time, correct sampled orders, and inbound tickets stopping. That is data confirming real users are fine.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'What proves real users recovered, not just your one test?',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Validate recovery with sustained, aggregate signals: error rate back to baseline over a window, correct sampled data, and inbound tickets stopping. Optimism and a single test are not proof.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Sustained baseline + correct samples + tickets stopped.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Confirm real user signals held over a window before declaring recovery.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Recovery proven' }],
      consequences: [
        {
          type: 'stability',
          delta: -10,
          reason:
            'A premature all-clear let the incident re-open on real users.',
        },
      ],
      helpLinks: [
        {
          topicId: 'incident.observability',
          label: 'Logs, metrics and traces',
        },
        { topicId: 'deploy.verification', label: 'Deployment verification' },
      ],
      successFeedback:
        'Sustained baseline, correct samples, tickets stopped — recovery is proven for real users. Now stand down properly.',
      failureFeedback:
        'One passing test or a one-minute dip is not proof. Confirm sustained, aggregate user signals before declaring recovery.',
    },
  ],
  reflectionPrompt:
    'How many "resolved" incidents re-open because someone trusted a single green check instead of a sustained signal?',
  rewards: [{ type: 'xp', amount: 5, label: 'Validated' }],
};
