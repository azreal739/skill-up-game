import { MissionDefinition } from '@academy/content-model';

/** Save Production 4 — "Feature Flag Decision" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const prodMission004FeatureFlagDecision: MissionDefinition = {
  id: 'save-production-004-feature-flag-decision',
  campaignId: 'save-production',
  title: 'Feature Flag Decision',
  summary: 'The broken code path is behind a flag. Consider the fastest way to stop the bleeding.',
  difficulty: 'medium',
  learningObjectives: [
    'Use a feature flag as an instant mitigation',
    'Prefer a fast, reversible action to stop impact',
    'Separate mitigation from the eventual fix',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Good news: the v4.7 change that broke checkout was shipped behind a flag, new-checkout-flow. The real fix will take a while to write and test. But every minute the flag is on, 30% of checkouts fail. What do you do right now?',
    },
  ],
  contextArtefacts: [
    {
      id: 'flag',
      type: 'dashboard',
      title: 'Flag state',
      content:
        'new-checkout-flow: ON (100%)\nOld checkout path: still present in the codebase, healthy before 14:01\nToggling the flag: takes effect in seconds, no deploy required',
    },
  ],
  challenges: [
    {
      id: 'save-production-004-c1',
      type: 'multiple-choice',
      title: 'Stop the Bleeding',
      difficulty: 'medium',
      tags: ['incident-response'],
      storyContext: 'The old path is intact and the flag flips in seconds without a deploy.',
      prompt: 'What is the right immediate action?',
      options: [
        {
          id: 'a',
          label: 'Turn the flag off now to fall back to the healthy old path — mitigating impact instantly — then write and test the real fix without the clock running',
          isCorrect: true,
          feedback:
            'A flag separates mitigation from the fix: flipping it off restores service in seconds with no deploy, so you can fix v4.7 calmly. Stop the bleeding first.',
        },
        {
          id: 'b',
          label: 'Leave the flag on and rush a hotfix straight to production under pressure',
          isCorrect: false,
          feedback: 'Rushing a hotfix while users keep failing risks a second incident and keeps impact high the whole time. The flag mitigates now, for free.',
        },
        {
          id: 'c',
          label: 'Turn the flag off AND delete the new code immediately so it can never come back',
          isCorrect: false,
          feedback: 'Deleting code mid-incident is a risky, unreviewed change. Toggle off to mitigate; decide the code’s future in the calm afterwards.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What is the fastest, most reversible way to stop the impact right now?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'Feature flags separate deploying code from releasing it. Toggling the flag off is an instant, reversible mitigation that buys time to write the real fix properly.',
        },
        { level: 3, title: 'Specific clue', content: 'Flip the flag off to fall back to the healthy old path, then fix.' },
        { level: 4, title: 'Guided solution', content: 'Turn the flag off now; fix v4.7 without the clock running.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Bleeding stopped' }],
      consequences: [{ type: 'severity', delta: -15, reason: 'Flipping the flag off restored checkout in seconds while the fix was prepared.' }],
      helpLinks: [{ topicId: 'delivery.feature-flags', label: 'Feature flags and gradual rollout' }],
      successFeedback: 'Flag off, old path serving, impact stopped in seconds — now you can fix v4.7 calmly.',
      failureFeedback: 'The flag flips in seconds to a healthy path. Mitigate first, then fix — don’t rush a hotfix or delete code mid-incident.',
    },
  ],
  reflectionPrompt: 'What does a feature flag let you do in an incident that a code fix never can?',
  rewards: [{ type: 'xp', amount: 5, label: 'Mitigated' }],
};
