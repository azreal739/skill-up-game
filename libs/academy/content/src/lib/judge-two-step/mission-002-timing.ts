import { MissionDefinition } from '@academy/content-model';

/** Two Step module mission 2 — timing: quick-quick-slow-slow. */
export const judgeTwoStep002Timing: MissionDefinition = {
  id: 'judge-two-step-002-timing',
  campaignId: 'judge-two-step',
  title: 'Quick-Quick-Slow-Slow',
  summary:
    'The Two Step rides a quick-quick-slow-slow count with no triples. Learn to confirm the QQSS and tell it apart from the Triple Two.',
  difficulty: 'medium',
  learningObjectives: [
    'Confirm the quick-quick-slow-slow structure',
    'Distinguish it from the Triple Two’s triples',
    'Fault a collapsed or uneven QQSS',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Count it: quick, quick, slow, slow. Two quick half-beat steps, then two full-beat slows. No triples anywhere — the moment you hear a triple, you are watching a different dance.',
    },
  ],
  contextArtefacts: [
    {
      id: 'two-step-count',
      type: 'message',
      title: 'Count sheet',
      content: '4/4: quick (½) · quick (½) · slow (1) · slow (1). No triples — QQSS is the whole basic.',
    },
  ],
  challenges: [
    {
      id: 'jts-002-c1',
      type: 'multiple-choice',
      title: 'Two Step or Triple Two',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'two-step', 'timing'],
      storyContext:
        'A couple dances a clean quick-quick-slow-slow with no triple steps anywhere, gliding down the line of dance. A new judge wants to call it a Triple Two.',
      prompt: 'How should the timing lens read this?',
      options: [
        {
          id: 'a',
          label: 'It is a Two Step — quick-quick-slow-slow with no triples is the Two Step; the Triple Two would have slow-slow-triple-triple with clear triple steps.',
          isCorrect: true,
          feedback:
            'Correct. The absence of triples and the QQSS count make it a Two Step, not a Triple Two.',
        },
        {
          id: 'b',
          label: 'It is a Triple Two — any smooth country traveller is a Triple Two.',
          isCorrect: false,
          feedback:
            'The Triple Two is defined by its triples; a QQSS with no triples is a Two Step.',
        },
        {
          id: 'c',
          label: 'Cannot tell — the two dances have identical timing.',
          isCorrect: false,
          feedback:
            'Their timing differs: Two Step is quick-quick-slow-slow, Triple Two is slow-slow-triple-triple.',
        },
        {
          id: 'd',
          label: 'It is a Triple Two danced without the triples.',
          isCorrect: false,
          feedback:
            'A Triple Two without its triples is not a Triple Two at all; QQSS is simply the Two Step.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Are there any triples in the count?' },
        { level: 2, title: 'Concept', content: 'Two Step is QQSS; Triple Two is slow-slow-triple-triple.' },
        { level: 3, title: 'Specific clue', content: 'No triples = Two Step.' },
        { level: 4, title: 'Guided solution', content: 'Choose "It is a Two Step."' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Dances distinguished' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Confusing the Two Step with the Triple Two would apply the wrong timing expectations.',
        },
      ],
      helpLinks: [{ topicId: 'dance.two-step', label: 'Judging the Two Step' }],
      successFeedback: 'No triples, QQSS — a Two Step, not a Triple Two. Well told apart.',
      failureFeedback: 'Quick-quick-slow-slow with no triples is the Two Step; the Triple Two has slow-slow-triple-triple.',
    },
    {
      id: 'jts-002-c2',
      type: 'multiple-choice',
      title: 'Even Quicks, Full Slows',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'two-step', 'timing'],
      storyContext:
        'A couple rushes the two slow steps so they land almost as fast as the quicks, blurring the quick-quick-slow-slow into an even four-step shuffle.',
      prompt: 'How does the timing lens read this?',
      options: [
        {
          id: 'a',
          label: 'Fine — as long as they take four steps, the values do not matter.',
          isCorrect: false,
          feedback:
            'The values matter: the slows must be held full beats. Rushing them collapses the QQSS.',
        },
        {
          id: 'b',
          label: 'Better — four even steps are cleaner and easier to follow.',
          isCorrect: false,
          feedback:
            'Evenness is not the criterion; the quick-quick-slow-slow contrast is the Two Step’s timing.',
        },
        {
          id: 'c',
          label: 'A character issue only — rushed slows just look a little hurried.',
          isCorrect: false,
          feedback:
            'It reads hurried, but the concrete problem is that the slows have lost their value — a timing fault.',
        },
        {
          id: 'd',
          label: 'A timing fault — the two slows must hold their full beats; rushing them into the quicks collapses the quick-quick-slow-slow.',
          isCorrect: true,
          feedback:
            'Correct. The QQSS depends on the contrast between quick half-beats and full-beat slows; rushing the slows is a timing fault.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Do the slows hold their full value?' },
        { level: 2, title: 'Concept', content: 'The QQSS depends on quick-vs-slow contrast.' },
        { level: 3, title: 'Specific clue', content: 'Rushed slows collapse the count into an even shuffle.' },
        { level: 4, title: 'Guided solution', content: 'Choose the timing fault for the rushed slows.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Values checked' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Ignoring collapsed slows would put your timing marks out of line with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.timing', label: 'Timing and Time Signature' },
        { topicId: 'dance.two-step', label: 'Judging the Two Step' },
      ],
      successFeedback: 'Rushed slows collapse the QQSS — a timing fault. Caught it.',
      failureFeedback: 'The two slows must hold their full beats; rushing them into the quicks collapses the quick-quick-slow-slow.',
    },
  ],
  reflectionPrompt: 'How would you explain the timing difference between a Two Step and a Triple Two in one sentence?',
  rewards: [{ type: 'xp', amount: 5, label: 'Two Step timing trained' }],
};
