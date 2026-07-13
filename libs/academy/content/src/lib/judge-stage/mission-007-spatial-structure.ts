import { MissionDefinition } from '@academy/content-model';

/** Stage module mission 7 — spatial structure: stagecraft. */
export const judgeStage007SpatialStructure: MissionDefinition = {
  id: 'judge-stage-007-spatial-structure',
  campaignId: 'judge-stage',
  title: 'Use the Stage',
  summary:
    'Stage spatial structure is stagecraft — using the whole stage, facings, levels and projecting to the house. Learn to judge how a number owns the performance space.',
  difficulty: 'medium',
  learningObjectives: [
    'Judge use of the whole stage and its levels',
    'Recognise strong facings and staging',
    'Fault a number crammed into one corner or facing away',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'A number should command the stage — using its depth and width, varying levels and facings, and staging key moments toward the house. Crammed into one corner facing one way is a stagecraft shortfall.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jsg-007-c1',
      type: 'multiple-choice',
      title: 'Command the Space',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'stage', 'spatial-structure'],
      storyContext:
        'A performer keeps the entire number crammed into one downstage corner, using none of the stage’s depth or width and never varying level or facing.',
      prompt: 'How does the spatial structure lens read this?',
      options: [
        {
          id: 'a',
          label: 'A spatial-structure shortfall — a number should command the whole stage with depth, width, levels and facings, and staying crammed in one corner is a failure of stagecraft.',
          isCorrect: true,
          feedback:
            'Correct. Failing to use the stage’s depth, width and levels is a real stagecraft shortfall.',
        },
        {
          id: 'b',
          label: 'Good — staying in one spot keeps the number tight and focused.',
          isCorrect: false,
          feedback:
            'Commanding the stage is part of the score; cramming into one corner is a shortfall, not focus.',
        },
        {
          id: 'c',
          label: 'Fine — a stage number has no spatial lens to judge.',
          isCorrect: false,
          feedback:
            'A stage number very much has a spatial lens: stagecraft — use of the space, levels and facings.',
        },
        {
          id: 'd',
          label: 'A character issue — staying in a corner just looks a bit timid.',
          isCorrect: false,
          feedback:
            'It reads timid, but the concrete shortfall is spatial: no use of the stage’s depth, width or levels.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the performer using the whole stage, or one corner?' },
        { level: 2, title: 'Concept', content: 'Stagecraft is commanding the whole space.' },
        { level: 3, title: 'Specific clue', content: 'One corner, one level, one facing is a shortfall.' },
        { level: 4, title: 'Guided solution', content: 'Choose the spatial-structure shortfall.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Stagecraft judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding a number crammed in one corner would drop the standard for stagecraft.',
        },
      ],
      helpLinks: [{ topicId: 'dance.stage', label: 'Judging Stage and Era Styles' }],
      successFeedback: 'One corner, no stagecraft — a spatial shortfall, and you caught it.',
      failureFeedback: 'A number should command the whole stage with depth, width, levels and facings; staying crammed in one corner is a stagecraft shortfall.',
    },
    {
      id: 'jsg-007-c2',
      type: 'multiple-choice',
      title: 'Staging the Big Moment',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'stage', 'spatial-structure'],
      storyContext:
        'A performer uses the stage richly, but stages the number’s climactic trick far upstage in a back corner, facing away, where the house can barely see it.',
      prompt: 'How does the spatial structure lens weigh rich stage use that buries the climax?',
      options: [
        {
          id: 'a',
          label: 'Top marks — rich use of the stage is all the spatial lens checks.',
          isCorrect: false,
          feedback:
            'Coverage is a credit, but staging the climax where the house cannot see it is a real staging fault.',
        },
        {
          id: 'b',
          label: 'Zero — burying the climax ruins the whole number.',
          isCorrect: false,
          feedback:
            'Too blunt; the rich stage use has value. Credit it and mark the staging of the climax.',
        },
        {
          id: 'c',
          label: 'Credit the rich use of the stage, but mark down the staging — a number’s climax should be staged where the house can see it, and burying it upstage facing away undercuts the moment.',
          isCorrect: true,
          feedback:
            'Correct. The coverage is a credit; burying the climax is a separate staging deduction on the same lens.',
        },
        {
          id: 'd',
          label: 'No issue — where the climax is staged is entirely the performer’s choice.',
          isCorrect: false,
          feedback:
            'Staging key moments to the house is judged; hiding the climax upstage facing away is a real staging fault.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does rich stage use excuse burying the climax?' },
        { level: 2, title: 'Concept', content: 'Staging key moments to the house is part of the spatial lens.' },
        { level: 3, title: 'Specific clue', content: 'Credit the coverage, mark the hidden climax.' },
        { level: 4, title: 'Guided solution', content: 'Choose crediting the coverage while marking the staging.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Staging judged' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Ignoring a buried climax would misalign your marks from a panel that watches staging.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' },
        { topicId: 'dance.stage', label: 'Judging Stage and Era Styles' },
      ],
      successFeedback: 'Coverage credited, staging marked. Both live on the spatial-structure lens.',
      failureFeedback: 'Credit the rich stage use, but burying the climax upstage facing away is a staging deduction too.',
    },
  ],
  reflectionPrompt: 'How do you balance rewarding rich stage coverage against a performer who stages key moments out of the audience’s sight?',
  rewards: [{ type: 'xp', amount: 5, label: 'Stage structure trained' }],
};
