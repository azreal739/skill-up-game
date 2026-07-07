import { MissionDefinition } from '@academy/content-model';

/** CloudFront Outage 2 — "Hashed Assets" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const cdnMission002HashedAssets: MissionDefinition = {
  id: 'cloudfront-outage-002-hashed-assets',
  campaignId: 'cloudfront-outage',
  title: 'Hashed Assets',
  summary: 'Understand why bundles carry a hash — and which single file must never be cached like them.',
  difficulty: 'easy',
  learningObjectives: [
    'Explain content hashing and cache-busting',
    'Cache hashed assets immutably',
    'Identify index.html as the file that must stay fresh',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The build output is full of names like main.9f3c2a.js. That hash is not decoration — it is your cache-busting strategy. But one file in here breaks the whole scheme if you cache it the same way.',
    },
  ],
  contextArtefacts: [
    {
      id: 'dist',
      type: 'code',
      title: 'dist/ (excerpt)',
      language: 'text',
      content: 'index.html\nmain.9f3c2a.js\npolyfills.4b1e77.js\nstyles.a20c9d.css\nchunk-PTSEL3QH.js',
    },
  ],
  challenges: [
    {
      id: 'cloudfront-outage-002-c1',
      type: 'multiple-choice',
      title: 'What Gets Cached Forever?',
      difficulty: 'easy',
      tags: ['cicd'],
      storyContext: 'Hashed filenames change when contents change; index.html keeps its name across every deploy.',
      prompt: 'How should these files be cached?',
      options: [
        {
          id: 'a',
          label: 'Cache the hashed JS/CSS immutably (a long max-age); serve index.html with no-cache so it always points at the current hashes',
          isCorrect: true,
          feedback:
            'Because a hashed file’s URL changes when its contents do, it can be cached forever safely. index.html keeps its URL, so it must stay fresh — it is the map to the current bundles.',
        },
        {
          id: 'b',
          label: 'Cache everything, including index.html, with a long max-age for maximum speed',
          isCorrect: false,
          feedback: 'This is the outage: a long-cached index.html keeps pointing at old hashed files, so users never see the new deploy even though the new bundles exist.',
        },
        {
          id: 'c',
          label: 'Cache nothing, so users always get the newest files',
          isCorrect: false,
          feedback: 'That throws away the whole benefit of hashing — every user re-downloads unchanged megabytes on every visit. Hashed assets are safe to cache long.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which file keeps the same name across deploys, and which change names?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'Content hashes change the URL whenever contents change, so hashed assets cache immutably. index.html keeps its URL and points at the current hashes — it must not be cached long.',
        },
        { level: 3, title: 'Specific clue', content: 'Long-cache the hashed files; no-cache index.html.' },
        { level: 4, title: 'Guided solution', content: 'Immutable for hashed JS/CSS, no-cache for index.html.' },
      ],
      rewards: [{ type: 'xp', amount: 15, label: 'Hashing understood' }],
      consequences: [{ type: 'stability', delta: 5, reason: 'Correct caching kept new deploys visible while assets stayed fast.' }],
      helpLinks: [
        { topicId: 'cdn.hashed-assets', label: 'Content-hashed assets' },
        { topicId: 'cdn.cache-behaviour', label: 'Cache-Control and TTLs' },
      ],
      successFeedback: 'Hashed assets immutable, index.html fresh — deploys stay fast AND visible.',
      failureFeedback: 'Hashed files can cache forever; index.html must not, or it keeps pointing at the old bundles.',
    },
  ],
  reflectionPrompt: 'Why does changing a file’s name make it safe to cache that file forever?',
  rewards: [{ type: 'xp', amount: 5, label: 'Hashes mapped' }],
};
