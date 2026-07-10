import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — valueChanges + RxJS (knowledge pack 01: forms combined with
 * RxJS; campaign 3 lessons applied to form streams).
 */
export const fnTf007ValueChanges: MissionDefinition = {
  id: 'tf-007-valuechanges',
  campaignId: 'ng-typed-forms',
  title: 'valueChanges Is a Stream',
  summary:
    'Every control publishes a typed stream. Everything the RxJS campaign taught applies — including its bugs.',
  difficulty: 'hard',
  learningObjectives: [
    'Consume valueChanges with the campaign-3 toolkit',
    'Include the current value with startWith when logic needs it',
    'Avoid the setValue-inside-valueChanges loop',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'valueChanges is where the two campaigns meet: a typed Observable of exactly what the control holds. Our search box from the RxJS finale? Its query$ was a control’s valueChanges all along.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Two sharp edges from our own code: valueChanges does NOT emit the current value on subscribe — and calling setValue inside your own valueChanges handler is how the infinite loop of legend was born.',
    },
  ],
  contextArtefacts: [
    {
      id: 'stream-form',
      type: 'code',
      title: 'The live preview requirement',
      language: 'ts',
      content:
        '// Requirement: show a delivery estimate that updates as the\n// postcode field changes — INCLUDING on first render, using the\n// value already in the control.',
    },
  ],
  challenges: [
    {
      id: 'tf-007-c1',
      type: 'multiple-choice',
      title: 'The Preview That Started Blank',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'estimate$ = postcode.valueChanges.pipe(switchMap(fetchEstimate)) — the preview stays empty until the user edits the field.',
      prompt: 'Why is the first render blank, and what is the idiomatic fix?',
      options: [
        {
          id: 'a',
          label:
            'fetchEstimate is lazy and needs an initial subscribe — add shareReplay(1) to warm it up.',
          isCorrect: false,
          feedback:
            'shareReplay replays past emissions to LATE subscribers — there is no past emission here to replay.',
        },
        {
          id: 'b',
          label: 'The control is nonNullable, which suppresses the first emission — make it nullable.',
          isCorrect: false,
          feedback: 'Nullability changes the value type, not when emissions happen.',
        },
        {
          id: 'c',
          label: 'switchMap cancels the first request before it completes — use mergeMap for the initial load.',
          isCorrect: false,
          feedback:
            'Nothing was cancelled — nothing was ever EMITTED. And mergeMap reopens the stale-result race for later edits.',
        },
        {
          id: 'd',
          label:
            'valueChanges only emits on CHANGES — pipe startWith(postcode.value) so the current value seeds the stream.',
          isCorrect: true,
          feedback:
            'The stream begins at the next edit; startWith hands it the present. Estimate on first render, updates thereafter.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'When does valueChanges emit for the FIRST time?' },
        {
          level: 2,
          title: 'Concept',
          content: 'valueChanges is future edits only; startWith(control.value) prepends the present.',
        },
        { level: 3, title: 'Specific clue', content: 'No operator downstream can conjure an emission that never happened.' },
        { level: 4, title: 'Guided solution', content: 'Choose startWith(postcode.value).' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Present included' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Returning users with a saved postcode saw a blank estimate until they retyped it.',
        },
      ],
      helpLinks: [
        { topicId: 'forms.valuechanges', label: 'valueChanges' },
        { topicId: 'rx.observables', label: 'Observables' },
      ],
      successFeedback: 'Future edits plus the seeded present — the preview finally renders complete.',
      failureFeedback: 'The name says it: valueCHANGES. What has not happened yet on first render?',
    },
    {
      id: 'tf-007-c2',
      type: 'multiple-choice',
      title: 'The Loop of Legend',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'Requirement: uppercase the callsign as the user types. The first attempt subscribed to valueChanges and called setValue inside — the browser froze.',
      prompt: 'What is the sanctioned way to write back?',
      options: [
        {
          id: 'a',
          label:
            'setValue(value.toUpperCase(), { emitEvent: false }) inside the handler — transform without re-triggering the stream.',
          isCorrect: true,
          feedback:
            'emitEvent: false breaks the cycle at the source: the write happens, the stream stays quiet, the browser lives.',
        },
        {
          id: 'b',
          label: 'Wrap the setValue in setTimeout(0) so the loop yields to the event queue between cycles.',
          isCorrect: false,
          feedback:
            'An infinite loop with breathing room is still infinite — the queue just melts more politely.',
        },
        {
          id: 'c',
          label: 'Add distinctUntilChanged() upstream — the second emission is equal, so the loop stops.',
          isCorrect: false,
          feedback:
            'Closer — it happens to terminate for idempotent transforms, but it leaves the write-loop in place and breaks the day the transform stops being idempotent. The session marked it “clever, fragile”.',
        },
        {
          id: 'd',
          label: 'Move the uppercase into the template with a pipe so no write-back exists.',
          isCorrect: false,
          feedback:
            'A display pipe changes what is SHOWN, not what is STORED — the submitted value stays lowercase.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The loop is write → emit → write. Which link can you remove cleanly?' },
        {
          level: 2,
          title: 'Concept',
          content: 'setValue accepts { emitEvent: false } — mutate the control without notifying its own stream.',
        },
        { level: 3, title: 'Specific clue', content: 'One option removes the emission; the others muffle or dodge it.' },
        { level: 4, title: 'Guided solution', content: 'Choose emitEvent: false.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Loop broken' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The write-back loop froze the tab for every user who typed in the field.',
        },
      ],
      helpLinks: [{ topicId: 'forms.valuechanges', label: 'valueChanges' }],
      successFeedback: 'Write without echo — the loop cannot start.',
      failureFeedback: 'Break the cycle at the EMISSION, not by slowing or hiding it.',
    },
  ],
  reflectionPrompt: 'Which of your valueChanges pipes would break if the control emitted its current value on subscribe?',
  rewards: [{ type: 'xp', amount: 15, label: 'Streams and forms joined' }],
};
