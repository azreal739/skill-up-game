import { MissionDefinition } from '@academy/content-model';

/** East Coast Swing module mission 5 — character: lively, energetic, playful, fun. */
export const judgeEcs005Character: MissionDefinition = {
  id: 'judge-ecs-005-character',
  campaignId: 'judge-east-coast-swing',
  title: 'Lively and Playful',
  summary:
    'The East Coast Swing’s character is lively, energetic, playful and fun. Learn to judge that joy apart from technique — and to spot when it is missing.',
  difficulty: 'medium',
  learningObjectives: [
    'Describe the swing’s intended character',
    'Judge playfulness apart from technique',
    'Spot a swing danced with the wrong mood',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The East Coast Swing is the most openly joyful dance on the floor — lively, playful, fun. A technically clean but cold, serious swing has lost its character.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jec-005-c1',
      type: 'multiple-choice',
      title: 'Too Serious',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'east-coast-swing', 'character'],
      storyContext:
        'A couple dances the swing figures accurately but with cold, serious, buttoned-up energy — no playfulness, no joy, no fun.',
      prompt: 'How does the character lens read this?',
      options: [
        {
          id: 'a',
          label: 'Higher — a serious, controlled swing reads as sophisticated.',
          isCorrect: false,
          feedback:
            'Cold seriousness is the wrong mood for a swing; its character is lively, playful and fun.',
        },
        {
          id: 'b',
          label: 'Lower — the East Coast Swing’s character is lively, playful and fun, and cold, serious energy is the wrong mood.',
          isCorrect: true,
          feedback:
            'Correct. Accurate figures with the wrong energy is a character fault: this reads as buttoned-up, not a swing.',
        },
        {
          id: 'c',
          label: 'Unchanged — correct figures fix the character score.',
          isCorrect: false,
          feedback:
            'Character is its own lens; correct figures do not supply the lively, playful joy the swing needs.',
        },
        {
          id: 'd',
          label: 'Higher on motion — seriousness shows control.',
          isCorrect: false,
          feedback:
            'Energy and mood are the character lens, and cold seriousness is the wrong mood, not a motion credit.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the energy the energy a swing calls for?' },
        { level: 2, title: 'Concept', content: 'Character rewards the RIGHT mood — here, lively and playful.' },
        { level: 3, title: 'Specific clue', content: 'Cold seriousness is the opposite of playful fun.' },
        { level: 4, title: 'Guided solution', content: 'Choose the lower character score for the wrong mood.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Mood judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding cold seriousness would blur the swing’s lively, playful identity.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Right figures, wrong mood — a character fault. The swing is lively and playful.',
      failureFeedback: 'The swing’s character is lively, playful and fun; cold, serious energy is the wrong mood.',
    },
    {
      id: 'jec-005-c2',
      type: 'multiple-choice',
      title: 'Playful, Not Sloppy',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'east-coast-swing', 'character'],
      storyContext:
        'A couple brings huge, playful energy — mugging and clowning — but so loosely that their triples get sloppy and their connection breaks on the turns.',
      prompt: 'How should you weigh playfulness that has tipped into sloppiness?',
      options: [
        {
          id: 'a',
          label: 'Full character marks — the more playful, the better, whatever else happens.',
          isCorrect: false,
          feedback:
            'Playfulness is welcome, but the sloppy triples and broken connection still score down on their own lenses.',
        },
        {
          id: 'b',
          label: 'Zero everywhere — clowning ruins the whole performance.',
          isCorrect: false,
          feedback:
            'Too blunt; the playful energy has value. Credit it on character while marking the technical lapses.',
        },
        {
          id: 'c',
          label: 'Reserve the top character marks for playfulness that stays connected and clean — and let sloppy triples (rhythm) and broken connection (figures/lead-follow) score down on their own lenses.',
          isCorrect: true,
          feedback:
            'Right. Character can be strong while rhythm and figures are marked; the lenses stay independent.',
        },
        {
          id: 'd',
          label: 'Ignore the sloppiness — the crowd loved the clowning.',
          isCorrect: false,
          feedback:
            'Crowd reaction is not the criterion; sloppy triples and broken connection are real faults on their lenses.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does big playful energy excuse sloppy triples?' },
        { level: 2, title: 'Concept', content: 'Character and technique are independent lenses.' },
        { level: 3, title: 'Specific clue', content: 'Credit connected playfulness; mark the sloppy triples and lost connection.' },
        { level: 4, title: 'Guided solution', content: 'Choose crediting clean playfulness while faulting the lapses.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Energy weighed' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Letting playfulness excuse sloppiness would make your marks swing away from the panel.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Playfulness credited, sloppy triples and lost connection still marked. Lenses independent.',
      failureFeedback: 'Reward playfulness that stays connected and clean, but sloppy triples and broken connection score down on their own lenses.',
    },
  ],
  reflectionPrompt: 'How would you coach a couple to be "playful but not sloppy" in an East Coast Swing?',
  rewards: [{ type: 'xp', amount: 5, label: 'Swing character trained' }],
};
