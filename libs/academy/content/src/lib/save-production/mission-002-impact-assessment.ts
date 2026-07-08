import { MissionDefinition } from '@academy/content-model';

/** Save Production 2 — "Impact Assessment" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const prodMission002ImpactAssessment: MissionDefinition = {
  id: 'save-production-002-impact-assessment',
  campaignId: 'save-production',
  title: 'Impact Assessment',
  summary:
    'Before fixing, size the blast radius: who, how badly, and how widely.',
  difficulty: 'easy',
  learningObjectives: [
    'Assess impact before choosing a response',
    'Set severity from real blast radius, not vibes',
    'Let severity drive the response',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'You are the commander. The channel wants to start fixing immediately, but you do not yet know how bad this is. A right-sized severity decides who gets paged and how aggressively you respond. Assess the impact first.',
    },
  ],
  contextArtefacts: [
    {
      id: 'metrics',
      type: 'dashboard',
      title: 'Impact signals',
      content:
        'Feature: checkout (revenue-critical)\nError rate: 30% of checkout attempts failing\nUsers: all regions, ~12k active sessions\nData: no corruption detected, failures are on submit',
    },
  ],
  challenges: [
    {
      id: 'save-production-002-c1',
      type: 'multiple-choice',
      title: 'Size the Blast Radius',
      difficulty: 'easy',
      tags: ['incident-response'],
      storyContext:
        'Severity is a function of who is affected, how badly, and how widely — not how loud the channel is.',
      prompt: 'How should you assess and classify this incident?',
      options: [
        {
          id: 'a',
          label:
            'High severity: a revenue-critical feature is failing for ~30% of all users across all regions; page the right responders and respond aggressively — but note no data corruption, so recovery can focus on availability',
          isCorrect: true,
          feedback:
            'You sized it on real signals — critical feature, large fraction, all regions, no data loss — and let that set severity and response. That assessment directs the next decisions.',
        },
        {
          id: 'b',
          label:
            'Low severity: 70% of checkouts still succeed, so most users are fine',
          isCorrect: false,
          feedback:
            'A 30% failure rate on revenue-critical checkout across all regions is not low. Framing it by the success rate understates a serious, widespread impact.',
        },
        {
          id: 'c',
          label:
            'Skip assessment — severity is a guess anyway; just start trying fixes',
          isCorrect: false,
          feedback:
            'Without impact assessment you cannot right-size the response or communicate it. Guessing severity wrong in either direction wastes the first minutes.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'What determines severity — the loudest voice, or who/how-badly/how-widely?',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Impact assessment sizes the blast radius: which users, which feature, what fraction, and whether data is at risk. That sets severity, which drives paging, cadence and how aggressive the fix should be.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'Revenue-critical + 30% + all regions + no data loss = high severity, availability focus.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Classify High and note no data corruption so recovery targets availability.',
        },
      ],
      rewards: [{ type: 'xp', amount: 15, label: 'Impact sized' }],
      consequences: [
        {
          type: 'severity',
          delta: 1,
          reason: 'Misjudging the blast radius under-resourced the response.',
        },
      ],
      helpLinks: [
        {
          topicId: 'incident.impact-assessment',
          label: 'Impact assessment and severity',
        },
      ],
      successFeedback:
        'Blast radius sized correctly — high severity, availability-focused. The response is now proportional.',
      failureFeedback:
        'Size it on who/how-badly/how-widely: critical feature, 30%, all regions = high. Assess before you act.',
    },
  ],
  reflectionPrompt:
    'How does an honest impact assessment change who you wake up and how you communicate?',
  rewards: [{ type: 'xp', amount: 5, label: 'Severity set' }],
};
