import { MissionDefinition } from '@academy/content-model';

/** API Contract Crisis 7 — "Release Risk" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const apiMission007ReleaseRisk: MissionDefinition = {
  id: 'api-contract-crisis-007-release-risk',
  campaignId: 'api-contract-crisis',
  title: 'Release Risk',
  summary: 'The fix is ready but the integration burned customers once. Choose a rollout that limits blast radius.',
  difficulty: 'hard',
  learningObjectives: [
    'Weigh the risk of releasing a change to a shaky integration',
    'Separate deploying code from releasing it to users',
    'Use a contract test plus a flag to make the release observable',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The boundary adapter is merged and a contract test now guards the DTO in CI. But this integration already caused one incident, and the back end can still change under us. How do you release the new client path so a surprise stays small?',
    },
  ],
  contextArtefacts: [
    {
      id: 'situation',
      type: 'ticket',
      title: 'REL-88 — Ship the corrected Payments client',
      content:
        'Contract test: green in CI.\nHistory: one customer-facing incident from the old assumptions.\nUnknown: back end may still adjust the DTO next sprint.',
    },
  ],
  challenges: [
    {
      id: 'api-contract-crisis-007-c1',
      type: 'multiple-choice',
      title: 'Choose the Rollout',
      difficulty: 'hard',
      tags: ['api', 'cicd'],
      storyContext: 'You want the fix live, but you want any residual surprise to hit a fraction of traffic, not everyone at once.',
      prompt: 'What is the safest way to release the corrected integration?',
      options: [
        {
          id: 'a',
          label:
            'Ship behind a feature flag, enable it for a small percentage while watching error rates, then expand — with the contract test guarding the DTO in CI',
          isCorrect: true,
          feedback:
            'A flag separates deploy from release: a gradual rollout with monitoring turns a possible incident into a contained observation, and the flag can be switched off instantly without a deploy.',
        },
        {
          id: 'b',
          label: 'Deploy to 100% immediately — the contract test is green, so nothing can go wrong',
          isCorrect: false,
          feedback: 'A green contract test proves today’s payload matches; it cannot prove the back end won’t change tomorrow. Big-bang gives up the safety of a gradual rollout for no benefit.',
        },
        {
          id: 'c',
          label: 'Hold the release until the back end promises never to change the DTO again',
          isCorrect: false,
          feedback: 'You cannot freeze another team’s roadmap, and waiting leaves the current bug in production. Ship safely rather than waiting for a guarantee nobody can give.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'How do you make a surprise hit a fraction of users instead of all of them?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'A feature flag ships code dark, enables it for a small cohort while you watch dashboards, and can be switched off instantly. Combined with the contract test, the release is observable and reversible.',
        },
        { level: 3, title: 'Specific clue', content: 'The answer combines a gradual flag rollout with the contract test — not a big-bang or an indefinite hold.' },
        { level: 4, title: 'Guided solution', content: 'Release behind a flag, ramp gradually while monitoring, keep the contract test in CI.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Release de-risked' }],
      consequences: [{ type: 'severity', delta: 1, reason: 'An unflagged big-bang release would expose every user to the next drift at once.' }],
      helpLinks: [
        { topicId: 'delivery.feature-flags', label: 'Feature flags and gradual rollout' },
        { topicId: 'testing.contract-tests', label: 'Contract test thinking' },
      ],
      successFeedback: 'Flag on for a small cohort, dashboards watched, contract test guarding CI — the release is observable and instantly reversible.',
      failureFeedback: 'A green test doesn’t justify big-bang, and you can’t wait for a frozen DTO. Ship behind a flag and ramp gradually.',
    },
  ],
  reflectionPrompt: 'What does a feature flag give you that a passing test alone cannot?',
  rewards: [{ type: 'xp', amount: 5, label: 'Release planned' }],
};
