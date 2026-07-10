import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — routes as configuration: the Routes array, router-outlet,
 * and why routerLink beats href inside a SPA.
 */
export const fnRt001RoutesAsConfig: MissionDefinition = {
  id: 'rt-001-routes-as-config',
  campaignId: 'ng-routing',
  title: 'The Map Is Config',
  summary:
    'Angular routing in one sentence: a Routes array maps URLs to components, the outlet renders the match, and routerLink navigates without reloading.',
  difficulty: 'intro',
  learningObjectives: [
    'Read a Routes array as a URL-to-component map',
    'Place router-outlet where matched components should render',
    'Choose routerLink over href — and say what href costs',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'New block: the router. The kickoff bug was humble — every click on our nav flashed white before the next page. The app was rebooting on each navigation and nobody had noticed.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The nav used href. A plain anchor asks the BROWSER to navigate: full document load, app torn down, state gone, everything re-bootstrapped. routerLink asks the ROUTER: swap what the outlet renders, keep the app alive. One attribute, two different machines.',
    },
  ],
  contextArtefacts: [
    {
      id: 'routes-map',
      type: 'code',
      title: 'The map and the outlet',
      language: 'ts',
      content:
        "export const routes: Routes = [\n  { path: '', component: DashboardComponent },\n  { path: 'projects', component: ProjectListComponent },\n  { path: '**', component: NotFoundComponent },\n];\n\n// app shell template\n// <nav><a routerLink=\"/projects\">Projects</a></nav>\n// <router-outlet />",
    },
  ],
  challenges: [
    {
      id: 'rt-001-c1',
      type: 'multiple-choice',
      title: 'The White Flash',
      difficulty: 'intro',
      tags: ['angular'],
      storyContext: 'The nav bar: <a href="/projects">Projects</a>. Every click flashes white, and a half-filled search form loses its text.',
      prompt: 'Why does href do this — and what changes with routerLink?',
      options: [
        {
          id: 'a',
          label: 'href skips Angular’s route animations; routerLink enables the transition that hides the flash.',
          isCorrect: false,
          feedback:
            'No animation could hide it — the DOCUMENT is being replaced. The flash is the browser painting a brand-new page.',
        },
        {
          id: 'b',
          label: 'href navigates before lazy chunks finish downloading; routerLink waits for them.',
          isCorrect: false,
          feedback: 'Chunk timing is not the issue — the whole app, chunks and all, is discarded and re-downloaded.',
        },
        {
          id: 'c',
          label:
            'A plain anchor triggers a full browser navigation: the document unloads, the app and all its state are destroyed, and Angular re-bootstraps from zero. routerLink intercepts the click and asks the router to swap the outlet’s component — same document, state intact.',
          isCorrect: true,
          feedback:
            'Two machines: the browser’s document loader and the router’s outlet swap. A SPA only feels like an app while you stay on the second one.',
        },
        {
          id: 'd',
          label: 'href resolves relative to the deployed base path, so each click hits the server 404 page first.',
          isCorrect: false,
          feedback:
            'The pages DID load — via full reloads. Base-path 404s are a different (real) problem; the flash is the reboot.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The form text vanished. What kind of navigation destroys in-memory state?' },
        { level: 2, title: 'Concept', content: 'href → browser document load. routerLink → router outlet swap.' },
        { level: 3, title: 'Specific clue', content: 'The white flash IS the old document being thrown away.' },
        { level: 4, title: 'Guided solution', content: 'Pick the full-reload-vs-outlet-swap answer.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Flash explained' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Every navigation kept rebooting the app — users lost form state daily and blamed “the flaky site”.',
        },
      ],
      helpLinks: [{ topicId: 'routing.route-config', label: 'Route configuration' }],
      successFeedback: 'Same document, new outlet content — the SPA stays an application.',
      failureFeedback: 'Follow the destroyed search text: which navigation style tears down the JS heap?',
    },
    {
      id: 'rt-001-c2',
      type: 'multiple-choice',
      title: 'Read the Map',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext: 'Quiz on the routes array above: a user opens /projects directly in a fresh tab.',
      prompt: 'What happens, in order?',
      options: [
        {
          id: 'a',
          label:
            'The server returns the SPA shell, Angular bootstraps, the router matches "projects" in the Routes array, and ProjectListComponent renders into the router-outlet.',
          isCorrect: true,
          feedback:
            'Deep links are a first load plus a route match — which is why the server must serve the shell for unknown paths (the CDN campaign’s rewrite rule, remembered).',
        },
        {
          id: 'b',
          label: 'The router matches first, then downloads only ProjectListComponent’s template from the server.',
          isCorrect: false,
          feedback: 'Nothing can match before the app exists — bootstrap comes first, and templates are compiled into the bundle.',
        },
        {
          id: 'c',
          label: 'The wildcard ** matches first because it is the most general, then delegates to the projects route.',
          isCorrect: false,
          feedback: 'Matching is first-match-wins in ARRAY ORDER — the wildcard sits last precisely so it matches only leftovers.',
        },
        {
          id: 'd',
          label: 'Fresh tabs always land on path "" — the dashboard renders and the user must click to /projects.',
          isCorrect: false,
          feedback: 'The router matches the URL it is GIVEN — deep links land exactly where they point.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'A fresh tab means no app yet. What must happen before any matching?' },
        { level: 2, title: 'Concept', content: 'Serve shell → bootstrap → match URL → render into outlet.' },
        { level: 3, title: 'Specific clue', content: 'Route order matters: why is ** written last?' },
        { level: 4, title: 'Guided solution', content: 'Pick the shell-bootstrap-match-render sequence.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Map read' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Deep-link handling stayed fuzzy, and the next “404 on refresh” ticket went in circles for a day.',
        },
      ],
      helpLinks: [{ topicId: 'routing.route-config', label: 'Route configuration' }],
      successFeedback: 'Bootstrap, match, render — you can trace any URL through the app now.',
      failureFeedback: 'Start from the empty tab: what does the server send back for /projects?',
    },
  ],
  reflectionPrompt: 'Grep our templates for href="/ — how many browser reboots are hiding in our nav?',
  rewards: [{ type: 'xp', amount: 5, label: 'Map unfolded' }],
};
