import { MissionDefinition } from '@academy/content-model';

/** Save Production 1 — "Incident Declared" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const prodMission001IncidentDeclared: MissionDefinition = {
  id: 'save-production-001-incident-declared',
  campaignId: 'save-production',
  title: 'Incident Declared',
  summary:
    'Alerts are firing and customers are complaining. Decide the first move of an incident.',
  difficulty: 'easy',
  learningObjectives: [
    'Recognise when to declare an incident',
    'Establish command before diving into fixes',
    'Prioritise restoring service over finding blame',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Checkout error rate just jumped to 30%, the on-call phone is ringing, and three engineers are already typing theories in the channel. This is the final exam of the platform: production is degraded. What is the correct first move?',
    },
  ],
  contextArtefacts: [
    {
      id: 'alert',
      type: 'dashboard',
      title: 'PagerDuty + channel',
      content:
        'ALERT: checkout_error_rate 30% (threshold 2%) for 4m\n#eng: "maybe the DB?" "did someone deploy?" "my guess is cache" (3 parallel theories, no owner)',
    },
  ],
  challenges: [
    {
      id: 'save-production-001-c1',
      type: 'multiple-choice',
      title: 'Declare and Take Command',
      difficulty: 'easy',
      tags: ['incident-response'],
      storyContext:
        'Three people guessing in parallel with no coordination is how incidents get longer, not shorter.',
      prompt: 'What is the right first move?',
      options: [
        {
          id: 'b',
          label:
            'Let each engineer chase their own theory in parallel — more people means a faster fix',
          isCorrect: false,
          feedback:
            'Uncoordinated parallel work causes conflicting changes and missed findings. Someone must coordinate; declare and assign a commander.',
        },
        {
          id: 'c',
          label:
            'First find who deployed last so you know who to hold responsible',
          isCorrect: false,
          feedback:
            'Hunting for blame in minute one wastes the most valuable time and discourages the honesty you need. Restore service first; the review comes later, blamelessly.',
        },
        {
          id: 'a',
          label:
            'Declare an incident, name an incident commander, and start a single coordinated channel focused on restoring service',
          isCorrect: true,
          feedback:
            'Declaring makes it official and gets a commander coordinating one line of investigation. Command first turns three parallel guesses into a focused response aimed at restoring service.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Before fixing, who is coordinating, and toward what goal?',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Declaring an incident and naming a commander establishes command: one coordinated effort aimed at restoring service. Blame is for the blameless review afterwards, not now.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Declare, assign a commander, coordinate — restore first.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Declare the incident and put one commander in charge.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Incident declared' }],
      consequences: [
        {
          type: 'severity',
          delta: 1,
          reason:
            'An uncoordinated response let three parallel guesses collide mid-incident.',
        },
      ],
      helpLinks: [
        {
          topicId: 'incident.rollback-vs-hotfix',
          label: 'Restoring service first',
        },
      ],
      successFeedback:
        'Incident declared, commander in place, one focused channel — the response is coordinated and aimed at recovery.',
      failureFeedback:
        'Restore-first needs coordination. Declare the incident and name a commander before chasing theories or blame.',
    },
  ],
  reflectionPrompt:
    'Why does naming one commander often make an incident shorter than throwing more engineers at it?',
  rewards: [{ type: 'xp', amount: 5, label: 'Command established' }],
};
