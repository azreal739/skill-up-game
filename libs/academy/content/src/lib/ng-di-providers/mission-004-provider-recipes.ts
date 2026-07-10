import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — provider recipes: useClass, useValue, useFactory,
 * useExisting — four ways to answer "what arrives when someone asks".
 */
export const fnDi004ProviderRecipes: MissionDefinition = {
  id: 'di-004-provider-recipes',
  campaignId: 'ng-di-providers',
  title: 'Four Recipes',
  summary:
    'A provider maps a token to a recipe: substitute a class, hand over a value, compute with a factory, or alias an existing instance.',
  difficulty: 'medium',
  learningObjectives: [
    'Choose between useClass, useValue, useFactory and useExisting',
    'Explain why useExisting aliases while useClass duplicates',
    'Wire a factory that depends on other injected services',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session four: the token is the QUESTION, the provider is the ANSWER. We wrote the four answer shapes on the board and spent the evening picking the right one for real cases from our repo.',
    },
    {
      speaker: 'Senior Dev',
      text: 'useClass: construct this other class instead. useValue: here is the object, done. useFactory: run this function — with its own deps — to build the answer. useExisting: do not build anything, hand over what THAT token already resolves to. The last one is the most misunderstood and the most elegant.',
    },
  ],
  contextArtefacts: [
    {
      id: 'four-shapes',
      type: 'code',
      title: 'The four answer shapes',
      language: 'ts',
      content:
        "providers: [\n  { provide: PaymentGateway, useClass: MockPaymentGateway },\n  { provide: APP_CONFIG, useValue: { apiUrl: '/api', retries: 3 } },\n  {\n    provide: Logger,\n    useFactory: (env: EnvService) => (env.isProd ? new RemoteLogger() : new ConsoleLogger()),\n    deps: [EnvService],\n  },\n  { provide: BasicLogger, useExisting: Logger }, // alias, NOT a second instance\n]",
    },
  ],
  challenges: [
    {
      id: 'di-004-c1',
      type: 'multiple-choice',
      title: 'Pick the Recipe',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'Case from the repo: NotificationChannel must resolve to SlackChannel in production but EmailChannel during the pilot — decided at runtime from FeatureFlagService.',
      prompt: 'Which provider shape fits?',
      options: [
        {
          id: 'a',
          label: '{ provide: NotificationChannel, useClass: SlackChannel } plus an if-statement inside SlackChannel that falls back to email.',
          isCorrect: false,
          feedback:
            'That buries the wiring decision inside a class that should not know about the pilot — the exact knowledge DI exists to relocate.',
        },
        {
          id: 'b',
          label: '{ provide: NotificationChannel, useValue: new SlackChannel() } and swap the file at deploy time.',
          isCorrect: false,
          feedback:
            'useValue hands over a ready object — fine for config, wrong for a runtime decision, and new-at-registration resurrects hard-wiring.',
        },
        {
          id: 'c',
          label:
            '{ provide: NotificationChannel, useFactory: (flags: FeatureFlagService) => flags.pilot ? new EmailChannel() : new SlackChannel(), deps: [FeatureFlagService] } — a recipe that computes the answer from injected inputs.',
          isCorrect: true,
          feedback:
            'Runtime decision, injected inputs, classes that stay ignorant of the pilot — useFactory is built for exactly this fork.',
        },
        {
          id: 'd',
          label: '{ provide: NotificationChannel, useExisting: FeatureFlagService } so the flag service can forward notifications while the pilot runs.',
          isCorrect: false,
          feedback:
            'useExisting says “same instance as that token” — a flag service is not a notification channel, and no forwarding happens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The answer depends on ANOTHER service at runtime. Which shape can ask for one?' },
        { level: 2, title: 'Concept', content: 'useFactory is the only recipe with deps — inputs to the decision.' },
        { level: 3, title: 'Specific clue', content: 'Two wrong options move the decision INTO a class; one aliases nonsense.' },
        { level: 4, title: 'Guided solution', content: 'Factory with FeatureFlagService in deps.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Recipe picked' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The pilot if-statement shipped inside SlackChannel and outlived the pilot by a year.',
        },
      ],
      helpLinks: [{ topicId: 'di.provider-recipes', label: 'Provider recipes' }],
      successFeedback: 'Question, answer, inputs to the answer — provider design in three words.',
      failureFeedback: 'Which shapes can consult FeatureFlagService at resolution time? Only one has deps.',
    },
    {
      id: 'di-004-c2',
      type: 'multiple-choice',
      title: 'Alias or Duplicate',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'Refactor: the old ToastService API must keep working while new code injects NotificationService. Both must share ONE queue — two queues means toasts overlap on screen.',
      prompt: 'Which provider keeps one queue?',
      options: [
        {
          id: 'a',
          label:
            '{ provide: ToastService, useExisting: NotificationService } — old askers receive the very same instance new askers get; one queue, aliased under two names.',
          isCorrect: true,
          feedback:
            'useExisting is the alias recipe: resolve THAT token and hand over the result. One instance, two doors — migrations live on it.',
        },
        {
          id: 'b',
          label: '{ provide: ToastService, useClass: NotificationService } — old askers get a NotificationService too.',
          isCorrect: false,
          feedback:
            'useClass CONSTRUCTS a second NotificationService for the old token — right class, second queue, overlapping toasts.',
        },
        {
          id: 'c',
          label: 'Keep both services and have ToastService inject NotificationService, delegating every method.',
          isCorrect: false,
          feedback:
            'Works, but it is a hand-written copy of what useExisting does in one line — and every new method now needs a delegate.',
        },
        {
          id: 'd',
          label: '{ provide: ToastService, useValue: NotificationService } — pass the class over as the value.',
          isCorrect: false,
          feedback:
            'That hands askers the class CONSTRUCTOR itself as the value — toast.show() becomes undefined-is-not-a-function.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The requirement is “same INSTANCE, second name”. Which recipe never constructs?' },
        { level: 2, title: 'Concept', content: 'useClass builds; useExisting resolves-and-forwards.' },
        { level: 3, title: 'Specific clue', content: 'Overlapping toasts are the symptom of exactly one wrong option here.' },
        { level: 4, title: 'Guided solution', content: 'Alias with useExisting: NotificationService.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Alias wired' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Two toast queues rendered on top of each other — the migration shipped a visual glitch on every notification.',
        },
      ],
      helpLinks: [{ topicId: 'di.provider-recipes', label: 'Provider recipes' }],
      successFeedback: 'One instance, two names — the migration nobody notices is the one that worked.',
      failureFeedback: 'Count constructions per option. The requirement allows exactly one.',
    },
  ],
  reflectionPrompt: 'Which class in our repo makes a wiring decision (env, flags, platform) that a factory provider should own instead?',
  rewards: [{ type: 'xp', amount: 10, label: 'Recipes mastered' }],
};
