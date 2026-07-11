import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes boss — a live incident end to end: mitigate, diagnose,
 * fix, and run the post-mortem, applying the whole block.
 */
export const fnDbg009BossLiveIncident: MissionDefinition = {
  id: 'dbg-009-boss-live-incident',
  campaignId: 'ng-production-debugging',
  title: 'Boss: The 2am Page',
  summary:
    'A real incident from alert to post-mortem — mitigate first, diagnose with the tools, fix and verify, then harden the system so it can’t recur.',
  difficulty: 'boss',
  learningObjectives: [
    'Run a live incident in the correct order under pressure',
    'Apply the block’s techniques to diagnose the real cause',
    'Sign off a post-mortem that prevents the class',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The block finale is the real thing: 2am, the monitor is paging, error rate on the dashboard is spiking, and users are tweeting. You have every tool from the block. Run it — mitigate, diagnose, fix, and make sure it never wakes anyone at 2am again.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The sheet is the block in order: stop the bleeding first (mitigate); then diagnose calmly with the instruments (monitor context, source maps, repro, bisect); find the real cause, not a symptom; fix and verify with a regression test; and close with a blameless post-mortem whose actions prevent the whole class. Do them in the RIGHT order — the order is most of the skill.',
    },
  ],
  contextArtefacts: [
    {
      id: 'incident-sheet',
      type: 'code',
      title: 'The incident sheet',
      language: 'text',
      content:
        'ALERT   2am: dashboard error rate 0.1% → 22%, started ~10 min ago\nCONTEXT monitor: "TypeError" clustered on one release tag; breadcrumbs show\n        it fires on dashboard load for users with ≥1 archived project\nCONSTRAINT the same deploy also shipped an urgent security patch (keep that)\nGOAL    1. restore service  2. find real cause  3. fix+verify  4. prevent recurrence',
    },
  ],
  challenges: [
    {
      id: 'dbg-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — First Ten Minutes',
      difficulty: 'hard',
      tags: ['incident-response'],
      storyContext: 'Alert firing, 22% error rate, started ~10 min ago right after a deploy that ALSO carried an urgent security patch you must not lose. What is the first move?',
      prompt: 'How do you handle the first ten minutes?',
      options: [
        {
          id: 'a',
          label:
            'Mitigate first, surgically: the breadcrumbs already point at the new dashboard feature for users with archived projects, and it is (per the team’s practice) behind a feature flag — flag THAT feature off to restore service in seconds WITHOUT reverting the deploy that carries the security patch. Post a status update. Only THEN diagnose calmly. If no flag existed, weigh a rollback that preserves the patch (re-deploy prior app + re-apply patch) vs the flag — but the flag is the fastest safe move that keeps the security fix.',
          isCorrect: true,
          feedback:
            'Mitigate before diagnose, and choose the mitigation that respects the constraint: a feature flag disables the broken path without sacrificing the security patch — a blanket rollback would drop the patch too. Surgical mitigation, then communicate, then investigate.',
        },
        {
          id: 'b',
          label: 'Diagnose first — the breadcrumbs (archived projects) are a strong lead; find and hotfix the real cause in the next ten minutes.',
          isCorrect: false,
          feedback:
            'A hotfix hunt at 22% error rate is ten-plus minutes of ongoing outage for an unproven fix. You have a fast, safe mitigation (flag off the implicated feature) — take it first, diagnose with the pressure off.',
        },
        {
          id: 'c',
          label: 'Roll the whole deploy back immediately — fastest restore, deal with the security patch afterward.',
          isCorrect: false,
          feedback:
            'A blanket rollback restores service but drops the URGENT security patch the same deploy carried — trading an availability incident for a security exposure. The flag disables only the broken feature and keeps the patch; prefer the surgical option.',
        },
        {
          id: 'd',
          label: 'Write the post-mortem doc first so the timeline is captured accurately while events are fresh.',
          isCorrect: false,
          feedback:
            'Capturing a timeline is valuable but is NOT the first move during an active 22% outage — restore service first. The post-mortem is step 5, after mitigation, diagnosis, and fix.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What restores service fastest WITHOUT dropping the security patch?' },
        { level: 2, title: 'Concept', content: 'Surgical mitigation (flag) beats blanket rollback when a constraint forbids reverting everything.' },
        { level: 3, title: 'Specific clue', content: 'The breadcrumbs name the broken feature. Can you disable just it?' },
        { level: 4, title: 'Guided solution', content: 'Flag the broken feature off; communicate; then diagnose.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Service restored' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'A blanket rollback dropped the security patch — the availability incident was traded for an active vulnerability window.',
        },
      ],
      helpLinks: [
        { topicId: 'debug.incident-response', label: 'Incident response' },
        { topicId: 'delivery.feature-flags', label: 'Feature flags' },
      ],
      successFeedback: 'Flag off, patch kept, service restored — the constraint respected under pressure.',
      failureFeedback: 'The deploy carries a security patch you must keep. Which mitigation restores service AND keeps it?',
    },
    {
      id: 'dbg-009-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Diagnose the Cause',
      difficulty: 'hard',
      tags: ['incident-response'],
      storyContext:
        'Service restored via the flag. Now, calmly: the monitor shows a de-minified "TypeError: cannot read length of undefined" in DashboardComponent, firing only for users with ≥1 archived project. It works in dev with your test data.',
      prompt: 'What is the efficient diagnosis path?',
      options: [
        {
          id: 'a',
          label:
            'The monitor already handed you the cause’s SHAPE: a specific component, a specific condition (≥1 archived project), a specific error (length of undefined). Reproduce deterministically by giving your local/dev environment that exact condition — seed an archived project — which "works in dev" failed to include. With the repro, a conditional breakpoint (break when the archived list is read) shows the undefined; and git bisect across the release’s commits (or just read the small diff the flag isolates) pinpoints the change that assumed archived projects always have a populated array. Reproduce → locate → understand.',
          isCorrect: true,
          feedback:
            'The block in sequence: monitoring context gives the conditions, you reproduce THOSE conditions (the missing archived-project data), a breakpoint locates the undefined read, and the isolated feature’s diff explains it. No guessing — the evidence drove every step.',
        },
        {
          id: 'b',
          label: 'The error is clear enough — add optional chaining (?.length) at the crash site and ship; the undefined is handled.',
          isCorrect: false,
          feedback:
            'That patches the SYMPTOM (the crash) without understanding WHY the array is undefined — maybe archived projects should load differently, maybe data is missing upstream. ?.length may hide a real data bug (empty dashboard instead of crash). Reproduce and understand the cause first.',
        },
        {
          id: 'c',
          label: 'Since it only affects archived-project users, ask those users what they did differently and debug from their descriptions.',
          isCorrect: false,
          feedback:
            'The monitor already gives you the precise condition — you do not need user interviews, you need to REPRODUCE the condition locally (seed an archived project). User descriptions are vaguer and slower than the deterministic repro the evidence enables.',
        },
        {
          id: 'd',
          label: 'Re-enable the feature flag in production for 10% of users to gather more error data on the live cause.',
          isCorrect: false,
          feedback:
            'Deliberately re-breaking production for 10% of users to "gather data" is unnecessary and harmful — you can reproduce the exact condition locally with seeded data. Never re-trigger an incident for information you can get safely.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The monitor named the condition (≥1 archived project). What did your dev data lack?' },
        { level: 2, title: 'Concept', content: 'Reproduce the monitored condition locally, then breakpoint + isolate the diff.' },
        { level: 3, title: 'Specific clue', content: 'Why did it "work in dev"? What data was missing?' },
        { level: 4, title: 'Guided solution', content: 'Seed an archived project to reproduce; breakpoint + diff to understand.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Cause found' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'A blind ?.length shipped — the dashboard stopped crashing but silently showed empty for archived-project users, a new bug.',
        },
      ],
      helpLinks: [
        { topicId: 'debug.reproduce', label: 'Reproduce first' },
        { topicId: 'debug.devtools', label: 'DevTools' },
      ],
      successFeedback: 'Monitored condition reproduced, cause understood — not just the crash site patched.',
      failureFeedback: 'The monitor told you the exact condition. What is faster and surer than interviews or blind patches — reproducing it?',
    },
    {
      id: 'dbg-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Close It Out',
      difficulty: 'boss',
      tags: ['incident-response'],
      storyContext: 'Cause understood (a migration left some archived projects with a null items array; the new code assumed an array). Two ways to close the incident — choose the one that prevents recurrence.',
      prompt: 'Which closeout ships?',
      options: [
        {
          id: 'a',
          label:
            'Fix the code to handle the null defensively AND fix the DATA (a migration to backfill the null arrays as empty, since null-vs-empty is a real data bug); add a regression test seeding an archived project with a null items array; re-enable the feature behind the flag via canary (1% → 100%) watching the error rate; then a blameless post-mortem whose actions prevent the CLASS — a schema/validation guard at the API boundary so null-where-array-expected can’t reach the client again, plus the canary and one-click rollback that limited (and will limit) blast radius. Re-verify, then remove the flag.',
          isCorrect: true,
          feedback:
            'Everything the block taught, closed properly: fix code AND data, lock it with a regression test, re-ship safely via canary, and harden the SYSTEM (boundary validation, canary, rollback) so this class can’t recur or spread. The incident made the platform stronger.',
        },
        {
          id: 'b',
          label:
            'Ship the defensive ?.length code fix, re-enable the flag for everyone at once (the fix is simple and correct), and record the incident in a doc noting the developer should have tested archived projects.',
          isCorrect: false,
          feedback:
            'Three misses: it ignores the DATA bug (null arrays remain, a latent problem for any future consumer), it re-enables to 100% at once instead of canarying (no blast-radius control if something else is wrong), and it closes with person-blame ("should have tested") instead of a systemic guard. Symptom-patched, not class-prevented.',
        },
        {
          id: 'c',
          label:
            'The full fix from option A (code + data + regression test + canary), but skip the post-mortem — the incident is resolved, service is stable, and the team is tired at 3am; write it up "if there’s time later".',
          isCorrect: false,
          feedback:
            'Skipping the post-mortem forfeits the class-level prevention — the boundary-validation guard, the confirmation the canary/rollback worked, and the shared learning. "If there’s time later" means never; the systemic hardening is the highest-value output of the incident, not an optional extra.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which closeout fixes the DATA, not just the code, AND prevents the class?' },
        { level: 2, title: 'Concept', content: 'Fix code+data, regression test, canary re-enable, blameless post-mortem with a boundary guard.' },
        { level: 3, title: 'Specific clue', content: 'Two options skip either the data fix, the canary, or the post-mortem.' },
        { level: 4, title: 'Guided solution', content: 'Sign the full code+data+test+canary+post-mortem closeout.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Incident closed' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'The symptom-only closeout shipped to 100% at once with no post-mortem — the null-data class caused a different crash a month later.',
        },
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The debugging block’s capstone closed with person-blame and no systemic guard — the 2am pages kept coming.',
        },
      ],
      helpLinks: [
        { topicId: 'debug.post-mortems', label: 'Post-mortems' },
        { topicId: 'debug.incident-response', label: 'Incident response' },
      ],
      successFeedback:
        'Mitigated surgically, diagnosed from evidence, fixed in code and data, re-shipped by canary, hardened at the boundary — the incident left the system stronger. Campaign complete.',
      failureFeedback:
        'The strongest closeout fixes the data, locks it with a test, canaries the re-enable, AND runs the post-mortem that prevents the class. Which option does all four?',
    },
  ],
  reflectionPrompt: 'If we were paged right now, could we run this whole sequence — surgical mitigation, evidence-driven diagnosis, code+data fix, canary, blameless post-mortem — or where would we stall?',
  rewards: [{ type: 'xp', amount: 25, label: 'Incident mastered' }],
};
