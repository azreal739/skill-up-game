import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — canDeactivate and the navigation lifecycle: guarding the
 * exit, and reading router events when navigations die mysteriously.
 */
export const fnRt007LeavingSafely: MissionDefinition = {
  id: 'rt-007-leaving-safely',
  campaignId: 'ng-routing',
  title: 'Leaving Safely',
  summary:
    'canDeactivate guards the exit — unsaved work gets a say before navigation proceeds — and router events narrate every navigation’s fate.',
  difficulty: 'hard',
  learningObjectives: [
    'Guard exits with a functional canDeactivate',
    'Design the unsaved-changes conversation without trapping users',
    'Read the router event sequence to debug dead navigations',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session seven: the editor team’s oldest wound. A user wrote a forty-minute incident report, clicked the logo out of habit, and the SPA — efficient as ever — discarded the component and the draft with it. No warning, no undo.',
    },
    {
      speaker: 'Senior Dev',
      text: 'canActivate guards the way IN; canDeactivate guards the way OUT. It receives the component being left, so it can ask “anything unsaved?” — and pause the navigation on a confirm dialog. And when a navigation dies with no visible reason, the router events stream is the flight recorder: NavigationStart, then Cancel with a reason code, or Error.',
    },
  ],
  contextArtefacts: [
    {
      id: 'exit-guard',
      type: 'code',
      title: 'The exit guard',
      language: 'ts',
      content:
        "export const unsavedChangesGuard: CanDeactivateFn<ReportEditorComponent> = (component) =>\n  component.isDirty()\n    ? inject(ConfirmDialog).ask('Discard unsaved report?')  // Observable<boolean>\n    : true;\n\n{\n  path: 'reports/new',\n  component: ReportEditorComponent,\n  canDeactivate: [unsavedChangesGuard],\n}",
    },
  ],
  challenges: [
    {
      id: 'rt-007-c1',
      type: 'multiple-choice',
      title: 'Guarding the Exit',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'The forty-minute report is the ticket. The team debates four protections.',
      prompt: 'Which design actually protects the draft?',
      options: [
        {
          id: 'a',
          label:
            'canDeactivate on the editor route: if the component reports dirty state, return the confirm dialog’s Observable<boolean> — the router waits for the answer and proceeds or stays; clean exits pass with true instantly.',
          isCorrect: true,
          feedback:
            'The guard receives the COMPONENT, so dirtiness stays the component’s own truth — and async returns mean the router genuinely pauses mid-navigation for the human.',
        },
        {
          id: 'b',
          label: 'window.onbeforeunload with a “changes may be lost” message — the browser-native protection covers all exits.',
          isCorrect: false,
          feedback:
            'beforeunload fires on DOCUMENT unload — tab close, href, refresh. Router navigations never unload the document (mission 1!), so the logo click sails past it.',
        },
        {
          id: 'c',
          label: 'Disable all navigation UI — nav links, logo, back button — while the editor form is dirty.',
          isCorrect: false,
          feedback:
            'A cage, not a guard: users MEAN to leave sometimes, browser back cannot be disabled, and hidden nav reads as a broken site.',
        },
        {
          id: 'd',
          label: 'Autosave every keystroke to the server so leaving costs nothing and no guard is needed.',
          isCorrect: false,
          feedback:
            'Autosave is a fine COMPANION, but as the only defence it silently persists half-typed drafts the user meant to abandon — and fails exactly when the network does.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The exit was an in-app navigation. Which mechanisms even fire for those?' },
        { level: 2, title: 'Concept', content: 'canDeactivate: the guard that receives the component and may return async.' },
        { level: 3, title: 'Specific clue', content: 'Mission 1 explains why beforeunload never saw the logo click.' },
        { level: 4, title: 'Guided solution', content: 'Pick the canDeactivate + confirm-Observable design.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Exit guarded' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The forty-minute-report loss repeated weekly — the editor earned a “write it in Notepad first” reputation.',
        },
      ],
      helpLinks: [{ topicId: 'routing.guards', label: 'Route guards' }],
      successFeedback: 'The way out has a guard who asks first — drafts stopped dying to logo clicks.',
      failureFeedback: 'Which mechanisms observe an OUTLET SWAP, as opposed to a document unload?',
    },
    {
      id: 'rt-007-c2',
      type: 'multiple-choice',
      title: 'The Flight Recorder',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'Bug: “sometimes clicking Reports does nothing.” No console errors. Router event logging shows: NavigationStart → GuardsCheckStart → GuardsCheckEnd → NavigationCancel (code: GuardRejected).',
      prompt: 'What does the recording tell you, and where do you look next?',
      options: [
        {
          id: 'a',
          label: 'The lazy chunk failed to download — look at the network tab for the failed reports chunk request.',
          isCorrect: false,
          feedback:
            'A chunk failure surfaces as NavigationError after the guards phase — this recording shows a clean, deliberate Cancel during guards.',
        },
        {
          id: 'b',
          label:
            'A guard on the reports path returned false (not a UrlTree — that would show a redirecting cancel): the navigation was cancelled ON PURPOSE with no user feedback. Audit the canActivate/canMatch chain for the silent-false case — likely a race where the auth state reads as logged-out for a moment.',
          isCorrect: true,
          feedback:
            'The events narrate it precisely: guards ran, one said no, nothing redirected. “Sometimes” points at time — an auth signal that is briefly false while a token refreshes is the classic culprit.',
        },
        {
          id: 'c',
          label: 'NavigationCancel is normal noise — the router cancels and retries internally; the real bug is elsewhere.',
          isCorrect: false,
          feedback:
            'The router never retries cancelled navigations — every Cancel is a final verdict with a reason code worth reading.',
        },
        {
          id: 'd',
          label: 'The Reports routerLink is malformed — a bad path logs GuardsCheck events before failing to match.',
          isCorrect: false,
          feedback:
            'An unmatched URL cancels at ROUTE RECOGNITION, before any guard events — this navigation matched fine and was then rejected.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Read the sequence like a timeline. Which phase did the navigation die in?' },
        { level: 2, title: 'Concept', content: 'Cancel-during-guards = a guard said no; Error = something threw; no-match dies earlier.' },
        { level: 3, title: 'Specific clue', content: '“Sometimes” + guard rejection: what state could FLICKER false?' },
        { level: 4, title: 'Guided solution', content: 'Silent guard false, likely an auth-state race.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Recorder read' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'Without the event log, the “dead click” bug got a setTimeout-and-retry workaround instead of a diagnosis.',
        },
      ],
      helpLinks: [
        { topicId: 'routing.guards', label: 'Route guards' },
        { topicId: 'routing.route-config', label: 'Route configuration' },
      ],
      successFeedback: 'Phase by phase, cancel codes and all — dead navigations can’t hide from you now.',
      failureFeedback: 'Match each option to the phase it would die in. Only one dies exactly where this log shows.',
    },
  ],
  reflectionPrompt: 'Which editor or form in our app can still lose forty minutes of work to one habitual logo click?',
  rewards: [{ type: 'xp', amount: 15, label: 'Exits secured' }],
};
