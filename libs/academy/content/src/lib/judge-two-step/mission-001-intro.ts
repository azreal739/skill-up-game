import { MissionDefinition } from '@academy/content-model';

/** Dance Academy — Judge Path, Two Step module mission 1. */
export const judgeTwoStep001Intro: MissionDefinition = {
  id: 'judge-two-step-001-intro',
  campaignId: 'judge-two-step',
  title: 'The Two Step at a Glance',
  summary:
    'Smooth, cool and driving down the line of dance. Learn the Two Step’s signature — quick-quick-slow-slow, a level gliding drive, progressive travel — so you know it on sight.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise the Two Step from its QQSS timing and smooth glide',
    'Contrast its no-bounce drive with the East Coast Swing',
    'Connect each trait to the lens that scores it',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'The Two Step is the smooth traveller of the country floor: quick-quick-slow-slow, a level gliding drive with no bounce, and cool, effortless character down the line of dance.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Watch the glide and the travel. If it slides smoothly down the line on a quick-quick-slow-slow with no up/down pulse, you are looking at a Two Step.',
    },
  ],
  contextArtefacts: [
    {
      id: 'two-step-signature',
      type: 'message',
      title: 'Two Step signature',
      content:
        'Time: 4/4, quick-quick-slow-slow (QQSS), no triples. Motion: smooth, level gliding drive, long reaching steps, no bounce. Character: cool, smooth, easy, effortless. Figures: promenades, underarm turns, sweethearts, wraps, travelling turns. Space: strongly progressive down the line of dance.',
    },
  ],
  challenges: [
    {
      id: 'jts-001-c1',
      type: 'multiple-choice',
      title: 'Name That Dance',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'two-step'],
      storyContext:
        'A couple slides smoothly and coolly down the line of dance on a quick-quick-slow-slow, level through the body with no bounce, covering ground with an easy, effortless drive.',
      prompt: 'Which dance is this, and which trait gives it away?',
      options: [
        {
          id: 'a',
          label: 'East Coast Swing — any smooth country dance is a swing.',
          isCorrect: false,
          feedback:
            'The East Coast Swing is circular, bouncy and non-progressive; this glides smoothly down the line with no bounce — a Two Step.',
        },
        {
          id: 'b',
          label: 'Triple Two — any travelling country dance is a Triple Two.',
          isCorrect: false,
          feedback:
            'The Triple Two is slow-slow-triple-triple; this has no triples — quick-quick-slow-slow with a smooth glide is a Two Step.',
        },
        {
          id: 'c',
          label: 'Two Step — the quick-quick-slow-slow, smooth level glide and progressive drive down the line are the signature.',
          isCorrect: true,
          feedback:
            'Correct. A QQSS with a level, no-bounce glide travelling the line of dance identifies the Two Step.',
        },
        {
          id: 'd',
          label: 'Waltz — anything travelling the line of dance is a Waltz.',
          isCorrect: false,
          feedback:
            'The Waltz is 3/4 with rise and fall; the Two Step is 4/4, quick-quick-slow-slow, and glides flat and level.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Watch the glide and the count.' },
        { level: 2, title: 'Concept', content: 'QQSS plus a smooth, no-bounce travelling drive identifies this dance.' },
        { level: 3, title: 'Specific clue', content: 'Level and gliding down the line of dance, no triples, no bounce.' },
        { level: 4, title: 'Guided solution', content: 'Choose Two Step.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Two Step recognised' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Misidentifying the dance would apply the wrong criteria across every lens.',
        },
      ],
      helpLinks: [{ topicId: 'dance.two-step', label: 'Judging the Two Step' }],
      successFeedback: 'QQSS, smooth glide, progressive drive — Two Step, confirmed.',
      failureFeedback: 'A quick-quick-slow-slow with a level, no-bounce glide down the line of dance is a Two Step.',
    },
    {
      id: 'jts-001-c2',
      type: 'multiple-choice',
      title: 'How Does It Use the Floor?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'two-step', 'spatial-structure'],
      storyContext:
        'A new judge, fresh from the East Coast Swing module, expects the Two Step to work a circular spot without travelling.',
      prompt: 'Is that the right spatial expectation?',
      options: [
        {
          id: 'a',
          label: 'Yes — country dances all hold a spot.',
          isCorrect: false,
          feedback:
            'Not the Two Step. Unlike the circular swing, it is strongly progressive — it travels down the line of dance.',
        },
        {
          id: 'b',
          label: 'No — the Two Step is strongly progressive; it travels counter-clockwise down the line of dance, unlike the circular, non-progressive East Coast Swing.',
          isCorrect: true,
          feedback:
            'Correct. A couple holding a spot would be under-travelling for a Two Step, which should drive down the line.',
        },
        {
          id: 'c',
          label: 'Yes — smooth dances never cover ground.',
          isCorrect: false,
          feedback:
            'Smoothness and travel go together here; the Two Step glides smoothly AND progresses down the line.',
        },
        {
          id: 'd',
          label: 'No — the Two Step travels, but clockwise against the line of dance.',
          isCorrect: false,
          feedback:
            'It travels counter-clockwise along the line of dance, with the flow — not against it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does a Two Step hold a spot, or travel a line?' },
        { level: 2, title: 'Concept', content: 'The Two Step is strongly progressive.' },
        { level: 3, title: 'Specific clue', content: 'It travels down the line of dance, unlike the circular swing.' },
        { level: 4, title: 'Guided solution', content: 'Choose "No — strongly progressive down the line."' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Structure expectation set' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Expecting a Two Step to hold a spot would skew the panel’s structure marks.',
        },
      ],
      helpLinks: [{ topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' }],
      successFeedback: 'Strongly progressive — the Two Step travels the line, it does not hold a spot.',
      failureFeedback: 'The Two Step is strongly progressive; it travels down the line of dance, unlike the circular East Coast Swing.',
    },
  ],
  reflectionPrompt: 'What is the biggest difference in how you will watch a Two Step versus an East Coast Swing?',
  rewards: [{ type: 'xp', amount: 5, label: 'Two Step module opened' }],
};
