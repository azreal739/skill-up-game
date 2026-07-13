import { MissionDefinition } from '@academy/content-model';

/** Stage module mission 2 — timing: theatrical musicality and phrasing. */
export const judgeStage002Timing: MissionDefinition = {
  id: 'judge-stage-002-timing',
  campaignId: 'judge-stage',
  title: 'Musicality and Phrasing',
  summary:
    'Stage timing is theatrical musicality — hitting the number’s musical structure, phrasing and accents. Learn to judge whether a performer dances the music or just fills time.',
  difficulty: 'medium',
  learningObjectives: [
    'Judge musicality against the number’s structure',
    'Recognise phrasing that matches the music',
    'Fault movement that ignores the musical accents',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'A stage number is built on the music — its phrases, builds and accents. A performer should dance the structure, catching the big accents and shaping to the phrase, not just moving through the count.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jsg-002-c1',
      type: 'multiple-choice',
      title: 'Dancing the Music',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'stage', 'timing'],
      storyContext:
        'A performer moves continuously but ignores the number’s structure entirely — a big musical accent and a dramatic silence both pass with the same steady, unchanged movement.',
      prompt: 'How does the timing lens read this?',
      options: [
        {
          id: 'a',
          label: 'Full marks — moving continuously means they are always on time.',
          isCorrect: false,
          feedback:
            'Continuous movement is not musicality; dancing the number’s accents and phrasing is the timing lens, and it is ignored.',
        },
        {
          id: 'b',
          label: 'A timing fault — the performer ignores the number’s structure, letting big accents and silences pass with unchanged movement instead of catching them.',
          isCorrect: true,
          feedback:
            'Correct. Theatrical timing means dancing the music’s accents and phrasing; steady movement through them is a musicality fault.',
        },
        {
          id: 'c',
          label: 'A character issue — ignoring the music just looks a little detached.',
          isCorrect: false,
          feedback:
            'It reads detached, but the concrete problem is failing to dance the musical structure — a timing matter.',
        },
        {
          id: 'd',
          label: 'Better — staying even keeps the number from looking fussy.',
          isCorrect: false,
          feedback:
            'Evenness is not the criterion; catching the number’s accents and phrasing is exactly what the timing lens rewards.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the performer dancing the music, or through it?' },
        { level: 2, title: 'Concept', content: 'Stage timing is theatrical musicality and phrasing.' },
        { level: 3, title: 'Specific clue', content: 'Big accents and silences pass unmarked.' },
        { level: 4, title: 'Guided solution', content: 'Choose the timing fault for ignoring the structure.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Musicality judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding movement that ignores the music would drop the standard for theatrical musicality.',
        },
      ],
      helpLinks: [{ topicId: 'judging.timing', label: 'Timing and Time Signature' }],
      successFeedback: 'Accents and silences ignored — a musicality fault. Dance the number.',
      failureFeedback: 'Stage timing is theatrical musicality; letting big accents and silences pass with unchanged movement is a timing fault.',
    },
    {
      id: 'jsg-002-c2',
      type: 'multiple-choice',
      title: 'Shaping the Phrase',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'stage', 'timing'],
      storyContext:
        'A performer builds with the music — growing through a rising phrase, snapping onto the big accent, and holding into the silence that follows.',
      prompt: 'What does the timing lens reward here?',
      options: [
        {
          id: 'a',
          label: 'Nothing extra — building with the music is just being on time.',
          isCorrect: false,
          feedback:
            'Being on time is the floor; shaping to the phrase and catching the accents is the musicality the lens rewards.',
        },
        {
          id: 'b',
          label: 'A character point only — building just looks dramatic.',
          isCorrect: false,
          feedback:
            'It reads dramatic too, but shaping movement to the musical phrase is fundamentally the timing lens.',
        },
        {
          id: 'c',
          label: 'A signature figure — building with the music is a named move.',
          isCorrect: false,
          feedback:
            'Musical phrasing is a timing quality, not a named figure like a swing-out or a kick.',
        },
        {
          id: 'd',
          label: 'Theatrical musicality — growing through the phrase, snapping onto the accent and holding the silence is the timing lens at its best for Stage.',
          isCorrect: true,
          feedback:
            'Right. Shaping movement to the number’s structure — build, accent, silence — is top-tier Stage timing.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What is being matched — the steady count, or the music’s phrase?' },
        { level: 2, title: 'Concept', content: 'Musicality means shaping to the phrase and accents.' },
        { level: 3, title: 'Specific clue', content: 'Build, snap onto the accent, hold the silence.' },
        { level: 4, title: 'Guided solution', content: 'Choose theatrical musicality.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Phrasing credited' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Failing to credit strong musicality would tell a performer their best quality did not register.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.timing', label: 'Timing and Time Signature' },
        { topicId: 'dance.stage', label: 'Judging Stage and Era Styles' },
      ],
      successFeedback: 'Built the phrase, caught the accent, held the silence — Stage timing at its best.',
      failureFeedback: 'The timing lens rewards theatrical musicality: shaping movement to the number’s build, accent and silence.',
    },
  ],
  reflectionPrompt: 'How do you tell a performer dancing the music apart from one merely dancing on time?',
  rewards: [{ type: 'xp', amount: 5, label: 'Stage timing trained' }],
};
