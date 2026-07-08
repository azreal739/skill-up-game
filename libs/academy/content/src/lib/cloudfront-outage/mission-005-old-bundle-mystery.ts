import { MissionDefinition } from '@academy/content-model';

/** CloudFront Outage 5 — "Old Bundle Mystery" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const cdnMission005OldBundle: MissionDefinition = {
  id: 'cloudfront-outage-005-old-bundle-mystery',
  campaignId: 'cloudfront-outage',
  title: 'Old Bundle Mystery',
  summary:
    'A user gets a white screen after deploy: their index.html points at a JS chunk that no longer exists.',
  difficulty: 'hard',
  learningObjectives: [
    'Diagnose a chunk-load failure from mismatched cache lifetimes',
    'Connect a cached index.html to missing hashed chunks',
    'Prevent the mismatch rather than just clearing a cache',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'One cohort of users hits "ChunkLoadError" right after a deploy. Their browser has a cached index.html referencing chunk-OLD.js — but we deleted old chunks on deploy, so the edge returns 404 and lazy routes explode. Work out why, and how to stop it.',
    },
  ],
  contextArtefacts: [
    {
      id: 'console',
      type: 'log',
      title: 'Browser console (affected user)',
      content:
        'GET /chunk-8fa2c1.js  404 (Not Found)\nChunkLoadError: Loading chunk 12 failed.\n(index.html in memory references chunk-8fa2c1.js; current deploy ships chunk-3d9b70.js)',
    },
  ],
  challenges: [
    {
      id: 'cloudfront-outage-005-c1',
      type: 'multiple-choice',
      title: 'Solve the Mystery',
      difficulty: 'hard',
      tags: ['cicd'],
      storyContext:
        'A stale index.html and a deploy that removes old chunks are individually fine but fatal together.',
      prompt: 'What is the root cause and the durable fix?',
      options: [
        {
          id: 'a',
          label:
            'A long-cached index.html still references old chunk hashes that the deploy deleted; fix by no-caching index.html and keeping recent old chunks for a grace period so in-flight sessions still resolve',
          isCorrect: true,
          feedback:
            'The mismatch is between a stale index.html and a bucket that purged the chunks it points to. No-cache the entry file so users get the new map, and retain the previous build’s chunks briefly so sessions mid-navigation do not 404.',
        },
        {
          id: 'b',
          label:
            'The bundle is corrupt; re-run the build until the chunk hashes are stable',
          isCorrect: false,
          feedback:
            'Nothing is corrupt — the chunk genuinely does not exist because it was deleted. Rebuilding produces yet another set of hashes and does not address the cached index.html.',
        },
        {
          id: 'c',
          label: 'Tell users to hard-refresh whenever they see the error',
          isCorrect: false,
          feedback:
            'A manual workaround, not a fix — it puts the failure on users and does nothing for the next deploy. Address the cache lifetimes and chunk retention.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'Why would a chunk the app asks for return 404 right after a deploy?',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'A cached index.html is a map to specific hashed chunks. If the deploy deletes those chunks and the map is stale, the app requests files that no longer exist. Fix the map’s freshness and keep old chunks briefly.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'No-cache index.html AND retain the previous build’s chunks for a grace period.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Stale index.html + purged chunks = 404. No-cache the entry file, keep old chunks a while.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Mystery solved' }],
      consequences: [
        {
          type: 'stability',
          delta: -10,
          reason:
            'Mismatched cache lifetimes white-screened a cohort of users on every deploy.',
        },
      ],
      helpLinks: [
        { topicId: 'cdn.hashed-assets', label: 'Content-hashed assets' },
        { topicId: 'cdn.cache-behaviour', label: 'Cache-Control and TTLs' },
      ],
      successFeedback:
        'Root cause named: stale index.html pointing at purged chunks. No-cache the entry, keep old chunks briefly — no more ChunkLoadError.',
      failureFeedback:
        'The chunk is really gone. It is a stale index.html plus deleted chunks — fix freshness and retention, not the build.',
    },
  ],
  reflectionPrompt:
    'Why can two individually-correct decisions (immutable assets, cleaning old files) combine into an outage?',
  rewards: [{ type: 'xp', amount: 5, label: 'Bundle traced' }],
};
