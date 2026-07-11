import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — knowing when to use AI and when not to: strengths,
 * weaknesses, and the tasks where it costs more than it saves.
 */
export const fnAi004WhenToUse: MissionDefinition = {
  id: 'ai-004-when-to-use',
  campaignId: 'ai-assisted-engineering',
  title: 'The Right Tool for the Task',
  summary:
    'AI shines at boilerplate, exploration, translation and recall — and struggles with novel logic, deep context, and correctness-critical detail; knowing which is the skill.',
  difficulty: 'medium',
  learningObjectives: [
    'Match tasks to AI strengths and weaknesses',
    'Recognise where AI costs more than it saves',
    'Keep the human on the tasks that need judgement',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session four: not "should we use AI" — that debate is over — but "for WHAT". We had engineers hand-writing boilerplate the AI would generate perfectly, AND engineers asking AI to design novel distributed-systems logic it got confidently wrong. Both misused the tool by ignoring where it is strong and where it is weak.',
    },
    {
      speaker: 'Senior Dev',
      text: 'AI is EXCELLENT at: boilerplate and scaffolding, translating between languages/formats, explaining unfamiliar code, generating tests for existing logic, recalling syntax and API shapes, rubber-duck exploration. It STRUGGLES with: novel algorithms and genuinely new logic, tasks needing deep whole-system context it cannot see, correctness-critical detail where a subtle error is costly, and anything where it will confidently invent. The skill is routing each task to whoever does it best — sometimes the AI, sometimes you, often you WITH it.',
    },
  ],
  contextArtefacts: [
    {
      id: 'ai-fit',
      type: 'code',
      title: 'Where AI fits',
      language: 'text',
      content:
        'AI STRONG    boilerplate/scaffolding · lang/format translation · explaining code\n             · tests for EXISTING logic · syntax/API recall · exploration/rubber-duck\nAI WEAK      novel algorithms/new logic · deep whole-system context it can’t see\n             · correctness-critical detail (subtle error costly) · will confidently invent\nBEST MODE    often YOU + AI: it drafts, you judge; route by strength\n\nmisuse: hand-writing what it does perfectly; trusting it where it’s weak',
    },
  ],
  challenges: [
    {
      id: 'ai-004-c1',
      type: 'multiple-choice',
      title: 'Route the Tasks',
      difficulty: 'medium',
      tags: ['ai'],
      storyContext:
        'Four tasks: (A) scaffold 30 CRUD endpoints’ boilerplate matching an existing pattern; (B) design a novel conflict-resolution algorithm for the collaborative editor’s concurrent edits; (C) translate a Python data-processing script to TypeScript; (D) write unit tests for an existing, well-understood pricing function.',
      prompt: 'Which tasks are strong fits for AI, and which is the risky one?',
      options: [
        {
          id: 'a',
          label:
            'A, C, D are strong AI fits: scaffolding boilerplate to an existing pattern (A), language translation (C), and generating tests for existing well-understood logic (D) are exactly its strengths — high-volume, pattern-based, verifiable. B is the risky one: a NOVEL conflict-resolution algorithm is genuinely new logic requiring deep correctness and system context, where AI will confidently produce plausible-but-subtly-wrong output that is expensive to get wrong. Use AI to explore/draft B, but the human owns the novel algorithm’s design and correctness.',
          isCorrect: true,
          feedback:
            'Match to strengths: boilerplate, translation, and tests-for-existing-code are verifiable, pattern-based wins; a novel correctness-critical algorithm is where AI is weakest and the cost of its confident errors is highest. Route B to human judgement (AI-assisted at most).',
        },
        {
          id: 'b',
          label: 'All four are strong fits — AI handles algorithms as well as boilerplate; use it fully for B too.',
          isCorrect: false,
          feedback:
            'Novel algorithm design is precisely where AI struggles most: it will produce confident, plausible logic with subtle correctness holes, and a conflict-resolution bug in a collaborative editor corrupts users’ documents. B needs human ownership; the others are safe wins.',
        },
        {
          id: 'c',
          label: 'None are safe without full rewriting — AI output always needs so much correction that hand-writing is faster.',
          isCorrect: false,
          feedback:
            'For A, C, D the AI output is high-quality and quick to verify — hand-writing 30 boilerplate endpoints or a mechanical translation is slower with no benefit. Blanket distrust forfeits real acceleration on the tasks AI does well.',
        },
        {
          id: 'd',
          label: 'Only D (writing tests) is safe — tests are low-risk; the code-generating tasks (A, C) are too risky for AI.',
          isCorrect: false,
          feedback:
            'A (pattern-scaffolding) and C (translation) are among AI’s strongest, most verifiable uses — restricting AI to only test-writing forfeits its biggest wins. The genuinely risky one is B (novel algorithm), not the pattern-based code generation.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which task is NOVEL, correctness-critical logic vs pattern-based/verifiable work?' },
        { level: 2, title: 'Concept', content: 'Strong: boilerplate, translation, tests-for-existing. Weak: novel correctness-critical logic.' },
        { level: 3, title: 'Specific clue', content: 'What happens if the conflict-resolution algorithm is subtly wrong?' },
        { level: 4, title: 'Guided solution', content: 'A, C, D strong; B is the risky one.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Tasks routed' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The team let AI design the conflict-resolution algorithm — its confident-but-wrong merge logic corrupted concurrent edits in production.',
        },
      ],
      helpLinks: [{ topicId: 'ai.when-to-use', label: 'When to use AI' }],
      successFeedback: 'Pattern-based verifiable work to AI, novel correctness-critical logic to the human — routed by strength.',
      failureFeedback: 'Three tasks are pattern-based and verifiable. One is novel logic where a subtle bug is costly. Which is the risky one?',
    },
    {
      id: 'ai-004-c2',
      type: 'multiple-choice',
      title: 'When It Costs More Than It Saves',
      difficulty: 'medium',
      tags: ['ai'],
      storyContext:
        'An engineer spends 45 minutes prompting, re-prompting, and correcting an AI to produce a tricky 15-line recursive function with specific requirements, versus the ~15 minutes it would take to write and test by hand.',
      prompt: 'What does this illustrate about AI’s cost model?',
      options: [
        {
          id: 'a',
          label:
            'AI has a cost too — the time to prompt, review, and correct — and for some tasks that exceeds the time to just do it yourself. A short, tricky, correctness-specific function you understand well is often faster to write directly than to specify precisely enough for the AI and then verify its subtle correctness. Recognise when you are fighting the tool: if prompting+reviewing is costing more than doing, stop and write it. AI is not free, and it is not always faster.',
          isCorrect: true,
          feedback:
            'The productivity math includes prompting AND reviewing AND correcting — for a small, tricky, well-understood task, that overhead can exceed just writing it. Knowing when NOT to reach for AI is as much a skill as knowing when to.',
        },
        {
          id: 'b',
          label: 'The engineer prompted badly — with a perfect prompt the AI would beat hand-writing every time.',
          isCorrect: false,
          feedback:
            'Even a perfect prompt has a writing-and-reviewing cost, and for a 15-line tricky function you already understand, that overhead can exceed just doing it. AI does not beat hand-writing "every time" — for small correctness-critical tasks it often does not.',
        },
        {
          id: 'c',
          label: 'This proves AI is not useful for real coding; reserve it for documentation and comments.',
          isCorrect: false,
          feedback:
            'One task where hand-writing won does not generalise to "not useful for coding" — AI clearly wins on boilerplate, translation, and tests (previous challenge). The lesson is task-by-task cost awareness, not blanket avoidance.',
        },
        {
          id: 'd',
          label: 'The engineer should have accepted the AI’s first attempt to save time, even if imperfect.',
          isCorrect: false,
          feedback:
            'Accepting an imperfect correctness-critical function to "save time" ships bugs (the accountability lesson) — the real time-saver was recognising early that this task was faster by hand and switching, not lowering the correctness bar.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What is the TOTAL cost of AI here — prompt + review + correct — vs writing it?' },
        { level: 2, title: 'Concept', content: 'AI has overhead; for small tricky well-understood tasks, hand-writing can be faster.' },
        { level: 3, title: 'Specific clue', content: 'When prompting+reviewing exceeds doing, what should you do?' },
        { level: 4, title: 'Guided solution', content: 'Pick recognise-when-you’re-fighting-the-tool.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Cost recognised' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The team measured AI usage by volume not value — engineers spent longer prompting trivial functions than writing them, and called it "AI adoption".',
        },
      ],
      helpLinks: [{ topicId: 'ai.when-to-use', label: 'When to use AI' }],
      successFeedback: 'AI has a cost; when prompting exceeds doing, do it — knowing when NOT to reach for it is the skill.',
      failureFeedback: 'The AI attempt cost 45 minutes vs 15 by hand. What does that say about AI being "always faster"?',
    },
  ],
  reflectionPrompt: 'Where are we using AI for tasks it is weak at (novel logic) or where prompting costs more than doing — and where are we hand-writing what it does perfectly?',
  rewards: [{ type: 'xp', amount: 10, label: 'Tool routing learned' }],
};
