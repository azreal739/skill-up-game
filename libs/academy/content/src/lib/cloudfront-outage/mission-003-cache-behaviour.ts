import { MissionDefinition } from '@academy/content-model';

/** CloudFront Outage 3 — "Cache Behaviour" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const cdnMission003CacheBehaviour: MissionDefinition = {
  id: 'cloudfront-outage-003-cache-behaviour',
  campaignId: 'cloudfront-outage',
  title: 'Cache Behaviour',
  summary:
    'Review the CDN cache policy. One header is why the last three deploys took hours to appear.',
  difficulty: 'medium',
  learningObjectives: [
    'Read Cache-Control headers and TTLs',
    'Spot an entry file cached like an immutable asset',
    'Set TTLs that match how each file changes',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Deploys "work" but take three hours to show up for users. The CDN behaviours are configured per path. Review them and find the rule that keeps old content alive.',
    },
  ],
  contextArtefacts: [
    {
      id: 'behaviours',
      type: 'code',
      title: 'CloudFront cache behaviours',
      language: 'text',
      content:
        '/*.js, /*.css   → Cache-Control: max-age=31536000, immutable   (1 year)\n/index.html     → Cache-Control: max-age=10800                 (3 hours)\n/config.json    → Cache-Control: max-age=10800                 (3 hours)',
    },
  ],
  challenges: [
    {
      id: 'cloudfront-outage-003-c1',
      type: 'multiple-choice',
      title: 'Find the Bad TTL',
      difficulty: 'medium',
      tags: ['cicd'],
      storyContext:
        'index.html and config.json keep the same URL across deploys, so their TTL is exactly how long users wait for a change.',
      prompt: 'Why do deploys take three hours to appear, and what is the fix?',
      options: [
        {
          id: 'b',
          label:
            'The hashed JS/CSS are cached for a year — shorten those to 3 hours to make deploys faster',
          isCorrect: false,
          feedback:
            'The hashed assets are fine: their URLs change per deploy, so a year is correct and efficient. Shortening them just wastes bandwidth and does not fix the delay.',
        },
        {
          id: 'a',
          label:
            'index.html (and config.json) are cached for 3 hours; since their URLs never change, users keep the old copy that long. Serve them no-cache / very short TTL',
          isCorrect: true,
          feedback:
            'The 3-hour TTL on the entry files is the delay users experience. Those files reuse their URLs, so they must be no-cache (or seconds), while the hashed assets stay immutable.',
        },
        {
          id: 'c',
          label:
            'CloudFront is simply slow to propagate; nothing in the config is wrong',
          isCorrect: false,
          feedback:
            'Propagation is near-instant. The three hours matches the index.html TTL exactly — that is the cause, not propagation.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'The delay is three hours. Which TTL is three hours?',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Files that keep their URL across deploys (index.html, config.json) must have a short/no-cache TTL, because that TTL is how long users keep the old version. Hashed assets can stay immutable.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'The 3-hour TTL is on the entry files that reuse their URLs.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'No-cache index.html and config.json; keep the hashed assets immutable.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'TTL fixed' }],
      consequences: [
        {
          type: 'severity',
          delta: 1,
          reason:
            'A 3-hour TTL on the entry file delayed every deploy and every rollback.',
        },
      ],
      helpLinks: [
        { topicId: 'cdn.cache-behaviour', label: 'Cache-Control and TTLs' },
      ],
      successFeedback:
        'Entry files now stay fresh; deploys appear immediately while assets stay fast.',
      failureFeedback:
        'The 3-hour delay is the index.html TTL. Entry files that reuse URLs must be no-cache.',
    },
  ],
  reflectionPrompt:
    'For a file whose URL never changes, what does its cache TTL really control?',
  rewards: [{ type: 'xp', amount: 5, label: 'Behaviour tuned' }],
};
