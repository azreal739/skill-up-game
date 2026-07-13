import { MissionDefinition } from '@academy/content-model';

/** Samba module mission 3 — rhythm: the bouncy, syncopated feel. */
export const judgeSamba003Rhythm: MissionDefinition = {
  id: 'judge-samba-003-rhythm',
  campaignId: 'judge-samba',
  title: 'Bouncy and Syncopated',
  summary:
    'Samba rhythm rides its syncopation with a light, buoyant feel. Learn to hear whether the "a" is crisp and buoyant or blurred and heavy.',
  difficulty: 'medium',
  learningObjectives: [
    'Judge the crispness of the syncopated "a"',
    'Recognise a light, buoyant rhythmic feel',
    'Separate a crisp syncopation from a blurred one',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The Samba’s rhythm is light and buoyant, the "a" crisp and clear. Blur the "a" or land heavy and the syncopation muddies even if the tempo holds.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jsm-003-c1',
      type: 'multiple-choice',
      title: 'Crisp or Blurred',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'samba', 'rhythm'],
      storyContext:
        'A couple keeps the 1-a-2 tempo but blurs the quick "a" into a heavy, muddy smear, so the syncopation loses its crisp, buoyant edge.',
      prompt: 'How does the rhythm lens read this?',
      options: [
        {
          id: 'a',
          label: 'Full marks — landing on the tempo is all the rhythm lens checks.',
          isCorrect: false,
          feedback:
            'Arrival on the tempo is timing; the crisp, buoyant quality of the syncopation is a rhythm matter, and a blurred "a" has lost it.',
        },
        {
          id: 'b',
          label: 'A motion fault only — how the "a" sounds has nothing to do with rhythm.',
          isCorrect: false,
          feedback:
            'How the syncopation is articulated — crisp vs blurred — is exactly a rhythm quality.',
        },
        {
          id: 'c',
          label: 'Better — a smoother, blurred "a" is easier to dance.',
          isCorrect: false,
          feedback:
            'Ease is not the criterion; a blurred, heavy "a" has lost the Samba’s crisp, buoyant rhythm.',
        },
        {
          id: 'd',
          label: 'Marked down — a blurred, heavy "a" loses the crisp, buoyant syncopation that defines Samba rhythm, even though the tempo holds.',
          isCorrect: true,
          feedback:
            'Correct. Holding the tempo is timing; the crisp, buoyant syncopation is rhythm, and a blurred "a" scores down.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is holding the tempo the same as a crisp "a"?' },
        { level: 2, title: 'Concept', content: 'Rhythm judges the crispness of the syncopation.' },
        { level: 3, title: 'Specific clue', content: 'A blurred, heavy "a" is not crisp.' },
        { level: 4, title: 'Guided solution', content: 'Choose the rhythm mark-down for the blurred "a".' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Syncopation quality judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Accepting a blurred "a" would let the Samba’s crisp syncopation erode unremarked.',
        },
      ],
      helpLinks: [{ topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' }],
      successFeedback: 'On tempo, but blurred — a rhythm mark-down. The Samba’s "a" is crisp.',
      failureFeedback: 'The rhythm lens judges the crisp, buoyant syncopation; a blurred, heavy "a" scores down even on the tempo.',
    },
    {
      id: 'jsm-003-c2',
      type: 'multiple-choice',
      title: 'Light and Buoyant',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'samba', 'rhythm'],
      storyContext:
        'A couple keeps every "a" crisp and clear, staying light and buoyant through the syncopation even at a fast carnival tempo.',
      prompt: 'What does the rhythm lens reward here?',
      options: [
        {
          id: 'a',
          label: 'The crisp, light, buoyant syncopation that defines Samba rhythm, held clear even at a fast tempo.',
          isCorrect: true,
          feedback:
            'Right. A clear, buoyant "a" kept light under a fast tempo is Samba rhythm at its best.',
        },
        {
          id: 'b',
          label: 'Nothing extra — light footwork is just being on tempo.',
          isCorrect: false,
          feedback:
            'On tempo is timing. The crisp, buoyant syncopation at speed is the rhythm quality the lens rewards.',
        },
        {
          id: 'c',
          label: 'A signature figure — a crisp "a" is a named Samba figure.',
          isCorrect: false,
          feedback:
            'The syncopation is a rhythm quality, not a named figure like a botafogo or volta.',
        },
        {
          id: 'd',
          label: 'A character issue — buoyancy only affects the mood.',
          isCorrect: false,
          feedback:
            'It lifts the festive mood too, but a crisp, buoyant syncopation is fundamentally a rhythm quality.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What quality is being kept crisp at speed?' },
        { level: 2, title: 'Concept', content: 'A crisp, buoyant syncopation is the Samba’s rhythm.' },
        { level: 3, title: 'Specific clue', content: 'Clear "a", light and buoyant, even fast.' },
        { level: 4, title: 'Guided solution', content: 'Choose the crisp, light, buoyant syncopation.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Buoyant rhythm credited' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Failing to credit a crisp syncopation at speed would tell a strong couple their best quality did not register.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' },
        { topicId: 'dance.samba', label: 'Judging the Samba' },
      ],
      successFeedback: 'Crisp, light, buoyant at speed — Samba rhythm at its best.',
      failureFeedback: 'The lens rewards a crisp, light, buoyant syncopation, held clear even at a fast tempo.',
    },
  ],
  reflectionPrompt: 'How do you tell a crisp, buoyant syncopation apart from a blurred, heavy one at high tempo?',
  rewards: [{ type: 'xp', amount: 5, label: 'Samba rhythm trained' }],
};
