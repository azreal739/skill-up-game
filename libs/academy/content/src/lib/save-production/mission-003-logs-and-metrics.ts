import { MissionDefinition } from '@academy/content-model';

/** Save Production 3 — "Logs and Metrics" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const prodMission003LogsAndMetrics: MissionDefinition = {
  id: 'save-production-003-logs-and-metrics',
  campaignId: 'save-production',
  title: 'Logs and Metrics',
  summary: 'Let the data locate the failure. Correlate the spike with what changed.',
  difficulty: 'medium',
  learningObjectives: [
    'Use metrics to find when the failure started',
    'Correlate the onset with a change (deploy, config, traffic)',
    'Read logs to confirm the mechanism before acting',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The channel has four theories: database, cache, a bad deploy, a traffic spike. Do not pick a favourite — read the signals. The metrics show when it started; line that up with what changed, then confirm with logs.',
    },
  ],
  contextArtefacts: [
    {
      id: 'timeline',
      type: 'dashboard',
      title: 'Signals',
      content:
        'checkout_error_rate: flat ~1% until 14:02, then 30% and holding\nDeploys: checkout-service v4.7 shipped 14:01\nDB latency: normal. Cache hit rate: normal. Traffic: normal for the hour.\nLogs (14:02+): "TypeError: cannot read totals of undefined" in v4.7 handler',
    },
  ],
  challenges: [
    {
      id: 'save-production-003-c1',
      type: 'multiple-choice',
      title: 'Follow the Data',
      difficulty: 'medium',
      tags: ['incident-response'],
      storyContext: 'The error onset is one minute after a deploy, DB/cache/traffic are all normal, and the logs name a v4.7 code path.',
      prompt: 'What does the data point to?',
      options: [
        {
          id: 'a',
          label: 'The v4.7 checkout-service deploy at 14:01: the error started at 14:02, DB/cache/traffic are normal, and logs show a TypeError in the v4.7 handler',
          isCorrect: true,
          feedback:
            'Every signal converges: onset right after the deploy, other subsystems healthy, and a stack trace in the new code path. The data — not a hunch — identifies the deploy as the cause.',
        },
        {
          id: 'b',
          label: 'The database, since checkout writes to it — restart the DB to be safe',
          isCorrect: false,
          feedback: 'DB latency is normal and nothing points at it. Restarting an healthy DB is a guess that risks a second problem while ignoring the deploy the data implicates.',
        },
        {
          id: 'c',
          label: 'A traffic spike overwhelming the service — add capacity',
          isCorrect: false,
          feedback: 'Traffic is normal for the hour. Scaling up would burn time and money without touching the actual cause in v4.7.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'When exactly did it start, and what changed at that moment?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'Metrics show what changed and when; logs and traces show why. Correlate the onset with deploys/config/traffic before forming a theory, and let healthy subsystems rule themselves out.',
        },
        { level: 3, title: 'Specific clue', content: 'Onset 14:02, deploy 14:01, DB/cache/traffic normal, TypeError in v4.7.' },
        { level: 4, title: 'Guided solution', content: 'The v4.7 deploy is the cause; the data converges on it.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Cause located' }],
      consequences: [{ type: 'severity', delta: -5, reason: 'Reading the signals pointed straight at the bad deploy instead of a guess.' }],
      helpLinks: [{ topicId: 'incident.observability', label: 'Logs, metrics and traces' }],
      successFeedback: 'The data converges on the v4.7 deploy — you have a cause, not a hunch. Now choose how to recover.',
      failureFeedback: 'DB, cache and traffic are all normal. Onset right after the v4.7 deploy plus a matching stack trace names the cause.',
    },
  ],
  reflectionPrompt: 'How often is the fastest diagnosis just "what changed right before it started?"',
  rewards: [{ type: 'xp', amount: 5, label: 'Signals read' }],
};
