import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes boss — the admin area: lazy subtree, layout children,
 * role-gated matching, guarded exits and honest defaults, assembled and
 * signed off as one route configuration.
 */
export const fnRt009BossAdminArea: MissionDefinition = {
  id: 'rt-009-boss-admin-area',
  campaignId: 'ng-routing',
  title: 'Boss: The Admin Area',
  summary:
    'Every routing lesson in one config: the admin area rebuilt — lazy, nested, guarded in and out, with defaults that tell the truth.',
  difficulty: 'boss',
  learningObjectives: [
    'Assemble lazy loading, nesting and guards into one route design',
    'Review a route configuration against the whole block',
    'Sign off the admin routing contract',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The block finale is the ticket that started it: rebuild the admin area. It is where the eager bundle bloat lived, where non-admins once downloaded the user-management code, and where an unsaved role-edit famously died to a logo click.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The sheet: admins only — enforced before the chunk downloads; one shared admin layout; /admin defaults to the dashboard with one canonical URL; the role editor guards its exit; and none of it costs the login page a byte.',
    },
  ],
  contextArtefacts: [
    {
      id: 'admin-sheet',
      type: 'code',
      title: 'The admin area requirements sheet',
      language: 'text',
      content:
        '1. admins only — non-admins never DOWNLOAD admin code\n2. shared admin layout (sidebar + header) around every admin page\n3. /admin alone → dashboard, one canonical URL\n4. role editor asks before discarding unsaved changes\n5. zero admin bytes in the initial bundle',
    },
  ],
  challenges: [
    {
      id: 'rt-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Shape the Config',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'Requirements 1, 2, 3 and 5 decide the top-level shape. Choose it.',
      prompt: 'Which configuration matches the sheet?',
      options: [
        {
          id: 'a',
          label:
            'Eager admin routes behind canActivate: [adminGuard], with the layout duplicated into each admin component template to avoid nesting complexity.',
          isCorrect: false,
          feedback:
            'Requirements 5 and 2 both fail: eager routes ship admin bytes to everyone, and the copy-pasted layout is the drift the children pattern exists to end.',
        },
        {
          id: 'b',
          label:
            "{ path: 'admin', canMatch: [adminGuard], loadChildren: () => import('./admin/admin.routes')... } where ADMIN_ROUTES nests children under AdminLayoutComponent and opens with { path: '', redirectTo: 'dashboard', pathMatch: 'full' }.",
          isCorrect: true,
          feedback:
            'Each sheet line has its mechanism: canMatch blocks the DOWNLOAD, loadChildren splits the bundle, the layout parent shares the frame, the redirect makes one canonical dashboard URL.',
        },
        {
          id: 'c',
          label:
            'Lazy-load with loadChildren and put canActivate: [adminGuard] on each child inside ADMIN_ROUTES, keeping guards close to what they protect.',
          isCorrect: false,
          feedback:
            'Guarding only inside the chunk means the chunk DOWNLOADS before any guard runs — requirement 1 said non-admins never fetch the code, and per-child copies re-run the 14-routes mistake.',
        },
        {
          id: 'd',
          label:
            'A separate admin.example.com deployment — subdomain isolation beats router guards for security-sensitive areas.',
          isCorrect: false,
          feedback:
            'A legitimate architecture — for a different ticket. The sheet describes one app with a gated area; a second deployment answers none of its five lines.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Requirement 1 says non-admins never DOWNLOAD it. Which guard type runs that early?' },
        { level: 2, title: 'Concept', content: 'canMatch gates the chunk; children share the layout; empty-path redirect sets the default.' },
        { level: 3, title: 'Specific clue', content: 'One option guards after the download; one ships everything eagerly.' },
        { level: 4, title: 'Guided solution', content: 'canMatch + loadChildren + layout parent + redirect default.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Shape chosen' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The per-child-guard version shipped; every new admin page began life unguarded until review caught it — or didn’t.',
        },
      ],
      helpLinks: [
        { topicId: 'routing.lazy-loading', label: 'Lazy loading' },
        { topicId: 'routing.guards', label: 'Route guards' },
      ],
      successFeedback: 'Four requirements, four mechanisms, one config — stage 1 clear.',
      failureFeedback: 'Walk a NON-admin through each option: what do they download, and when are they stopped?',
    },
    {
      id: 'rt-009-c2',
      type: 'code-review',
      title: 'Stage 2 — Review the Admin Routes',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'The inner ADMIN_ROUTES file arrives for review. Hold it against the sheet and the block.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'admin-routes',
          type: 'code',
          title: 'admin.routes.ts (proposed)',
          language: 'ts',
          content:
            "export const ADMIN_ROUTES: Routes = [\n  {\n    path: '',\n    component: AdminLayoutComponent,\n    children: [\n      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },\n      { path: 'dashboard', component: AdminDashboardComponent },\n      { path: 'users', component: UserManagementComponent },\n      {\n        path: 'roles/:id',\n        component: RoleEditorComponent,\n        canActivate: [unsavedChangesGuard],\n      },\n      { path: '**', redirectTo: 'dashboard' },\n    ],\n  },\n];",
        },
      ],
      findings: [
        {
          id: 'deactivate-as-activate',
          label:
            'unsavedChangesGuard is registered under canActivate — an exit guard wired to the entrance: it runs (against nothing) when ENTERING the editor, and nothing at all guards leaving with a dirty form',
          isCorrect: true,
          feedback:
            'Requirement 4 dies in one property name: the guard must be canDeactivate: [unsavedChangesGuard], where the router hands it the component being left.',
        },
        {
          id: 'wildcard-swallows',
          label:
            'The section wildcard redirecting to dashboard silently “fixes” typos and dead links — /admin/userss lands on the dashboard with no signal anything was wrong, hiding broken links from users and logs alike',
          isCorrect: true,
          feedback:
            'Mission 3’s warning, shipped: inside a section, unmatched paths deserve a visible not-found (or no wildcard, deferring to the app-level one) — not a silent teleport to safety.',
        },
        {
          id: 'empty-layout-path',
          label: 'The layout route’s empty path is a smell — the chunk’s root route should repeat "admin" so the file stands alone',
          isCorrect: false,
          feedback:
            'The parent config already consumed the admin segment — repeating it here would demand /admin/admin. Empty-path layout parents are exactly how lazy children compose.',
        },
        {
          id: 'redirect-pathmatch',
          label: "The dashboard redirect's pathMatch: 'full' is wrong inside children — prefix matching is required for nested defaults",
          isCorrect: false,
          feedback:
            "Backwards: an empty-path redirect WITHOUT pathMatch: 'full' would prefix-match every sibling URL and redirect them all to the dashboard. 'full' is the load-bearing part.",
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check each guard’s TYPE against its job, and walk a typo’d URL through the config.' },
        { level: 2, title: 'Concept', content: 'canActivate guards entry; canDeactivate guards exit; wildcards inside sections hide 404s.' },
        { level: 3, title: 'Specific clue', content: 'The empty path and the pathMatch are the healthy lines.' },
        { level: 4, title: 'Guided solution', content: 'Flag the misfiled exit guard and the typo-swallowing wildcard.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Routes reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The role editor lost a dirty form on nav-away in UAT — requirement 4 failed its own acceptance test.',
        },
      ],
      helpLinks: [
        { topicId: 'routing.guards', label: 'Route guards' },
        { topicId: 'routing.route-config', label: 'Route configuration' },
      ],
      successFeedback: 'Guard types checked against their jobs, defaults checked for honesty — review at block standard.',
      failureFeedback: 'One guard is on the wrong DOOR. And where does /admin/userss (two s’s) take you?',
    },
    {
      id: 'rt-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign Off the Area',
      difficulty: 'boss',
      tags: ['angular'],
      storyContext: 'Two complete admin configurations survived review. The sheet decides — all five lines.',
      prompt: 'Which admin area meets the sheet?',
      options: [
        {
          id: 'a',
          label:
            "canMatch: [adminGuard] + loadChildren on 'admin'; inside: empty-path AdminLayoutComponent parent, redirect '' → 'dashboard' (pathMatch full), users route, roles/:id with canDeactivate: [unsavedChangesGuard], and preloading via a strategy that consults auth state before warming the chunk.",
          isCorrect: true,
          feedback:
            'All five sheet lines, each with the mechanism the block built for it — and the preload respects the same rule as the guard, so warm chunks never leak to non-admins. Signed.',
        },
        {
          id: 'b',
          label:
            "canActivate: [adminGuard] + loadChildren on 'admin' with data: { preload: true } under PreloadAllModules; inside: layout parent, dashboard default via a duplicate empty-path component child, roles/:id with canDeactivate.",
          isCorrect: false,
          feedback:
            'Two leaks: canActivate runs AFTER the chunk resolves and blanket preloading warms it for everyone — non-admins download admin code twice over (line 1) — and the duplicate-child default forks the dashboard URL (line 3).',
        },
        {
          id: 'c',
          label:
            "canMatch: [adminGuard] + loadChildren; inside: no layout parent — each admin page imports AdminSidebarComponent directly; '' → 'dashboard' redirect; roles/:id guarded by window.onbeforeunload inside RoleEditorComponent.",
          isCorrect: false,
          feedback:
            'Line 2 falls to template-import copy-paste (the drift returns), and line 4 falls to mission 7: beforeunload never fires for router navigations — the logo click still eats the dirty form.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Score each candidate against all five lines — two candidates fail two lines each.' },
        { level: 2, title: 'Concept', content: 'Download gating needs canMatch AND auth-aware preloading; exit safety needs canDeactivate.' },
        { level: 3, title: 'Specific clue', content: 'One candidate guards navigation but not the preloader; one trusts beforeunload.' },
        { level: 4, title: 'Guided solution', content: 'Sign the canMatch + auth-aware-preload + canDeactivate candidate.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Area signed' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'The signed-off area preloaded admin chunks to every visitor — the bandwidth bill flagged it before security did.',
        },
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The routing block’s own capstone leaked admin code — the sessions’ credibility took the hit.',
        },
      ],
      helpLinks: [
        { topicId: 'routing.guards', label: 'Route guards' },
        { topicId: 'routing.preloading', label: 'Preloading strategies' },
        { topicId: 'routing.lazy-loading', label: 'Lazy loading' },
      ],
      successFeedback:
        'Gated before download, framed once, defaulting honestly, guarding its exits, invisible to the initial bundle — the admin area ships. Campaign complete.',
      failureFeedback:
        'Line 1 is the sharpest test: for each candidate, list every path by which a non-admin’s browser could fetch admin bytes.',
    },
  ],
  reflectionPrompt: 'Audit our own admin routes against the five-line sheet: which line do we fail today?',
  rewards: [{ type: 'xp', amount: 25, label: 'Area shipped' }],
};
