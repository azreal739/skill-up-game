import { MissionDefinition } from '@academy/content-model';

/** Final Certification mission 6 — station: spot the error. */
export const judgeFinal006SpotTheError: MissionDefinition = {
  id: 'judge-final-006-spot-the-error',
  campaignId: 'judge-final-cert',
  title: 'Station 5 — Spot the Error',
  summary: 'Each described performance has one defining fault. Name it and the lens it lands on.',
  difficulty: 'hard',
  learningObjectives: [
    'Spot the defining fault in a described performance',
    'Name the lens it belongs to',
    'Avoid inventing faults not described',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Fifth station: spot the error. Each couple has one clear defining fault. Find it, name the lens, and do not add faults the description does not give you.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jf-006-c1',
      type: 'multiple-choice',
      title: 'A Waltz Without Its Motion',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'motion'],
      storyContext:
        'A Waltz: correct 3/4 timing, rich figures, regal character, good progressive travel — but completely flat, with no rise and fall at all.',
      prompt: 'What is the defining error, and its lens?',
      options: [
        {
          id: 'a',
          label: 'A timing error — flat dancing means they were off the beat.',
          isCorrect: false,
          feedback:
            'The timing was correct 3/4. Rise and fall is not timing.',
        },
        {
          id: 'b',
          label: 'A character error — flatness makes it less regal.',
          isCorrect: false,
          feedback:
            'The character was regal; the missing rise and fall is a motion matter.',
        },
        {
          id: 'c',
          label: 'A motion error — a Waltz with no rise and fall is missing its defining body action.',
          isCorrect: true,
          feedback:
            'Correct. Rise and fall is the Waltz’s signature motion; its absence is the defining motion fault.',
        },
        {
          id: 'd',
          label: 'A structural error — flatness means they did not travel.',
          isCorrect: false,
          feedback:
            'They travelled well; the fault is the flat motion, not the structure.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which listed trait is missing, and whose lens is it?' },
        { level: 2, title: 'Concept', content: 'Rise and fall is the motion lens.' },
        { level: 3, title: 'Specific clue', content: 'Everything else was fine; only the body action is flat.' },
        { level: 4, title: 'Guided solution', content: 'Choose the motion error.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Error named' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Misnaming the defining fault would misdirect the couple’s coaching.',
        },
      ],
      helpLinks: [{ topicId: 'dance.waltz', label: 'Judging the Waltz' }],
      successFeedback: 'No rise and fall — the motion error, named cleanly.',
      failureFeedback: 'A Waltz with no rise and fall is missing its defining motion — a motion error.',
    },
    {
      id: 'jf-006-c2',
      type: 'multiple-choice',
      title: 'A Nightclub That Will Not Stay',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'spatial-structure'],
      storyContext:
        'A Nightclub: correct slow-quick-quick timing, base-driven sway, romantic character, correct diamonds — but travelling continuously counter-clockwise around the whole floor.',
      prompt: 'What is the defining error, and its lens?',
      options: [
        {
          id: 'a',
          label: 'A spatial-structure error — a Nightclub is non-progressive, so circling the floor is the wrong structure.',
          isCorrect: true,
          feedback:
            'Correct. The one described fault is travelling — a spatial-structure error for a non-progressive dance.',
        },
        {
          id: 'b',
          label: 'A timing error — travelling that far means they rushed.',
          isCorrect: false,
          feedback:
            'The timing was correct slow-quick-quick; travel is structure, not timing.',
        },
        {
          id: 'c',
          label: 'A motion error — the sway must have failed.',
          isCorrect: false,
          feedback:
            'The sway was base-driven and correct; the fault is the travel.',
        },
        {
          id: 'd',
          label: 'A character error — circling looks unromantic.',
          isCorrect: false,
          feedback:
            'The character was romantic; the concrete fault is structural travel.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which described trait is the odd one out?' },
        { level: 2, title: 'Concept', content: 'A non-progressive dance travelling is a structure error.' },
        { level: 3, title: 'Specific clue', content: 'Everything else was correct; only the travel is wrong.' },
        { level: 4, title: 'Guided solution', content: 'Choose the spatial-structure error.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Error named' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Misnaming the defining fault would misdirect the couple’s coaching.',
        },
      ],
      helpLinks: [{ topicId: 'dance.nightclub', label: 'Judging the Nightclub' }],
      successFeedback: 'Continuous travel — the spatial-structure error, named cleanly.',
      failureFeedback: 'A non-progressive Nightclub circling the floor is a spatial-structure error.',
    },
  ],
  reflectionPrompt: 'When a description lists many correct traits and one fault, how do you avoid inventing extra faults?',
  rewards: [{ type: 'xp', amount: 5, label: 'Station 5 cleared' }],
};
