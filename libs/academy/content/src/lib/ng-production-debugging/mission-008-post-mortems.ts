import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — blameless post-mortems: systems thinking, the five whys,
 * and preventing recurrence.
 */
export const fnDbg008PostMortems: MissionDefinition = {
  id: 'dbg-008-post-mortems',
  campaignId: 'ng-production-debugging',
  title: 'The Incident That Teaches',
  summary:
    'A blameless post-mortem finds the systemic causes that let a bug reach production — so the fix prevents a whole class, not just one instance.',
  difficulty: 'hard',
  learningObjectives: [
    'Run a post-mortem that blames systems, not people',
    'Use the five whys to reach systemic causes',
    'Turn findings into recurrence-preventing actions',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session eight, the step teams skip and regret: the post-mortem. After the checkout incident, the easy version was "Priya pushed a bad commit, be more careful". That version guarantees the NEXT person makes a similar mistake, because nothing about the SYSTEM changed. We do it differently.',
    },
    {
      speaker: 'Senior Dev',
      text: 'A post-mortem is BLAMELESS by design — humans make mistakes; the question is why the SYSTEM let a mistake reach production and hurt users. Use the five whys: the bug shipped — why? No test caught it — why? That path had no coverage — why? … each why moves from person to process. The output is not "be careful"; it is concrete actions that prevent the whole CLASS: a test, a guard, an alert, a rollback button. Good incidents make the system stronger.',
    },
  ],
  contextArtefacts: [
    {
      id: 'five-whys',
      type: 'code',
      title: 'Five whys: from person to system',
      language: 'text',
      content:
        'Bad total reached prod.\n  why? the pricing change had a rounding bug\n  why? no test covered coupon-stacking rounding\n  why? edge cases aren’t part of our definition of done\n  why? no checklist / review prompt for pricing edge cases\n  why? pricing changes aren’t flagged for extra scrutiny\n→ ACTIONS (system, not person): add the failing case as a regression test;\n  add a pricing-edge-case review checklist; add an error-rate alert on\n  checkout; add a one-click rollback. NOT "be more careful".',
    },
  ],
  challenges: [
    {
      id: 'dbg-008-c1',
      type: 'multiple-choice',
      title: 'Whose Fault Was It',
      difficulty: 'hard',
      tags: ['incident-response'],
      storyContext:
        'Post-mortem for the checkout outage. The deploy that broke it was pushed by a junior. A manager’s draft conclusion: "root cause: insufficient care during deployment; action: the developer will be more careful".',
      prompt: 'What is wrong with this post-mortem, and what should it produce?',
      options: [
        {
          id: 'a',
          label:
            'It blames a person and stops at the first "why", so the SYSTEM that let a bad deploy reach every user unchecked is unchanged — the next person will make a similar mistake. A blameless post-mortem asks why the system permitted it: no pre-deploy check caught it? no canary/gradual rollout? no automatic error-rate alert? no fast rollback? Each answer becomes a concrete systemic action (a test, a canary, an alert, a rollback button) that prevents the whole class, regardless of who deploys next.',
          isCorrect: true,
          feedback:
            '"Be more careful" is not an action — it changes nothing and guarantees recurrence. Blameless analysis treats the human error as a given and hardens the system so the same mistake cannot reach users next time.',
        },
        {
          id: 'b',
          label: 'Nothing wrong — identifying who caused it and having them commit to more care is accountability, which prevents recurrence.',
          isCorrect: false,
          feedback:
            'Blame drives mistakes underground (people hide errors, stop reporting near-misses) and "more care" is unmeasurable and unreliable — humans WILL err. Accountability that improves safety is systemic (better checks), not personal (try harder).',
        },
        {
          id: 'c',
          label: 'The junior should not have had deploy access — restricting who can deploy is the real fix.',
          isCorrect: false,
          feedback:
            'Gatekeeping who deploys is still person-focused and brittle — a senior can push the same bug. The fix is a system where ANY deploy is caught by checks, canaried, alerted, and quickly reversible, regardless of who runs it.',
        },
        {
          id: 'd',
          label: 'Focus the post-mortem on the technical rounding bug and its fix; process discussion belongs elsewhere.',
          isCorrect: false,
          feedback:
            'Fixing the one rounding bug prevents THAT bug, not the class — the post-mortem’s value is the SYSTEMIC layer (why no test, no alert, no fast rollback) that prevents the next different bug from having the same blast radius. Both matter; the systemic part is what makes it a post-mortem.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does "be more careful" change anything about the system for the next deploy?' },
        { level: 2, title: 'Concept', content: 'Blameless: ask why the SYSTEM allowed it; produce systemic actions.' },
        { level: 3, title: 'Specific clue', content: 'What checks/alerts/rollbacks were missing that would catch ANY bad deploy?' },
        { level: 4, title: 'Guided solution', content: 'Pick the blame-the-system, concrete-actions answer.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Blamelessness applied' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -6,
          reason: 'The "be more careful" post-mortem shipped — nothing systemic changed, morale dropped, and a similar outage recurred within the quarter.',
        },
      ],
      helpLinks: [{ topicId: 'debug.post-mortems', label: 'Post-mortems' }],
      successFeedback: 'Blame the system, produce real actions — the incident made the system stronger.',
      failureFeedback: '"Be more careful" — what concretely changes so the NEXT person’s mistake cannot reach every user?',
    },
    {
      id: 'dbg-008-c2',
      type: 'code-review',
      title: 'Review the Post-Mortem Actions',
      difficulty: 'hard',
      tags: ['incident-response'],
      storyContext: 'A post-mortem’s proposed action items land for review. Which are systemic and effective, which are theatre?',
      prompt: 'Select every WEAK/ineffective action — and leave the strong ones.',
      artefacts: [
        {
          id: 'action-items',
          type: 'code',
          title: 'proposed post-mortem actions',
          language: 'text',
          content:
            '1. Add the exact failing coupon-stacking case as an automated regression test.\n2. Team to "be extra vigilant" on pricing changes going forward.\n3. Add an alert when checkout error-rate exceeds 1% over 5 minutes.\n4. Add a canary/gradual rollout so a bad deploy hits 1% before 100%.\n5. Send a company-wide email reminding everyone that outages are costly.\n6. Add a one-click rollback runbook + button for the on-call engineer.',
          },
        ],
      findings: [
        {
          id: 'be-vigilant',
          label:
            'Action 2 ("be extra vigilant") is not an action — it is unmeasurable, relies on sustained human perfection, and changes no system; it will be forgotten within a sprint and prevents nothing',
          isCorrect: true,
          feedback:
            '"Be vigilant/careful" is the classic non-action a blameless post-mortem replaces. It has no owner, no verification, and no mechanism — contrast with the regression test and canary, which enforce themselves.',
        },
        {
          id: 'company-email',
          label:
            'Action 5 (company-wide "outages are costly" email) is theatre — it informs no one who can prevent recurrence, adds no safeguard, and substitutes a feeling of action for an actual systemic change',
          isCorrect: true,
          feedback:
            'Broadcasting that outages are bad changes no code path, test, or process — everyone already knows. It is motion without mechanism, exactly the kind of "action" that lets the real gaps persist.',
        },
        {
          id: 'regression-test',
          label: 'Action 1 (add the failing case as a regression test) is too narrow — it only prevents this one bug, not the class, so it is weak',
          isCorrect: false,
          feedback:
            'Backwards: capturing the exact failing case as a permanent regression test is a STRONG, textbook systemic action — it guarantees THIS bug can never silently return, and building the habit grows edge-case coverage over time. Narrow-but-enforced beats broad-but-aspirational.',
        },
        {
          id: 'canary-rollout',
          label: 'Action 4 (canary rollout) is over-engineering for a rounding bug — gradual rollout infrastructure is disproportionate to the incident',
          isCorrect: false,
          feedback:
            'A canary is one of the highest-leverage systemic safeguards there is: it caps the blast radius of ANY future bad deploy (not just rounding) to ~1% of users before full release. That is precisely the class-level prevention a post-mortem should produce, not over-engineering.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For each action ask: does it change a SYSTEM, and does it enforce itself?' },
        { level: 2, title: 'Concept', content: 'Strong = mechanism with an owner (test, alert, canary, rollback); weak = "be careful"/awareness.' },
        { level: 3, title: 'Specific clue', content: 'Two actions are self-enforcing safeguards; two rely on people remembering to feel a certain way.' },
        { level: 4, title: 'Guided solution', content: 'Flag "be vigilant" and the company-wide email.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Actions triaged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The awareness items were counted as "done" and the canary/rollback deprioritised — the next bad deploy again hit 100% of users.',
        },
      ],
      helpLinks: [{ topicId: 'debug.post-mortems', label: 'Post-mortems' }],
      successFeedback: 'Mechanisms kept, awareness-theatre cut — the actions actually prevent recurrence.',
      failureFeedback: 'Two of these are self-enforcing safeguards (strong). Two ask humans to feel more careful (weak). Which is which?',
    },
  ],
  reflectionPrompt: 'Read our last post-mortem’s action items: how many are enforceable mechanisms, and how many are "be more careful" in disguise?',
  rewards: [{ type: 'xp', amount: 15, label: 'Systems hardened' }],
};
