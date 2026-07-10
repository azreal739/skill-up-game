import { MissionDefinition } from '@academy/content-model';

/** Field Notes — interfaces vs type aliases (knowledge pack 02/03). */
export const fnTs005InterfacesAliases: MissionDefinition = {
  id: 'ts-fund-005-interfaces-aliases',
  campaignId: 'ts-fundamentals',
  title: 'Interfaces & Type Aliases',
  summary:
    'Know which declaration to reach for: interfaces for object contracts, aliases for unions and compositions.',
  difficulty: 'medium',
  learningObjectives: [
    'Choose between interface and type alias deliberately',
    'Extend an object contract without repeating it',
    'Name a union once and reuse it everywhere',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: 'The session question that would not die: interface or type? The honest answer — for a plain object contract either works, so we optimise for the things only one of them can do.',
    },
    {
      speaker: 'Team Lead',
      text: 'Our convention from that day: interfaces for object shapes we extend, type aliases for unions, tuples and compositions. Consistency beats cleverness.',
    },
  ],
  contextArtefacts: [
    {
      id: 'user-shapes',
      type: 'code',
      title: 'The shapes the admin panel needs',
      language: 'ts',
      content:
        'interface User {\n  id: string;\n  name: string;\n}\n\n// Admins are users with extra powers\n// Roles are a fixed set of labels',
    },
  ],
  challenges: [
    {
      id: 'tsf-005-c1',
      type: 'multiple-choice',
      title: 'Extend the Contract',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext: 'Admin needs everything User has, plus permissions: string[].',
      prompt: 'Which declaration expresses Admin best?',
      options: [
        {
          id: 'a',
          label: 'interface Admin {\n  id: string;\n  name: string;\n  permissions: string[];\n}',
          isCorrect: false,
          feedback:
            'Copy-paste inheritance: when User gains a field, Admin silently drifts out of sync.',
        },
        {
          id: 'b',
          label: 'type Admin = any; // admins can do anything',
          isCorrect: false,
          feedback: 'A pun is not a type — any throws away both contracts at once.',
        },
        {
          id: 'c',
          label: 'interface Admin extends User {\n  permissions: string[];\n}',
          isCorrect: true,
          feedback:
            'extends keeps the relationship live: User changes flow into Admin automatically.',
        },
        {
          id: 'd',
          label: 'interface Admin {\n  user: User;\n  permissions: string[];\n}',
          isCorrect: false,
          feedback:
            'Wrapping changes the shape — every existing call site would need admin.user.name instead of admin.name.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Admin is-a User. Which keyword says that?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'interface X extends Y inherits every member of Y and stays in sync as Y evolves.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Rule out anything that repeats id and name by hand — duplication is the trap here.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Pick interface Admin extends User with only the new permissions field.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Contract extended' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'A copy-pasted Admin shape drifted from User within two sprints.',
        },
      ],
      helpLinks: [{ topicId: 'typescript.interfaces', label: 'TypeScript interfaces' }],
      successFeedback: 'One source of truth, extended — not duplicated.',
      failureFeedback:
        'Watch for duplication: the right answer states the relationship instead of copying the fields.',
    },
    {
      id: 'tsf-005-c2',
      type: 'multiple-choice',
      title: 'Name the Union',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext:
        "Role — 'viewer' | 'editor' | 'owner' — is spelled out inline in four different files.",
      prompt: 'What is the right way to define Role once?',
      options: [
        {
          id: 'a',
          label: "type Role = 'viewer' | 'editor' | 'owner';",
          isCorrect: true,
          feedback:
            'A type alias names the union once — every signature imports the same three values.',
        },
        {
          id: 'b',
          label: "interface Role {\n  value: 'viewer' | 'editor' | 'owner';\n}",
          isCorrect: false,
          feedback:
            'An interface must describe an object — this wraps the union in a box nobody wanted, changing every call site.',
        },
        {
          id: 'c',
          label: "const Role = ['viewer', 'editor', 'owner'];",
          isCorrect: false,
          feedback:
            'A runtime array without as const types as string[] — it names the values but recovers no literal type.',
        },
        {
          id: 'd',
          label: 'Leave it inline; four copies of three strings is not worth an import.',
          isCorrect: false,
          feedback:
            "Four copies is how 'owner' becomes 'admin' in one file and not the others — the exact drift unions exist to stop.",
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'You need a named type that IS a union, not an object holding one.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'type aliases can name any type — unions, tuples, functions. Interfaces can only describe object shapes.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'This is the case where interface cannot do the job at all.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: "Choose the type alias: type Role = 'viewer' | 'editor' | 'owner'.",
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Union named' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Four inline copies of the role union kept drifting apart.',
        },
      ],
      helpLinks: [{ topicId: 'typescript.union-types', label: 'Union types' }],
      successFeedback: 'Aliases for unions, interfaces for objects — the convention holds.',
      failureFeedback:
        'An interface must be an object shape. Which option defines the union itself, once, with a name?',
    },
  ],
  reflectionPrompt:
    'State our convention in one sentence: when do you write interface, and when type?',
  rewards: [{ type: 'xp', amount: 10, label: 'Declarations by design' }],
};
