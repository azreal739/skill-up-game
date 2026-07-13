import { MissionDefinition } from '@academy/content-model';

/** Dance Academy — Judge Path, Samba module mission 1. */
export const judgeSamba001Intro: MissionDefinition = {
  id: 'judge-samba-001-intro',
  campaignId: 'judge-samba',
  title: 'The Samba at a Glance',
  summary:
    'Festive, bouncing and travelling with carnival energy. Learn the Samba’s signature — the syncopated 1-a-2, the knee-driven bounce, progressive travel — so you know it on sight.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise the Samba from its 1-a-2 syncopation and bounce action',
    'Contrast its knee-driven bounce with the Cha Cha’s Cuban motion',
    'Connect each trait to the lens that scores it',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'The Samba is the carnival of the Latin floor: a syncopated 1-a-2, a subtle knee-driven bounce action, and festive, joyful character travelling around the room.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Watch the bounce and the "a". If it pulses gently from the knees on a 1-a-2 and travels with party energy, you are looking at a Samba.',
    },
  ],
  contextArtefacts: [
    {
      id: 'samba-signature',
      type: 'message',
      title: 'Samba signature',
      content:
        'Time: 2/4, syncopated "1 a 2". Motion: the Samba bounce — a controlled knee-driven down-up pulse. Character: festive, joyful, carnival. Figures: whisks, samba walks, botafogos, voltas. Space: progressive around the line of dance.',
    },
  ],
  challenges: [
    {
      id: 'jsm-001-c1',
      type: 'multiple-choice',
      title: 'Name That Dance',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'samba'],
      storyContext:
        'A couple dances a festive, up-tempo Latin number with a subtle down-up bounce pulsing from the knees on a syncopated 1-a-2, travelling around the floor with carnival energy.',
      prompt: 'Which dance is this, and which trait gives it away?',
      options: [
        {
          id: 'a',
          label: 'Cha Cha — any Latin dance with a triple feel is a Cha Cha.',
          isCorrect: false,
          feedback:
            'The Cha Cha has a 4&5 chasse and Cuban motion with no bounce; a knee-driven bounce on a 1-a-2 is a Samba.',
        },
        {
          id: 'b',
          label: 'East Coast Swing — any bouncy dance is a swing.',
          isCorrect: false,
          feedback:
            'The East Coast Swing is a circular triple-triple-rock; the Samba bounces on a 1-a-2 and travels around the floor.',
        },
        {
          id: 'c',
          label: 'Two Step — any travelling dance with a pulse is a Two Step.',
          isCorrect: false,
          feedback:
            'The Two Step glides smoothly with NO bounce; a deliberate knee-driven bounce on a 1-a-2 is a Samba.',
        },
        {
          id: 'd',
          label: 'Samba — the syncopated 1-a-2, the knee-driven bounce action and festive travelling character are the signature.',
          isCorrect: true,
          feedback:
            'Correct. A controlled knee bounce on a 1-a-2 with carnival energy identifies the Samba.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Watch the bounce and the "a" in the count.' },
        { level: 2, title: 'Concept', content: 'A knee-driven bounce on a 1-a-2 identifies this dance.' },
        { level: 3, title: 'Specific clue', content: 'Festive travel with a subtle down-up knee pulse.' },
        { level: 4, title: 'Guided solution', content: 'Choose Samba.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Samba recognised' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Misidentifying the dance would apply the wrong criteria across every lens.',
        },
      ],
      helpLinks: [{ topicId: 'dance.samba', label: 'Judging the Samba' }],
      successFeedback: '1-a-2, knee bounce, carnival travel — Samba, confirmed.',
      failureFeedback: 'A knee-driven bounce on a syncopated 1-a-2 with festive travel is a Samba.',
    },
    {
      id: 'jsm-001-c2',
      type: 'multiple-choice',
      title: 'Bounce, But Which Bounce?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'samba', 'motion'],
      storyContext:
        'A new judge, fresh from the East Coast Swing module, assumes the Samba bounce is the same big down-up swing bounce.',
      prompt: 'Is that the right expectation for the Samba bounce?',
      options: [
        {
          id: 'a',
          label: 'No — the Samba bounce is a subtle, controlled knee-and-ankle pulse tied to the 1-a-2, not the larger swinging bounce of the East Coast Swing.',
          isCorrect: true,
          feedback:
            'Correct. The Samba bounce is a fine, knee-driven action linked to the syncopation — distinct from a big swing bounce.',
        },
        {
          id: 'b',
          label: 'Yes — a bounce is a bounce; both dances do the same thing.',
          isCorrect: false,
          feedback:
            'They differ: the swing bounce is a larger springing action; the Samba bounce is a subtle knee-driven pulse on the "a".',
        },
        {
          id: 'c',
          label: 'Yes — both bounces come from bobbing the upper body.',
          isCorrect: false,
          feedback:
            'Neither comes from the upper body; and the Samba bounce specifically is a controlled knee-and-ankle action.',
        },
        {
          id: 'd',
          label: 'No — the Samba has no bounce at all, like the Two Step.',
          isCorrect: false,
          feedback:
            'The Samba does have a bounce — the knee-driven bounce action; it is the Two Step that forbids one.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the Samba bounce big and swinging, or subtle and knee-driven?' },
        { level: 2, title: 'Concept', content: 'The Samba bounce is a fine knee-and-ankle pulse tied to the 1-a-2.' },
        { level: 3, title: 'Specific clue', content: 'It is not the larger East Coast Swing bounce.' },
        { level: 4, title: 'Guided solution', content: 'Choose "No — a subtle, controlled knee-driven pulse."' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Bounce expectation set' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Expecting a big swing bounce of a Samba would skew the panel’s motion marks.',
        },
      ],
      helpLinks: [{ topicId: 'judging.motion', label: 'Motion and Body Action' }],
      successFeedback: 'Subtle, knee-driven, tied to the "a" — the Samba bounce, understood.',
      failureFeedback: 'The Samba bounce is a subtle, controlled knee-and-ankle pulse on the 1-a-2, not the larger swinging bounce.',
    },
  ],
  reflectionPrompt: 'What is the biggest difference in how you will watch a Samba versus an East Coast Swing?',
  rewards: [{ type: 'xp', amount: 5, label: 'Samba module opened' }],
};
