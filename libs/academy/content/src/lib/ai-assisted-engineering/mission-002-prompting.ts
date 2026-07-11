import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — effective prompting: context, specificity, and constraints
 * as the inputs that shape output quality.
 */
export const fnAi002Prompting: MissionDefinition = {
  id: 'ai-002-prompting',
  campaignId: 'ai-assisted-engineering',
  title: 'Context Is the Input',
  summary:
    'AI output quality tracks input quality — context, specificity, examples and constraints turn a vague request into a useful answer.',
  difficulty: 'easy',
  learningObjectives: [
    'Supply the context an AI needs to answer well',
    'Replace vague requests with specific, constrained ones',
    'Use examples and stated constraints to shape output',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session two: why the same tool gave one engineer garbage and another gold. The difference was the PROMPT. "Write a function to validate input" got a generic, wrong-for-us blob. "Write an Angular validator for our reactive form that checks an IBAN, returns our ValidationErrors shape { iban: string }, and rejects non-EU IBANs — here is an example of our existing validators" got exactly the right code.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Output quality is a function of input quality — garbage in, garbage out, at high speed. The levers: CONTEXT (the AI cannot see your codebase, conventions, or constraints unless you tell it — or attach the files), SPECIFICITY (vague requests get generic answers; precise requests get precise ones), EXAMPLES (show the pattern you want it to match), and CONSTRAINTS (state what it must and must not do). A good prompt is a good specification — the same clarity you would give a junior engineer.',
    },
  ],
  contextArtefacts: [
    {
      id: 'prompt-levers',
      type: 'code',
      title: 'The levers of a good prompt',
      language: 'text',
      content:
        'CONTEXT      the AI can’t see your repo/conventions/constraints — provide them\n             (paste the relevant code, state the framework/versions, the goal)\nSPECIFICITY  vague → generic; precise → precise ("validate input" vs the IBAN spec)\nEXAMPLES     show the pattern to match (an existing validator, the return shape)\nCONSTRAINTS  state must/must-not (return THIS error shape, no new deps, keep OnPush)\n\na good prompt is a good SPEC — the clarity you’d give a junior engineer',
    },
  ],
  challenges: [
    {
      id: 'ai-002-c1',
      type: 'multiple-choice',
      title: 'Garbage In',
      difficulty: 'easy',
      tags: ['ai'],
      storyContext:
        'An engineer prompts "fix the bug in my component" and pastes nothing else, then complains the AI’s answer is generic and unhelpful.',
      prompt: 'Why is the output poor, and what would fix it?',
      options: [
        {
          id: 'a',
          label:
            'The AI has almost NO input to work with — it cannot see the component, the bug’s symptoms, the expected vs actual behaviour, the framework version, or what "the bug" even is. Output quality tracks input quality: provide the code, describe the symptom precisely ("clicking Save twice submits two orders"), state expected behaviour, and any constraints. A good prompt is a good spec; a two-word request gets a two-word-quality answer.',
          isCorrect: true,
          feedback:
            'Garbage in, garbage out. The AI is not withholding a good answer — you have given it nothing to reason from. The fix is the same specificity you would give a colleague you asked for help: code, symptom, expectation, constraints.',
        },
        {
          id: 'b',
          label: 'The model is not capable enough — switch to a larger/more expensive model and the same prompt will work.',
          isCorrect: false,
          feedback:
            'No model can debug a component it cannot see from a two-word prompt — a bigger model still lacks the code, the symptom, and the expected behaviour. The bottleneck is missing INPUT, not model capacity; providing context helps every model.',
        },
        {
          id: 'c',
          label: 'AI is just bad at debugging; use it for boilerplate only and debug manually.',
          isCorrect: false,
          feedback:
            'AI can help debug effectively when given the code, the error/symptom, and the expected behaviour — the failure here was an empty prompt, not a limitation of AI at debugging. Provide the context and it becomes useful.',
        },
        {
          id: 'd',
          label: 'The engineer should ask the AI to ask THEM clarifying questions first, then answer.',
          isCorrect: false,
          feedback:
            'Having the AI interview you can help, but the faster path is to PROVIDE the obvious context up front (the code, the symptom, the expectation) — you already know what it needs. Front-load the spec rather than round-tripping for basics.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What does the AI actually know about your component from "fix the bug"?' },
        { level: 2, title: 'Concept', content: 'Output quality tracks input quality — provide code, symptom, expectation, constraints.' },
        { level: 3, title: 'Specific clue', content: 'Would a colleague fix your bug from a two-word message and no code?' },
        { level: 4, title: 'Guided solution', content: 'Pick provide-context; a good prompt is a good spec.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Context provided' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The team blamed the model and kept sending context-free prompts — a quarter of AI time was wasted on generic, unusable answers.',
        },
      ],
      helpLinks: [{ topicId: 'ai.prompting', label: 'Effective prompting' }],
      successFeedback: 'A good prompt is a good spec — context, symptom, expectation, constraints.',
      failureFeedback: 'The AI cannot see your component. What must you GIVE it to get a useful answer?',
    },
    {
      id: 'ai-002-c2',
      type: 'multiple-choice',
      title: 'Shape the Output',
      difficulty: 'medium',
      tags: ['ai', 'angular'],
      storyContext:
        'An engineer needs a data-table component and prompts "make me a data table in Angular". The AI produces a 400-line component using a random UI library, ngModules (not standalone), a different state pattern than the app uses, and no accessibility.',
      prompt: 'The output is technically a data table but wrong for the codebase. What would have shaped it correctly?',
      options: [
        {
          id: 'a',
          label:
            'State the constraints and provide examples so the output MATCHES the codebase: "standalone component, signals for state (here is our house store pattern), no new UI dependencies, OnPush, accessible (semantic table, aria-sort), inputs/outputs like this existing component [paste]". Constraints (must/must-not) and an example of your conventions turn a generic correct-ish answer into one that fits — the AI matched a generic pattern because you specified none.',
          isCorrect: true,
          feedback:
            'The AI produced A data table, not YOUR data table, because nothing constrained it to your conventions. Examples + explicit constraints (standalone, signals, no new deps, a11y, your I/O pattern) are how you get output that fits — the prompt is where you encode the codebase’s standards.',
        },
        {
          id: 'b',
          label: 'Accept it and refactor it to fit the codebase afterward — that is faster than a detailed prompt.',
          isCorrect: false,
          feedback:
            'Refactoring 400 lines of wrong-library, wrong-pattern, no-a11y code to fit is usually slower and buggier than a good prompt that produces fitting code the first time — and you inherit decisions (the random UI lib) that are hard to unwind. Shape the input; do not salvage a mismatched output.',
        },
        {
          id: 'c',
          label: 'Ask the AI to "use best practices" — that will make it follow your conventions.',
          isCorrect: false,
          feedback:
            '"Best practices" is undefined and does not encode YOUR conventions (standalone vs modules, signals vs the lib it chose, your I/O shape) — and the AI already thinks it used best practices. You must state the SPECIFIC constraints and show examples of your patterns, not invoke a vague quality word.',
        },
        {
          id: 'd',
          label: 'The tool simply cannot produce codebase-specific components; write it by hand.',
          isCorrect: false,
          feedback:
            'It absolutely can when given your conventions as constraints and examples — the failure was an unconstrained prompt, not a capability limit. Provide the pattern to match and the guardrails, and the output fits.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Why did it pick a random library, modules, and a foreign state pattern?' },
        { level: 2, title: 'Concept', content: 'Constraints (must/must-not) + examples of your conventions shape the output.' },
        { level: 3, title: 'Specific clue', content: 'How would the AI know you use standalone + signals + no new deps unless told?' },
        { level: 4, title: 'Guided solution', content: 'Pick state-constraints-and-provide-examples.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Output shaped' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The unconstrained data table was accepted and merged — it dragged in a second UI library and a foreign state pattern the team maintained for a year.',
        },
      ],
      helpLinks: [{ topicId: 'ai.prompting', label: 'Effective prompting' }],
      successFeedback: 'Constraints and examples encode your standards into the prompt — the output fits the codebase.',
      failureFeedback: 'It matched a GENERIC data table because you specified none of your conventions. What encodes them into the prompt?',
    },
  ],
  reflectionPrompt: 'Look at our vaguest AI prompt and our best one: how much of the quality gap is context, specificity, examples and constraints?',
  rewards: [{ type: 'xp', amount: 10, label: 'Prompting learned' }],
};
