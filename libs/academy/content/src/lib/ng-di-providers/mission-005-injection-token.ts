import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — InjectionToken: injecting things that are not classes;
 * why interfaces and strings cannot be tokens; typed tokens with defaults.
 */
export const fnDi005InjectionToken: MissionDefinition = {
  id: 'di-005-injection-token',
  campaignId: 'ng-di-providers',
  title: 'Tokens for the Classless',
  summary:
    'Config objects, callbacks and interfaces have no class to key on — InjectionToken gives them a typed identity in the injector.',
  difficulty: 'medium',
  learningObjectives: [
    'Explain why an interface cannot be an injection token',
    'Create and provide a typed InjectionToken',
    'Use factory defaults so a token works without explicit providers',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session five opened with a compile error everyone has met: inject(AppConfig) where AppConfig is an interface — “AppConfig only refers to a type”. The room split between workaround and understanding. We chose understanding.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The injector is a runtime map, and interfaces do not exist at runtime — TypeScript erases them. Classes work as tokens because a class is BOTH a type and a runtime value. For everything else there is InjectionToken: a runtime key you create, carrying the type as a generic.',
    },
  ],
  contextArtefacts: [
    {
      id: 'typed-token',
      type: 'code',
      title: 'A typed token, with a default',
      language: 'ts',
      content:
        "export interface AppConfig {\n  apiUrl: string;\n  retries: number;\n}\n\nexport const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {\n  factory: () => ({ apiUrl: '/api', retries: 3 }), // default if nobody provides\n});\n\n// consumer\nprivate config = inject(APP_CONFIG); // typed as AppConfig",
    },
  ],
  challenges: [
    {
      id: 'di-005-c1',
      type: 'multiple-choice',
      title: 'Why Interfaces Can’t Ask',
      difficulty: 'medium',
      tags: ['angular', 'typescript'],
      storyContext: 'The compile error is on screen. A teammate suggests just declaring the interface as a class to appease Angular.',
      prompt: 'Why can’t an interface be an injection token — really?',
      options: [
        {
          id: 'a',
          label: 'Angular’s compiler forbids it stylistically; enabling strict-DI mode in the config allows interface tokens.',
          isCorrect: false,
          feedback: 'No flag exists — the limitation is physics, not policy. Nothing survives to look up.',
        },
        {
          id: 'b',
          label: 'Interfaces can be tokens, but only when every implementation is providedIn: "root".',
          isCorrect: false,
          feedback: 'Provider placement cannot help — the interface itself is gone before any injector runs.',
        },
        {
          id: 'c',
          label: 'Interfaces describe multiple shapes, and the injector cannot choose between implementations.',
          isCorrect: false,
          feedback:
            'Choosing implementations is what providers DO. The blocker is simpler: at runtime there is no key to choose FOR.',
        },
        {
          id: 'd',
          label:
            'TypeScript erases interfaces at compile time — the injector is a runtime map, and an erased type leaves no runtime value to use as the key. A class works because it is a type AND a runtime constructor; InjectionToken manufactures a runtime key for everything else.',
          isCorrect: true,
          feedback:
            'Type-space versus value-space — the same distinction from the TypeScript fundamentals block, now explaining a DI rule.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What does the injector use as a lookup KEY, and does an interface survive compilation?' },
        { level: 2, title: 'Concept', content: 'Classes live in both type-space and value-space; interfaces only in type-space.' },
        { level: 3, title: 'Specific clue', content: 'The TS fundamentals campaign called this erasure.' },
        { level: 4, title: 'Guided solution', content: 'Pick the erased-at-runtime answer.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Erasure applied' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'Interfaces-as-classes workarounds spread — empty classes existing only to be tokens, confusing every reader.',
        },
      ],
      helpLinks: [
        { topicId: 'di.injection-token', label: 'InjectionToken' },
        { topicId: 'typescript.interfaces', label: 'TypeScript interfaces' },
      ],
      successFeedback: 'Type-space erased, value-space injected — two campaigns shaking hands.',
      failureFeedback: 'After compilation, what is left of interface AppConfig for a runtime map to key on?',
    },
    {
      id: 'di-005-c2',
      type: 'multiple-choice',
      title: 'Provide the Config',
      difficulty: 'medium',
      tags: ['angular', 'typescript'],
      storyContext:
        'APP_CONFIG (typed InjectionToken<AppConfig>) must carry { apiUrl: "https://api.dmm.dev", retries: 5 } in the deployed app.',
      prompt: 'Which provider is right?',
      options: [
        {
          id: 'a',
          label: "{ provide: 'APP_CONFIG', useValue: { apiUrl: 'https://api.dmm.dev', retries: 5 } } — the string name keeps it readable.",
          isCorrect: false,
          feedback:
            'A string is a DIFFERENT token than the InjectionToken object — consumers injecting APP_CONFIG will not find this, and strings collide across libraries with no type safety.',
        },
        {
          id: 'b',
          label:
            "{ provide: APP_CONFIG, useValue: { apiUrl: 'https://api.dmm.dev', retries: 5 } } — the token object as the key, useValue for a ready object, typed against AppConfig at compile time.",
          isCorrect: true,
          feedback:
            'The token IS the key — same object at provide-site and inject-site — and the generic checks the value’s shape before anything runs.',
        },
        {
          id: 'c',
          label: '{ provide: AppConfig, useValue: { … } } — provide against the interface now that the token exists.',
          isCorrect: false,
          feedback: 'The interface is still erased — c1 has not stopped being true. The token exists precisely to stand in for it.',
        },
        {
          id: 'd',
          label: 'APP_CONFIG already has a factory default, so providing anything would create two conflicting configs.',
          isCorrect: false,
          feedback:
            'Defaults are the FALLBACK: an explicit provider simply wins. That layering — default for tests and demos, real value in the app — is the pattern’s selling point.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What must match exactly between the provide site and the inject site?' },
        { level: 2, title: 'Concept', content: 'The token OBJECT is the key; useValue suits a ready-made object.' },
        { level: 3, title: 'Specific clue', content: 'One option quietly registers under a different key. Strings are not objects.' },
        { level: 4, title: 'Guided solution', content: 'provide: APP_CONFIG (the token), useValue the config.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Config provided' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The string-token config never reached consumers — production ran on the localhost default.',
        },
      ],
      helpLinks: [
        { topicId: 'di.injection-token', label: 'InjectionToken' },
        { topicId: 'di.provider-recipes', label: 'Provider recipes' },
      ],
      successFeedback: 'Same key both sides, type-checked value, default as fallback — config injection done right.',
      failureFeedback: 'inject(APP_CONFIG) looks up ONE specific key. Which options register under it?',
    },
  ],
  reflectionPrompt: 'What configuration does our app read from a global or an import that deserves a typed token instead?',
  rewards: [{ type: 'xp', amount: 10, label: 'Tokens minted' }],
};
