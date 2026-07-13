import { MissionDefinition } from '@academy/content-model';

/** Street module mission 4 — motion: upper vs lower core, isolation and control. */
export const judgeStreet004Motion: MissionDefinition = {
  id: 'judge-street-004-motion',
  campaignId: 'judge-street',
  title: 'Isolation and Control',
  summary:
    'Street motion is the separation of upper and lower core, clean isolations, and control — the contract-release hit of popping, the freezes of locking. Learn to judge whether the isolation is clean.',
  difficulty: 'medium',
  learningObjectives: [
    'Identify clean isolation and upper/lower core separation',
    'Recognise the contract-release hit and the freeze',
    'Fault a whole-body wobble where only one part should move',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Isolation is the heart of Street motion: when only the chest should pop, only the chest moves. Upper and lower core act independently. A whole-body wobble is a control fault.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jst-004-c1',
      type: 'multiple-choice',
      title: 'Clean or Wobbly',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'street', 'motion'],
      storyContext:
        'A performer intends an isolated chest pop, but the whole torso, shoulders and arms wobble along with it — no clean separation of the isolated part.',
      prompt: 'How does the motion lens read this?',
      options: [
        {
          id: 'a',
          label: 'Full marks — as long as something moved on the beat, the isolation is fine.',
          isCorrect: false,
          feedback:
            'Any movement is not the standard; a clean isolation means only the intended part moves, and here the whole body wobbles.',
        },
        {
          id: 'b',
          label: 'A timing fault — a wobble means they were off the beat.',
          isCorrect: false,
          feedback:
            'They may be on the beat; the fault is the lack of clean isolation and control — a motion matter.',
        },
        {
          id: 'c',
          label: 'A motion fault — a clean isolation means only the intended part moves, and a whole-body wobble is a failure of isolation and control.',
          isCorrect: true,
          feedback:
            'Correct. Isolation and control are the core of Street motion; a whole-body wobble scores down on that lens.',
        },
        {
          id: 'd',
          label: 'A character issue — a wobble just looks a little less sharp.',
          isCorrect: false,
          feedback:
            'It reads less sharp, but the concrete problem is failed isolation — a motion quality.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Did only the intended part move, or the whole body?' },
        { level: 2, title: 'Concept', content: 'Clean isolation is the core of Street motion.' },
        { level: 3, title: 'Specific clue', content: 'A whole-body wobble is a failure of isolation.' },
        { level: 4, title: 'Guided solution', content: 'Choose the motion fault for the wobble.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Isolation judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding a whole-body wobble would erase the isolation and control that define Street motion.',
        },
      ],
      helpLinks: [{ topicId: 'dance.street', label: 'Judging Street Styles' }],
      successFeedback: 'Whole-body wobble where one part should move — a motion fault. Isolation is the core.',
      failureFeedback: 'A clean isolation means only the intended part moves; a whole-body wobble is a failure of isolation and control.',
    },
    {
      id: 'jst-004-c2',
      type: 'multiple-choice',
      title: 'Upper Versus Lower',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'street', 'motion'],
      storyContext:
        'A performer drives a groove in the lower core — hips and legs — while holding a completely still, controlled upper body, then reverses it, moving only the chest and shoulders over still legs.',
      prompt: 'What is the performer demonstrating on the motion lens?',
      options: [
        {
          id: 'a',
          label: 'Genuine control — independent separation of the upper and lower core, each moving cleanly while the other stays still, is exactly what the motion lens rewards.',
          isCorrect: true,
          feedback:
            'Right. Independent upper/lower core control is a hallmark of Street motion and scores well.',
        },
        {
          id: 'b',
          label: 'A fault — the body should always move as one unified whole.',
          isCorrect: false,
          feedback:
            'Moving as one whole is the opposite of the skill; independent core separation is precisely the strength here.',
        },
        {
          id: 'c',
          label: 'A timing fault — moving one part at a time must slow the beat down.',
          isCorrect: false,
          feedback:
            'Core separation coexists with correct timing; it is a motion quality, not a timing error.',
        },
        {
          id: 'd',
          label: 'A spatial trait — it only describes where they stand.',
          isCorrect: false,
          feedback:
            'Independent core control is a body-motion quality; where they stand is a separate spatial matter.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is independent upper/lower separation a fault or a skill?' },
        { level: 2, title: 'Concept', content: 'Independent core separation is a hallmark of Street motion.' },
        { level: 3, title: 'Specific clue', content: 'One part moves cleanly while the other holds still.' },
        { level: 4, title: 'Guided solution', content: 'Choose genuine control.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Core control credited' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Marking genuine core separation as a fault would discourage the exact control Street rewards.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.motion', label: 'Motion and Body Action' },
        { topicId: 'dance.street', label: 'Judging Street Styles' },
      ],
      successFeedback: 'Independent upper/lower core control — Street motion, credited.',
      failureFeedback: 'Independent separation of the upper and lower core, each moving cleanly while the other stays still, is exactly what the motion lens rewards.',
    },
  ],
  reflectionPrompt: 'How do you tell genuine isolation apart from a performer who simply moves less?',
  rewards: [{ type: 'xp', amount: 5, label: 'Street motion trained' }],
};
