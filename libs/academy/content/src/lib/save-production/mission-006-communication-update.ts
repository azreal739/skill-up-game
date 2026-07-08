import { MissionDefinition } from '@academy/content-model';

/** Save Production 6 — "Communication Update" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const prodMission006CommunicationUpdate: MissionDefinition = {
  id: 'save-production-006-communication-update',
  campaignId: 'save-production',
  title: 'Communication Update',
  summary:
    'Support and leadership are asking for an update. Write one that helps, in user terms.',
  difficulty: 'medium',
  learningObjectives: [
    'Communicate impact in user terms, not internals',
    'Keep a steady update cadence during an incident',
    'Avoid leaking sensitive internals or premature blame',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Service is recovering, but the channel has gone quiet for 25 minutes and support is fielding angry tickets with no information. As commander, you owe stakeholders an update. Pick the one that actually helps.',
    },
  ],
  contextArtefacts: [
    {
      id: 'audience',
      type: 'message',
      title: 'Who is waiting',
      content:
        'Support: needs something to tell customers now.\nLeadership: needs impact + ETA, not stack traces.\nStatus page: public, so no internal hostnames, keys, or naming individuals.',
    },
  ],
  challenges: [
    {
      id: 'save-production-006-c1',
      type: 'multiple-choice',
      title: 'Write the Update',
      difficulty: 'medium',
      tags: ['incident-response'],
      storyContext:
        'A good update states impact in user terms, what you are doing, and when the next update lands.',
      prompt: 'Which update should you post?',
      options: [
        {
          id: 'b',
          label:
            '"TypeError in checkout-service v4.7 on host prod-ckt-3; rolled back pricing v2.3→v2.2; Dan’s deploy caused it." — full technical detail',
          isCorrect: false,
          feedback:
            'Too internal for a public/leadership audience, leaks hostnames and a version map, and names an individual — premature blame. Keep it user-focused and blameless.',
        },
        {
          id: 'a',
          label:
            '"Some customers experienced checkout failures starting ~14:02. We identified the cause, mitigated it, and checkout is recovering. Next update in 20 minutes." — impact, action, and a next-update time',
          isCorrect: true,
          feedback:
            'Clear impact in user terms, what you did, and a committed next-update time. It informs support and leadership without internals, and the cadence stops people filling the silence with worst cases.',
        },
        {
          id: 'c',
          label:
            'Post nothing until the incident is fully resolved, to avoid saying something you might correct later',
          isCorrect: false,
          feedback:
            'Silence during an incident is its own second incident — support and customers assume the worst. A steady cadence, even "no change yet", builds trust.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'Who is the audience, and what do they actually need to hear?',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Communicate impact in user terms, state what you are doing, and commit to a next-update time. Keep a steady cadence, avoid internal detail and premature blame.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Impact + action + next-update time, in user terms.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Post the user-facing update with a committed next-update time.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Stakeholders informed' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -10,
          reason: 'Silence left support and leadership assuming the worst.',
        },
      ],
      helpLinks: [
        { topicId: 'incident.communication', label: 'Incident communication' },
      ],
      successFeedback:
        'A clear, user-focused update with a next-update time — support can respond and leadership is informed.',
      failureFeedback:
        'Speak to the audience: impact, action, next-update time, in user terms — no internals, no blame, and never silence.',
    },
  ],
  reflectionPrompt:
    'Why is "no change yet, next update in 20 minutes" a better message than silence?',
  rewards: [{ type: 'xp', amount: 5, label: 'Communicated' }],
};
