import { MissionDefinition } from '@academy/content-model';

/** Mission — "Git Checkpoint" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const mission008GitCheckpoint: MissionDefinition = {
  id: 'foundations-008-git-checkpoint',
  campaignId: 'foundations',
  title: 'Git Checkpoint',
  summary: 'Get your feature into main safely — and recover when a bad commit slips through.',
  difficulty: 'medium',
  learningObjectives: [
    'Use branches and pull requests to integrate work',
    'Recover from a bad commit on a shared branch',
    'Understand why rewriting shared history is dangerous',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Your status card feature is finished locally. The platform team works trunk-based: main must always be releasable, and everything lands through review.',
    },
    {
      speaker: 'Mission Control',
      text: 'Two checkpoints today: land your feature the right way, then handle a live mistake on main without making it worse.',
    },
  ],
  contextArtefacts: [
    {
      id: 'git-log',
      type: 'log',
      title: 'git log --oneline (shared main, after the incident in part two)',
      content:
        'e4f21c9 (HEAD -> main, origin/main) fix typo\n8ab34d0 add status card polling  ← breaks the dashboard build\n41c9a17 add status card component\n90d2f5e release 2.4.1',
    },
  ],
  challenges: [
    {
      id: 'foundations-008-c1',
      type: 'multiple-choice',
      title: 'Land the Feature',
      difficulty: 'medium',
      tags: ['git'],
      storyContext: 'Your feature branch is ready and main has moved ahead by a few commits.',
      prompt: 'What is the right way to get your feature into main?',
      options: [
        {
          id: 'a',
          label: 'Merge your branch into main locally and push main directly',
          isCorrect: false,
          feedback:
            'That skips review and CI gating — the two things keeping main releasable.',
        },
        {
          id: 'b',
          label:
            'Push the feature branch, open a pull request, let CI and review pass, then merge',
          isCorrect: true,
          feedback:
            'The pull request is the checkpoint: automated checks, a second pair of eyes, and a clean audit trail.',
        },
        {
          id: 'c',
          label: 'Commit the changes straight onto main — it is faster and the code works locally',
          isCorrect: false,
          feedback:
            '“Works locally” is exactly what review and CI exist to verify. Direct commits also block clean rollback.',
        },
        {
          id: 'd',
          label: 'Email the diff to a senior engineer to apply for you',
          isCorrect: false,
          feedback: 'That loses authorship, review tooling and CI — git already solves this.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Think about what keeps main always releasable.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'Trunk-based teams protect main with pull requests: CI proves the build, review catches what CI cannot, and the merge records both.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Only one option involves anyone other than you seeing the code before it lands.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Push the branch and open a pull request — merge only after checks and review pass.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Feature landed cleanly' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -10,
          reason: 'Unreviewed changes appeared on main and the team lost trust in the branch.',
        },
      ],
      helpLinks: [{ topicId: 'git.branches-prs', label: 'Branches and pull requests' }],
      successFeedback: 'The checkpoint held: reviewed, verified, merged.',
      failureFeedback: 'Ask which option lets CI and a reviewer see the change before main does.',
    },
    {
      id: 'foundations-008-c2',
      type: 'multiple-choice',
      title: 'Undo Without Damage',
      difficulty: 'medium',
      tags: ['git'],
      storyContext:
        'Commit 8ab34d0 on shared main breaks the dashboard build. Three teammates have already pulled it.',
      prompt: 'How do you remove the breakage safely?',
      options: [
        {
          id: 'a',
          label: 'git revert 8ab34d0 — create a new commit that reverses the bad one, and push it',
          isCorrect: true,
          feedback:
            'Revert moves history forward: teammates just pull one more commit, and the record of what happened survives for the retro.',
        },
        {
          id: 'b',
          label: 'git reset --hard 41c9a17 and force-push main',
          isCorrect: false,
          feedback:
            'Rewriting shared history strands everyone who already pulled — their next push reintroduces the bad commit or conflicts chaotically.',
        },
        {
          id: 'c',
          label: 'Delete the repository and re-clone from the last release',
          isCorrect: false,
          feedback: 'That destroys everything since release 2.4.1 to fix one commit.',
        },
        {
          id: 'd',
          label: 'Tell everyone to avoid the dashboard until the next feature rewrites that code',
          isCorrect: false,
          feedback: 'Leaving main broken blocks every release and normalises a red build.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Three people already have this history — choose the fix that does not invalidate their copies.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'revert adds a new commit that undoes an old one; reset rewrites history and needs a force push. On shared branches, history must only move forward.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'One option requires a force push — that is the red flag on a shared branch.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'git revert 8ab34d0, push, and main is green again with the full story preserved.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Main restored' }],
      consequences: [
        {
          type: 'stability',
          delta: -10,
          reason: 'The shared branch stayed broken while the team debated history surgery.',
        },
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'A force-push scare rattled everyone with local clones.',
        },
      ],
      helpLinks: [
        { topicId: 'git.undoing-changes', label: 'revert vs reset' },
        { topicId: 'git.branches-prs', label: 'Branches and pull requests' },
      ],
      successFeedback: 'History moved forward, the build is green, and nothing was lost.',
      failureFeedback:
        'Anything involving force-pushing shared history trades one broken build for several.',
    },
  ],
  reflectionPrompt:
    'When would git reset be the right tool? What makes that situation different from this one?',
  rewards: [{ type: 'xp', amount: 5, label: 'Checkpoint cleared' }],
};
