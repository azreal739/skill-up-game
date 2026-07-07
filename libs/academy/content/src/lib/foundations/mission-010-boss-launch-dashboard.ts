import { MissionDefinition } from '@academy/content-model';

/**
 * Boss — "Launch the Dashboard" (13_CAMPAIGN_CONTENT_PACKS.md). Multi-stage
 * incident combining the whole campaign: contracts, component review,
 * test triage and the launch decision itself.
 */
export const mission010BossLaunchDashboard: MissionDefinition = {
  id: 'foundations-010-boss-launch-dashboard',
  campaignId: 'foundations',
  title: 'Boss: Launch the Dashboard',
  summary: 'Dashboard v2 launches today. Run the full pre-flight and make the release call.',
  difficulty: 'boss',
  learningObjectives: [
    'Apply contract, code and test judgement under launch pressure',
    'Triage a failing CI check the right way',
    'Make a responsible release decision',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'This is it. Dashboard v2 — the feature the whole campaign has been building towards — launches today. You are running pre-flight.',
    },
    {
      speaker: 'Mission Control',
      text: 'Four checkpoints stand between you and launch: the API contract, a final component review, a CI triage, and the release decision itself. Everything you have learned applies. Good luck, engineer.',
    },
  ],
  contextArtefacts: [
    {
      id: 'launch-ticket',
      type: 'ticket',
      title: 'RELEASE-2041 — Dashboard v2 launch',
      content:
        'Scope: customer dashboard v2 (new widgets, live refresh)\nRisk: high visibility, all customers\nMitigations available: feature flag "dashboard-v2", staged rollout, on-call briefed\nGo/no-go: today 16:00',
    },
  ],
  challenges: [
    {
      id: 'foundations-010-c1',
      type: 'contract-comparison',
      title: 'Stage 1 — Pre-flight the Contract',
      difficulty: 'hard',
      tags: ['api', 'typescript', 'java'],
      storyContext:
        'The dashboard polls the Java widgets endpoint. Verify the contract before customers do.',
      artefacts: [
        {
          id: 'widgets-payload',
          type: 'api-response',
          title: 'Staging response — GET /dashboard/widgets',
          language: 'json',
          content:
            '{\n  "widgets": [\n    { "id": "sales", "title": "Sales" }\n  ],\n  "refreshSeconds": "30"\n}',
        },
        {
          id: 'widgets-interface',
          type: 'code',
          title: 'Front-end contract',
          language: 'ts',
          content:
            'interface WidgetsResponse {\n  widgets: Array<{ id: string; title: string }>;\n  refreshSeconds: number;\n}',
        },
      ],
      prompt: 'What will break when the dashboard consumes this payload?',
      options: [
        {
          id: 'a',
          label: 'The widgets array is missing its data property',
          isCorrect: false,
          feedback: 'The widget objects match the interface exactly — id and title, both strings.',
        },
        {
          id: 'b',
          label: 'refreshSeconds arrives as the string "30" but the contract promises a number',
          isCorrect: true,
          feedback:
            'Any arithmetic on the refresh interval — setInterval(fn, refreshSeconds * 1000) — will misbehave or the Zod boundary will reject it. Same class of drift as the Broken Card incident.',
        },
        {
          id: 'c',
          label: 'The payload keys are camelCase but the interface expects snake_case',
          isCorrect: false,
          feedback: 'Both sides use camelCase — the names line up; one type does not.',
        },
        {
          id: 'd',
          label: 'Nothing — the payload matches the contract',
          isCorrect: false,
          feedback: 'Look at the quotes around 30. One field disagrees with its declared type.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Compare every field: same name, same type?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'TypeScript contracts are erased at runtime — a payload can disagree with the interface and still compile. Field-by-field comparison at the boundary is the only defence.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'You saw this exact pattern in the Broken Card incident. Check refreshSeconds.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'The payload delivers refreshSeconds as "30" (string); the contract says number. Select that mismatch.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Contract verified' }],
      consequences: [
        {
          type: 'severity',
          delta: 1,
          reason: 'The contract drift reached production polling logic.',
        },
      ],
      helpLinks: [
        { topicId: 'api.contract-drift', label: 'Contract drift' },
        { topicId: 'zod.runtime-validation', label: 'Runtime validation' },
      ],
      successFeedback: 'Caught before launch — a Zod boundary with z.coerce.number() ships with v2.',
      failureFeedback: 'Field by field: names first, then types. One of them lies.',
    },
    {
      id: 'foundations-010-c2',
      type: 'code-review',
      title: 'Stage 2 — Final Component Review',
      difficulty: 'hard',
      tags: ['angular', 'typescript'],
      storyContext: 'Last review before the merge freeze. Two real defects hide in this component.',
      artefacts: [
        {
          id: 'dashboard-component',
          type: 'code',
          title: 'dashboard-v2.component.ts',
          language: 'ts',
          content:
            "@Component({\n  selector: 'app-dashboard-v2',\n  standalone: true,\n  imports: [CommonModule, WidgetGridComponent],\n  templateUrl: './dashboard-v2.component.html',\n})\nexport class DashboardV2Component implements OnInit {\n  @Input({ required: true }) customerId!: string;\n  widgets: any;\n  private poller?: Poller;\n\n  ngOnInit(): void {\n    this.poller!.start();\n  }\n}",
        },
      ],
      prompt: 'Select every genuine defect before the freeze.',
      findings: [
        {
          id: 'any-widgets',
          label: 'widgets is typed any — every widget read is unchecked',
          isCorrect: true,
          feedback:
            'any disables the compiler for the dashboard’s core data. Type it against the validated WidgetsResponse.',
        },
        {
          id: 'required-input',
          label: '@Input({ required: true }) with the ! assertion on customerId',
          isCorrect: false,
          feedback:
            'This is the standard pattern: required inputs are enforced by the compiler at every call site, so the ! is honest.',
        },
        {
          id: 'implements-oninit',
          label: 'Implementing OnInit for startup work is an anti-pattern',
          isCorrect: false,
          feedback: 'ngOnInit is exactly where post-construction startup logic belongs.',
        },
        {
          id: 'poller-assertion',
          label: 'ngOnInit calls this.poller!.start() but poller is optional and never assigned',
          isCorrect: true,
          feedback:
            'poller? is undefined at init — the ! assertion turns a compile-time warning into a guaranteed runtime crash on the first render.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Hunt for the compiler escape hatches you flagged on Type Safety Patrol.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'any and unjustified non-null assertions both silence the compiler. The required-input ! is the one honest use: the framework guarantees the value before first use.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'One offender is a property type; the other is an assertion on something never assigned.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Flag the any on widgets and the poller!.start() call. The required input and OnInit are fine.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Freeze-ready' }],
      consequences: [
        {
          type: 'stability',
          delta: -10,
          reason: 'The dashboard crashed on first render for early-access users.',
        },
      ],
      helpLinks: [
        { topicId: 'typescript.strict-null-checks', label: 'Strict null checks' },
        { topicId: 'angular.components', label: 'Component basics' },
      ],
      successFeedback: 'Clean review under pressure — the merge freeze can begin.',
      failureFeedback:
        'Compare the two ! assertions: one is backed by a framework guarantee, one by hope.',
    },
    {
      id: 'foundations-010-c3',
      type: 'multiple-choice',
      title: 'Stage 3 — CI Triage',
      difficulty: 'hard',
      tags: ['testing', 'cicd'],
      storyContext:
        'T-minus two hours. CI is red: one spec, “rotates the promo widget after midnight”, fails only on the nightly run — it constructs new Date() inside the assertion.',
      prompt: 'What is the right call on the red build?',
      options: [
        {
          id: 'a',
          label: 'Delete the test — it is clearly more trouble than it is worth',
          isCorrect: false,
          feedback:
            'The behaviour it covers is real; deleting it trades a flake for a blind spot.',
        },
        {
          id: 'b',
          label: 'Re-run the pipeline until it goes green and merge quickly before midnight',
          isCorrect: false,
          feedback:
            'Re-rolling the dice normalises red builds — the flake will fire again at the worst moment.',
        },
        {
          id: 'c',
          label: 'Fix the test now: inject a fixed clock so the assertion is deterministic',
          isCorrect: true,
          feedback:
            'The test is wrong, not the code. A controlled clock makes it deterministic and CI trustworthy again — exactly what you flagged in First Test Run.',
        },
        {
          id: 'd',
          label: 'Mark the whole suite as allowed-to-fail for launch day',
          isCorrect: false,
          feedback:
            'Disabling the safety net on the highest-risk day of the quarter is the worst possible trade.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Is the code broken, or is the test broken? The answer decides everything.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Flaky tests come from uncontrolled inputs — real clocks, randomness, network. The fix is controlling the input, not silencing the signal.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'new Date() inside a test is the same defect you flagged in the spec audit.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose the fixed-clock fix — deterministic input, honest green build, launch stays on.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'CI trustworthy' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 10,
          reason: 'A silenced test suite let a regression board the release train.',
        },
      ],
      helpLinks: [
        { topicId: 'testing.flaky-tests', label: 'Flaky tests' },
        { topicId: 'testing.unit-tests', label: 'Unit tests' },
      ],
      successFeedback: 'Green because it is right, not because it was re-rolled.',
      failureFeedback:
        'Neither deleting the signal nor gambling on re-runs fixes the actual defect in the test.',
    },
    {
      id: 'foundations-010-c4',
      type: 'multiple-choice',
      title: 'Stage 4 — The Launch Decision',
      difficulty: 'boss',
      tags: ['cicd', 'incident-response'],
      storyContext:
        '15:55. Contract secured, review clean, CI honestly green. The feature flag "dashboard-v2" is wired, dashboards are on the wall, on-call is briefed. Mission Control turns to you.',
      prompt: 'Make the call.',
      options: [
        {
          id: 'a',
          label: 'Hold the launch a week — something could still be wrong somewhere',
          isCorrect: false,
          feedback:
            'Every pre-flight check passed. Indefinite caution has costs too: the mitigations exist precisely so you can ship.',
        },
        {
          id: 'b',
          label:
            'Launch behind the feature flag at 10% of customers, watch the dashboards, then ramp up',
          isCorrect: true,
          feedback:
            'A staged rollout turns a potential all-customer incident into a contained observation with an instant kill switch. This is what responsible shipping looks like.',
        },
        {
          id: 'c',
          label: 'Flip it on for 100% of customers at once — everything is green, go big',
          isCorrect: false,
          feedback:
            'Green checks reduce risk; they do not eliminate it. Going big-bang throws away the flag’s entire value.',
        },
        {
          id: 'd',
          label: 'Launch to everyone and check the dashboards tomorrow morning',
          isCorrect: false,
          feedback:
            'Unwatched launches turn small anomalies into overnight incidents. Observation is part of the release.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'The ticket lists your mitigations. The best call uses them.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Feature flags separate deploying from releasing: expose a slice of traffic, verify reality against the dashboards, expand or kill instantly. Risk is managed, not avoided or ignored.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'One option uses the flag, the rollout, and the monitoring — the other three each discard something.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Launch at 10% behind the flag with eyes on the dashboards, then ramp. Ship it.',
        },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Dashboard launched' }],
      consequences: [
        {
          type: 'severity',
          delta: 1,
          reason: 'The launch call increased customer exposure without a safety net.',
        },
        {
          type: 'team-confidence',
          delta: -10,
          reason: 'The team watched risk being taken on their behalf.',
        },
      ],
      helpLinks: [
        { topicId: 'delivery.feature-flags', label: 'Feature flags' },
        { topicId: 'incident.rollback-vs-hotfix', label: 'Rollback vs hotfix' },
      ],
      successFeedback:
        'Dashboard v2 is live, ramping smoothly, and the kill switch was never needed. Production is safe in your hands.',
      failureFeedback:
        'The best launch uses every mitigation on the ticket: the flag, the gradual ramp, and the watching eyes.',
    },
  ],
  reflectionPrompt:
    'Across the whole campaign — which single habit would have prevented the most incidents: typed models, validated boundaries, honest tests, or staged rollouts? Argue your pick.',
  rewards: [{ type: 'xp', amount: 25, label: 'Campaign boss defeated' }],
};
