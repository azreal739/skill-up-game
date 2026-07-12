import { MissionDefinition } from '@academy/content-model';

/** WCS module mission 2 — timing: six/eight-count patterns, back-beat. */
export const judgeWcs002Timing: MissionDefinition = {
  id: 'judge-wcs-002-timing',
  campaignId: 'judge-wcs',
  title: 'Six, Eight, and the Back-Beat',
  summary:
    'West Coast Swing rides 4/4 in six- and eight-count patterns with a back-beat feel. Learn to confirm the count and hear the emphasis.',
  difficulty: 'medium',
  learningObjectives: [
    'Confirm 4/4 six- and eight-count patterns',
    'Recognise back-beat emphasis',
    'Accept both six- and eight-count patterns as correct',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Patterns come in six and eight counts, and both are correct. The feel sits on the back-beat, not the downbeat — that laid-back emphasis is part of the timing.',
    },
  ],
  contextArtefacts: [
    {
      id: 'wcs-count',
      type: 'message',
      title: 'Count sheet',
      content: '4/4. A six-count pattern (1 2 3&4 5&6) or an eight-count pattern; emphasis leans on the back-beats (2, 4).',
    },
  ],
  challenges: [
    {
      id: 'jws-002-c1',
      type: 'multiple-choice',
      title: 'Six or Wrong?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'west-coast-swing', 'timing'],
      storyContext:
        'A couple dances a clean six-count pattern, then a clean eight-count pattern, mixing the two through the routine.',
      prompt: 'Is mixing six- and eight-count patterns a timing fault?',
      options: [
        {
          id: 'a',
          label: 'Yes — a couple must pick one count length and keep it all routine.',
          isCorrect: false,
          feedback:
            'Not so. West Coast Swing is built on both six- and eight-count patterns; using both is correct, not a fault.',
        },
        {
          id: 'b',
          label: 'Yes — only six-count patterns are true West Coast Swing.',
          isCorrect: false,
          feedback:
            'Eight-count patterns (like the whip) are core WCS too. Restricting to six would exclude signature figures.',
        },
        {
          id: 'c',
          label: 'Only if the music is slow — fast songs must be six-count.',
          isCorrect: false,
          feedback:
            'Tempo does not forbid eight-count patterns; both count lengths are valid across tempos.',
        },
        {
          id: 'd',
          label: 'No — both six- and eight-count patterns are correct West Coast Swing, and mixing them is normal.',
          isCorrect: true,
          feedback:
            'Correct. The dance uses both; a couple moving between them cleanly is dancing WCS as intended.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does WCS allow more than one pattern length?' },
        { level: 2, title: 'Concept', content: 'Both six- and eight-count patterns are core WCS.' },
        { level: 3, title: 'Specific clue', content: 'The whip is an eight-count figure — so eight counts are valid.' },
        { level: 4, title: 'Guided solution', content: 'Choose "No — both are correct."' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Counts accepted' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Faulting valid eight-count patterns would penalise correct WCS across the whole panel.',
        },
      ],
      helpLinks: [{ topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' }],
      successFeedback: 'Six and eight, both correct. You did not invent a rule the dance does not have.',
      failureFeedback: 'West Coast Swing uses both six- and eight-count patterns; mixing them cleanly is correct.',
    },
    {
      id: 'jws-002-c2',
      type: 'multiple-choice',
      title: 'Where the Emphasis Sits',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'west-coast-swing', 'timing'],
      storyContext:
        'A couple dances every count precisely but drives all the emphasis onto the downbeats (1 and 3), giving the dance a stiff, marchy front-beat feel.',
      prompt: 'How does the timing/feel of this read against West Coast Swing?',
      options: [
        {
          id: 'a',
          label: 'Perfect — hitting the downbeats hard is the strongest possible timing.',
          isCorrect: false,
          feedback:
            'WCS leans on the back-beat. A hard front-beat emphasis fights the laid-back feel the dance is built on.',
        },
        {
          id: 'b',
          label: 'It reads against the style — WCS emphasis sits on the back-beat, so a hard front-beat feel is off-character for the timing.',
          isCorrect: true,
          feedback:
            'Correct. Being on the counts is not enough; the back-beat emphasis is part of dancing WCS in time and feel.',
        },
        {
          id: 'c',
          label: 'Irrelevant — where the emphasis sits is purely a character choice, never timing.',
          isCorrect: false,
          feedback:
            'Back-beat emphasis is woven into WCS timing and rhythm; it is more than a free character choice.',
        },
        {
          id: 'd',
          label: 'Better — front-beat emphasis makes the dance easier to follow.',
          isCorrect: false,
          feedback:
            'Ease of following is not the criterion, and the front-beat stiffness is the opposite of the WCS feel.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Where does WCS want the emphasis — front-beat or back-beat?' },
        { level: 2, title: 'Concept', content: 'Back-beat emphasis is part of the WCS feel.' },
        { level: 3, title: 'Specific clue', content: 'A hard downbeat march is off-character for the laid-back style.' },
        { level: 4, title: 'Guided solution', content: 'Choose that it reads against the style (back-beat expected).' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Back-beat heard' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Rewarding a stiff front-beat feel would put your WCS marks out of line with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.timing', label: 'Timing and Time Signature' },
        { topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' },
      ],
      successFeedback: 'On the counts, wrong emphasis — the back-beat is part of the WCS feel.',
      failureFeedback: 'WCS leans on the back-beat; a hard front-beat march reads against the style even when on the counts.',
    },
  ],
  reflectionPrompt: 'How would you describe the difference between a front-beat and back-beat feel to a new judge?',
  rewards: [{ type: 'xp', amount: 5, label: 'WCS timing trained' }],
};
