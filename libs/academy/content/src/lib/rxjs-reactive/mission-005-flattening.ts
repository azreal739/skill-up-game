import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — choosing a flattening strategy (knowledge pack 03/07:
 * mergeMap / concatMap / exhaustMap trade-offs beyond search).
 */
export const fnRx005Flattening: MissionDefinition = {
  id: 'rx-005-flattening-strategies',
  campaignId: 'rxjs-reactive',
  title: 'Four Strategies, One Question',
  summary:
    'merge, switch, concat, exhaust — the operator is an answer to “what should happen to overlapping work?”',
  difficulty: 'medium',
  learningObjectives: [
    'Match each flattening operator to its concurrency policy',
    'Choose concatMap when order and completeness both matter',
    'Choose exhaustMap to ignore input while busy',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'After the search fix, the pendulum swung: switchMap started appearing everywhere — including places where cancelling previous work meant losing data.',
    },
    {
      speaker: 'Senior Dev',
      text: 'So we wrote the question on the whiteboard: when a new value arrives while the old work is running, what SHOULD happen? Cancel it, queue it, ignore the new one, or run both. That answer names your operator.',
    },
  ],
  contextArtefacts: [
    {
      id: 'strategies',
      type: 'code',
      title: 'The whiteboard, transcribed',
      language: 'text',
      content:
        'new value arrives while previous inner work runs…\n  switchMap  → cancel previous, run new\n  concatMap  → queue new until previous completes\n  exhaustMap → ignore new while busy\n  mergeMap   → run both concurrently',
    },
  ],
  challenges: [
    {
      id: 'rx-005-c1',
      type: 'multiple-choice',
      title: 'The Autosave Queue',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'Draft edits stream in and each must be persisted — every save matters, and they must apply in the order the user made them.',
      prompt: 'Which operator carries the autosave?',
      options: [
        {
          id: 'a',
          label: 'switchMap — always take the newest save and cancel the old one.',
          isCorrect: false,
          feedback:
            'Cancelling a save LOSES the previous edit if it had not committed — the one policy autosave cannot afford.',
        },
        {
          id: 'b',
          label: 'concatMap — queue each save until the previous one completes, in order.',
          isCorrect: true,
          feedback:
            'Every save runs, none overlap, order is the user’s order — the queue policy, named.',
        },
        {
          id: 'c',
          label: 'mergeMap — fire all saves concurrently for maximum speed.',
          isCorrect: false,
          feedback:
            'Concurrent writes to the same draft can land out of order — the stale-search bug, now corrupting data instead of pixels.',
        },
        {
          id: 'd',
          label: 'exhaustMap — while one save runs, further edits should not trigger saves.',
          isCorrect: false,
          feedback:
            'Ignoring edits while busy silently drops them — the user’s newest words never persist.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Two requirements: nothing lost, order preserved. Read the whiteboard.' },
        {
          level: 2,
          title: 'Concept',
          content: 'concatMap is the only strategy that guarantees both completeness and order.',
        },
        { level: 3, title: 'Specific clue', content: 'Anything that cancels or ignores loses a save. That removes two options fast.' },
        { level: 4, title: 'Guided solution', content: 'Pick concatMap — queue until the previous completes.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Saves queued' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'A cancelled autosave dropped a paragraph, and the user noticed before we did.',
        },
      ],
      helpLinks: [{ topicId: 'rx.flattening', label: 'switchMap & friends' }],
      successFeedback: 'Nothing lost, order kept — the queue policy fits the requirement exactly.',
      failureFeedback: 'Autosave cannot lose work. Which strategies can lose work? Eliminate them.',
    },
    {
      id: 'rx-005-c2',
      type: 'multiple-choice',
      title: 'The Double-Click Payment',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'The Pay button’s click stream triggers a charge request. Impatient users double-click. One charge per click-burst, please.',
      prompt: 'Which operator guards the charge?',
      options: [
        {
          id: 'a',
          label: 'mergeMap — both clicks charge, and finance reconciles the duplicates.',
          isCorrect: false,
          feedback: 'That reconciliation meeting is the incident we are preventing.',
        },
        {
          id: 'b',
          label: 'switchMap — the second click cancels the first charge request.',
          isCorrect: false,
          feedback:
            'Cancelling MID-CHARGE is worse than duplicating: the request may have committed server-side while the client forgot it.',
        },
        {
          id: 'c',
          label: 'concatMap — queue the second charge to run right after the first.',
          isCorrect: false,
          feedback: 'A faithful queue charges the card twice, politely, in order.',
        },
        {
          id: 'd',
          label: 'exhaustMap — while a charge is in flight, further clicks are ignored.',
          isCorrect: true,
          feedback:
            'Busy means deaf: the first click charges, the burst bounces off. exhaustMap’s whole reason to exist.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What should the SECOND click do while the first is in flight? Nothing.' },
        {
          level: 2,
          title: 'Concept',
          content: 'exhaustMap ignores source values while an inner Observable is active — ideal for submit buttons.',
        },
        { level: 3, title: 'Specific clue', content: 'Cancelling a payment and queueing a payment are both money bugs.' },
        { level: 4, title: 'Guided solution', content: 'Choose exhaustMap — ignore input while busy.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Double charge blocked' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'A double-click charged a customer twice, and the refund took three days.',
        },
      ],
      helpLinks: [{ topicId: 'rx.flattening', label: 'switchMap & friends' }],
      successFeedback: 'Ignore-while-busy, chosen on purpose — the whiteboard question works.',
      failureFeedback: 'Say the requirement first: one charge per burst. Which policy delivers exactly that?',
    },
  ],
  reflectionPrompt: 'Ask the whiteboard question of your newest pipe: what SHOULD overlapping work do?',
  rewards: [{ type: 'xp', amount: 10, label: 'Strategies mapped' }],
};
