import { MissionDefinition } from '@academy/content-model';

/** Comparative Judging module mission 7 — bias and fairness. */
export const judgeComparative007BiasFairness: MissionDefinition = {
  id: 'judge-comparative-007-bias-fairness',
  campaignId: 'judge-comparative',
  title: 'Guarding Against Bias',
  summary:
    'The threats to a fair placement are flashiness, crowd reaction, reputation and personal taste. Learn to keep them from overriding the criteria.',
  difficulty: 'medium',
  learningObjectives: [
    'Name the common biases in comparative judging',
    'Keep flashiness and crowd reaction from overriding the lenses',
    'Judge reputation and newcomers on the same criteria',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'A placement is threatened by four things: flashiness, crowd noise, reputation and your own taste. None of them is a lens. Hold every couple to the criteria and let the evidence, not the halo, decide.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jcp-007-c1',
      type: 'multiple-choice',
      title: 'The Reputation Halo',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'comparative'],
      storyContext:
        'A famous, decorated couple dances a merely average round; an unknown couple dances a clearly stronger one on the criteria. A judge places the famous couple first "because of who they are".',
      prompt: 'How does the comparative framework read this?',
      options: [
        {
          id: 'a',
          label: 'Correct — reputation earns the benefit of the doubt in a close call.',
          isCorrect: false,
          feedback:
            'Reputation is not a lens; placing a merely-average round above a clearly stronger one because of fame is bias, not judging.',
        },
        {
          id: 'b',
          label: 'Correct — audiences expect famous couples to win.',
          isCorrect: false,
          feedback:
            'Audience expectation is not the criterion; the placement must follow the evidence on the lenses.',
        },
        {
          id: 'c',
          label: 'Fine, as long as the famous couple was not actually bad.',
          isCorrect: false,
          feedback:
            '"Not actually bad" is not the test; on the criteria the unknown couple danced clearly stronger and should place above.',
        },
        {
          id: 'd',
          label: 'A bias fault — reputation is not a lens, and on the criteria the unknown couple danced clearly stronger, so they should place above the famous one.',
          isCorrect: true,
          feedback:
            'Correct. The reputation halo must not override the evidence; the stronger round places first regardless of fame.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is reputation one of the six lenses?' },
        { level: 2, title: 'Concept', content: 'Judge each couple on the criteria, not their fame.' },
        { level: 3, title: 'Specific clue', content: 'The stronger round places first regardless of who danced it.' },
        { level: 4, title: 'Guided solution', content: 'Choose the bias fault; place the unknown couple above.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Halo resisted' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Letting reputation override the evidence would put an unfair, indefensible placement on the record.',
        },
      ],
      helpLinks: [{ topicId: 'judging.comparative', label: 'Comparative Judging and Placement' }],
      successFeedback: 'Evidence over reputation — the stronger round placed first.',
      failureFeedback: 'Reputation is not a lens; on the criteria the unknown couple danced clearly stronger and should place above the famous one.',
    },
    {
      id: 'jcp-007-c2',
      type: 'multiple-choice',
      title: 'Flash Versus Substance',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'comparative'],
      storyContext:
        'One couple is loud, flashy and works the crowd into a roar with big tricks but loose fundamentals; another is quietly excellent across every lens with no showboating. The room clearly wants the flashy couple.',
      prompt: 'How do you place them?',
      options: [
        {
          id: 'a',
          label: 'Place the flashy couple first — the crowd’s roar is the truest measure of a performance.',
          isCorrect: false,
          feedback:
            'Crowd reaction is not a lens; loose fundamentals under the flash must be judged, and quiet excellence across the lenses outplaces it.',
        },
        {
          id: 'b',
          label: 'Place the quietly excellent couple first — strength across every lens outweighs flash and crowd noise over loose fundamentals, and neither flashiness nor the room’s wishes are judging criteria.',
          isCorrect: true,
          feedback:
            'Correct. You credit the flashy couple’s real strengths but place on the lenses; quiet, complete excellence outplaces loud, loose work.',
        },
        {
          id: 'c',
          label: 'Split the difference and tie them to keep the room happy.',
          isCorrect: false,
          feedback:
            'Keeping the room happy is not the goal; on the criteria the couples are not level, so a tie would misrepresent the evidence.',
        },
        {
          id: 'd',
          label: 'Place the flashy couple first — big tricks always outweigh clean fundamentals.',
          isCorrect: false,
          feedback:
            'Big tricks do not automatically outweigh clean, complete work; you weigh the whole spread, and loose fundamentals cost the flashy couple.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the crowd’s roar one of the lenses?' },
        { level: 2, title: 'Concept', content: 'Judge on the criteria, not flash or crowd noise.' },
        { level: 3, title: 'Specific clue', content: 'Quiet, complete excellence outplaces loud, loose work.' },
        { level: 4, title: 'Guided solution', content: 'Choose placing the quietly excellent couple first.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Substance credited' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Placing by flash and crowd noise instead of the lenses would swing your marks away from a fair panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.comparative', label: 'Comparative Judging and Placement' },
        { topicId: 'judging.character', label: 'Character and Expression' },
      ],
      successFeedback: 'Substance over flash and noise — the complete round placed first.',
      failureFeedback: 'Neither flashiness nor the crowd is a lens; quiet excellence across every lens outplaces loud, loose work.',
    },
  ],
  reflectionPrompt: 'Which bias — flashiness, crowd, reputation or your own taste — do you think is hardest to guard against, and why?',
  rewards: [{ type: 'xp', amount: 5, label: 'Fairness trained' }],
};
