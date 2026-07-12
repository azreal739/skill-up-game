import { MissionDefinition } from '@academy/content-model';

/** Dance Academy — Judge Path, East Coast Swing module mission 1. */
export const judgeEcs001Intro: MissionDefinition = {
  id: 'judge-ecs-001-intro',
  campaignId: 'judge-east-coast-swing',
  title: 'The East Coast Swing at a Glance',
  summary:
    'Lively, bouncy and swinging around a spot. Learn the East Coast Swing’s signature — triples and rock steps, a springy bounce, circular non-progressive travel — so you know it on sight.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise the East Coast Swing from its triples, rock step and bounce',
    'Contrast its circular, non-progressive floor with a travelling dance',
    'Connect each trait to the lens that scores it',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'East Coast Swing is the most openly joyful of the swing family: triple-step, triple-step, rock-step, a lively down-up bounce, and a circular spot the couple works around together.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Watch the bounce and the rock step. If it springs, swings and rotates around a shared centre rather than travelling down a line, you are looking at an East Coast Swing.',
    },
  ],
  contextArtefacts: [
    {
      id: 'ecs-signature',
      type: 'message',
      title: 'East Coast Swing signature',
      content:
        'Time: 4/4, triple-step triple-step rock-step (1&2 3&4 5-6), single- and double-time variants. Motion: lively down-up bounce from knees/ankles, hip swing on the triples. Character: lively, energetic, playful, fun. Figures: passes, underarm rotations, Lindy-derived patterns. Space: circular, non-progressive.',
    },
  ],
  challenges: [
    {
      id: 'jec-001-c1',
      type: 'multiple-choice',
      title: 'Name That Dance',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'east-coast-swing'],
      storyContext:
        'A couple dances a lively, bouncy number, springing through triple steps that resolve into a rock step, rotating and swapping places around one shared central point.',
      prompt: 'Which dance is this, and which trait gives it away?',
      options: [
        {
          id: 'a',
          label: 'Waltz — any swinging body action means Waltz.',
          isCorrect: false,
          feedback:
            'The Waltz is 3/4, smooth with rise and fall, and travels the line of dance; this bounces, triples and rotates on a spot — an East Coast Swing.',
        },
        {
          id: 'b',
          label: 'East Coast Swing — the springy triples, the rock step and the circular rotation around a spot are the signature.',
          isCorrect: true,
          feedback:
            'Correct. Triple-triple-rock with a lively bounce, worked around a shared centre, identifies the East Coast Swing.',
        },
        {
          id: 'c',
          label: 'Polka — any bouncy, energetic dance is a Polka.',
          isCorrect: false,
          feedback:
            'The Polka lilts on a 1&2 and drives aggressively down the floor; this swings and rotates on a spot instead of travelling.',
        },
        {
          id: 'd',
          label: 'Cha Cha — any triple step means Cha Cha.',
          isCorrect: false,
          feedback:
            'The Cha Cha’s triple is the 4&5 chasse with Cuban motion; the East Coast Swing bounces through triples into a rock step and swings around a spot.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Watch the bounce and how the couple use the floor.' },
        { level: 2, title: 'Concept', content: 'Triples plus a rock step, rotating on a spot, identify this dance.' },
        { level: 3, title: 'Specific clue', content: 'A springy triple-triple-rock worked around a shared centre.' },
        { level: 4, title: 'Guided solution', content: 'Choose East Coast Swing.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Swing recognised' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Misidentifying the dance would apply the wrong criteria across every lens.',
        },
      ],
      helpLinks: [{ topicId: 'dance.east-coast-swing', label: 'Judging the East Coast Swing' }],
      successFeedback: 'Triples, rock step, circular bounce — East Coast Swing, confirmed.',
      failureFeedback: 'A springy triple-triple-rock worked around a shared spot is an East Coast Swing.',
    },
    {
      id: 'jec-001-c2',
      type: 'multiple-choice',
      title: 'How Does It Use the Floor?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'east-coast-swing', 'spatial-structure'],
      storyContext:
        'A new judge expects the East Coast Swing to travel down the line of dance like a progressive dance.',
      prompt: 'Is that the right spatial expectation?',
      options: [
        {
          id: 'a',
          label: 'Yes — every swing dance travels down the floor.',
          isCorrect: false,
          feedback:
            'Not the East Coast Swing. It is circular and non-progressive — it works around a shared central point, not down a line.',
        },
        {
          id: 'b',
          label: 'Yes — bouncy dances always cover ground.',
          isCorrect: false,
          feedback:
            'Energy is not travel. The East Coast Swing spends its energy rotating and swapping places on a spot, not progressing.',
        },
        {
          id: 'c',
          label: 'No — the East Coast Swing is circular and non-progressive; the couple rotates and exchanges places around a shared centre rather than travelling the line of dance.',
          isCorrect: true,
          feedback:
            'Correct. A couple driving down the line of dance would be misreading the East Coast Swing’s circular structure.',
        },
        {
          id: 'd',
          label: 'No — the East Coast Swing travels, but only backwards.',
          isCorrect: false,
          feedback:
            'It does not travel down a line at all; it circulates around a central point.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does an East Coast Swing go somewhere, or work a spot?' },
        { level: 2, title: 'Concept', content: 'The East Coast Swing is circular and non-progressive.' },
        { level: 3, title: 'Specific clue', content: 'Rotating and swapping places around a shared centre, not travelling a line.' },
        { level: 4, title: 'Guided solution', content: 'Choose "No — circular and non-progressive."' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Structure expectation set' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Expecting a swing to progress down the line would skew the panel’s structure marks.',
        },
      ],
      helpLinks: [{ topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' }],
      successFeedback: 'Circular and non-progressive — the swing works a spot, it does not travel a line.',
      failureFeedback: 'The East Coast Swing is circular and non-progressive; it rotates around a shared centre, it does not travel the line of dance.',
    },
  ],
  reflectionPrompt: 'What is the biggest difference in how you will watch an East Coast Swing versus a travelling dance like the Polka?',
  rewards: [{ type: 'xp', amount: 5, label: 'East Coast Swing module opened' }],
};
