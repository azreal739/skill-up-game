import { MissionDefinition } from '@academy/content-model';

/** CloudFront Outage 7 — "Deployment Verification" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const cdnMission007DeploymentVerification: MissionDefinition = {
  id: 'cloudfront-outage-007-deployment-verification',
  campaignId: 'cloudfront-outage',
  title: 'Deployment Verification',
  summary: 'Review the deploy job. It reports success without ever proving the new version is actually live.',
  difficulty: 'hard',
  learningObjectives: [
    'Recognise a deploy that verifies nothing',
    'Add checks that prove the new version is served',
    'Distinguish "pipeline green" from "users have the new build"',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Every incident this campaign started with a "successful" deploy that was not really live. A teammate wrote a verification step for the deploy job. Review it before it merges — does it actually prove anything?',
    },
  ],
  contextArtefacts: [
    {
      id: 'job',
      type: 'code',
      title: 'deploy.sh (proposed verify step)',
      language: 'bash',
      content:
        'aws s3 sync dist/ s3://prod-bucket\n# verify\nif [ -d dist ]; then echo "build exists"; fi\ncurl -s -o /dev/null https://app.example.com\necho "Deploy verified ✅"',
    },
  ],
  challenges: [
    {
      id: 'cloudfront-outage-007-c1',
      type: 'code-review',
      title: 'Review the Verification',
      difficulty: 'hard',
      tags: ['cicd'],
      storyContext: 'Verification should prove users are served the new version — not just that files were uploaded.',
      prompt: 'Select every genuine weakness in this verification step.',
      findings: [
        {
          id: 'checks-local-dir',
          label: 'It checks that the local dist/ directory exists — which says nothing about what the CDN is serving',
          isCorrect: true,
          feedback: 'A local directory existing proves the build ran, not that the deploy is live. Verification must probe the real URL, not the build machine.',
        },
        {
          id: 'ignores-status',
          label: 'The curl discards the response and never checks the HTTP status, so a 500 or 403 still prints "verified"',
          isCorrect: true,
          feedback: 'Piping to /dev/null with no status check means the job passes even if the site is down. Assert a 200 (and fail the job otherwise).',
        },
        {
          id: 'no-version-stamp',
          label: 'It never confirms the served build is the new one — no version/build stamp is checked, so a stale cached bundle still "passes"',
          isCorrect: true,
          feedback: 'Without checking a build stamp (or the new hashed asset), an old cached index.html serving fine would report success — exactly the failure mode this campaign is about.',
        },
        {
          id: 'no-invalidation-order',
          label: 'It uses s3 sync instead of s3 cp',
          isCorrect: false,
          feedback: 'sync vs cp is not the issue here — sync is a reasonable choice for uploading a build. This is a preference, not a verification weakness.',
        },
        {
          id: 'emoji',
          label: 'The success message uses an emoji, which is unprofessional',
          isCorrect: false,
          feedback: 'The emoji is cosmetic and has nothing to do with whether the deploy is verified.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does anything here actually query the live site and confirm the new version?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'Real verification hits the production URL, asserts a success status, and confirms the served build is the new one (a version stamp or the new hashed asset). Checking a local directory proves nothing.',
        },
        { level: 3, title: 'Specific clue', content: 'Three real gaps: local-dir check, ignored HTTP status, no version confirmation.' },
        { level: 4, title: 'Guided solution', content: 'Flag the dist/ check, the discarded curl status, and the missing build-stamp check. Ignore sync-vs-cp and the emoji.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Verification hardened' }],
      consequences: [{ type: 'team-confidence', delta: -10, reason: 'A verification step that proved nothing gave false confidence in every deploy.' }],
      helpLinks: [{ topicId: 'deploy.verification', label: 'Deployment verification' }],
      successFeedback: 'You caught the three real gaps — now the job proves the live site serves the new build before it declares success.',
      failureFeedback: 'Focus on what proves the deploy is live: probe the real URL, check the status, confirm the new version. Ignore sync-vs-cp and the emoji.',
    },
  ],
  reflectionPrompt: 'What is the one check that turns "the pipeline is green" into "users actually have the new version"?',
  rewards: [{ type: 'xp', amount: 5, label: 'Deploy proven' }],
};
