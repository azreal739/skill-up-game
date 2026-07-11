import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — reproduce before you fix: a reliable repro is the debugging
 * asset everything else depends on.
 */
export const fnDbg001ReproduceFirst: MissionDefinition = {
  id: 'dbg-001-reproduce-first',
  campaignId: 'ng-production-debugging',
  title: 'You Can’t Fix What You Can’t Reproduce',
  summary:
    'The first move in any bug hunt is a reliable reproduction — without it, every “fix” is a guess you cannot verify.',
  difficulty: 'intro',
  learningObjectives: [
    'Treat a reliable repro as the primary debugging asset',
    'Narrow conditions until the bug is deterministic',
    'Resist fixing before the bug is reproducible',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'New block: production debugging — the skill nobody teaches and everybody needs at 2am. It opened with a war story: a "fix" we shipped three times for the same intermittent checkout bug, each confidently, each wrong, because we never actually reproduced it. We were patching symptoms in the dark.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The first law: reproduce before you fix. A reliable repro is the most valuable thing in a bug hunt — it turns "I think this helps" into "watch: it fails, I change this, now it passes". Without it you cannot confirm the cause OR verify the fix. So the opening move is not reading code; it is narrowing conditions — which user, which data, which browser, which sequence — until the bug happens ON DEMAND.',
    },
  ],
  contextArtefacts: [
    {
      id: 'repro-first',
      type: 'code',
      title: 'The debugging order of operations',
      language: 'text',
      content:
        '1. REPRODUCE  narrow until it fails on demand (who/what data/which steps/browser)\n2. LOCATE     bisect the failing path to the smallest broken piece\n3. UNDERSTAND why does it fail? (not just where)\n4. FIX        change the cause; the repro flips from red to green\n5. VERIFY     the repro passes; add a regression test so it can’t return\n\nskip step 1 and every later step is a guess you cannot check',
    },
  ],
  challenges: [
    {
      id: 'dbg-001-c1',
      type: 'multiple-choice',
      title: 'The Fix Shipped Three Times',
      difficulty: 'intro',
      tags: ['incident-response'],
      storyContext:
        'An intermittent bug: "sometimes checkout shows the wrong total". A dev has read the pricing code, spotted a plausible-looking rounding line, and wants to ship a fix.',
      prompt: 'What should happen before that fix ships?',
      options: [
        {
          id: 'a',
          label: 'Ship it — the rounding line looks wrong, and shipping the fix will reveal whether it was the cause when reports stop.',
          isCorrect: false,
          feedback:
            'That is exactly how the same bug got "fixed" three times: shipping a plausible guess and waiting to see if reports stop is a slow, uncontrolled experiment on users. And intermittent reports may pause by luck, falsely confirming a wrong fix.',
        },
        {
          id: 'b',
          label:
            'Build a reliable reproduction first: narrow the "sometimes" into specific conditions (which items, coupon combos, quantities, timing) until the wrong total appears ON DEMAND. Only then confirm the rounding line is actually the cause (does changing it flip the repro?), and verify the fix against the same repro. A guess you cannot reproduce is a guess you cannot verify.',
          isCorrect: true,
          feedback:
            'The repro is the asset: it turns "looks wrong" into "is the cause", makes the fix verifiable, and becomes the regression test. Without it, three plausible fixes told three plausible stories and none worked.',
        },
        {
          id: 'c',
          label: 'Add more logging around the rounding line and wait for the next production occurrence to confirm.',
          isCorrect: false,
          feedback:
            'Logging helps LOCATE once you can trigger the bug, but waiting for production occurrences is slow and non-deterministic — and if the rounding line is the wrong suspect, the logs there will simply never fire while the real bug continues.',
        },
        {
          id: 'd',
          label: 'Write a unit test asserting the rounding line is correct — a green test proves the fix is unnecessary or confirms the bug.',
          isCorrect: false,
          feedback:
            'A test of the SUSPECTED line only checks your hypothesis, not the actual bug — if the wrong total comes from coupon stacking or a race elsewhere, the rounding test passes while checkout stays broken. Reproduce the real symptom first.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'How will you KNOW the fix worked, if you cannot make the bug happen?' },
        { level: 2, title: 'Concept', content: 'A reliable repro makes cause and fix verifiable; guessing does not.' },
        { level: 3, title: 'Specific clue', content: 'Why did the same bug get "fixed" three times before?' },
        { level: 4, title: 'Guided solution', content: 'Pick reproduce-first, then confirm cause and verify fix.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Repro prioritised' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'A fourth plausible fix shipped without a repro — the wrong-total bug returned the next high-traffic day.',
        },
      ],
      helpLinks: [{ topicId: 'debug.reproduce', label: 'Reproduce first' }],
      successFeedback: 'Reproduce, then fix — the law that ends the cycle of confident wrong patches.',
      failureFeedback: 'Each of the three past fixes "looked right" too. What did they all skip?',
    },
    {
      id: 'dbg-001-c2',
      type: 'multiple-choice',
      title: 'Narrowing the “Sometimes”',
      difficulty: 'easy',
      tags: ['incident-response'],
      storyContext:
        'The wrong-total bug is real but rare. You have: 40 support tickets, access to session replays, feature flags, and the ability to run the app locally with production-like data. How do you get to a deterministic repro?',
      prompt: 'What is the most effective approach to narrow it down?',
      options: [
        {
          id: 'a',
          label:
            'Look for the PATTERN across the evidence: cross-reference the 40 tickets and replays for common factors — same items? a specific coupon? a particular quantity or sequence? a browser or locale? Form a hypothesis from the shared conditions, then reproduce THOSE conditions locally with production-like data until it fails every time. Data-driven narrowing beats random poking.',
          isCorrect: true,
          feedback:
            'The 40 tickets are a dataset: the bug’s conditions are hiding in their intersection. Find the shared factor, recreate it deliberately, and "sometimes" becomes "always under X" — a deterministic repro.',
        },
        {
          id: 'b',
          label: 'Try random checkout combinations locally until you happen to hit the wrong total, then work backwards.',
          isCorrect: false,
          feedback:
            'Random search ignores 40 tickets’ worth of clues about WHEN it happens — you might brute-force it eventually, but the evidence already narrows the space enormously if you read it.',
        },
        {
          id: 'c',
          label: 'Add verbose logging to production and wait for enough occurrences to spot the pattern in the logs.',
          isCorrect: false,
          feedback:
            'You already HAVE occurrences (40 tickets + replays) — waiting for more via logging is slower and you can reproduce locally now. Logging is for the LOCATE phase once you can trigger it.',
        },
        {
          id: 'd',
          label: 'Bisect the pricing code by commenting out features until the bug disappears, isolating the responsible code.',
          isCorrect: false,
          feedback:
            'Bisecting the CODE is a LOCATE technique — but you cannot bisect against a bug you cannot trigger. You need the deterministic repro first; then bisecting works beautifully.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The 40 tickets already describe WHEN it happens. What do they share?' },
        { level: 2, title: 'Concept', content: 'Narrow from evidence: find the common conditions, recreate them.' },
        { level: 3, title: 'Specific clue', content: 'What is the intersection of all 40 reports — item, coupon, quantity, locale?' },
        { level: 4, title: 'Guided solution', content: 'Pattern-match the evidence, then reproduce those conditions.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Conditions narrowed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The team brute-forced combinations for a day, ignoring the tickets — the shared coupon factor was in every report all along.',
        },
      ],
      helpLinks: [{ topicId: 'debug.reproduce', label: 'Reproduce first' }],
      successFeedback: 'The evidence held the conditions — pattern-matched into a deterministic repro.',
      failureFeedback: 'You have 40 examples of when it fails. What is the fastest path — read them, or guess?',
    },
  ],
  reflectionPrompt: 'Think of our last intermittent bug: did we build a reliable repro before fixing, or ship a plausible guess and hope?',
  rewards: [{ type: 'xp', amount: 5, label: 'Repro-first set' }],
};
