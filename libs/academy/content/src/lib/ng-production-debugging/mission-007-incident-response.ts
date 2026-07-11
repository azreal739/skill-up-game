import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — incident response: mitigate before you diagnose, rollback
 * vs hotfix, and communication under fire.
 */
export const fnDbg007IncidentResponse: MissionDefinition = {
  id: 'dbg-007-incident-response',
  campaignId: 'ng-production-debugging',
  title: 'Stop the Bleeding First',
  summary:
    'In a live incident the order inverts — restore service first, understand later — and rollback usually beats a heroic hotfix.',
  difficulty: 'hard',
  learningObjectives: [
    'Prioritise mitigation over root-cause during a live incident',
    'Choose between rollback and forward-fix under pressure',
    'Communicate status while an incident is active',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session seven changes the rules. Everything so far — reproduce, bisect, understand — is for calm debugging. In a LIVE incident, with checkout down and revenue bleeding, that order inverts: you stop the bleeding FIRST and investigate after. The instinct to "just find and fix the bug real quick" while users fail is the instinct that turns a ten-minute outage into two hours.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Incident response has a spine. MITIGATE first — restore service by the fastest safe means, which is almost always ROLLBACK to the last known-good deploy (seconds, well-understood) rather than a hotfix (unproven, written under stress, can deepen the hole). Then COMMUNICATE — a status update so support and customers are not guessing. THEN, with the pressure off and service restored, do the real root-cause debugging and a proper fix. Diagnosis is not the emergency; the outage is.',
    },
  ],
  contextArtefacts: [
    {
      id: 'incident-spine',
      type: 'code',
      title: 'The incident order of operations',
      language: 'text',
      content:
        '1. MITIGATE   restore service fastest-safe → usually ROLLBACK to last good\n              (rollback: seconds, proven. hotfix: unproven, written under stress)\n              feature-flag off the broken feature if rollback is too broad\n2. COMMUNICATE status to support/customers/stakeholders — don’t leave them guessing\n3. DIAGNOSE   NOW, calmly, with service restored → reproduce, bisect, understand\n4. FIX + VERIFY the real fix, tested, plus a regression test\n5. POST-MORTEM blameless: what happened, why, what prevents recurrence',
    },
  ],
  challenges: [
    {
      id: 'dbg-007-c1',
      type: 'multiple-choice',
      title: 'Checkout Is Down',
      difficulty: 'hard',
      tags: ['incident-response'],
      storyContext:
        'A deploy 20 minutes ago broke checkout — every purchase fails. A senior dev has an idea about the cause and wants 30 minutes to find and hotfix it "properly". Revenue is bleeding.',
      prompt: 'What is the right first move?',
      options: [
        {
          id: 'a',
          label:
            'Roll back to the last known-good deploy NOW — it restores checkout in seconds with a proven artifact, stopping the revenue loss. The deploy 20 minutes ago is the obvious suspect; undoing it is the fastest safe mitigation. THEN, with service restored and no clock pressure, diagnose the root cause calmly and prepare a tested forward-fix. A 30-minute hotfix hunt while every purchase fails is 30 more minutes of outage for an unproven fix.',
          isCorrect: true,
          feedback:
            'Mitigate before diagnose: rollback trades a 30-minute bleeding investigation for a 30-second restore. The bug does not become less understood by rolling back — but the users stop failing, which is the actual emergency.',
        },
        {
          id: 'b',
          label: 'Let the senior hotfix it — they understand the cause, and a forward-fix avoids reverting other good changes in that deploy.',
          isCorrect: false,
          feedback:
            'A hotfix written under live-outage pressure is unproven and can deepen the incident — and "avoids reverting good changes" optimises the wrong thing while checkout is DOWN. Roll back now; re-apply the good changes with the fix afterward, calmly.',
        },
        {
          id: 'c',
          label: 'First find the root cause so the fix (rollback or hotfix) is chosen correctly — acting before understanding is reckless.',
          isCorrect: false,
          feedback:
            'Understanding-first is right for CALM debugging, wrong for a live outage — you already have strong evidence (broke right after this deploy), and every minute of diagnosis is a minute of failed checkouts. Mitigate on the strong hypothesis; understand after.',
        },
        {
          id: 'd',
          label: 'Post a status update and ask users to try again later while the team investigates.',
          isCorrect: false,
          feedback:
            'Communication matters (step 2) but is not a substitute for MITIGATION — "try again later" while you could roll back in seconds abandons revenue and goodwill you could save immediately. Restore first, then communicate that it is restored.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What is the emergency — the unknown bug, or checkout being down?' },
        { level: 2, title: 'Concept', content: 'Mitigate first (usually rollback); diagnose after service is restored.' },
        { level: 3, title: 'Specific clue', content: 'Rollback: seconds, proven. Hotfix under fire: minutes, unproven. Which stops the bleeding?' },
        { level: 4, title: 'Guided solution', content: 'Roll back now; diagnose and forward-fix calmly after.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Bleeding stopped' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'The team let the hotfix hunt run — 40 more minutes of failed checkouts, and the rushed fix introduced a second bug.',
        },
      ],
      helpLinks: [{ topicId: 'debug.incident-response', label: 'Incident response' }],
      successFeedback: 'Rollback restored checkout in seconds — diagnosis happened calmly, after the bleeding stopped.',
      failureFeedback: 'Every minute of "finding it properly" is a minute of failed purchases. What restores service fastest and safest?',
    },
    {
      id: 'dbg-007-c2',
      type: 'multiple-choice',
      title: 'When Rollback Isn’t Available',
      difficulty: 'hard',
      tags: ['incident-response'],
      storyContext:
        'A different incident: a bad feature is live, but rollback would also revert an urgent database migration that already ran — reverting the app now would break against the new schema. The feature is behind a config flag.',
      prompt: 'What is the fastest safe mitigation here?',
      options: [
        {
          id: 'a',
          label:
            'Turn the feature FLAG off — it disables the broken feature instantly without reverting the deploy or fighting the migration, restoring service with the smallest, safest possible change. Feature flags exist precisely for this: surgical mitigation when a full rollback is unsafe or too broad. Then diagnose and fix behind the flag, and re-enable when proven.',
          isCorrect: true,
          feedback:
            'Flags are targeted rollback: one config change disables just the broken path, no deploy revert, no schema conflict. When a blanket rollback is unsafe (here, the migration), the flag is the fastest safe mitigation — the state campaign’s feature-flag lesson paying off in an incident.',
        },
        {
          id: 'b',
          label: 'Force the rollback anyway and quickly re-run a down-migration to match — speed matters most.',
          isCorrect: false,
          feedback:
            'Reverting a migration under incident pressure is high-risk data surgery that can cause a far worse, harder-to-undo problem (data loss). When a clean flag-off exists, choose the surgical mitigation over fighting the database live.',
        },
        {
          id: 'c',
          label: 'Write and deploy a hotfix that guards the broken feature — a forward-fix is cleaner than a flag.',
          isCorrect: false,
          feedback:
            'A hotfix is a new deploy written under pressure (slow, unproven) when a config flag flips off the problem in seconds with zero code risk. Use the flag now; the considered fix comes after, behind that same flag.',
        },
        {
          id: 'd',
          label: 'Scale up servers to handle the errors while the team investigates the feature.',
          isCorrect: false,
          feedback:
            'Scaling addresses CAPACITY, not a broken feature — more servers run the same broken code for more users. The mitigation is to stop the broken code path (flag off), not to run it harder.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The feature is behind a flag. What is the smallest change that disables just it?' },
        { level: 2, title: 'Concept', content: 'Feature flags = surgical mitigation when full rollback is unsafe.' },
        { level: 3, title: 'Specific clue', content: 'Why is reverting the migration more dangerous than flipping a flag?' },
        { level: 4, title: 'Guided solution', content: 'Flag the feature off; diagnose behind it.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Surgical mitigation' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The migration was force-reverted under pressure — the schema mismatch caused a data-integrity incident worse than the original bug.',
        },
      ],
      helpLinks: [
        { topicId: 'debug.incident-response', label: 'Incident response' },
        { topicId: 'delivery.feature-flags', label: 'Feature flags' },
      ],
      successFeedback: 'Flag off — the broken feature gone in seconds, the migration untouched, service restored.',
      failureFeedback: 'A blanket rollback fights the migration. What disables ONLY the broken feature, safely?',
    },
  ],
  reflectionPrompt: 'If our most critical flow broke right now, what is our fastest safe mitigation — do we have a one-click rollback and feature flags, or would we debug live?',
  rewards: [{ type: 'xp', amount: 15, label: 'Incident spine learned' }],
};
