import { MissionDefinition } from '@academy/content-model';

/**
 * Save Production boss — "Production Restored" (13_CAMPAIGN_CONTENT_PACKS.md).
 * The capstone of the game: assess, diagnose, mitigate and validate a live
 * incident end to end.
 */
export const prodMission009BossProductionRestored: MissionDefinition = {
  id: 'save-production-009-boss-production-restored',
  campaignId: 'save-production',
  title: 'Boss: Production Restored',
  summary: 'A fresh Sev1 with no runbook. Run it end to end: assess, diagnose, mitigate, validate.',
  difficulty: 'boss',
  learningObjectives: [
    'Run a live incident from declaration to recovery',
    'Apply assessment, diagnosis, mitigation and validation together',
    'Restore service calmly under pressure',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Final exam. 02:00, the pager goes off: the whole app is throwing on load for every user right after an overnight release. No runbook, you are the commander. Everything this campaign taught you applies at once. Bring production back.',
    },
    {
      speaker: 'Mission Control',
      text: 'Four moves: size the impact and take command, let the data name the cause, mitigate with the fastest safe action, then prove recovery before you stand down. Save production.',
    },
  ],
  contextArtefacts: [
    {
      id: 'incident',
      type: 'dashboard',
      title: 'SEV? — App failing to load',
      content:
        'error_rate: 100% of sessions white-screen on load since 02:03\nDeploys: web app "release-2026.07.07" at 02:02 (behind flag: none)\nInfra: API healthy, DB healthy, CDN serving\nConsole: "TypeError: config.apiUrl is undefined" in the new bundle\nLast known-good release: 2026.07.06, one-click rollback available',
    },
  ],
  challenges: [
    {
      id: 'save-production-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Assess and Take Command',
      difficulty: 'medium',
      tags: ['incident-response'],
      storyContext: '100% of users white-screen; you are alone at 02:00.',
      prompt: 'What is the correct opening move?',
      options: [
        {
          id: 'a',
          label: 'Declare a Sev1 (total outage, all users), take command, and open a coordinated channel aimed at restoring service',
          isCorrect: true,
          feedback: '100% impact is a Sev1. Declaring and taking command focuses the response before any fix.',
        },
        {
          id: 'b',
          label: 'Quietly try a few fixes yourself first; no need to wake anyone for a maybe-quick one',
          isCorrect: false,
          feedback: 'A total outage is not the time to solo silently — declare, so responders and comms engage.',
        },
        {
          id: 'c',
          label: 'Find who did the 02:02 release and message them about it first',
          isCorrect: false,
          feedback: 'Blame-hunting wastes the first minutes of a Sev1. Restore first.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: '100% of users are down. How big is this, and who coordinates?' },
        { level: 2, title: 'Concept', content: 'Total outage = Sev1; declare and take command first.' },
        { level: 3, title: 'Specific clue', content: 'Declare Sev1 and coordinate, don’t solo or blame.' },
        { level: 4, title: 'Guided solution', content: 'Declare a Sev1 and take command.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Command taken' }],
      consequences: [{ type: 'severity', delta: 1, reason: 'Soloing a total outage delayed coordination and communication.' }],
      helpLinks: [{ topicId: 'incident.impact-assessment', label: 'Impact assessment and severity' }],
      successFeedback: 'Sev1 declared, command taken — the response is coordinated.',
      failureFeedback: '100% down is a Sev1. Declare and take command before fixing or blaming.',
    },
    {
      id: 'save-production-009-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Diagnose from the Data',
      difficulty: 'hard',
      tags: ['incident-response'],
      storyContext: 'API, DB and CDN are healthy; the console names a config field in the new bundle.',
      prompt: 'What does the data point to?',
      options: [
        {
          id: 'a',
          label: 'The 02:02 web release: onset at 02:03, infra all healthy, and "config.apiUrl is undefined" in the new bundle — an environment/config problem in the release',
          isCorrect: true,
          feedback: 'Every signal converges on the release and its missing runtime config, not on infra.',
        },
        {
          id: 'b',
          label: 'The API is down — restart it',
          isCorrect: false,
          feedback: 'The API is healthy; the error is a client-side undefined config in the new bundle.',
        },
        {
          id: 'c',
          label: 'A DDoS causing the white screens',
          isCorrect: false,
          feedback: 'Nothing indicates attack traffic; the cause is the release’s config.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What changed at 02:02, and what does the console say?' },
        { level: 2, title: 'Concept', content: 'Correlate onset with the release; healthy infra rules itself out.' },
        { level: 3, title: 'Specific clue', content: 'config.apiUrl undefined in the new bundle = config problem in the release.' },
        { level: 4, title: 'Guided solution', content: 'The 02:02 release shipped without its runtime config.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Cause found' }],
      consequences: [{ type: 'severity', delta: 1, reason: 'Restarting healthy infrastructure burned minutes while every user stayed down.' }],
      helpLinks: [
        { topicId: 'incident.observability', label: 'Logs, metrics and traces' },
        { topicId: 'deploy.environment-config', label: 'Environment configuration' },
      ],
      successFeedback: 'Diagnosed: the release shipped missing its runtime config.',
      failureFeedback: 'Infra is healthy. Onset at the release plus an undefined config points at the release.',
    },
    {
      id: 'save-production-009-c3',
      type: 'multiple-choice',
      title: 'Stage 3 — Mitigate the Fastest Safe Way',
      difficulty: 'hard',
      tags: ['incident-response'],
      storyContext: 'There is no feature flag, but a one-click rollback to yesterday’s known-good release exists.',
      prompt: 'How do you restore service now?',
      options: [
        {
          id: 'a',
          label: 'Roll back to the known-good 2026.07.06 release immediately, then fix the missing config and re-release calmly',
          isCorrect: true,
          feedback: 'With no flag, a one-click rollback to known-good is the fastest safe mitigation. The config fix ships afterwards, tested.',
        },
        {
          id: 'b',
          label: 'Write and push a config hotfix to production right now, untested, at 02:10',
          isCorrect: false,
          feedback: 'An untested 02:00 hotfix risks a second outage; a known-good rollback is right there.',
        },
        {
          id: 'c',
          label: 'Wait until morning when more engineers are online',
          isCorrect: false,
          feedback: 'Leaving a 100% outage running for hours is not an option when rollback is one click.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Fastest safe way back to a working app?' },
        { level: 2, title: 'Concept', content: 'No flag → roll back to known-good, fix afterwards.' },
        { level: 3, title: 'Specific clue', content: 'One-click rollback beats an untested 02:00 hotfix.' },
        { level: 4, title: 'Guided solution', content: 'Roll back to 2026.07.06 now.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Service restored' }],
      consequences: [{ type: 'severity', delta: 1, reason: 'Gambling on an untested overnight hotfix risked a second outage.' }],
      helpLinks: [{ topicId: 'incident.rollback-vs-hotfix', label: 'Rollback vs hotfix' }],
      successFeedback: 'Rolled back to known-good — the app loads again for everyone.',
      failureFeedback: 'No flag, so roll back to the known-good release; don’t gamble on an untested overnight hotfix.',
    },
    {
      id: 'save-production-009-c4',
      type: 'multiple-choice',
      title: 'Stage 4 — Validate, Communicate, Close',
      difficulty: 'boss',
      tags: ['incident-response'],
      storyContext: 'The rollback is out. Before you go back to bed, close the incident properly.',
      prompt: 'What closes this incident correctly?',
      options: [
        {
          id: 'a',
          label: 'Confirm error rate is back to baseline and holding, post a clear user-facing status update, and schedule a blameless review with action items (a config-verification check in the release pipeline)',
          isCorrect: true,
          feedback:
            'Validate recovery with sustained metrics, communicate in user terms, and turn the cause into an owned action item — a deploy-time config check — so it cannot recur silently. That is the incident closed properly.',
        },
        {
          id: 'b',
          label: 'The rollback deployed, so declare it resolved and go offline immediately',
          isCorrect: false,
          feedback: 'A deploy is not proof of recovery, and you owe a status update and a review. Confirm sustained metrics and follow through.',
        },
        {
          id: 'c',
          label: 'Close it and add a review note that the release author must be more careful',
          isCorrect: false,
          feedback: 'Blame hardens nothing and skips validation. Confirm recovery and produce a systemic action item instead.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Recovery proven? Stakeholders told? System hardened?' },
        { level: 2, title: 'Concept', content: 'Validate with sustained metrics, communicate, run a blameless review with owned actions.' },
        { level: 3, title: 'Specific clue', content: 'A config-verification check in the pipeline is the systemic fix.' },
        { level: 4, title: 'Guided solution', content: 'Confirm baseline held, post an update, schedule a blameless review.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Production restored' }],
      consequences: [{ type: 'stability', delta: -10, reason: 'Closing without validation or follow-through left the failure primed to recur.' }],
      helpLinks: [
        { topicId: 'incident.post-mortem', label: 'Blameless post-incident review' },
        { topicId: 'incident.communication', label: 'Incident communication' },
      ],
      successFeedback:
        'Assessed, diagnosed, mitigated, validated, communicated and hardened — production is restored and the class of failure is closed off. You have taken the platform from first component to surviving a Sev1. Academy complete.',
      failureFeedback: 'Closing means proven recovery + communication + a blameless, systemic action item — not a deploy-and-leave or a blame note.',
    },
  ],
  reflectionPrompt:
    'Across the whole Academy — from your first component to this Sev1 — which habit will save you the most production incidents? Defend your pick.',
  rewards: [
    { type: 'xp', amount: 50, label: 'Incident commander' },
    { type: 'badge', id: 'production-defender', label: 'Production Defender' },
  ],
};
