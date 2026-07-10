import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — child routes: nested outlets, layout routes, and the
 * empty-path default child.
 */
export const fnRt003ChildRoutes: MissionDefinition = {
  id: 'rt-003-child-routes',
  campaignId: 'ng-routing',
  title: 'Routes Within Routes',
  summary:
    'children nest the map: a parent renders the shared frame with its own outlet, and child routes fill it — one URL segment per level.',
  difficulty: 'easy',
  learningObjectives: [
    'Nest child routes under a shared layout component',
    'Place the second router-outlet where children render',
    'Use an empty-path child as the section default',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session three tackled copy-paste: the settings area had five pages, each duplicating the same sidebar and header. Changing one nav label meant five edits, and they had already drifted.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The router models this directly: a parent route renders SettingsLayoutComponent — sidebar, header and a router-outlet of its own — and children render INTO that outlet. The URL nests like the UI nests: /settings/profile is the settings frame with the profile page inside.',
    },
  ],
  contextArtefacts: [
    {
      id: 'nested-map',
      type: 'code',
      title: 'The settings area, deduplicated',
      language: 'ts',
      content:
        "{\n  path: 'settings',\n  component: SettingsLayoutComponent, // sidebar + header + <router-outlet/>\n  children: [\n    { path: '', component: ProfileSettingsComponent }, // default child\n    { path: 'profile', component: ProfileSettingsComponent },\n    { path: 'billing', component: BillingSettingsComponent },\n    { path: 'team', component: TeamSettingsComponent },\n  ],\n}",
    },
  ],
  challenges: [
    {
      id: 'rt-003-c1',
      type: 'multiple-choice',
      title: 'Where Children Render',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext: 'The refactor lands, /settings/billing is opened — and the billing page renders but the sidebar is GONE.',
      prompt: 'What went wrong?',
      options: [
        {
          id: 'a',
          label:
            'SettingsLayoutComponent has no router-outlet in its template, so the router had nowhere inside the layout to place the child — it fell back to rendering billing in the ROOT outlet, replacing the layout instead of filling it.',
          isCorrect: true,
          feedback:
            'Each level of nesting needs its own outlet: root outlet hosts the layout, the layout’s outlet hosts the child. No inner outlet, no frame.',
        },
        {
          id: 'b',
          label: 'Child routes cannot render components that also appear at the top level — billing must be renamed.',
          isCorrect: false,
          feedback: 'Components are freely reusable across routes — the router does not care about duplicates.',
        },
        {
          id: 'c',
          label: 'The children array must list routes alphabetically for matching to work; billing sorted wrongly.',
          isCorrect: false,
          feedback: 'Order matters for AMBIGUOUS matches, never alphabetically — and billing matches fine; it renders in the wrong place.',
        },
        {
          id: 'd',
          label: 'The parent path needs a trailing slash — "settings/" — to signal that children exist.',
          isCorrect: false,
          feedback: 'The children property is the signal; paths never carry trailing slashes.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The child DID render. Ask where it rendered, and what should have wrapped it.' },
        { level: 2, title: 'Concept', content: 'Nesting depth = outlet count: every parent-with-children owns an outlet.' },
        { level: 3, title: 'Specific clue', content: 'Check SettingsLayoutComponent’s template for <router-outlet/>.' },
        { level: 4, title: 'Guided solution', content: 'Missing inner outlet — add it to the layout template.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Outlet placed' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Settings shipped frameless — users lost the sidebar and with it the way back.',
        },
      ],
      helpLinks: [{ topicId: 'routing.route-config', label: 'Route configuration' }],
      successFeedback: 'One outlet per nesting level — the frame and the filling each know their place.',
      failureFeedback: 'The billing component rendered SOMEWHERE. Which outlet was it, and which outlet is missing?',
    },
    {
      id: 'rt-003-c2',
      type: 'multiple-choice',
      title: 'The Section Default',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'Product asks: “/settings alone should show the profile page, and the sidebar’s Profile item should highlight.” Two children currently render ProfileSettingsComponent.',
      prompt: 'What is the cleanest configuration?',
      options: [
        {
          id: 'a',
          label: 'Keep both children as-is — duplicate component registrations are the standard pattern for defaults.',
          isCorrect: false,
          feedback:
            'It works but forks the truth: /settings and /settings/profile are now two different “pages” showing one thing — active-link highlighting and analytics split across them.',
        },
        {
          id: 'b',
          label: 'Make the parent render ProfileSettingsComponent directly and drop the profile child.',
          isCorrect: false,
          feedback:
            'The parent renders the LAYOUT — giving it the profile page too means every child renders inside the profile page.',
        },
        {
          id: 'c',
          label:
            "Replace the empty-path component child with a redirect: { path: '', redirectTo: 'profile', pathMatch: 'full' } — /settings becomes /settings/profile, one canonical URL, and routerLinkActive highlights correctly.",
          isCorrect: true,
          feedback:
            "One page, one URL: the redirect makes 'profile' canonical, so links, highlighting and history all agree. pathMatch: 'full' keeps the empty path from swallowing every sibling.",
        },
        {
          id: 'd',
          label: "Add { path: '**', redirectTo: 'profile' } inside the children so anything unmatched lands on profile.",
          isCorrect: false,
          feedback:
            'A section-level wildcard eats TYPOS too — /settings/billling silently becomes profile instead of a visible 404, hiding broken links.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The requirement is really “one page, one canonical URL”.' },
        { level: 2, title: 'Concept', content: 'Empty-path redirects give sections a default without duplicating registrations.' },
        { level: 3, title: 'Specific clue', content: "Why does the redirect need pathMatch: 'full'? What would prefix-match swallow?" },
        { level: 4, title: 'Guided solution', content: 'Empty-path redirectTo profile, pathMatch full.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Default set' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The duplicate-child default shipped — analytics counted “two” settings landing pages forever after.',
        },
      ],
      helpLinks: [{ topicId: 'routing.route-config', label: 'Route configuration' }],
      successFeedback: 'Canonical URLs by redirect — small config, long-term hygiene.',
      failureFeedback: 'Which option leaves exactly ONE URL rendering the profile page?',
    },
  ],
  reflectionPrompt: 'Which area of our app duplicates a layout across pages that children + an inner outlet would deduplicate?',
  rewards: [{ type: 'xp', amount: 10, label: 'Nesting mastered' }],
};
