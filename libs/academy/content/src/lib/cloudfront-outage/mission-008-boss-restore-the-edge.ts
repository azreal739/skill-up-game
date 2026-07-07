import { MissionDefinition } from '@academy/content-model';

/**
 * CloudFront Outage boss — "Restore the Edge" (13_CAMPAIGN_CONTENT_PACKS.md).
 * Combines the campaign: diagnose the stale edge, fix caching, invalidate, and
 * verify the deploy is truly live.
 */
export const cdnMission008BossRestoreTheEdge: MissionDefinition = {
  id: 'cloudfront-outage-008-boss-restore-the-edge',
  campaignId: 'cloudfront-outage',
  title: 'Boss: Restore the Edge',
  summary: 'A deploy went out; users see the old app, some see white screens. Restore the edge and prove it.',
  difficulty: 'boss',
  learningObjectives: [
    'Diagnose a stale-edge outage under pressure',
    'Fix caching, invalidate precisely, and verify',
    'Leave the edge correct for future deploys',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Live incident: a release went out 20 minutes ago. Most users still see the old dashboard, a cohort gets ChunkLoadError, and nobody can tell if the deploy is really live. Restore the edge — and make sure the next deploy does not repeat this.',
    },
    {
      speaker: 'Mission Control',
      text: 'Four moves: read the cache to find the stale entry file, correct its TTL, invalidate precisely, then verify the live site serves the new build. Bring the edge back.',
    },
  ],
  contextArtefacts: [
    {
      id: 'incident',
      type: 'ticket',
      title: 'INC-720 — Users on stale build after release',
      content:
        'index.html cached max-age=10800 at the edge.\nHashed assets cached immutable (fine).\nSome users: ChunkLoadError (index.html points at deleted chunks).\nNo check confirms which build is live.',
    },
  ],
  challenges: [
    {
      id: 'cloudfront-outage-008-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Diagnose',
      difficulty: 'medium',
      tags: ['cicd'],
      storyContext: 'Most users see the old app; the assets are fine.',
      prompt: 'Why are users still on the old build?',
      options: [
        {
          id: 'a',
          label: 'The edge is serving a cached index.html (max-age 10800) that still points at the old hashed assets',
          isCorrect: true,
          feedback: 'The reused-URL entry file is cached, so users get the old map to the app.',
        },
        {
          id: 'b',
          label: 'The new hashed assets failed to upload',
          isCorrect: false,
          feedback: 'The assets uploaded fine; the problem is the stale entry file pointing at old ones.',
        },
        {
          id: 'c',
          label: 'CloudFront needs hours to propagate new files',
          isCorrect: false,
          feedback: 'Propagation is near-instant; the delay matches the index.html TTL.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which file reuses its URL and is cached?' },
        { level: 2, title: 'Concept', content: 'A cached index.html is a stale map to the app.' },
        { level: 3, title: 'Specific clue', content: 'It is the entry file’s TTL, not the assets.' },
        { level: 4, title: 'Guided solution', content: 'A cached index.html pointing at old assets.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Diagnosed' }],
      consequences: [{ type: 'severity', delta: 1, reason: 'Misreading the stale edge sent the response chasing healthy assets.' }],
      helpLinks: [{ topicId: 'cdn.cache-behaviour', label: 'Cache-Control and TTLs' }],
      successFeedback: 'Diagnosed: a cached index.html is the stale map.',
      failureFeedback: 'The assets are fine — it is the cached, reused-URL index.html.',
    },
    {
      id: 'cloudfront-outage-008-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Fix the Caching',
      difficulty: 'hard',
      tags: ['cicd'],
      storyContext: 'The TTL that caused this must change so it cannot recur.',
      prompt: 'What caching change prevents a recurrence?',
      options: [
        {
          id: 'a',
          label: 'Serve index.html (and other reused-URL files) no-cache / very short TTL; keep hashed assets immutable',
          isCorrect: true,
          feedback: 'Entry files that reuse URLs must stay fresh; hashed assets can stay immutable.',
        },
        {
          id: 'b',
          label: 'Shorten the hashed assets to a 5-minute TTL as well',
          isCorrect: false,
          feedback: 'Needless — hashed URLs change per deploy. This just wastes bandwidth.',
        },
        {
          id: 'c',
          label: 'Disable caching entirely across the distribution',
          isCorrect: false,
          feedback: 'Throws away the CDN’s benefit; assets should stay cached.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which files must stay fresh across deploys?' },
        { level: 2, title: 'Concept', content: 'No-cache reused-URL files; immutable hashed assets.' },
        { level: 3, title: 'Specific clue', content: 'Only index.html/config need short TTLs.' },
        { level: 4, title: 'Guided solution', content: 'No-cache index.html, keep assets immutable.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Caching fixed' }],
      consequences: [{ type: 'stability', delta: -5, reason: 'The bad TTL stayed in place, priming the next deploy for the same outage.' }],
      helpLinks: [{ topicId: 'cdn.hashed-assets', label: 'Content-hashed assets' }],
      successFeedback: 'Entry files fresh, assets immutable — the class of bug is gone.',
      failureFeedback: 'No-cache the reused-URL files; leave hashed assets immutable.',
    },
    {
      id: 'cloudfront-outage-008-c3',
      type: 'multiple-choice',
      title: 'Stage 3 — Invalidate and Protect Sessions',
      difficulty: 'hard',
      tags: ['cicd'],
      storyContext: 'You still need the fix live now, and a cohort is hitting ChunkLoadError.',
      prompt: 'What do you do to restore users immediately without new white screens?',
      options: [
        {
          id: 'a',
          label: 'Invalidate /index.html now, and retain the previous build’s chunks for a grace period so in-flight sessions still resolve',
          isCorrect: true,
          feedback: 'Invalidating the entry file pushes the new map out; keeping old chunks briefly stops mid-navigation sessions from 404ing.',
        },
        {
          id: 'b',
          label: 'Invalidate /* and delete all old chunks immediately',
          isCorrect: false,
          feedback: 'Deleting old chunks is exactly what caused the ChunkLoadError; /* is slow and costly.',
        },
        {
          id: 'c',
          label: 'Do nothing and wait for the TTL to expire',
          isCorrect: false,
          feedback: 'Waiting leaves users broken during an active incident.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Push the new map out, but do not strand active sessions.' },
        { level: 2, title: 'Concept', content: 'Invalidate index.html; keep old chunks a while.' },
        { level: 3, title: 'Specific clue', content: 'Grace period for the previous build’s chunks.' },
        { level: 4, title: 'Guided solution', content: 'Invalidate /index.html and retain old chunks briefly.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Edge refreshed' }],
      consequences: [{ type: 'severity', delta: 1, reason: 'A blanket purge with no chunk retention stranded active sessions mid-incident.' }],
      helpLinks: [{ topicId: 'cdn.invalidation', label: 'Cache invalidation' }],
      successFeedback: 'New map live, old chunks retained — users recover with no fresh ChunkLoadErrors.',
      failureFeedback: 'Invalidate index.html and keep old chunks briefly; do not purge everything.',
    },
    {
      id: 'cloudfront-outage-008-c4',
      type: 'multiple-choice',
      title: 'Stage 4 — Verify It Is Really Live',
      difficulty: 'boss',
      tags: ['cicd', 'incident-response'],
      storyContext: 'Nobody could tell if the deploy was live. Never again.',
      prompt: 'How do you confirm — and keep confirming — the new version is served?',
      options: [
        {
          id: 'a',
          label: 'Probe the production URL, assert a 200, and check a build/version stamp (or the new hashed asset) so verification proves the live site serves the new build — then bake that check into the deploy job',
          isCorrect: true,
          feedback:
            'Verification must query the real URL, confirm success, and confirm the served build is the new one. Baking it into the pipeline turns "we think it deployed" into a proven, repeatable check.',
        },
        {
          id: 'b',
          label: 'Confirm the CI pipeline went green — that is proof enough',
          isCorrect: false,
          feedback: 'Green means the upload ran, not that users are served the new build. That is precisely the gap that caused this incident.',
        },
        {
          id: 'c',
          label: 'Ask a few teammates to hard-refresh and eyeball the app',
          isCorrect: false,
          feedback: 'Manual eyeballing is not repeatable and misses cached cohorts. Automate a real check against the live URL.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What proves users — not the build machine — have the new version?' },
        { level: 2, title: 'Concept', content: 'Probe the live URL, assert 200, check a version stamp; automate it.' },
        { level: 3, title: 'Specific clue', content: 'Confirm the served build is the new one, in the pipeline.' },
        { level: 4, title: 'Guided solution', content: 'Automated smoke test: real URL, 200, build stamp.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Edge restored' }],
      consequences: [{ type: 'team-confidence', delta: -10, reason: 'With no real verification, nobody could say whether the deploy was actually live.' }],
      helpLinks: [{ topicId: 'deploy.verification', label: 'Deployment verification' }],
      successFeedback:
        'Diagnosed, caching fixed, invalidated safely, and now proven live by an automated check — the edge is restored and the next deploy verifies itself. Outage over.',
      failureFeedback: 'A green pipeline is not proof. Probe the live URL, assert 200, check the build stamp, and automate it.',
    },
  ],
  reflectionPrompt:
    'Across the outage — was the real fix the caching change, the invalidation, or the verification that would have caught it first? Defend your pick.',
  rewards: [
    { type: 'xp', amount: 25, label: 'Edge master' },
    { type: 'badge', id: 'cdn-detective', label: 'CDN Detective' },
  ],
};
