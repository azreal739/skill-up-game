import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — systematic isolation: binary search, git bisect, and
 * changing one thing at a time.
 */
export const fnDbg006Bisection: MissionDefinition = {
  id: 'dbg-006-bisection',
  campaignId: 'ng-production-debugging',
  title: 'Cut the Search Space in Half',
  summary:
    'Binary search is the debugger’s superpower — git bisect for “when did it break”, and one-change-at-a-time to avoid confusing yourself.',
  difficulty: 'hard',
  learningObjectives: [
    'Apply binary search to localise a regression in time or code',
    'Use git bisect to find the introducing commit',
    'Change one variable at a time to keep conclusions valid',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session six, the technique that turns a haystack into a needle in log-n steps. "The dashboard was fine last month, it is broken now, and there are 400 commits between" sounds hopeless. It is not — it is nine steps of bisection.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Binary search halves the unknown each step. In TIME: git bisect — mark a known-good and known-bad commit, git checks out the midpoint, you test, say good or bad, repeat; 400 commits collapse to ~9 tests and it names the exact breaking commit. In CODE: disable half the feature, see if the bug survives, keep halving. The discipline underneath: change ONE thing per step — flip two variables and you no longer know which moved the result.',
    },
  ],
  contextArtefacts: [
    {
      id: 'bisect',
      type: 'code',
      title: 'Bisection in time and in code',
      language: 'text',
      content:
        '# TIME: which commit broke it? 400 commits → ~9 tests\ngit bisect start\ngit bisect bad                # now is broken\ngit bisect good v2.3.0        # last month was fine\n# git checks out the midpoint → you test → `git bisect good|bad` → repeat\n# → "abc123 is the first bad commit"\n\n# CODE: disable half the suspects, does the bug survive? keep halving.\n# RULE: one change per step — two variables = uninterpretable result',
    },
  ],
  challenges: [
    {
      id: 'dbg-006-c1',
      type: 'multiple-choice',
      title: 'Four Hundred Commits',
      difficulty: 'hard',
      tags: ['incident-response', 'git'],
      storyContext:
        'A subtle regression: a report total is off by a rounding cent. It was correct in last month’s release, wrong now. 400 commits between, touching many areas. The team is reading diffs one by one.',
      prompt: 'What is the efficient way to find the introducing commit?',
      options: [
        {
          id: 'a',
          label:
            'git bisect: mark the current commit bad and last month’s release good; git checks out the midpoint, you run your repro (from mission 1 — you DO have one, since the total is deterministically wrong) and mark good or bad; repeat. ~9 tests instead of reading 400 diffs, and it pinpoints the EXACT commit that introduced the cent error — then the diff to understand is one commit, not four hundred.',
          isCorrect: true,
          feedback:
            'Binary search over history: log₂(400) ≈ 9 steps. Bisect needs only a reliable good/bad test (your repro) and mechanically converges on the one breaking commit — reading diffs linearly is the O(n) version of an O(log n) job.',
        },
        {
          id: 'b',
          label: 'Read the diffs of every commit that touched pricing code — filtering to relevant files is faster than testing.',
          isCorrect: false,
          feedback:
            'Filtering helps but still leaves many candidates, and a rounding regression can hide in a "refactor" or a shared util the filter misses. Bisect TESTS behaviour rather than trusting your eyes to spot a one-cent logic change in a diff.',
        },
        {
          id: 'c',
          label: 'Revert to last month’s release and re-apply commits in batches until the bug reappears.',
          isCorrect: false,
          feedback:
            'That is a manual, linear-ish version of bisection with more merge pain — git bisect automates the same idea optimally (halving, not batching forward) and handles the checkout mechanics for you.',
        },
        {
          id: 'd',
          label: 'Add logging to the pricing calculation and wait for the next report to see the wrong value form.',
          isCorrect: false,
          feedback:
            'You can already reproduce the wrong total on demand — logging shows WHERE it computes wrong now, but not WHICH commit changed it. Bisect answers "when did it break", which points straight at the cause.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'You have a deterministic good/bad test. What algorithm halves the commit range?' },
        { level: 2, title: 'Concept', content: 'git bisect: ~log₂(n) tests to the exact introducing commit.' },
        { level: 3, title: 'Specific clue', content: '400 commits is how many bisection steps?' },
        { level: 4, title: 'Guided solution', content: 'Pick git bisect with your repro as the test.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'History bisected' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Two days were spent reading 400 diffs — bisect would have found the one-line rounding change in nine tests.',
        },
      ],
      helpLinks: [{ topicId: 'debug.bisection', label: 'Systematic isolation' }],
      successFeedback: 'Nine tests, one commit — bisection turned the haystack into a needle.',
      failureFeedback: 'You can test any commit as good or bad. What search strategy exploits that in log time?',
    },
    {
      id: 'dbg-006-c2',
      type: 'multiple-choice',
      title: 'One Change at a Time',
      difficulty: 'hard',
      tags: ['incident-response'],
      storyContext:
        'Trying to fix a layout bug, a dev changes the flexbox direction, bumps a z-index, AND swaps a CDK version — all in one commit — then reports "it’s fixed but I’m not sure why, and now scrolling feels different".',
      prompt: 'What went wrong with the debugging METHOD?',
      options: [
        {
          id: 'a',
          label:
            'Three variables changed at once, so no conclusion is valid: you cannot say WHICH change fixed the bug (maybe only one did, maybe two fought), the "not sure why" means the cause is still unknown and may resurface, and the new scrolling regression cannot be attributed either. Revert to one change at a time: test each hypothesis in isolation so each result means something. Debugging is controlled experiments — one variable per experiment.',
          isCorrect: true,
          feedback:
            'The scientific method applies: change one variable, observe, conclude. Bundling three changes produces an uninterpretable result — a "fix" you cannot explain, riding on a regression you cannot isolate. Understanding, not just green, is the goal.',
        },
        {
          id: 'b',
          label: 'Nothing wrong — the bug is fixed, which is the goal; understanding why is a nice-to-have, not a requirement.',
          isCorrect: false,
          feedback:
            'A fix you cannot explain is a fix you cannot trust — it may be coincidental, may break under other conditions, and here it SHIPPED a scrolling regression. "It works and I don’t know why" is a future incident, not a resolution.',
        },
        {
          id: 'c',
          label: 'The problem is only the CDK version bump — dependency changes should never be mixed with code changes.',
          isCorrect: false,
          feedback:
            'Mixing the dep bump is one instance of the real error, but flexbox + z-index are ALSO two separate variables. The principle is one change per experiment, whatever the change is — not a special rule for dependencies.',
        },
        {
          id: 'd',
          label: 'They should have written a test first — TDD would have prevented the confusion.',
          isCorrect: false,
          feedback:
            'A test helps VERIFY a fix, but it does not address changing three things at once — you could TDD and still bundle three variables into one commit and not know which passed the test. Isolate the variables.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'If three things changed and the result changed, which one caused it?' },
        { level: 2, title: 'Concept', content: 'One variable per experiment — else the result is uninterpretable.' },
        { level: 3, title: 'Specific clue', content: 'Why can they not explain the fix OR attribute the new scroll bug?' },
        { level: 4, title: 'Guided solution', content: 'Pick change-one-thing-at-a-time.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Variables isolated' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The three-change "fix" shipped — the layout bug returned under other conditions and the scroll regression was new debt.',
        },
      ],
      helpLinks: [{ topicId: 'debug.bisection', label: 'Systematic isolation' }],
      successFeedback: 'One variable per experiment — every result now means something.',
      failureFeedback: 'Three variables moved and the outcome moved. What can you actually conclude? (Nothing — that is the point.)',
    },
  ],
  reflectionPrompt: 'When did we last hunt a regression by reading diffs instead of git bisect — and how often do our "fixes" change more than one thing at once?',
  rewards: [{ type: 'xp', amount: 10, label: 'Search halved' }],
};
