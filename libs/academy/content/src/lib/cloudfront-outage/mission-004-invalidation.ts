import { MissionDefinition } from '@academy/content-model';

/** CloudFront Outage 4 — "Invalidation" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const cdnMission004Invalidation: MissionDefinition = {
  id: 'cloudfront-outage-004-invalidation',
  campaignId: 'cloudfront-outage',
  title: 'Invalidation',
  summary:
    'A hotfix needs to reach users now, before the cache expires. Invalidate the right paths.',
  difficulty: 'medium',
  learningObjectives: [
    'Use cache invalidation to force a re-fetch after deploy',
    'Invalidate only the paths that reuse their URLs',
    'Avoid needless invalidation of hashed assets',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'A security hotfix just deployed but the entry file is still within its cache window at some edges. We cannot wait for the TTL. Invalidate the cache — but invalidate the right thing, because a broad invalidation is slow and costly.',
    },
  ],
  contextArtefacts: [
    {
      id: 'deploy',
      type: 'log',
      title: 'Post-deploy state',
      content:
        'Uploaded: index.html, main.1a2b3c.js, styles.7d8e9f.css (new hashes)\nEdge still serving previous index.html at some POPs until TTL expires.',
    },
  ],
  challenges: [
    {
      id: 'cloudfront-outage-004-c1',
      type: 'multiple-choice',
      title: 'Invalidate Precisely',
      difficulty: 'medium',
      tags: ['cicd'],
      storyContext:
        'Hashed assets got new URLs and were never cached under those names; only the reused URLs are stale.',
      prompt: 'What should you invalidate?',
      options: [
        {
          id: 'b',
          label: 'Invalidate /* to be safe — clear the entire distribution',
          isCorrect: false,
          feedback:
            'A blanket /* invalidation is slow, can hit invalidation limits/cost, and forces every edge to re-fetch unchanged immutable assets for no benefit.',
        },
        {
          id: 'c',
          label: 'Invalidate the hashed JS/CSS by their new names',
          isCorrect: false,
          feedback:
            'Those new names were never cached — there is nothing to invalidate. It is the reused-URL entry files that are stale.',
        },
        {
          id: 'a',
          label:
            'Invalidate /index.html (and any other fixed-URL entry files like /config.json) — the new hashed assets need no invalidation',
          isCorrect: true,
          feedback:
            'Only files that reuse their URL can be stale. The new main.1a2b3c.js has a URL the edge never cached, so it is fetched fresh automatically. Invalidate the entry files and you are done.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'Which files could still be stale — the ones with new names, or the ones with the same name?',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Invalidation forces the edge to re-fetch a path. Only paths that keep their URL across deploys can serve stale content; hashed assets get fresh URLs and never need it.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'Invalidate the fixed-URL entry files, not the hashed assets and not /*.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Invalidate /index.html (and other reused-URL files).',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Cache cleared' }],
      consequences: [
        {
          type: 'severity',
          delta: 1,
          reason:
            'While the cache held, every user kept receiving the vulnerable bundle.',
        },
      ],
      helpLinks: [{ topicId: 'cdn.invalidation', label: 'Cache invalidation' }],
      successFeedback:
        'You invalidated exactly the stale entry files — the hotfix is live everywhere, cheaply.',
      failureFeedback:
        'Only reused-URL files go stale. Invalidate /index.html, not the fresh hashes and not /*.',
    },
  ],
  reflectionPrompt:
    'If your assets are properly hashed, how often should you ever need to invalidate anything but index.html?',
  rewards: [{ type: 'xp', amount: 5, label: 'Edge refreshed' }],
};
