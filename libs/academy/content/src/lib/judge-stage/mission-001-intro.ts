import { MissionDefinition } from '@academy/content-model';

/** Dance Academy — Judge Path, Stage module mission 1. */
export const judgeStage001Intro: MissionDefinition = {
  id: 'judge-stage-001-intro',
  campaignId: 'judge-stage',
  title: 'Stage and Era Styles at a Glance',
  summary:
    'A family of era and theatrical styles, from Charleston to Broadway. Learn how the six lenses apply to a stage number — era authenticity, technical vocabulary and theatrical performance.',
  difficulty: 'medium',
  learningObjectives: [
    'Understand Stage as era and theatrical styles judged as a number',
    'Map the six lenses onto a stage performance',
    'Anchor on the principle of authenticity to the era/genre',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Stage covers era and theatrical styles — Charleston, Lindy, Disco, Bollywood, Broadway, and the jazz/ballet/modern base. You judge the number across the same six lenses.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'The through-line is authenticity to the era. Watch the technical vocabulary — jumps, turns, kicks — and whether the styling is true to the period being danced.',
    },
  ],
  contextArtefacts: [
    {
      id: 'stage-signature',
      type: 'message',
      title: 'Stage at a glance',
      content:
        'Family: Charleston, Lindy, Disco, Bollywood, Broadway, jazz/ballet/modern/contemporary. Judged as a number. Timing = theatrical musicality. Rhythm = the era’s feel. Motion = jumps, turns, kicks + era body line. Character = theatrical projection + era authenticity. Figures = each era’s vocabulary. Space = stagecraft. Principle: authenticity to the era/genre.',
    },
  ],
  challenges: [
    {
      id: 'jsg-001-c1',
      type: 'multiple-choice',
      title: 'What Are You Judging?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'stage'],
      storyContext:
        'A judge asks how to score a theatrical stage number that mixes jazz technique with a specific period style, rather than a social partner dance.',
      prompt: 'How do the six lenses apply to a Stage number?',
      options: [
        {
          id: 'a',
          label: 'They do not — theatrical numbers are judged only on how impressive the tricks look.',
          isCorrect: false,
          feedback:
            'Impressiveness is not the framework; a stage number is judged across the same six lenses as every other dance.',
        },
        {
          id: 'b',
          label: 'Only character matters — a stage number is pure performance.',
          isCorrect: false,
          feedback:
            'Performance matters, but so do timing, rhythm, the technical motion of jumps/turns/kicks, figures and stagecraft.',
        },
        {
          id: 'c',
          label: 'The same six lenses apply — timing (theatrical musicality), rhythm (the era’s feel), motion (jumps, turns, kicks and body line), character (projection and era authenticity), signature figures (the era’s vocabulary) and spatial structure (stagecraft).',
          isCorrect: true,
          feedback:
            'Correct. A stage number is judged across the same six lenses, read on the performance.',
        },
        {
          id: 'd',
          label: 'Only technical tricks count — jumps, turns and kicks, nothing else.',
          isCorrect: false,
          feedback:
            'Technical vocabulary is one lens; timing, rhythm, character and stagecraft are judged too.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Do the six lenses apply to a theatrical number?' },
        { level: 2, title: 'Concept', content: 'The same six lenses map onto a stage performance.' },
        { level: 3, title: 'Specific clue', content: 'Timing, rhythm, motion, character, figures, space — all apply.' },
        { level: 4, title: 'Guided solution', content: 'Choose that the same six lenses apply.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Framework mapped' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Judging a stage number on spectacle alone would abandon the defensible six-lens framework.',
        },
      ],
      helpLinks: [{ topicId: 'dance.stage', label: 'Judging Stage and Era Styles' }],
      successFeedback: 'Six lenses, one number. That is how you judge Stage.',
      failureFeedback: 'The same six lenses apply to a Stage number — timing, rhythm, motion, character, figures and stagecraft.',
    },
    {
      id: 'jsg-001-c2',
      type: 'multiple-choice',
      title: 'The Through-Line',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'stage', 'character'],
      storyContext:
        'A number billed as a 1920s Charleston is danced with flat, grounded modern contemporary lines — technically clean, but with none of the era’s bounce, swivels or period styling.',
      prompt: 'What overarching Stage principle does this violate?',
      options: [
        {
          id: 'a',
          label: 'Authenticity to the era/genre — a Charleston must carry its 1920s styling, and clean modern contemporary lines are not true to that era.',
          isCorrect: true,
          feedback:
            'Correct. However clean, contemporary lines on a billed Charleston are an era-authenticity failure — the core Stage principle.',
        },
        {
          id: 'b',
          label: 'None — clean technique is always full marks whatever the era.',
          isCorrect: false,
          feedback:
            'Clean technique is not the whole picture; Stage demands authenticity to the era, and the styling is wrong here.',
        },
        {
          id: 'c',
          label: 'Only that the tricks were not difficult enough.',
          isCorrect: false,
          feedback:
            'Difficulty is not the issue; the issue is that the styling is not true to the billed era.',
        },
        {
          id: 'd',
          label: 'That the performer used too much stage.',
          isCorrect: false,
          feedback:
            'Stage use is a separate lens; the violated principle here is authenticity to the era.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the styling true to the era being danced?' },
        { level: 2, title: 'Concept', content: 'Stage demands authenticity to the era/genre.' },
        { level: 3, title: 'Specific clue', content: 'Contemporary lines on a Charleston are the wrong era.' },
        { level: 4, title: 'Guided solution', content: 'Choose "Authenticity to the era/genre".' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Principle anchored' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Ignoring era authenticity would reward wrong-period performances and misalign you from the panel.',
        },
      ],
      helpLinks: [{ topicId: 'dance.stage', label: 'Judging Stage and Era Styles' }],
      successFeedback: 'Clean, but wrong era — an authenticity failure. The principle holds.',
      failureFeedback: 'Stage demands authenticity to the era; clean modern contemporary lines on a billed Charleston are not true to that period.',
    },
  ],
  reflectionPrompt: 'How will judging a theatrical era number differ most from judging a social partner dance?',
  rewards: [{ type: 'xp', amount: 5, label: 'Stage module opened' }],
};
