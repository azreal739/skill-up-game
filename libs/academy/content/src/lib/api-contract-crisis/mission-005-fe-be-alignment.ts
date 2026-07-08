import { MissionDefinition } from '@academy/content-model';

/** API Contract Crisis 5 — "FE/BE Alignment" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const apiMission005Alignment: MissionDefinition = {
  id: 'api-contract-crisis-005-fe-be-alignment',
  campaignId: 'api-contract-crisis',
  title: 'FE/BE Alignment',
  summary:
    'The drift is understood. Decide where the fix belongs and how the two teams agree on it.',
  difficulty: 'medium',
  learningObjectives: [
    'Decide whether to fix drift client-side or renegotiate the contract',
    'Adapt at the boundary rather than leaking payload quirks inward',
    'Turn a shared contract into something both teams own',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'You know the Java DTO sends amount as a string and createdAt as epoch millis. The Payments team says the DTO is frozen for other consumers. So the alignment is: they publish the contract as-is, and you adapt it cleanly at your boundary. The question is how.',
    },
  ],
  contextArtefacts: [
    {
      id: 'options',
      type: 'message',
      title: 'Team thread',
      content:
        'Payments: "The DTO is public — we can’t change amount to a number without breaking three other consumers."\nYou: "Understood. We’ll adapt at our edge. Let’s pin the shape so neither side drifts silently again."',
    },
  ],
  challenges: [
    {
      id: 'api-contract-crisis-005-c1',
      type: 'multiple-choice',
      title: 'Where Does the Fix Belong?',
      difficulty: 'medium',
      tags: ['api'],
      storyContext:
        'The back-end contract is fixed for good reasons. The front end must present clean data to its components regardless.',
      prompt: 'What is the right way to align, given the DTO cannot change?',
      options: [
        {
          id: 'a',
          label:
            'Add one boundary layer that validates and transforms the DTO (coerce amount to number, millis to Date, default nullable fields) so the rest of the app only sees a clean model',
          isCorrect: true,
          feedback:
            'A single adapter at the edge validates and normalises the payload once. Components never see the quirks, and the transform is the documented, tested seam between the two contracts.',
        },
        {
          id: 'b',
          label:
            'Sprinkle Number(amount) and new Date(+createdAt) at every call site that uses the data',
          isCorrect: false,
          feedback:
            'Scattering coercions everywhere means every new consumer re-learns the quirks and one will forget. Normalise once at the boundary.',
        },
        {
          id: 'c',
          label:
            'Insist the Payments team add a second endpoint that returns the shape you want',
          isCorrect: false,
          feedback:
            'A bespoke endpoint per consumer multiplies back-end surface area. Adapting at your own boundary is cheaper and within your control.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'Where can you fix the shape exactly once, so nothing downstream repeats it?',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Validate-and-transform at the boundary: one adapter turns the wire DTO into a clean internal model. The app depends on your model; the adapter absorbs the drift.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'One place, not every call site, and not a new back-end endpoint.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'A single boundary adapter that validates and normalises the DTO.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Boundary aligned' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -10,
          reason:
            'Scattered fixes and cross-team blame eroded trust on both sides.',
        },
      ],
      helpLinks: [
        { topicId: 'api.contract-drift', label: 'API contract drift' },
        { topicId: 'zod.transform', label: 'Transforming with Zod' },
      ],
      successFeedback:
        'One boundary adapter absorbs the drift; the app sees a clean model and the two teams share a documented seam.',
      failureFeedback:
        'Adapt once at the boundary — not at every call site, and not by demanding a new endpoint per consumer.',
    },
  ],
  reflectionPrompt:
    'When two teams share a contract neither will change, whose job is it to absorb the mismatch?',
  rewards: [{ type: 'xp', amount: 5, label: 'Alignment reached' }],
};
