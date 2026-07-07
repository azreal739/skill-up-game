import { MissionDefinition } from '@academy/content-model';

/** Save Production 8 — "Post-Incident Review" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const prodMission008PostIncidentReview: MissionDefinition = {
  id: 'save-production-008-post-incident-review',
  campaignId: 'save-production',
  title: 'Post-Incident Review',
  summary: 'Draft the review. Keep the action items that make the system more resilient; cut the blame.',
  difficulty: 'hard',
  learningObjectives: [
    'Run a blameless post-incident review',
    'Turn contributing causes into concrete, owned action items',
    'Reject blame and vague resolutions',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Service is stable and validated. The last job is the review. Someone drafted a list of "action items" from the retro. Review it: keep the ones that make the next incident shorter, and cut anything that is blame or wishful thinking.',
    },
  ],
  contextArtefacts: [
    {
      id: 'timeline',
      type: 'ticket',
      title: 'Incident summary',
      content:
        'Cause: checkout v4.7 shipped a null-deref behind new-checkout-flow; pricing v2.3 mis-taxed carts, no flag.\nDetection: alert at 14:02 (impact started 14:01).\nRecovery: flag off + pricing rollback; validated by sustained metrics.',
    },
  ],
  challenges: [
    {
      id: 'save-production-008-c1',
      type: 'code-review',
      title: 'Review the Action Items',
      difficulty: 'hard',
      tags: ['incident-response'],
      storyContext: 'A blameless review produces concrete, owned actions that harden the system — not blame or platitudes.',
      prompt: 'Select every item that genuinely belongs in a blameless post-incident review.',
      findings: [
        {
          id: 'contract-test',
          label: 'Add a test covering the null cart total that v4.7 crashed on, so the bug cannot recur silently (owner: checkout team)',
          isCorrect: true,
          feedback: 'A concrete, owned, systemic action that turns this specific failure into a caught regression. Exactly what a review should produce.',
        },
        {
          id: 'flag-policy',
          label: 'Require revenue-critical services (like pricing) to ship behind a flag or with a one-click rollback, so mitigation is always seconds away (owner: platform)',
          isCorrect: true,
          feedback: 'Addresses the contributing cause — pricing had no flag — with a durable, owned policy. Makes the next incident shorter.',
        },
        {
          id: 'faster-alert',
          label: 'Tune the checkout alert so it fires closer to impact onset, shrinking detection time (owner: SRE)',
          isCorrect: true,
          feedback: 'Detection time is a real lever on incident length; a concrete, owned tuning task is a legitimate action item.',
        },
        {
          id: 'blame-dan',
          label: 'Add a note that Dan caused the outage and should be more careful when deploying',
          isCorrect: false,
          feedback: 'Blame belongs nowhere in the review. It drives honesty underground and fixes no system. Focus on the system that let the bug reach production.',
        },
        {
          id: 'vague',
          label: '"Everyone should write better code and test more thoroughly going forward"',
          isCorrect: false,
          feedback: 'Vague, unowned, unmeasurable — a platitude, not an action item. Replace with the specific, owned tasks above.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which items are concrete, owned, and make the system more resilient?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'A blameless review produces specific action items with owners that harden the system — better tests, safer rollout, faster detection. It never assigns fault or ships vague resolutions.',
        },
        { level: 3, title: 'Specific clue', content: 'Three real items (the test, the flag/rollback policy, the alert tuning); cut the blame note and the platitude.' },
        { level: 4, title: 'Guided solution', content: 'Keep the three concrete owned actions; reject blaming Dan and "write better code".' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Review run' }],
      consequences: [{ type: 'technical-debt', delta: -15, reason: 'Concrete, owned action items hardened the system against a repeat.' }],
      helpLinks: [{ topicId: 'incident.post-mortem', label: 'Blameless post-incident review' }],
      successFeedback: 'You kept the concrete, owned, systemic actions and cut the blame — the next incident will be shorter because of this review.',
      failureFeedback: 'Keep specific, owned, systemic actions (the test, the flag policy, the alert). Blame and platitudes harden nothing.',
    },
  ],
  reflectionPrompt: 'Why does naming a culprit in a review make the next incident more likely, not less?',
  rewards: [{ type: 'xp', amount: 5, label: 'System hardened' }],
};
