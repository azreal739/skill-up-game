import { MissionDefinition } from '@academy/content-model';

/** CloudFront Outage 6 — "Environment Config" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const cdnMission006EnvironmentConfig: MissionDefinition = {
  id: 'cloudfront-outage-006-environment-config',
  campaignId: 'cloudfront-outage',
  title: 'Environment Config',
  summary: 'Production is calling the staging API. Find how the wrong config reached the live bundle.',
  difficulty: 'medium',
  learningObjectives: [
    'Keep environment values out of a shared build artifact',
    'Promote the same artifact across environments safely',
    'Choose runtime config over baked-in URLs where it helps',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Production is quietly hitting the staging API — half the data is test data. The pipeline "promotes" the exact bundle built for staging straight to production. Work out why that is the bug and how to fix the flow.',
    },
  ],
  contextArtefacts: [
    {
      id: 'pipeline',
      type: 'pipeline',
      title: 'Deploy pipeline',
      content:
        'build (environment=staging → API_URL baked into main.*.js)\n  → deploy to staging\n  → PROMOTE SAME ARTIFACT → deploy to production   ← staging API_URL travels with it',
    },
  ],
  challenges: [
    {
      id: 'cloudfront-outage-006-c1',
      type: 'multiple-choice',
      title: 'Fix the Config Flow',
      difficulty: 'medium',
      tags: ['cicd'],
      storyContext: 'A single artifact is promoted across environments, but the API URL was baked in at build time for staging.',
      prompt: 'What is the right fix?',
      options: [
        {
          id: 'a',
          label: 'Move the environment-specific API URL out of the bundle into a runtime config (a small config.json the app fetches per environment), so one artifact reads the right URL wherever it runs',
          isCorrect: true,
          feedback:
            'Runtime config lets the same promoted artifact pick up production values in production and staging values in staging — no rebuild, no baked-in URL travelling with the bundle.',
        },
        {
          id: 'b',
          label: 'Keep baking the URL in, but build a separate production artifact and stop promoting',
          isCorrect: false,
          feedback:
            'This works but gives up artifact promotion, so production runs a bundle that was never tested in staging. Runtime config keeps promotion AND correctness.',
        },
        {
          id: 'c',
          label: 'Hard-code both URLs in the app and switch on window.location.hostname',
          isCorrect: false,
          feedback: 'Fragile and leaky — every new environment edits the app, and internal hostnames end up shipped in the bundle. Externalise the config instead.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The wrong URL was fixed at build time. Where should an environment value be decided instead?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'If you promote one artifact across environments, environment-specific values must be resolved at runtime (a fetched config file), not baked into the build for one environment.',
        },
        { level: 3, title: 'Specific clue', content: 'A per-environment runtime config the app fetches on startup.' },
        { level: 4, title: 'Guided solution', content: 'Externalise API_URL into a runtime config.json resolved per environment.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Config externalised' }],
      consequences: [{ type: 'severity', delta: 1, reason: 'A baked-in staging URL sent production traffic to the wrong backend.' }],
      helpLinks: [{ topicId: 'deploy.environment-config', label: 'Environment configuration' }],
      successFeedback: 'One artifact, environment resolved at runtime — production talks to production, staging to staging.',
      failureFeedback: 'If you promote one artifact, decide environment values at runtime, not baked in for staging.',
    },
  ],
  reflectionPrompt: 'If the same build runs in staging and production, what must be true about anything environment-specific inside it?',
  rewards: [{ type: 'xp', amount: 5, label: 'Environments aligned' }],
};
