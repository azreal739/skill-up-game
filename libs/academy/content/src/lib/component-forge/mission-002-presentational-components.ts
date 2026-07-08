import { MissionDefinition } from '@academy/content-model';

/** Component Forge 2 — "Presentational Components" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const cfMission002Presentational: MissionDefinition = {
  id: 'component-forge-002-presentational-components',
  campaignId: 'component-forge',
  title: 'Presentational Components',
  summary:
    'A teammate’s "reusable" tile secretly fetches data. Make it truly presentational.',
  difficulty: 'easy',
  learningObjectives: [
    'Spot hidden dependencies that break reusability',
    'Keep presentational components pure',
    'Use OnPush safely with immutable inputs',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The CustomerTile shipped, but the search page can’t reuse it — it keeps loading the wrong customer. Review the component and find why it isn’t as reusable as it claims.',
    },
  ],
  contextArtefacts: [
    {
      id: 'tile-component',
      type: 'code',
      title: 'customer-tile.component.ts',
      language: 'ts',
      content:
        "@Component({\n  selector: 'app-customer-tile',\n  standalone: true,\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  templateUrl: './customer-tile.component.html',\n})\nexport class CustomerTileComponent implements OnInit {\n  @Input({ required: true }) customerId!: string;\n  customer?: Customer;\n\n  constructor(private api: CustomerService) {}\n\n  ngOnInit() {\n    this.api.getCustomer(this.customerId).subscribe(c => (this.customer = c));\n  }\n}",
    },
  ],
  challenges: [
    {
      id: 'component-forge-002-c1',
      type: 'code-review',
      title: 'Find What Breaks Reuse',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'Two things stop this from being a reusable presentational tile; one line is fine.',
      prompt:
        'Select every genuine problem with this "presentational" component.',
      findings: [
        {
          id: 'injects-service',
          label:
            'It injects CustomerService, coupling the tile to one data source',
          isCorrect: true,
          feedback:
            'A presentational component must not fetch data. Take the customer as an @Input and let containers supply it.',
        },
        {
          id: 'id-input',
          label:
            'It takes a customerId input and fetches, instead of taking the customer object',
          isCorrect: true,
          feedback:
            'Passing an id forces the tile to load the data itself. Pass the resolved Customer so the tile just renders.',
        },
        {
          id: 'onpush',
          label: 'Using OnPush change detection is wrong for a tile',
          isCorrect: false,
          feedback:
            'OnPush is exactly right for a presentational component fed by immutable inputs — it keeps rendering cheap.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'A presentational component only renders — it never loads.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Dependencies (injected services) and id-based fetching both pull data-loading into the component, tying it to one source. Presentational components receive resolved data via @Input.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'The constructor injection and the customerId-plus-fetch are the two coupling points.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Flag the injected service and the id-input+fetch. OnPush is correct — leave it unselected.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Tile purified' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 10,
          reason: 'A data-coupled tile blocked reuse across screens.',
        },
      ],
      helpLinks: [
        {
          topicId: 'angular.presentational-vs-container',
          label: 'Presentational vs container',
        },
        {
          topicId: 'angular.change-detection',
          label: 'OnPush change detection',
        },
      ],
      successFeedback:
        'Now it just renders a customer it is given — reusable anywhere.',
      failureFeedback:
        'Look for the two ways this component loads its own data instead of receiving it.',
    },
  ],
  reflectionPrompt:
    'Why does taking a resolved object beat taking an id and fetching inside a reusable component?',
  rewards: [{ type: 'xp', amount: 5, label: 'Presentational mastered' }],
};
