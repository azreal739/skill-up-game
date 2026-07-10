import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — providedIn: 'root': tree-shakable singletons, lazy
 * construction on first request, and why the providers array is not the
 * default home for services.
 */
export const fnDi002ProvidedInRoot: MissionDefinition = {
  id: 'di-002-provided-in-root',
  campaignId: 'ng-di-providers',
  title: 'Rooted by Default',
  summary:
    'providedIn: "root" gives a service one app-wide instance, created on first request and dropped from the bundle if nobody asks.',
  difficulty: 'easy',
  learningObjectives: [
    'Explain when a providedIn: "root" service is constructed',
    'Say what tree-shakable means for an unused service',
    'Choose between providedIn and component providers deliberately',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session two chased a mystery: ExportService has a constructor console.log, and on app start the log never appears. Half the room called it a bug.',
    },
    {
      speaker: 'Senior Dev',
      text: 'It is the feature. providedIn: "root" registers a RECIPE, not an instance — construction happens at first inject(). No asker, no instance. And if no code in the whole app asks, the bundler drops the class entirely: tree-shakable.',
    },
  ],
  contextArtefacts: [
    {
      id: 'lazy-singleton',
      type: 'code',
      title: 'The recipe, not the instance',
      language: 'ts',
      content:
        "@Injectable({ providedIn: 'root' })\nexport class ExportService {\n  constructor() {\n    console.log('ExportService constructed'); // logs on FIRST inject, not app start\n  }\n}",
    },
  ],
  challenges: [
    {
      id: 'di-002-c1',
      type: 'multiple-choice',
      title: 'The Silent Constructor',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext: 'App boots, console stays empty. Ten minutes later a user opens the export dialog and the log appears.',
      prompt: 'Why does the constructor run only then?',
      options: [
        {
          id: 'a',
          label:
            'providedIn: "root" registers a construction recipe with the root injector — the instance is built lazily at the FIRST inject(ExportService), which happens when the export dialog opens.',
          isCorrect: true,
          feedback:
            'Recipe at registration, instance at first request — the singleton is lazy, which is exactly what you want from rarely-used services.',
        },
        {
          id: 'b',
          label: 'The root injector constructs all its services at boot, but batches console output until idle.',
          isCorrect: false,
          feedback: 'Nothing batches console.log — the constructor genuinely had not run. No asker, no instance.',
        },
        {
          id: 'c',
          label: 'Angular defers construction of any service whose name is not referenced in a template.',
          isCorrect: false,
          feedback: 'Templates are irrelevant to DI — the trigger is the first injection request, from any code.',
        },
        {
          id: 'd',
          label: 'The service was tree-shaken out of the bundle and re-downloaded when the dialog opened.',
          isCorrect: false,
          feedback:
            'Tree-shaking happens at BUILD time and only for services nobody injects — this one has an asker, so it shipped; it just had not been asked yet.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Separate registering a service from constructing it.' },
        { level: 2, title: 'Concept', content: 'The injector holds recipes; first request cooks the instance.' },
        { level: 3, title: 'Specific clue', content: 'What user action leads to the first inject(ExportService)?' },
        { level: 4, title: 'Guided solution', content: 'Pick recipe-registered, built-on-first-inject.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Laziness explained' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'An eager-init workaround (injecting every service in AppComponent) shipped to “fix” lazy construction.',
        },
      ],
      helpLinks: [{ topicId: 'angular.services-di', label: 'Services & DI' }],
      successFeedback: 'Lazy singletons: registered always, constructed on demand, shipped only if used.',
      failureFeedback: 'The log DID eventually appear — so the class shipped. What was missing until the dialog?',
    },
    {
      id: 'di-002-c2',
      type: 'multiple-choice',
      title: 'Where Services Live',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'A PR moves ExportService out of providedIn: "root" and into the providers array of the three components that use it, “to keep it close to its users”.',
      prompt: 'What does that move actually change?',
      options: [
        {
          id: 'a',
          label: 'Nothing observable — providers arrays and providedIn are two syntaxes for the same registration.',
          isCorrect: false,
          feedback:
            'They register at different LEVELS — root injector versus each component’s own injector. The level decides how many instances exist.',
        },
        {
          id: 'b',
          label: 'Only bundle size — component providers are more aggressively tree-shaken than root ones.',
          isCorrect: false,
          feedback:
            'Backwards on both counts: providedIn: "root" is the tree-shakable form, and the real change is instance count.',
        },
        {
          id: 'c',
          label:
            'Each of the three components now gets its OWN ExportService instance, created and destroyed with the component — shared state like an in-flight export job silently stops being shared.',
          isCorrect: true,
          feedback:
            'Component providers scope the service to each component instance. Sometimes that is exactly right (mission 3) — but as a “tidiness” move it is a behaviour change wearing a refactor’s clothes.',
        },
        {
          id: 'd',
          label: 'It breaks immediately — services in component providers cannot be injected by other services.',
          isCorrect: false,
          feedback:
            'It resolves fine for the components themselves — the danger is that it WORKS while quietly splitting shared state three ways.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Ask where each registration puts the instance — and how many “wheres” there are.' },
        { level: 2, title: 'Concept', content: 'Component providers = one instance per component instance, component lifetime.' },
        { level: 3, title: 'Specific clue', content: 'What happens to an export job tracked in instance A when component B asks for progress?' },
        { level: 4, title: 'Guided solution', content: 'Pick three-instances-shared-state-splits.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Scope chosen' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The progress bar and the export ran in different instances — progress stayed at 0% while the file downloaded.',
        },
      ],
      helpLinks: [
        { topicId: 'angular.services-di', label: 'Services & DI' },
        { topicId: 'di.injector-tree', label: 'Injector hierarchy' },
      ],
      successFeedback: 'Registration level = instance count = behaviour. Never a tidiness decision.',
      failureFeedback: 'Count instances under each option. Which option changes the count?',
    },
  ],
  reflectionPrompt: 'Which of our services would break TODAY if it quietly became one-instance-per-component?',
  rewards: [{ type: 'xp', amount: 5, label: 'Roots understood' }],
};
