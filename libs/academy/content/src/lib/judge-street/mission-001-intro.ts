import { MissionDefinition } from '@academy/content-model';

/** Dance Academy — Judge Path, Street module mission 1. */
export const judgeStreet001Intro: MissionDefinition = {
  id: 'judge-street-001-intro',
  campaignId: 'judge-street',
  title: 'Street Styles at a Glance',
  summary:
    'A family of solo urban styles, not one dance. Learn how the six lenses apply to a soloist — musicality, isolation, and style-appropriate performance — so you can judge Street.',
  difficulty: 'medium',
  learningObjectives: [
    'Understand Street as a family of solo styles judged as one performer',
    'Map the six lenses onto a soloist rather than a couple',
    'Anchor on the principle of styling appropriate to the song',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Street is not one dance — it is a family: popping, locking, waacking, voguing, dancehall and more, danced solo. You judge one performer across the same six lenses.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'The through-line is styling appropriate to the song. Watch the musicality, the isolation and control, and whether the style fits the music.',
    },
  ],
  contextArtefacts: [
    {
      id: 'street-signature',
      type: 'message',
      title: 'Street at a glance',
      content:
        'Family: popping, locking, waacking, voguing, illusions, commercial, dancehall. Judged solo. Timing = hitting the music. Rhythm = groove/pocket. Motion = upper vs lower core, isolation, control. Character = style-appropriate attitude. Figures = each style’s vocabulary + foot positions (1st, 2nd, 4th). Space = solo use of levels and facings. Principle: styling appropriate to the song.',
    },
  ],
  challenges: [
    {
      id: 'jst-001-c1',
      type: 'multiple-choice',
      title: 'What Are You Judging?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'street'],
      storyContext:
        'A new judge, used to partner dances, asks how to judge a solo Street performer with no lead-follow to assess.',
      prompt: 'How do the six lenses apply to Street?',
      options: [
        {
          id: 'a',
          label: 'They do not — without a couple, the six lenses cannot be used.',
          isCorrect: false,
          feedback:
            'The six lenses still apply; they are just read on one performer — timing, rhythm, motion, character, figures and use of space.',
        },
        {
          id: 'b',
          label: 'The same six lenses apply to the soloist — timing (hitting the music), rhythm (groove), motion (isolation and control), character (style-appropriate attitude), signature figures (the style’s vocabulary) and spatial structure (solo use of space).',
          isCorrect: true,
          feedback:
            'Correct. Street is judged solo, but the same six lenses map cleanly onto one performer.',
        },
        {
          id: 'c',
          label: 'Only two lenses apply — timing and character — because the rest need a partner.',
          isCorrect: false,
          feedback:
            'All six apply: motion, figures and spatial structure are as central to a soloist as timing and character.',
        },
        {
          id: 'd',
          label: 'You judge only how athletic the tricks are, ignoring the lenses.',
          isCorrect: false,
          feedback:
            'Athleticism is not the framework; Street is judged across the same six lenses as every other dance.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Do the six lenses need a couple, or can they read one performer?' },
        { level: 2, title: 'Concept', content: 'The same six lenses map onto a soloist.' },
        { level: 3, title: 'Specific clue', content: 'Timing, rhythm, motion, character, figures, space — all apply.' },
        { level: 4, title: 'Guided solution', content: 'Choose that the same six lenses apply to the soloist.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Framework mapped' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Abandoning the six lenses for Street would leave you judging on gut feel with no defensible framework.',
        },
      ],
      helpLinks: [{ topicId: 'dance.street', label: 'Judging Street Styles' }],
      successFeedback: 'Six lenses, one performer. That is how you judge Street.',
      failureFeedback: 'The same six lenses apply to a Street soloist — timing, rhythm, motion, character, figures and use of space.',
    },
    {
      id: 'jst-001-c2',
      type: 'multiple-choice',
      title: 'The Through-Line',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'street', 'character'],
      storyContext:
        'A performer executes flawless popping technique — but does it over a slow, lyrical ballad that has none of popping’s sharp, funky drive.',
      prompt: 'What overarching Street principle does this violate?',
      options: [
        {
          id: 'a',
          label: 'None — clean technique is always full marks whatever the music.',
          isCorrect: false,
          feedback:
            'Clean technique is not the whole picture; Street demands styling appropriate to the song, and the style does not fit here.',
        },
        {
          id: 'b',
          label: 'Only that the tricks were not hard enough.',
          isCorrect: false,
          feedback:
            'Difficulty is not the issue; the issue is that the style does not match the music.',
        },
        {
          id: 'c',
          label: 'That the performer used too much space.',
          isCorrect: false,
          feedback:
            'Space use is a separate lens; the violated principle here is styling appropriate to the song.',
        },
        {
          id: 'd',
          label: 'Styling appropriate to the song — Street must match the style to the music, and sharp funky popping over a soft lyrical ballad is the wrong styling for that song.',
          isCorrect: true,
          feedback:
            'Correct. However clean the popping, choosing it for a lyrical ballad is a styling-to-song mismatch — the core Street principle.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does the style suit the song being played?' },
        { level: 2, title: 'Concept', content: 'Street demands styling appropriate to the song.' },
        { level: 3, title: 'Specific clue', content: 'Sharp popping over a soft ballad is a mismatch.' },
        { level: 4, title: 'Guided solution', content: 'Choose "Styling appropriate to the song".' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Principle anchored' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Ignoring style-to-song fit would reward mismatched performances and misalign you from the panel.',
        },
      ],
      helpLinks: [{ topicId: 'dance.street', label: 'Judging Street Styles' }],
      successFeedback: 'Clean, but wrong for the song — a styling mismatch. The principle holds.',
      failureFeedback: 'Street demands styling appropriate to the song; sharp popping over a soft lyrical ballad is the wrong styling for that music.',
    },
  ],
  reflectionPrompt: 'How will judging a Street soloist differ most from judging a partner dance?',
  rewards: [{ type: 'xp', amount: 5, label: 'Street module opened' }],
};
