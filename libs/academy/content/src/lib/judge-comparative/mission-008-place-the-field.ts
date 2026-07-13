import { MissionDefinition } from '@academy/content-model';

/** Comparative Judging module mission 8 — place a full field and defend the order. */
export const judgeComparative008PlaceTheField: MissionDefinition = {
  id: 'judge-comparative-008-place-the-field',
  campaignId: 'judge-comparative',
  title: 'Placing a Full Field',
  summary:
    'Put it together: a field of three couples to place 1-2-3. Compare fairly, keep the order consistent, and defend it.',
  difficulty: 'hard',
  learningObjectives: [
    'Place a field of three on the criteria',
    'Keep the order consistent and bias-free',
    'Defend the full placement order',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Three couples, one card, 1-2-3. Walk the lenses for each, weigh the differences, keep the order consistent, and be ready to defend it end to end.',
    },
  ],
  contextArtefacts: [
    {
      id: 'field-card',
      type: 'message',
      title: 'The field',
      content:
        'Couple X: strong across every lens, complete and clean, no showboating. Couple Y: one spectacular trick and a loud crowd, but loose timing and thin figures for most of the routine. Couple Z: solid and clean but a clear notch below X on figures and motion, above Y on fundamentals.',
    },
  ],
  challenges: [
    {
      id: 'jcp-008-c1',
      type: 'multiple-choice',
      title: 'The 1-2-3',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'comparative'],
      storyContext:
        'Using the card: X is complete and clean; Z is solid but a notch below X and above Y on fundamentals; Y has one big trick amid loose timing and thin figures, with the crowd behind them.',
      prompt: 'What is the defensible 1-2-3, and on what basis?',
      options: [
        {
          id: 'a',
          label: 'Y, X, Z — the crowd’s favourite and the big trick take first.',
          isCorrect: false,
          feedback:
            'Crowd noise and one trick are not the criteria; Y’s loose timing and thin figures place it below the complete rounds.',
        },
        {
          id: 'b',
          label: 'X, Z, Y — X is complete and clean across every lens; Z is solid and clean but a notch below X; Y’s one trick does not outweigh its loose timing and thin figures, so it places last despite the crowd.',
          isCorrect: true,
          feedback:
            'Correct. Placed on the lenses: complete excellence first, solid-and-clean second, one-trick-and-loose last — consistent and bias-free.',
        },
        {
          id: 'c',
          label: 'X, Y, Z — Y’s trick and crowd edge it above the steady Z.',
          isCorrect: false,
          feedback:
            'Y’s loose timing and thin figures place it below the solid, clean Z; the single trick and crowd do not lift it over stronger fundamentals.',
        },
        {
          id: 'd',
          label: 'Z, X, Y — reward Z for being safe and consistent.',
          isCorrect: false,
          feedback:
            'Z is a clear notch below X on figures and motion; "safe" does not outplace complete excellence.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Place each on the lenses, not the crowd or one trick.' },
        { level: 2, title: 'Concept', content: 'Complete excellence, then solid-and-clean, then one-trick-and-loose.' },
        { level: 3, title: 'Specific clue', content: 'Y’s loose fundamentals place it last despite the roar.' },
        { level: 4, title: 'Guided solution', content: 'Choose X, Z, Y.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Field placed' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'A crowd-led or trick-led order would put your placements out of line with a fair panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.comparative', label: 'Comparative Judging and Placement' },
        { topicId: 'judging.process', label: 'The Judging Process' },
      ],
      successFeedback: 'X, Z, Y — placed on the lenses, consistent and bias-free.',
      failureFeedback: 'On the criteria it is X, Z, Y: complete excellence, then solid-and-clean, then one-trick-and-loose despite the crowd.',
    },
    {
      id: 'jcp-008-c2',
      type: 'contract-comparison',
      title: 'Defending the Card',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'comparative', 'process'],
      storyContext: 'Two write-ups of the X, Z, Y placement are offered. Sign the one you could defend to the couples.',
      prompt: 'Which defence of the card do you sign?',
      options: [
        {
          id: 'a',
          label:
            'Defence A: “X first — complete and clean across every lens. Z second — solid and clean, a notch below X on figures and motion. Y third — one strong trick, but loose timing and thin figures for most of the routine placed it below the more complete rounds.”',
          isCorrect: true,
          feedback:
            'Right. Every placement rests on a concrete, criteria-based reason, and the order is consistent — a card you can defend to all three couples.',
        },
        {
          id: 'b',
          label:
            'Defence B: “X first because they’re the safe choice, Y third because the crowd will understand, Z second by elimination.”',
          isCorrect: false,
          feedback:
            '"Safe choice", crowd management and "by elimination" are not criteria; the defence must name the concrete lens reasons.',
        },
        {
          id: 'c',
          label:
            'Defence C: “The order just felt right on the day; sometimes you know it when you see it.”',
          isCorrect: false,
          feedback:
            '"Felt right" is exactly what a defensible placement must replace with concrete, criteria-based reasons.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which defence names a concrete reason for every placement?' },
        { level: 2, title: 'Concept', content: 'A defensible card states the criteria reason for each position.' },
        { level: 3, title: 'Specific clue', content: 'Name the lenses for X, Z and Y in turn.' },
        { level: 4, title: 'Guided solution', content: 'Choose the defence that gives a lens reason for each.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Card defended' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'A "felt right" defence leaves all three couples unable to trust or learn from the result.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.comparative', label: 'Comparative Judging and Placement' },
        { topicId: 'judging.process', label: 'The Judging Process' },
      ],
      successFeedback: 'Every placement given a concrete reason — a card you can defend.',
      failureFeedback: 'The defensible defence gives a concrete, criteria-based reason for each position — not "safe choice" or "felt right".',
    },
  ],
  reflectionPrompt: 'Why does defending the whole order out loud expose weaknesses a silent card would hide?',
  rewards: [{ type: 'xp', amount: 5, label: 'Field placement trained' }],
};
