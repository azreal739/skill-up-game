import { MissionDefinition } from '@academy/content-model';

/** Save Production 5 — "Rollback or Hotfix" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const prodMission005RollbackOrHotfix: MissionDefinition = {
  id: 'save-production-005-rollback-or-hotfix',
  campaignId: 'save-production',
  title: 'Rollback or Hotfix',
  summary: 'A second service broke without a flag to fall back on. Choose rollback or hotfix.',
  difficulty: 'hard',
  learningObjectives: [
    'Choose between rollback and hotfix under pressure',
    'Prefer the fastest safe path to restore service',
    'Weigh the risk of a rushed forward-fix',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Checkout is stable on the old path. But your dashboards now show a second problem: the pricing-service v2.3 you shipped this morning is returning wrong totals — and it is not behind a flag. The last known-good version, v2.2, is one click away in the deploy tool.',
    },
  ],
  contextArtefacts: [
    {
      id: 'options',
      type: 'ticket',
      title: 'Pricing-service state',
      content:
        'v2.3 (current): mis-calculates tax on some carts. No feature flag.\nv2.2 (previous): known-good, deployable via one-click rollback.\nProposed hotfix: a 3-line change, not yet written, no tests written.',
    },
  ],
  challenges: [
    {
      id: 'save-production-005-c1',
      type: 'multiple-choice',
      title: 'Restore Service Fastest and Safest',
      difficulty: 'hard',
      tags: ['incident-response'],
      storyContext: 'A known-good version is one click away; the hotfix is unwritten and untested under incident pressure.',
      prompt: 'What is the right call to restore correct pricing now?',
      options: [
        {
          id: 'a',
          label: 'Roll back to the known-good v2.2 now to restore service, then write and properly test the fix for v2.4 off the clock',
          isCorrect: true,
          feedback:
            'Rollback to a known-good version is fast and low-risk — it restores correct behaviour immediately. The forward fix then gets written and tested calmly, without customers absorbing the risk.',
        },
        {
          id: 'b',
          label: 'Write the 3-line hotfix and push it straight to production — it is only three lines',
          isCorrect: false,
          feedback: 'An untested change under pressure is exactly how a hotfix becomes a second incident. A known-good rollback exists; use it and test the fix afterwards.',
        },
        {
          id: 'c',
          label: 'Leave v2.3 running and post a banner telling users totals may be wrong',
          isCorrect: false,
          feedback: 'Knowingly serving wrong prices is a correctness and trust problem you can end in one click. Roll back rather than asking users to tolerate it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What restores correct behaviour fastest with the least new risk?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'When production is degraded, restore service first. Rollback to a known-good version and feature flags are usually the fastest, safest options; a rushed hotfix risks a second incident.',
        },
        { level: 3, title: 'Specific clue', content: 'A one-click known-good v2.2 beats an untested 3-line hotfix.' },
        { level: 4, title: 'Guided solution', content: 'Roll back to v2.2 now; test the real fix afterwards.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Service restored' }],
      consequences: [{ type: 'severity', delta: 1, reason: 'An untested change under pressure invited a second incident.' }],
      helpLinks: [{ topicId: 'incident.rollback-vs-hotfix', label: 'Rollback vs hotfix' }],
      successFeedback: 'Rolled back to known-good v2.2 — pricing is correct again, and the real fix ships calmly as v2.4.',
      failureFeedback: 'A known-good version is one click away. Roll back to restore service; don’t gamble on an untested hotfix.',
    },
  ],
  reflectionPrompt: 'When is a hotfix actually the right call over a rollback — and how rarely is that during the incident itself?',
  rewards: [{ type: 'xp', amount: 5, label: 'Recovered' }],
};
