import { MissionDefinition } from '@academy/content-model';

/** Core Fundamentals mission 6 — the Signature Figures lens. */
export const judgeCore006SignatureFigures: MissionDefinition = {
  id: 'judge-core-006-signature-figures',
  campaignId: 'judge-core-fundamentals',
  title: 'What Defines the Dance: The Signature Figures Lens',
  summary:
    'Each dance is identified by a vocabulary of defining figures. Learn to check that the dance on the floor is the dance being claimed.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise the signature figures that define a dance',
    'Judge whether the claimed dance’s figures are present',
    'Treat missing signature figures as a scorable fault',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'A West Coast Swing with no push or pass is not really a West Coast Swing. Signature figures are how you confirm a couple is dancing the dance they claim.',
    },
  ],
  contextArtefacts: [
    {
      id: 'figure-glossary',
      type: 'message',
      title: 'A few signatures',
      content:
        'Waltz: box, twinkle, fallaway. West Coast Swing: push, pass, whip. Samba: volta, whisk, botafogo.',
    },
  ],
  challenges: [
    {
      id: 'jc-006-c1',
      type: 'multiple-choice',
      title: 'A Swing With No Swing',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'signature-figures'],
      storyContext:
        'A couple enters a West Coast Swing heat and dances smoothly and on time — but never once performs a push, a pass or a whip.',
      prompt: 'How does the signature figures lens read this?',
      options: [
        {
          id: 'a',
          label: 'Fine — smooth, on-time dancing is enough to satisfy the dance.',
          isCorrect: false,
          feedback:
            'Smoothness and timing are other lenses. Without the defining figures, it is not recognisably West Coast Swing.',
        },
        {
          id: 'b',
          label: 'A signature-figures fault — the defining figures of West Coast Swing are absent.',
          isCorrect: true,
          feedback:
            'Correct. Push, pass and whip identify the dance; their absence is a real, scorable fault on this lens.',
        },
        {
          id: 'c',
          label: 'Perfect marks — leaving out figures shows restraint and control.',
          isCorrect: false,
          feedback:
            'Omitting the defining figures is not restraint; it removes what makes the dance the dance.',
        },
        {
          id: 'd',
          label: 'A character issue — it only affects how the dance feels.',
          isCorrect: false,
          feedback:
            'It may dull the feel, but the specific problem is missing signature figures — that is this lens, not character.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which figures define this dance, and were they there?' },
        { level: 2, title: 'Concept', content: 'Signature figures confirm the dance is the one being claimed.' },
        { level: 3, title: 'Specific clue', content: 'No push, pass or whip means no West Coast Swing vocabulary.' },
        { level: 4, title: 'Guided solution', content: 'Choose the signature-figures fault.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Missing figures caught' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Passing a dance with none of its signature figures would let any dance masquerade as any other.',
        },
      ],
      helpLinks: [{ topicId: 'judging.signature-figures', label: 'Signature Figures' }],
      successFeedback: 'No push, no pass, no whip — no West Coast Swing. The lens did its job.',
      failureFeedback: 'When the defining figures are absent, the signature-figures lens scores it down, however smooth it looked.',
    },
    {
      id: 'jc-006-c2',
      type: 'multiple-choice',
      title: 'Present but Mangled',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'signature-figures'],
      storyContext:
        'A Waltz couple does attempt a fallaway and a twinkle — but both are rushed, off-shape and barely recognisable.',
      prompt: 'How should the signature figures lens treat figures that are present but poorly executed?',
      options: [
        {
          id: 'a',
          label: 'Full credit — the figures were attempted, and attempting them is what the lens checks.',
          isCorrect: false,
          feedback:
            'Presence is necessary but not sufficient. The lens also judges whether the figures are correctly executed and recognisable.',
        },
        {
          id: 'b',
          label: 'No credit at all — a flawed figure counts exactly the same as a missing one.',
          isCorrect: false,
          feedback:
            'Too blunt. An attempted-but-flawed figure is not identical to a total absence; it scores between, not at zero.',
        },
        {
          id: 'c',
          label: 'Partial — the figures are present so the dance is identifiable, but poor execution lowers the score.',
          isCorrect: true,
          feedback:
            'Right. The lens rewards presence and correct execution: recognisable but mangled figures earn a reduced, not full, mark.',
        },
        {
          id: 'd',
          label: 'It moves to the motion lens — execution quality is really a motion question.',
          isCorrect: false,
          feedback:
            'Motion judges body action generally; whether the specific defining figures are done well is the signature-figures lens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does this lens judge only presence, or execution too?' },
        { level: 2, title: 'Concept', content: 'Signature figures are scored on presence AND correct execution.' },
        { level: 3, title: 'Specific clue', content: 'Recognisable but rushed and off-shape is somewhere between full and zero.' },
        { level: 4, title: 'Guided solution', content: 'Choose the partial-credit option.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Execution weighed' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Treating attempted figures as automatically full marks made the panel’s scoring inconsistent.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.signature-figures', label: 'Signature Figures' },
        { topicId: 'judging.process', label: 'The Judging Process' },
      ],
      successFeedback: 'Present but flawed lands between full and zero. Nuance, not a switch.',
      failureFeedback: 'This lens weighs both presence and execution — recognisable-but-mangled earns partial credit.',
    },
  ],
  reflectionPrompt: 'Where is the line between a figure that is "poorly executed" and one that is "not that figure at all"?',
  rewards: [{ type: 'xp', amount: 5, label: 'Signature figures lens trained' }],
};
