import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — inputs and outputs as contracts: narrow inputs, events
 * that describe intent, and the trouble with passing the world in.
 */
export const fnCa002IoContracts: MissionDefinition = {
  id: 'ca-002-io-contracts',
  campaignId: 'ng-component-architecture',
  title: 'The Contract Is the Component',
  summary:
    'Inputs and outputs ARE the component’s API — narrow inputs keep it reusable, and outputs describe intent, not implementation.',
  difficulty: 'easy',
  learningObjectives: [
    'Design inputs as the narrowest data the render needs',
    'Name outputs after user intent, not DOM mechanics',
    'Explain why passing services or stores as inputs breaks the model',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session two: we reviewed our own component APIs like they were REST endpoints. It was humbling. One card took the entire UserStore as an input. One output was named divClicked.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The contract rules mirror API design because they ARE API design. Inputs: the narrowest data the render needs — a User, not the store that can find one. Outputs: intent, past-user-action — (promote), not (buttonClick) — because the parent cares WHAT the user meant, not which element they hit. Get the contract right and the component outlives every page it sits on.',
    },
  ],
  contextArtefacts: [
    {
      id: 'contract-rules',
      type: 'code',
      title: 'The API review checklist',
      language: 'ts',
      content:
        "// inputs: data, not sources of data\nreadonly user = input.required<User>();      // ✅ the thing to render\nreadonly store = input<UserStore>();          // ❌ the place to fetch it\n\n// outputs: intent, not mechanics\nreadonly promote = output<string>();          // ✅ what the user meant\nreadonly divClicked = output<MouseEvent>();   // ❌ what the DOM did",
    },
  ],
  challenges: [
    {
      id: 'ca-002-c1',
      type: 'multiple-choice',
      title: 'The Store as an Input',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'The card in question: <app-user-card [store]="userStore" /> — inside, it calls store.selectedUser() and store.promote(id) directly. “It works and saves five inputs.”',
      prompt: 'What does taking the store as an input cost?',
      options: [
        {
          id: 'a',
          label:
            'The card is presentational in name only: it now knows the store’s API (coupled to every refactor), can render ONLY store-backed users (goodbye search results, previews, storybook), can secretly WRITE state its parent never sees, and its spec needs a store fake instead of a plain object. Take a User in, emit intent out.',
          isCorrect: true,
          feedback:
            'Passing the source instead of the data re-creates the god component through the front door — the card inherits every property of the thing it was split from.',
        },
        {
          id: 'b',
          label: 'Only testability — a store fake in the spec is more setup, but the runtime design is sound.',
          isCorrect: false,
          feedback:
            'The spec pain is the SYMPTOM: it hurts to fake because the card is coupled to a source, and that coupling also kills reuse and hides writes.',
        },
        {
          id: 'c',
          label: 'Nothing if the store is injected instead of passed — inputs are the wrong channel but DI makes it clean.',
          isCorrect: false,
          feedback:
            'Injection couples identically — the card still knows WHERE data lives. The channel was never the problem; the knowledge is.',
        },
        {
          id: 'd',
          label: 'Change detection — object inputs like stores defeat OnPush reference checks.',
          isCorrect: false,
          feedback:
            'The store reference is stable, so OnPush is actually fine mechanically — the costs are architectural, which is why they hide longer.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Try to render this card in a storybook story. What must you build first?' },
        { level: 2, title: 'Concept', content: 'Inputs carry data; sources of data stay in containers.' },
        { level: 3, title: 'Specific clue', content: 'Who notices when the card calls store.promote() on its own?' },
        { level: 4, title: 'Guided solution', content: 'Pick the four-costs answer: coupling, reuse, hidden writes, test pain.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Source refused' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Store-as-input spread to six cards — the store’s next refactor became a six-component migration.',
        },
      ],
      helpLinks: [{ topicId: 'arch.io-contracts', label: 'Input/output contracts' }],
      successFeedback: 'Data in, intent out — the card can now live anywhere the data can reach.',
      failureFeedback: 'List every place this card could be reused. Now list what each place must construct to use it.',
    },
    {
      id: 'ca-002-c2',
      type: 'multiple-choice',
      title: 'Name the Output',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'The order-row component has a trash-can icon. Proposals for its output: (iconClicked), (trashClicked), (deleteRequested), (orderDeleted).',
      prompt: 'Which name is right, and why do the others age badly?',
      options: [
        {
          id: 'a',
          label: '(trashClicked) — it names the actual element, so handlers stay traceable to the template.',
          isCorrect: false,
          feedback:
            'When design swaps the trash can for a swipe gesture, every parent handler is named after an icon that no longer exists.',
        },
        {
          id: 'b',
          label: '(orderDeleted) — name the outcome so parents know exactly what happened.',
          isCorrect: false,
          feedback:
            'The row cannot delete anything — claiming the outcome before the container (who owns the API call, the confirm dialog, the failure path) has acted is a lie waiting for its first 500.',
        },
        {
          id: 'c',
          label:
            '(deleteRequested) — intent, honestly scoped: the user ASKED for deletion; whether it happens (confirm, API, rollback) is the container’s decision. The name survives redesigns of the trigger and failures of the action.',
          isCorrect: true,
          feedback:
            'Outputs narrate the user’s intent at this component’s level of authority — mechanics age with the design, outcomes overclaim, intent is stable.',
        },
        {
          id: 'd',
          label: '(iconClicked) with the icon name in the payload — one generic output scales better than one per action.',
          isCorrect: false,
          feedback:
            'A stringly-typed event bus in miniature: parents switch on payload strings, the compiler checks nothing, and every new icon is a silent contract change.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which name survives BOTH a redesign of the trigger and a failed API call?' },
        { level: 2, title: 'Concept', content: 'Mechanics < intent < outcome — pick the level the component can honestly claim.' },
        { level: 3, title: 'Specific clue', content: 'Can the ROW know the order got deleted?' },
        { level: 4, title: 'Guided solution', content: 'Pick deleteRequested.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Intent named' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: '(orderDeleted) fired before the API failed — the toast said deleted, the list said otherwise, support said hello.',
        },
      ],
      helpLinks: [{ topicId: 'arch.io-contracts', label: 'Input/output contracts' }],
      successFeedback: 'Named at the row’s level of authority — the contract tells the truth under redesign and failure alike.',
      failureFeedback: 'Test each name against two futures: the icon becomes a swipe, and the delete API fails.',
    },
  ],
  reflectionPrompt: 'Read our most-reused component’s inputs like a REST API doc: would you approve that API in review?',
  rewards: [{ type: 'xp', amount: 5, label: 'Contracts drafted' }],
};
