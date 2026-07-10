import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — computed signals (knowledge pack 03: derived state stays
 * consistent automatically; keep computed functions pure).
 */
export const fnSig002Computed: MissionDefinition = {
  id: 'sig-002-computed',
  campaignId: 'ng-signals-cd',
  title: 'Derived, Not Duplicated',
  summary:
    'computed() derives a value from other signals — it recalculates itself, so derived state can never drift.',
  difficulty: 'easy',
  learningObjectives: [
    'Replace manually-synchronised state with a computed',
    'Explain why computed values cannot drift from their sources',
    'Keep computed functions pure — no writes, no HTTP',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session two opened with a bug hunt: the dashboard showed 4 active users while the list below showed 5. Two copies of the same fact, one update path missed.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The fix was to delete state, not add it: activeNames became computed(() => this.users().filter(u => u.active).map(u => u.name)). One source, derivations everywhere else.',
    },
  ],
  contextArtefacts: [
    {
      id: 'drift-bug',
      type: 'code',
      title: 'The drifting counter (before)',
      language: 'ts',
      content:
        'activeCount = 0; // updated by hand in 3 places\n\naddUser(u: User) {\n  this.users.update((list) => [...list, u]);\n  if (u.active) this.activeCount++; // place 1 of 3…\n}',
    },
  ],
  challenges: [
    {
      id: 'sig-002-c1',
      type: 'multiple-choice',
      title: 'Why Derive',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext: 'A teammate defends the counter: “incrementing an integer is faster than filtering a list.”',
      prompt: 'Why is computed(() => this.users().filter(u => u.active).length) still the right call?',
      options: [
        {
          id: 'a',
          label: 'Because filtering is actually faster than incrementing once the list is large.',
          isCorrect: false,
          feedback:
            'It is not — the win is correctness, not speed. And computed only recalculates when users actually changes.',
        },
        {
          id: 'b',
          label: 'Because computed values update the DOM directly, skipping change detection.',
          isCorrect: false,
          feedback: 'computed produces a value; rendering it is still the view machinery’s job.',
        },
        {
          id: 'c',
          label:
            'Because a derivation cannot drift: it recalculates from its sources automatically, memoised until a dependency changes — there is no second copy to forget to update.',
          isCorrect: true,
          feedback:
            'Exactly the 4-vs-5 bug, dissolved: delete the duplicate fact and the missed update path disappears with it.',
        },
        {
          id: 'd',
          label: 'Because writable signals cannot hold numbers derived from arrays.',
          isCorrect: false,
          feedback: 'They can hold anything — the problem is that a hand-updated copy WILL eventually be missed.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The dashboard said 4, the list said 5. What made that possible?' },
        { level: 2, title: 'Concept', content: 'Derived state stays consistent automatically — that is computed’s whole job.' },
        { level: 3, title: 'Specific clue', content: 'Memoisation answers the performance objection.' },
        { level: 4, title: 'Guided solution', content: 'Pick the no-second-copy-to-drift answer.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Drift dissolved' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The hand-synced counter survived review and gained a fourth update site within a sprint.',
        },
      ],
      helpLinks: [{ topicId: 'signals.computed', label: 'Computed signals' }],
      successFeedback: 'One source of truth, derivations for the rest — the session’s core sentence.',
      failureFeedback: 'Ask what allowed 4 and 5 to coexist. The answer names the fix.',
    },
    {
      id: 'sig-002-c2',
      type: 'multiple-choice',
      title: 'Keep It Pure',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'Emboldened, a teammate proposes: computed(() => { this.page.set(0); return this.http.get(`/users?q=${this.query()}`); }).',
      prompt: 'What is wrong with this computed?',
      options: [
        {
          id: 'a',
          label:
            'Everything about it: a computed must be a pure derivation — writing page inside it and firing HTTP both make it a side-effecting action, not a value.',
          isCorrect: true,
          feedback:
            'Both sins in one lambda: setting another signal mid-derivation and doing I/O. Derive values in computed; act on the world elsewhere.',
        },
        {
          id: 'b',
          label: 'Only the template literal — query() should be passed as an HttpParams object.',
          isCorrect: false,
          feedback: 'Params style is cosmetic. The structural problem is a derivation that writes and calls the network.',
        },
        {
          id: 'c',
          label: 'Nothing — computed re-runs when query changes, which is exactly when we want to refetch.',
          isCorrect: false,
          feedback:
            'The timing is right but the tool is wrong: this returns an Observable nobody subscribes to, re-fires on any read, and mutates state mid-derivation.',
        },
        {
          id: 'd',
          label: 'It only needs a catchError — unhandled HTTP errors are the real risk here.',
          isCorrect: false,
          feedback: 'Error handling cannot rescue it: the request does not even run — computed returns the cold Observable as the “value”.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Count the things this lambda does besides RETURN a value.' },
        { level: 2, title: 'Concept', content: 'computed = pure function of other signals. No writes, no I/O, no surprises.' },
        { level: 3, title: 'Specific clue', content: 'What does the template render if the “value” is an Observable?' },
        { level: 4, title: 'Guided solution', content: 'Choose the answer that flags both the write and the HTTP call.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Purity kept' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The side-effecting computed reset pagination on every render pass — users lost their place mid-scroll.',
        },
      ],
      helpLinks: [
        { topicId: 'signals.computed', label: 'Computed signals' },
        { topicId: 'fp.pure-functions', label: 'Pure functions' },
      ],
      successFeedback: 'Derive values, act elsewhere — the FP sessions paying rent in Angular.',
      failureFeedback: 'A computed answers “what is the value?” — find everything here that is not an answer to that.',
    },
  ],
  reflectionPrompt: 'Which value in our app is stored AND derived — two copies of one fact waiting to disagree?',
  rewards: [{ type: 'xp', amount: 5, label: 'Derivations only' }],
};
