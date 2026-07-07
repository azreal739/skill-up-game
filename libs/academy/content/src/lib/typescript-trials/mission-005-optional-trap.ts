import { MissionDefinition } from '@academy/content-model';

/** TypeScript Trials 5 — "Optional Trap" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const ttMission005OptionalTrap: MissionDefinition = {
  id: 'typescript-trials-005-optional-trap',
  campaignId: 'typescript-trials',
  title: 'Optional Trap',
  summary: 'Optional fields are accessed as if they always exist. Defuse the traps.',
  difficulty: 'medium',
  learningObjectives: [
    'Handle optional values before use',
    'See how non-null assertions hide runtime crashes',
    'Model "maybe absent" data deliberately',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The profile page crashes for users who never set an address. The code assumes optional fields are always present. Review it and find the traps.',
    },
  ],
  contextArtefacts: [
    {
      id: 'profile-code',
      type: 'code',
      title: 'profile.component.ts',
      language: 'ts',
      content:
        "interface User {\n  name: string;\n  address?: { city: string };\n  lastLogin?: Date;\n}\n\ncity = this.user.address!.city;\nsince = this.user.lastLogin!.getFullYear();\ninitials = this.user.name[0].toUpperCase();",
    },
  ],
  challenges: [
    {
      id: 'typescript-trials-005-c1',
      type: 'code-review',
      title: 'Defuse the Traps',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext: 'Two lines assume optional data exists; one is actually safe.',
      prompt: 'Select every line that will crash when the optional data is missing.',
      findings: [
        {
          id: 'address',
          label: 'this.user.address!.city assumes an optional address exists',
          isCorrect: true,
          feedback:
            'address is optional; the ! asserts it away and throws for users with no address. Narrow with user.address?.city or an if-check.',
        },
        {
          id: 'lastlogin',
          label: 'this.user.lastLogin!.getFullYear() assumes an optional date exists',
          isCorrect: true,
          feedback:
            'lastLogin is optional too — first-time users have none, so this throws. Guard before calling getFullYear().',
        },
        {
          id: 'name-initial',
          label: 'this.user.name[0] could be undefined',
          isCorrect: false,
          feedback: 'name is a required non-optional string here; indexing a required string is safe in this model.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Find the fields declared with ? and see how they are accessed.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'The ! operator asserts a value is present, silencing strict null checks. On genuinely optional data it converts a compile warning into a runtime crash. Narrow instead (?. or if).',
        },
        { level: 3, title: 'Specific clue', content: 'Two optional fields (address, lastLogin) are accessed with !.' },
        { level: 4, title: 'Guided solution', content: 'Flag the address! and lastLogin! lines. name is required and safe.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Traps defused' }],
      consequences: [{ type: 'stability', delta: -10, reason: 'The profile page kept crashing for users with sparse data.' }],
      helpLinks: [
        { topicId: 'typescript.strict-null-checks', label: 'Strict null checks' },
        { topicId: 'typescript.narrowing', label: 'Narrowing' },
      ],
      successFeedback: 'Optional data is now handled deliberately — no more crashes on absent fields.',
      failureFeedback: 'Look for ! on fields declared optional with ?. The required name is the safe one.',
    },
  ],
  reflectionPrompt: 'Why does the ! operator so often turn a caught bug into an uncaught one?',
  rewards: [{ type: 'xp', amount: 5, label: 'Optionals handled' }],
};
