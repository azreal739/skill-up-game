import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — the pure calculator core (knowledge pack 02: framework-free
 * domain logic; state transitions without mutation).
 */
export const fnFp007PureCore: MissionDefinition = {
  id: 'fp-007-pure-core',
  campaignId: 'fp-typescript',
  title: 'The Pure Core',
  summary:
    'Keep domain logic framework-free: pure transition functions the UI merely calls, never contains.',
  difficulty: 'hard',
  learningObjectives: [
    'Separate a pure core from its Angular shell',
    'Model state changes as (state, event) → new state',
    'Explain why the core needs no TestBed',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: 'The calculator’s architecture rule: the maths lives in a pure module with zero Angular imports. The component holds a signal and calls transition functions. That is the whole split.',
    },
    {
      speaker: 'Team Lead',
      text: 'Payoff we measured that week: core tests are plain assertions — no TestBed, no fixtures. They run in milliseconds and never flake.',
    },
  ],
  contextArtefacts: [
    {
      id: 'core-shape',
      type: 'code',
      title: 'calculator.core.ts (no Angular imports)',
      language: 'ts',
      content:
        "export interface CalcState {\n  display: string;\n  pending: number | null;\n  op: '+' | '-' | null;\n}\n\nexport function pressDigit(state: CalcState, d: string): CalcState {\n  return { ...state, display: state.display + d };\n}",
    },
  ],
  challenges: [
    {
      id: 'fp-007-c1',
      type: 'multiple-choice',
      title: 'Where Does the Logic Live?',
      difficulty: 'hard',
      tags: ['typescript', 'angular'],
      storyContext:
        'The equals behaviour needs implementing: combine pending, op and display into a new state.',
      prompt: 'Which placement follows the session’s architecture rule?',
      options: [
        {
          id: 'a',
          label:
            'In the component: onEquals() reads the signal, computes inline, and sets the result — fewer files.',
          isCorrect: false,
          feedback:
            'Now the maths is only testable through the component — TestBed, fixtures and flake for arithmetic.',
        },
        {
          id: 'b',
          label:
            'export function pressEquals(state: CalcState): CalcState in calculator.core.ts; the component calls signal.update(pressEquals).',
          isCorrect: true,
          feedback:
            'Pure function in the core, one-line delegation in the shell — the split the whole session argued for.',
        },
        {
          id: 'c',
          label:
            'In an injectable CalculatorService holding its own mutable state, injected wherever needed.',
          isCorrect: false,
          feedback:
            'Hidden mutable state in a singleton is the addTaxA problem at architecture scale.',
        },
        {
          id: 'd',
          label:
            'In the template: (click)="display.set(compute(pending(), op(), display()))" keeps it declarative.',
          isCorrect: false,
          feedback:
            'Business logic in a template is untestable and unreadable — declarative is not the same as inline.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Ask: what file would the unit test import?' },
        {
          level: 2,
          title: 'Concept',
          content: 'Pure core, thin shell: (state) → state functions in a module with no framework imports.',
        },
        { level: 3, title: 'Specific clue', content: 'signal.update takes exactly a (state) → state function. Convenient.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose the core function + signal.update delegation.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Core kept pure' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'Arithmetic moved into the component and every maths test now boots Angular.',
        },
      ],
      helpLinks: [
        { topicId: 'fp.pure-functions', label: 'Pure functions' },
        { topicId: 'angular.signals', label: 'Angular signals' },
      ],
      successFeedback: 'The UI orchestrates; the core decides. Tests import a plain module.',
      failureFeedback: 'Follow the test: if asserting 2+2=4 needs TestBed, the logic is in the wrong layer.',
    },
    {
      id: 'fp-007-c2',
      type: 'multiple-choice',
      title: 'Transition, Not Mutation',
      difficulty: 'hard',
      tags: ['typescript'],
      storyContext:
        'pressOp must remember the pending number and chosen operator. Four proposals are on the whiteboard.',
      prompt: 'Which pressOp is a correct pure transition?',
      options: [
        {
          id: 'a',
          label:
            "function pressOp(state: CalcState, op: '+' | '-'): CalcState {\n  state.pending = Number(state.display);\n  state.op = op;\n  return state;\n}",
          isCorrect: false,
          feedback:
            'Returning the SAME mutated object defeats change detection and shares spooky state — the shape of purity without the substance.',
        },
        {
          id: 'b',
          label:
            "let lastOp: '+' | '-' | null = null;\nfunction pressOp(state: CalcState, op: '+' | '-'): CalcState {\n  lastOp = op;\n  return { ...state, pending: Number(state.display) };\n}",
          isCorrect: false,
          feedback:
            'The operator escaped into module state — two calculators on one page now share a lastOp.',
        },
        {
          id: 'c',
          label: 'function pressOp(state, op) { return { ...state, op }; }',
          isCorrect: false,
          feedback:
            'Untyped parameters (hello, implicit any) and it forgets to capture pending — two sessions’ lessons missed at once.',
        },
        {
          id: 'd',
          label:
            "function pressOp(state: CalcState, op: '+' | '-'): CalcState {\n  return { ...state, pending: Number(state.display), op, display: '' };\n}",
          isCorrect: true,
          feedback:
            'New object, all three fields transitioned, nothing outside touched — a textbook (state, event) → state.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'A transition returns a NEW state and touches nothing else.' },
        {
          level: 2,
          title: 'Concept',
          content: 'This is the reducer pattern: every change is (state, event) → new state, pure.',
        },
        { level: 3, title: 'Specific clue', content: 'Watch for the module-level variable — state hiding outside the state.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Pick the spread that sets pending, op and clears display in one new object.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Transition written' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'A mutated state object skipped change detection and the display froze mid-calculation.',
        },
      ],
      helpLinks: [
        { topicId: 'fp.immutability', label: 'Immutability' },
        { topicId: 'fp.pure-functions', label: 'Pure functions' },
      ],
      successFeedback:
        'You just wrote the pattern behind Redux, NgRx and signal stores — one honest transition.',
      failureFeedback:
        'Three traps: mutating in place, leaking to module scope, and dropping a field. One option avoids all three.',
    },
  ],
  reflectionPrompt: 'Which feature you own would benefit most from a framework-free core module?',
  rewards: [{ type: 'xp', amount: 15, label: 'Core certified' }],
};
