import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — the injection context: inject() works during construction,
 * not in arbitrary callbacks; DestroyRef and runInInjectionContext.
 */
export const fnDi007InjectionContext: MissionDefinition = {
  id: 'di-007-injection-context',
  campaignId: 'ng-di-providers',
  title: 'The Context Window',
  summary:
    'inject() only answers while an injection context is open — field initialisers and constructors, not click handlers and timers.',
  difficulty: 'hard',
  learningObjectives: [
    'Predict where inject() works and where it throws NG0203',
    'Capture dependencies during construction for later use',
    'Use DestroyRef for cleanup without lifecycle interfaces',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session seven, a bug from that morning: inject(HttpClient) inside a button’s click handler — NG0203, “inject() must be called from an injection context”. The author’s defence: “it worked in the constructor, why not here?”',
    },
    {
      speaker: 'Senior Dev',
      text: 'Because inject() is not a global lookup — it reads a context that Angular opens while it is CONSTRUCTING something and closes right after. Field initialisers and constructors run inside that window. A click handler runs hours later, window long closed. The pattern: ask during construction, hold the reference, use it whenever.',
    },
  ],
  contextArtefacts: [
    {
      id: 'context-window',
      type: 'code',
      title: 'Inside vs outside the window',
      language: 'ts',
      content:
        "export class ReportButtonComponent {\n  private http = inject(HttpClient);      // ✅ field initialiser — window open\n  private destroyRef = inject(DestroyRef); // ✅ capture cleanup hook now\n\n  onClick() {\n    // ❌ inject(HttpClient) here → NG0203 — window closed\n    this.http.post('/api/reports', {}).subscribe(); // ✅ captured reference\n  }\n}",
    },
  ],
  challenges: [
    {
      id: 'di-007-c1',
      type: 'multiple-choice',
      title: 'Why the Handler Throws',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'The NG0203 stack trace points at inject(HttpClient) inside onClick. The constructor version worked fine.',
      prompt: 'Why does the same call succeed at construction and throw in the handler?',
      options: [
        {
          id: 'a',
          label: 'Click handlers run outside the zone, and inject() needs zone.js to locate the injector.',
          isCorrect: false,
          feedback:
            'DI never depended on the zone — the signals campaign runs without one. The missing piece is the construction-time context, not zone patching.',
        },
        {
          id: 'b',
          label:
            'inject() reads an injection context that Angular opens only while constructing the component (fields, constructor) — by the time onClick fires, no construction is happening, so there is no context to read. Capture the dependency in a field and use the reference in the handler.',
          isCorrect: true,
          feedback:
            'The window model, exactly: ask while the injector is on the line, keep the answer, use it forever after.',
        },
        {
          id: 'c',
          label: 'HttpClient specifically is constructor-only; other services can be injected from handlers.',
          isCorrect: false,
          feedback: 'The rule is about WHEN, not WHICH — every token throws NG0203 outside the window.',
        },
        {
          id: 'd',
          label: 'The component’s injector is destroyed after construction to save memory, taking its recipes with it.',
          isCorrect: false,
          feedback:
            'The injector lives as long as the component — otherwise child components could never resolve. What ends is the CONTEXT marking “construction in progress”.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What is different about the MOMENT, not the place?' },
        { level: 2, title: 'Concept', content: 'A context is open during construction and closed after — inject() reads it.' },
        { level: 3, title: 'Specific clue', content: 'The fix is one captured field reference.' },
        { level: 4, title: 'Guided solution', content: 'Pick the ask-during-construction answer.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Window seen' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -6,
          reason: 'NG0203 became “Angular being weird” — and inject calls got wrapped in try/catch across the feature.',
        },
      ],
      helpLinks: [{ topicId: 'di.injection-context', label: 'Injection context' }],
      successFeedback: 'Ask early, hold the reference — the context window will never surprise you again.',
      failureFeedback: 'The call site moved in TIME, not just in code. What exists at construction that is gone at click-time?',
    },
    {
      id: 'di-007-c2',
      type: 'multiple-choice',
      title: 'Cleanup Without Ceremony',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'A utility function startPolling(intervalMs) is called from a component’s constructor. It must stop its timer when the calling component is destroyed — without the component implementing OnDestroy.',
      prompt: 'How does the utility hook the caller’s destruction?',
      options: [
        {
          id: 'a',
          label: 'Utilities cannot know about component lifecycles — the component must implement OnDestroy and call a stop() method.',
          isCorrect: false,
          feedback:
            'That is exactly the ceremony DestroyRef removes: called during construction, the utility can register its OWN cleanup invisibly.',
        },
        {
          id: 'b',
          label: 'Poll inside requestAnimationFrame — browsers cancel rAF loops for removed DOM automatically.',
          isCorrect: false,
          feedback: 'rAF pauses for hidden tabs, not destroyed components — the loop keeps scheduling against a dead view.',
        },
        {
          id: 'c',
          label:
            'Because startPolling runs in the caller’s injection context, it can inject(DestroyRef) — the CALLER’s — and register destroyRef.onDestroy(() => clearInterval(id)); the timer dies with whichever component called it.',
          isCorrect: true,
          feedback:
            'The context window as a feature: a plain function, called during construction, gets the caller’s injector — DestroyRef makes cleanup composable. This is how takeUntilDestroyed works inside.',
        },
        {
          id: 'd',
          label: 'Store the interval id in a module-level array and clear all of them on router navigation.',
          isCorrect: false,
          feedback:
            'Global cleanup on navigation kills timers of components that survived and misses destroys that happen without navigating.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Where is startPolling CALLED from — and what does that context give it?' },
        { level: 2, title: 'Concept', content: 'DestroyRef: injectable destruction hook — anyone in the window can register cleanup.' },
        { level: 3, title: 'Specific clue', content: 'takeUntilDestroyed() is built from exactly this move.' },
        { level: 4, title: 'Guided solution', content: 'inject(DestroyRef) inside the utility, onDestroy → clearInterval.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Cleanup composed' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'Orphan polling timers stacked up with every route change — the API saw a slow, self-inflicted DDoS.',
        },
      ],
      helpLinks: [
        { topicId: 'di.injection-context', label: 'Injection context' },
        { topicId: 'rx.subscriptions', label: 'Subscription cleanup' },
      ],
      successFeedback: 'Functions that clean up after their callers — the context window earning its keep.',
      failureFeedback: 'The utility runs during the caller’s construction. What can it inject in that moment?',
    },
  ],
  reflectionPrompt: 'Which of our helpers make callers implement OnDestroy for cleanup that inject(DestroyRef) could own?',
  rewards: [{ type: 'xp', amount: 15, label: 'Context mastered' }],
};
