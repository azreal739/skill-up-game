import { MissionDefinition } from '@academy/content-model';

/** Dance Academy — Judge Path, Final Certification Assessment mission 1. */
export const judgeFinal001Intro: MissionDefinition = {
  id: 'judge-final-001-intro',
  campaignId: 'judge-final-cert',
  title: 'The Certification Panel',
  summary:
    'The final assessment. Everything you have learned — every dance, every lens — in one sitting. This is what makes you an Apprentice Judge.',
  difficulty: 'hard',
  learningObjectives: [
    'Understand the certification format',
    'Commit to the criteria under pressure',
    'Approach a mixed assessment methodically',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'This is it: the certification. You will identify dances, judge across every lens, spot errors, mark score sheets and place couples. Pass this and you sit the panel for real.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Nothing new to learn today — everything you need, you already have. Name the dance, name the lens, answer from the criteria. Breathe.',
    },
  ],
  contextArtefacts: [
    {
      id: 'cert-format',
      type: 'message',
      title: 'Assessment format',
      content:
        'Stations: identify the dance · timing & rhythm · motion & character · figures & structure · spot the error · a mock score sheet · a comparative placement · and a final integrated judgement.',
    },
  ],
  challenges: [
    {
      id: 'jf-001-c1',
      type: 'multiple-choice',
      title: 'Under Pressure',
      difficulty: 'medium',
      tags: ['dance', 'judging'],
      storyContext:
        'Mid-assessment, a couple dances something that "feels off" but you cannot immediately say why.',
      prompt: 'What is the disciplined next step?',
      options: [
        {
          id: 'a',
          label: 'Score low and move on — a bad feeling is enough at this level.',
          isCorrect: false,
          feedback:
            'A feeling is a prompt, not a verdict. The certification wants reasons, not hunches.',
        },
        {
          id: 'b',
          label: 'Walk the six lenses in turn until the "off" feeling resolves into a specific, nameable fault.',
          isCorrect: true,
          feedback:
            'Correct. Turning an instinct into a specific per-lens fault is exactly the discipline being certified.',
        },
        {
          id: 'c',
          label: 'Ignore the feeling — if you cannot name it instantly, it is not real.',
          isCorrect: false,
          feedback:
            'Instincts often flag real faults; the skill is to investigate them through the lenses, not dismiss them.',
        },
        {
          id: 'd',
          label: 'Ask the couple what they think went wrong.',
          isCorrect: false,
          feedback:
            'A judge resolves it themselves, through the criteria — not by asking the dancers.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'How do you turn a feeling into a defensible fault?' },
        { level: 2, title: 'Concept', content: 'Walk the lenses to locate the specific problem.' },
        { level: 3, title: 'Specific clue', content: 'Instinct is a prompt to investigate, not a verdict.' },
        { level: 4, title: 'Guided solution', content: 'Choose walking the six lenses in turn.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Method held' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Scoring on a hunch under pressure is exactly the habit certification is meant to remove.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Instinct into evidence — walk the lenses. That is the certified method.',
      failureFeedback: 'Turn the "off" feeling into a specific fault by walking the six lenses, not by guessing.',
    },
    {
      id: 'jf-001-c2',
      type: 'multiple-choice',
      title: 'What Certification Means',
      difficulty: 'medium',
      tags: ['dance', 'judging'],
      storyContext: 'A fellow candidate says certification just means "knowing which couple is best".',
      prompt: 'What does Level 1 certification actually test?',
      options: [
        {
          id: 'a',
          label: 'A good eye for the single best dancer in any room.',
          isCorrect: false,
          feedback:
            'Picking a favourite is not judging. Certification tests structured, criteria-based assessment.',
        },
        {
          id: 'b',
          label: 'Memorising every figure name across every dance.',
          isCorrect: false,
          feedback:
            'Recall matters, but certification tests applying the lenses, not just naming figures.',
        },
        {
          id: 'c',
          label: 'Dancing each style well enough to demonstrate it.',
          isCorrect: false,
          feedback:
            'Judging is not dancing; the certification tests assessment, not performance.',
        },
        {
          id: 'd',
          label: 'The ability to judge every dance through the six lenses and defend each decision on the criteria.',
          isCorrect: true,
          feedback:
            'Correct. Certification is about structured, defensible judgement across every dance and lens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is judging about a favourite, or a method?' },
        { level: 2, title: 'Concept', content: 'Certification tests structured, defensible judgement.' },
        { level: 3, title: 'Specific clue', content: 'Every dance, every lens, every decision defended.' },
        { level: 4, title: 'Guided solution', content: 'Choose the six-lens, defensible-decision answer.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Purpose understood' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Treating judging as picking a favourite undermines trust in the whole panel.',
        },
      ],
      helpLinks: [{ topicId: 'judging.criteria', label: 'The Six Judging Lenses' }],
      successFeedback: 'Structured, defensible judgement across every dance. That is what you are here to prove.',
      failureFeedback: 'Certification tests judging every dance through the six lenses and defending each decision on the criteria.',
    },
  ],
  reflectionPrompt: 'Going into the assessment, which lens do you most trust yourself on, and which will you watch hardest?',
  rewards: [{ type: 'xp', amount: 5, label: 'Certification begun' }],
};
