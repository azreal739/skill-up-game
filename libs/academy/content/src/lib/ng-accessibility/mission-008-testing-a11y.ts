import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — testing accessibility: automated axe checks, their ceiling,
 * and the manual testing only humans can do.
 */
export const fnA11y008TestingA11y: MissionDefinition = {
  id: 'a11y-008-testing-a11y',
  campaignId: 'ng-accessibility',
  title: 'Automate the Floor, Test the Ceiling',
  summary:
    'Automated a11y checks catch a real but small fraction of issues — the rest needs a keyboard, a screen reader, and a human who tries.',
  difficulty: 'hard',
  learningObjectives: [
    'Add automated a11y assertions to the test suite',
    'Know what automation cannot catch',
    'Run the manual passes that find the majority of real issues',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session eight, a myth to bust: we had added axe-core to CI, gone green, and declared ourselves accessible. Then a blind user tried to check out and could not. Automation had passed a checkout that did not work.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Automated tools (axe, Lighthouse) catch maybe a third of issues — the MECHANICAL ones: missing alt, low contrast, absent labels, invalid ARIA. Real value, add them to CI. But they cannot judge whether your alt text is MEANINGFUL, whether the tab order makes SENSE, whether the screen-reader experience is USABLE, whether focus goes somewhere SENSIBLE. That third is the floor. The other two-thirds need a human with a keyboard and a reader.',
    },
  ],
  contextArtefacts: [
    {
      id: 'axe-plus-manual',
      type: 'code',
      title: 'The floor in CI; the ceiling by hand',
      language: 'ts',
      content:
        "// automated FLOOR — catches mechanical failures, runs every push\nit('has no axe violations', async () => {\n  const results = await axe(fixture.nativeElement);\n  expect(results.violations).toEqual([]);\n});\n\n// manual CEILING — a per-feature checklist no tool can run:\n// □ tab through with mouse unplugged — order sensible, nothing trapped\n// □ drive it with a real screen reader — is it USABLE, not just labelled?\n// □ zoom to 200% — does anything break or clip?\n// □ is every alt text meaningful, every announcement timely?",
    },
  ],
  challenges: [
    {
      id: 'a11y-008-c1',
      type: 'multiple-choice',
      title: 'Green Axe, Broken Checkout',
      difficulty: 'hard',
      tags: ['a11y', 'testing'],
      storyContext: 'axe passes the checkout with zero violations. A blind user still cannot complete it. What did automation miss?',
      prompt: 'What class of problems slips past a green axe run?',
      options: [
        {
          id: 'a',
          label:
            'The judgement-dependent majority: axe verifies a label EXISTS but not that it makes sense ("Button" passes); that alt text is PRESENT but not that it describes the image ("image123.png"); that elements are focusable but not that tab ORDER is logical or that focus lands somewhere sensible after an action; that ARIA is VALID but not that it is TRUE or that the widget is actually operable. Checkout can be mechanically perfect and experientially unusable — only a human with a reader finds that.',
          isCorrect: true,
          feedback:
            'Automation checks presence and validity; humans check meaning and usability. The gap between "has a label" and "is usable" is where most real barriers live — and where this checkout broke.',
        },
        {
          id: 'b',
          label: 'A bug in axe — a properly configured scanner with all rules enabled would have caught it.',
          isCorrect: false,
          feedback:
            'No configuration teaches a scanner to judge whether tab order is SENSIBLE or alt text is MEANINGFUL — these require understanding intent, which static analysis cannot do.',
        },
        {
          id: 'c',
          label: 'The checkout uses custom widgets axe cannot parse — sticking to native elements would make axe sufficient.',
          isCorrect: false,
          feedback:
            'Native elements help axe check MORE, but even an all-native checkout can have illogical tab order, meaningless labels, and focus that vanishes on submit — all invisible to automation.',
        },
        {
          id: 'd',
          label: 'axe only scans the initial render — running it after each interaction would have full coverage.',
          isCorrect: false,
          feedback:
            'Scanning every state helps catch more MECHANICAL issues (good practice!) but still cannot evaluate whether the experience is usable — the judgement gap remains.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What can a tool verify PRESENCE of but not QUALITY of?' },
        { level: 2, title: 'Concept', content: 'Automation checks presence/validity; humans check meaning/usability.' },
        { level: 3, title: 'Specific clue', content: 'Does axe know if aria-label="Button" is a GOOD label?' },
        { level: 4, title: 'Guided solution', content: 'Pick the judgement-dependent-majority answer.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Ceiling seen' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: '“axe is green, we’re accessible” shipped — the broken checkout stayed broken for blind users for a full quarter.',
        },
      ],
      helpLinks: [{ topicId: 'a11y.testing', label: 'Testing accessibility' }],
      successFeedback: 'The floor automated, the ceiling understood — green axe is a start, never a certificate.',
      failureFeedback: 'axe confirmed a label exists. What did it NOT confirm about that label?',
    },
    {
      id: 'a11y-008-c2',
      type: 'multiple-choice',
      title: 'The Right Testing Mix',
      difficulty: 'hard',
      tags: ['a11y', 'testing'],
      storyContext:
        'The team over-corrects: “automation is unreliable, so let’s drop axe from CI and do a full manual audit before each release instead”.',
      prompt: 'What is the right relationship between automated and manual a11y testing?',
      options: [
        {
          id: 'a',
          label:
            'Both, at their strengths — not either/or. Keep axe in CI: it catches the mechanical regressions cheaply on EVERY push (a removed label, a contrast regression) so they never reach the manual pass. Add manual testing where automation is blind: a keyboard-only pass and a screen-reader pass on new/changed flows, plus zoom and reduced-motion checks. Automation guards the floor continuously; humans verify the ceiling per feature. Dropping axe means mechanical regressions ride to production between audits.',
          isCorrect: true,
          feedback:
            'They are complementary layers, exactly like the test pyramid: cheap automated checks catch regressions constantly; expensive human judgement catches what tools cannot. Removing the cheap layer floods the expensive one with mechanical noise it should never see.',
        },
        {
          id: 'b',
          label: 'Manual only — since automation misses two-thirds, human testing is the only trustworthy source of truth.',
          isCorrect: false,
          feedback:
            'Manual audits are periodic and expensive; without axe in CI, a contrast or label regression sails through dozens of merges until the next audit rediscovers it. Automation’s job is CONTINUOUS regression-catching.',
        },
        {
          id: 'c',
          label: 'Automated only, but with multiple tools (axe + Lighthouse + pa11y) — more scanners approximate human coverage.',
          isCorrect: false,
          feedback:
            'Stacking scanners catches slightly more mechanical issues but none of them can judge meaning or usability — three tools that all can’t evaluate tab-order logic still can’t evaluate tab-order logic.',
        },
        {
          id: 'd',
          label: 'Hire an accessibility specialist to audit quarterly and skip in-team testing entirely.',
          isCorrect: false,
          feedback:
            'Expert audits are valuable but quarterly cadence means a quarter of regressions per cycle, and outsourcing removes the team’s own a11y muscle — accessibility has to live in the daily workflow, not a periodic external report.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What does axe do CONTINUOUSLY that a periodic manual audit cannot?' },
        { level: 2, title: 'Concept', content: 'Automation = continuous floor; humans = per-feature ceiling. Layers, not rivals.' },
        { level: 3, title: 'Specific clue', content: 'Between two quarterly audits, what catches a removed label?' },
        { level: 4, title: 'Guided solution', content: 'Keep axe in CI AND add manual passes per feature.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Mix balanced' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'axe was dropped — three mechanical regressions reached production before the next manual audit found them.',
        },
      ],
      helpLinks: [
        { topicId: 'a11y.testing', label: 'Testing accessibility' },
        { topicId: 'test.pyramid', label: 'The test pyramid' },
      ],
      successFeedback: 'Cheap checks continuously, human judgement per feature — the a11y pyramid, both layers standing.',
      failureFeedback: 'Which layer catches a contrast regression on the push that introduces it?',
    },
  ],
  reflectionPrompt: 'Do we run axe in CI, and when did a human last drive a new feature with a real screen reader?',
  rewards: [{ type: 'xp', amount: 15, label: 'Floor and ceiling' }],
};
