import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — signal equality and immutable updates (knowledge pack 03/07:
 * default equality is referential; mutating in place returns the same
 * reference and notifies nobody — the FP immutability sessions pay off here).
 */
export const fnSig004ImmutableUpdates: MissionDefinition = {
  id: 'sig-004-immutable-updates',
  campaignId: 'ng-signals-cd',
  title: 'Mutation Doesn’t Count',
  summary:
    'A signal compares by reference — an in-place push returns the same array, and the graph shrugs. New value, new reference.',
  difficulty: 'medium',
  learningObjectives: [
    'Explain why an in-place mutation inside update() notifies nobody',
    'Write list and object updates that produce fresh references',
    'Connect signal equality to the immutability discipline from FP',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Live demo, session four: add-to-cart clicked, cart signal “updated”, badge stuck at 2. The room debugged it together for ten minutes. It was one push().',
    },
    {
      speaker: 'Senior Dev',
      text: 'update returned the SAME array it was given. The signal checks equality before notifying — same reference, no change, no notification. The immutability rules from the FP sessions were never optional here.',
    },
  ],
  contextArtefacts: [
    {
      id: 'stuck-badge',
      type: 'code',
      title: 'The stuck cart badge',
      language: 'ts',
      content:
        'readonly items = signal<CartItem[]>([]);\n\nadd(item: CartItem) {\n  this.items.update((list) => {\n    list.push(item); // mutates in place…\n    return list;     // …returns the SAME reference\n  });\n}',
    },
  ],
  challenges: [
    {
      id: 'sig-004-c1',
      type: 'multiple-choice',
      title: 'Why the Badge Froze',
      difficulty: 'medium',
      tags: ['angular', 'functional-programming'],
      storyContext: 'The push() is on screen. The signal DID run update — and nothing repainted.',
      prompt: 'Why does the pushed item never render?',
      options: [
        {
          id: 'a',
          label:
            'update returned the same array reference it received, and the signal’s default equality says same-reference means no change — so no reader is notified. Returning [...list, item] makes the change visible.',
          isCorrect: true,
          feedback:
            'The whole bug in one sentence: mutation hides change from a referential equality check. Fresh reference, fresh notification.',
        },
        {
          id: 'b',
          label: 'push is asynchronous, so the return runs before the item is actually in the array.',
          isCorrect: false,
          feedback: 'push is synchronous — the item IS in the array. The array is just the same object it always was.',
        },
        {
          id: 'c',
          label: 'Signals cannot hold arrays — collection state needs a Subject instead.',
          isCorrect: false,
          feedback: 'Arrays are fine. What signals need is what FP always wanted: a new value, not a modified old one.',
        },
        {
          id: 'd',
          label: 'update() only accepts primitive transformations; object returns are silently dropped.',
          isCorrect: false,
          feedback: 'The return was accepted — it just compared equal (identical, in fact) to the previous value.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The signal decides whether to notify. What does it compare?' },
        { level: 2, title: 'Concept', content: 'Default equality is referential: oldValue === newValue means stay quiet.' },
        { level: 3, title: 'Specific clue', content: 'What does push() return… and what did the lambda return?' },
        { level: 4, title: 'Guided solution', content: 'Pick same-reference-no-notify, fixed by [...list, item].' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Badge unstuck' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'Add-to-cart silently no-oped in production — items vanished until a full reload.',
        },
      ],
      helpLinks: [
        { topicId: 'signals.equality', label: 'Signal equality' },
        { topicId: 'fp.immutability', label: 'Immutability' },
      ],
      successFeedback: 'Same reference, no news — you will never lose ten minutes to a push again.',
      failureFeedback: 'Follow the reference: what went in, what came out, and are they the same object?',
    },
    {
      id: 'sig-004-c2',
      type: 'multiple-choice',
      title: 'Objects Play the Same Game',
      difficulty: 'medium',
      tags: ['angular', 'functional-programming'],
      storyContext:
        'Same session, next exhibit: a profile signal. renameUser does profile().name = newName — and the header keeps the old name.',
      prompt: 'Which write actually updates the header?',
      options: [
        {
          id: 'a',
          label: 'profile.update(p => { p.name = newName; return p; }) — route the mutation through update so the signal sees it.',
          isCorrect: false,
          feedback: 'Routing the SAME mutation through update changes nothing — the returned p is still the old reference.',
        },
        {
          id: 'b',
          label: 'profile().name = newName, then profile.set(profile()) to force a notification.',
          isCorrect: false,
          feedback: 'set(currentValue) is same-reference again — equality swallows the “force”. The mutation stays invisible.',
        },
        {
          id: 'c',
          label:
            'profile.update(p => ({ ...p, name: newName })) — spread a fresh object so the reference changes and every reader is notified.',
          isCorrect: true,
          feedback:
            'New object, new reference, notification guaranteed — and the pattern scales to nested state one spread at a time.',
        },
        {
          id: 'd',
          label: 'Wrap the template read in a getter — getters re-run every render, so it will pick the mutation up eventually.',
          isCorrect: false,
          feedback:
            '“Eventually” is doing heavy lifting: nothing schedules that render, because nothing was notified. The read side cannot fix a silent write.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The array lesson, again with an object: which option produces a NEW reference?' },
        { level: 2, title: 'Concept', content: 'Spread-and-replace is the object-shaped [...list, item].' },
        { level: 3, title: 'Specific clue', content: 'Two options mutate and hope; one re-sets the same reference.' },
        { level: 4, title: 'Guided solution', content: 'Pick the { ...p, name } spread inside update.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Profile refreshed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'Mutate-then-force-set became the house workaround, hiding every write behind a fake notification.',
        },
      ],
      helpLinks: [
        { topicId: 'signals.equality', label: 'Signal equality' },
        { topicId: 'fp.immutability', label: 'Immutability' },
      ],
      successFeedback: 'Arrays, objects, same law: change means a new value. FP called it years ago.',
      failureFeedback: 'Test each option with one question: does the signal end up holding a different reference?',
    },
  ],
  reflectionPrompt: 'Where does our code still mutate state it later expects the UI to notice?',
  rewards: [{ type: 'xp', amount: 10, label: 'References respected' }],
};
