import { MissionDefinition } from '@academy/content-model';

/**
 * Dance Academy — Judge Path, Core Fundamentals mission 1.
 * Introduces the six lenses a UCWDC judge watches through.
 */
export const judgeCore001WhatJudgesWatch: MissionDefinition = {
  id: 'judge-core-001-what-judges-watch',
  campaignId: 'judge-core-fundamentals',
  title: 'What a Judge Actually Watches',
  summary:
    'Your first shift on the panel. Learn the six lenses every dance is scored through — before you score anything.',
  difficulty: 'intro',
  learningObjectives: [
    'Name the six judging lenses',
    'Separate scoring criteria from personal taste',
    'Understand that lenses are scored independently',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Welcome to the panel, apprentice. A judge does not score "good dancing" as one feeling — we watch through six specific lenses, every time.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Timing, rhythm, motion, character, signature figures, spatial structure. Learn to see each one on its own and your scores will hold up when a coach asks you why.',
    },
  ],
  contextArtefacts: [
    {
      id: 'the-six-lenses',
      type: 'message',
      title: 'The panel’s scoring lenses',
      content:
        'Timing · Rhythm · Motion · Character · Signature Figures · Spatial Structure — scored one at a time, not as a blur.',
    },
  ],
  challenges: [
    {
      id: 'jc-001-c1',
      type: 'multiple-choice',
      title: 'One Blur, or Six Lenses?',
      difficulty: 'intro',
      tags: ['dance', 'judging'],
      storyContext:
        'A new judge tells you they scored a couple "an 8 because they looked great out there." The Head Judge frowns.',
      prompt: 'Why is "they looked great" not yet a defensible judgement?',
      options: [
        {
          id: 'a',
          label: 'It is fine — overall impression is the only thing that matters in dance.',
          isCorrect: false,
          feedback:
            'Overall impression is where you start feeling, not where you finish judging — a coach will ask what, specifically, earned the 8.',
        },
        {
          id: 'b',
          label: 'Because the score is too high — new judges should score conservatively.',
          isCorrect: false,
          feedback:
            'The number is not the problem; the missing reasoning is. A defensible 8 names what produced it.',
        },
        {
          id: 'c',
          label:
            'It collapses six separate lenses into one feeling, so it cannot be explained or compared to another couple.',
          isCorrect: true,
          feedback:
            'Exactly. Timing, rhythm, motion, character, signature figures and spatial structure are scored separately so the result is explainable and comparable.',
        },
        {
          id: 'd',
          label: 'Because judges are never allowed to have a personal reaction to a performance.',
          isCorrect: false,
          feedback:
            'You will always react — the discipline is turning that reaction into specific, per-lens observations, not suppressing it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Think about what a coach will ask you after the round.' },
        {
          level: 2,
          title: 'Concept',
          content: 'A judgement has to be broken into the specific lenses so it can be explained and compared.',
        },
        { level: 3, title: 'Specific clue', content: 'There are six lenses; "looked great" names none of them.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose the answer about collapsing six separate lenses into one feeling.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Lenses named' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'An unexplained score left a coach unable to tell their couple what to work on.',
        },
      ],
      helpLinks: [{ topicId: 'judging.criteria', label: 'The Six Judging Lenses' }],
      successFeedback: 'You judged the reasoning, not just the number. That is the whole job.',
      failureFeedback:
        'A score you cannot break into specific lenses is a score you cannot defend — start from the six.',
    },
    {
      id: 'jc-001-c2',
      type: 'multiple-choice',
      title: 'Criteria vs Taste',
      difficulty: 'easy',
      tags: ['dance', 'judging'],
      storyContext:
        'Two couples finish. You privately dislike the flashy styling of couple A, but their timing, figures and floorcraft were cleaner than couple B’s.',
      prompt: 'What should drive the placement?',
      options: [
        {
          id: 'a',
          label:
            'The criteria — cleaner timing, figures and floorcraft place couple A above couple B, whatever your taste in styling.',
          isCorrect: true,
          feedback:
            'Right. Personal taste is noted and set aside; the six lenses decide the placement.',
        },
        {
          id: 'b',
          label: 'Your gut — if the styling put you off, that reaction is what the score is for.',
          isCorrect: false,
          feedback:
            'Your gut is an input, not the verdict. A judgement that swings on personal taste cannot be defended to a panel.',
        },
        {
          id: 'c',
          label: 'Place them equal to stay neutral, since you have mixed feelings.',
          isCorrect: false,
          feedback:
            'Ducking the call is not neutrality — the lenses showed a clear difference, so the placement should too.',
        },
        {
          id: 'd',
          label: 'Whichever couple the audience cheered louder for.',
          isCorrect: false,
          feedback:
            'Crowd volume is not a judging lens. You score what the couples did against the criteria, not the room.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Separate what you felt from what you observed.' },
        {
          level: 2,
          title: 'Concept',
          content: 'Taste is acknowledged and set aside; the six lenses decide.',
        },
        { level: 3, title: 'Specific clue', content: 'One couple was measurably cleaner on the actual criteria.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose the option that places on cleaner timing, figures and floorcraft.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Taste set aside' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Letting styling taste drive a placement set a habit that will skew every future round.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Taste noted, criteria applied. That is a placement you can stand behind.',
      failureFeedback: 'When a lens shows a clear difference, that is the call — not your styling preference.',
    },
  ],
  reflectionPrompt:
    'Which of the six lenses do you think you will find hardest to judge without letting personal taste creep in?',
  rewards: [{ type: 'xp', amount: 5, label: 'Panel briefing complete' }],
};
