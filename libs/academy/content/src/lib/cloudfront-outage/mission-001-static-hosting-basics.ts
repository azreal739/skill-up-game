import { MissionDefinition } from '@academy/content-model';

/** CloudFront Outage 1 — "Static Hosting Basics" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const cdnMission001StaticHosting: MissionDefinition = {
  id: 'cloudfront-outage-001-static-hosting-basics',
  campaignId: 'cloudfront-outage',
  title: 'Static Hosting Basics',
  summary:
    'Users report a stale app after a deploy. First, understand how the app is actually served.',
  difficulty: 'easy',
  learningObjectives: [
    'Understand that a built SPA is static files behind a CDN',
    'Locate the CDN between deploy and user',
    'Reject the "restart the server" reflex for a static app',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The dashboard shipped an hour ago but users still see yesterday’s build. Before we chase ghosts, get the mental model right: this is an Angular production build served as static files through a CDN. There is no app server to restart.',
    },
  ],
  contextArtefacts: [
    {
      id: 'topology',
      type: 'diagram',
      title: 'Serving topology',
      content:
        'CI build → upload dist/ to S3 (object storage) → CloudFront (CDN edge caches) → user browser downloads bundle and runs it',
    },
  ],
  challenges: [
    {
      id: 'cloudfront-outage-001-c1',
      type: 'multiple-choice',
      title: 'Where Does the App Run?',
      difficulty: 'easy',
      tags: ['cicd'],
      storyContext:
        'A new engineer suggests SSHing in to restart the server. There is no server running your code.',
      prompt:
        'For a static SPA on a CDN, what is the correct mental model of a deploy?',
      options: [
        {
          id: 'b',
          label:
            'A server runs the Angular app and renders each page on request; restart it to pick up the new code',
          isCorrect: false,
          feedback:
            'That describes SSR/a running server. This app is static files — there is nothing to restart, and "restarting" would not touch the CDN cache.',
        },
        {
          id: 'c',
          label:
            'The browser always fetches the latest files, so a deploy is instant and caching is irrelevant',
          isCorrect: false,
          feedback:
            'The opposite — the CDN and browser cache aggressively. Caching is the whole reason a deploy can look "not live".',
        },
        {
          id: 'a',
          label:
            'The build produces static files uploaded to storage and served through a CDN; users run the bundle in their browser, and the CDN sits between deploy and user',
          isCorrect: true,
          feedback:
            'Exactly. There is no server executing your code — just static assets cached at the edge. The CDN in the middle is where a stale-after-deploy problem usually lives.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'What actually executes your Angular code — a server, or the user’s browser?',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'A production build is static HTML/JS/CSS uploaded to storage and served via a CDN that caches at the edge. The browser downloads and runs it; there is no app server.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'The CDN between deploy and user is what to think about, not a server restart.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Static files, CDN in the middle, browser runs the bundle.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Model set' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason:
            'Chasing a server that does not exist burned the response’s first minutes.',
        },
      ],
      helpLinks: [
        { topicId: 'cdn.static-hosting', label: 'Static hosting and CDNs' },
      ],
      successFeedback:
        'Right model: static files behind a CDN. Now the stale-deploy mystery has somewhere real to investigate.',
      failureFeedback:
        'There is no running server — it is static files behind a CDN. That cache is where to look.',
    },
  ],
  reflectionPrompt:
    'How many "it works on my machine but not in prod" problems are really a cache between you and the user?',
  rewards: [{ type: 'xp', amount: 5, label: 'To the edge' }],
};
