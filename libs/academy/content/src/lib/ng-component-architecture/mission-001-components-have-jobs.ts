import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — components have jobs: presentational vs container, and
 * the god component that accreted everyone's.
 */
export const fnCa001ComponentsHaveJobs: MissionDefinition = {
  id: 'ca-001-components-have-jobs',
  campaignId: 'ng-component-architecture',
  title: 'One Component, One Job',
  summary:
    'Presentational components render inputs and emit events; containers fetch, own state and orchestrate — a component doing both does neither well.',
  difficulty: 'intro',
  learningObjectives: [
    'Distinguish presentational from container responsibilities',
    'Spot the god component by what it imports',
    'Split a mixed component along the data/render seam',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'New block: component architecture. Exhibit A on the projector: user-panel.component.ts — 1,100 lines, injecting HttpClient, Router, three stores and a dialog service, and rendering forty divs. Nobody has dared touch it since March.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The seam that untangles it is old and reliable: PRESENTATIONAL components take inputs, render, and emit events — they know nothing about where data comes from. CONTAINERS fetch, hold state, and hand it down. The panel does both jobs at once, which is why every change risks both.',
    },
  ],
  contextArtefacts: [
    {
      id: 'the-seam',
      type: 'code',
      title: 'The seam',
      language: 'ts',
      content:
        "// container: knows WHERE — injects, fetches, orchestrates\n@Component({ template: `<app-user-card [user]=\"user()\" (promote)=\"promote($event)\" />` })\nexport class UserPanelPage {\n  private readonly store = inject(UserStore);\n  readonly user = this.store.selectedUser;\n  promote(id: string) { this.store.promote(id); }\n}\n\n// presentational: knows HOW it looks — inputs in, events out, zero injection\n@Component({ selector: 'app-user-card', changeDetection: OnPush })\nexport class UserCardComponent {\n  readonly user = input.required<User>();\n  readonly promote = output<string>();\n}",
    },
  ],
  challenges: [
    {
      id: 'ca-001-c1',
      type: 'multiple-choice',
      title: 'Read the Imports',
      difficulty: 'intro',
      tags: ['angular'],
      storyContext: 'The 1,100-line panel’s constructor: HttpClient, Router, UserStore, TeamStore, BillingStore, DialogService.',
      prompt: 'What do the injections tell you, and what is the honest split?',
      options: [
        {
          id: 'a',
          label: 'The component needs a facade service that wraps all six dependencies behind one injection.',
          isCorrect: false,
          feedback:
            'One import instead of six, same 1,100 lines with the same two jobs — a facade tidies the doorway of a house that needs walls.',
        },
        {
          id: 'b',
          label: 'Injection count is style — the real problem is the 1,100 lines, fixable by extracting private methods into helper files.',
          isCorrect: false,
          feedback:
            'Helper files relocate lines without separating JOBS — the template still re-renders when fetch logic changes and vice versa.',
        },
        {
          id: 'c',
          label: 'Split by template section: header, body and footer components, each getting the injections it uses.',
          isCorrect: false,
          feedback:
            'Slicing by geometry gives you three smaller god components — each still fetching AND rendering. The seam is responsibility, not layout.',
        },
        {
          id: 'd',
          label:
            'Six injections in one rendering component is the god-component signature: it knows WHERE data lives and HOW it looks. Split along that seam — a thin container owning the injections and orchestration, and presentational children (inputs in, events out, no injection) owning the forty divs.',
          isCorrect: true,
          feedback:
            'The imports were the diagnosis: presentational components inject nothing, so injection count in a component with a big template measures exactly how mixed its jobs are.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What SHOULD a purely rendering component need to inject?' },
        { level: 2, title: 'Concept', content: 'Containers know where; presentational know how it looks.' },
        { level: 3, title: 'Specific clue', content: 'The split axis is responsibility — two options split by something else.' },
        { level: 4, title: 'Guided solution', content: 'Thin container + injection-free children.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Seam found' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The panel gained its seventh injection — the “nobody touches it” zone grew by another feature.',
        },
      ],
      helpLinks: [{ topicId: 'angular.presentational-vs-container', label: 'Presentational vs container' }],
      successFeedback: 'Injections counted, jobs separated — the panel can be touched again.',
      failureFeedback: 'For each option: after the change, does template work still risk fetch logic?',
    },
    {
      id: 'ca-001-c2',
      type: 'multiple-choice',
      title: 'What the Split Buys',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext: 'A teammate asks the fair question: “we split one file into four — what did we actually gain beyond smaller files?”',
      prompt: 'What does the container/presentational split buy?',
      options: [
        {
          id: 'a',
          label: 'Mostly readability — smaller files are easier to navigate, and that alone justifies the churn.',
          isCorrect: false,
          feedback: 'Readability came along, but the structural wins — testing, reuse, safe change — are the purchase.',
        },
        {
          id: 'b',
          label:
            'Three structural wins: the presentational children are trivially testable (set inputs, assert DOM, spy outputs — no TestBed provider zoo); they are reusable anywhere the data can be handed in; and change is contained — a restyle cannot break fetching, a store migration cannot break markup.',
          isCorrect: true,
          feedback:
            'The split converts one fragile everything into parts with contracts — and the contract (inputs/outputs) is what missions 2 and 8 build on.',
        },
        {
          id: 'c',
          label: 'Performance — presentational components skip change detection entirely because they have no dependencies.',
          isCorrect: false,
          feedback:
            'They pair beautifully WITH OnPush (pure input-driven rendering), but nothing skips CD for free — and perf was not the sale.',
        },
        {
          id: 'd',
          label: 'Nothing intrinsic — the same discipline inside one file, with regions and comments, achieves the same guarantees.',
          isCorrect: false,
          feedback:
            'Discipline without boundaries erodes: the compiler enforces an input contract; a comment saying “don’t inject here” enforces a hope.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Compare TESTING the old panel vs testing UserCardComponent.' },
        { level: 2, title: 'Concept', content: 'Contracts enable testing, reuse and contained change.' },
        { level: 3, title: 'Specific clue', content: 'What does the user-card spec need to provide? (Answer: inputs. Only inputs.)' },
        { level: 4, title: 'Guided solution', content: 'Pick the three-structural-wins answer.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Purchase justified' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: '“Just smaller files” stuck as the story — the next god component grew unopposed because the WHY was never landed.',
        },
      ],
      helpLinks: [{ topicId: 'angular.presentational-vs-container', label: 'Presentational vs container' }],
      successFeedback: 'Testable, reusable, safely changeable — the split priced in its own words.',
      failureFeedback: 'Write the first line of a spec for each version. One needs six providers before it compiles.',
    },
  ],
  reflectionPrompt: 'Sort our five biggest components: for each, how many injections sit next to how many lines of template?',
  rewards: [{ type: 'xp', amount: 5, label: 'Jobs assigned' }],
};
