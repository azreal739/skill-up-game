import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — unknown vs any and assertions (knowledge pack 07:
 * "Overusing any" and "Type assertions in Angular templates" were both
 * real review findings on this team).
 */
export const fnTs008UnknownAny: MissionDefinition = {
  id: 'ts-fund-008-unknown-any',
  campaignId: 'ts-fundamentals',
  title: 'unknown, any & the as Escape Hatch',
  summary:
    'Treat boundaries with respect: unknown forces narrowing, any disables it, and as asserts what nothing verified.',
  difficulty: 'hard',
  learningObjectives: [
    'Type boundary data as unknown and narrow inward',
    'Say precisely why any is a last resort',
    'Recognise assertions that silence rather than prove',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Rule from the session, verbatim: every any needs a justification in review. Not a ban — a justification. Most of ours had none.',
    },
    {
      speaker: 'Senior Dev',
      text: 'And the twin rule: data crossing a boundary — HTTP, storage, postMessage — arrives as unknown. You earn the type by checking, not by asserting.',
    },
  ],
  contextArtefacts: [
    {
      id: 'boundary',
      type: 'code',
      title: 'The boundary in question',
      language: 'ts',
      content:
        "const raw = localStorage.getItem('draft');\nconst draft = JSON.parse(raw ?? '{}');\n// draft is any from here on…",
    },
  ],
  challenges: [
    {
      id: 'tsf-008-c1',
      type: 'multiple-choice',
      title: 'Type the Boundary',
      difficulty: 'hard',
      tags: ['typescript'],
      storyContext:
        'JSON.parse returns any, and draft flows into four components untouched. The team wants the compiler back on duty.',
      prompt: 'What is the disciplined first move?',
      options: [
        {
          id: 'a',
          label: 'const draft = JSON.parse(raw ?? \'{}\') as Draft;',
          isCorrect: false,
          feedback:
            'as verifies nothing — a hand-edited localStorage entry still walks in wearing a Draft badge.',
        },
        {
          id: 'b',
          label:
            'const draft: unknown = JSON.parse(raw ?? \'{}\');\n// then narrow (guard or schema) before use',
          isCorrect: true,
          feedback:
            'unknown makes every use a compile error until you check — the checking is where safety actually comes from.',
        },
        {
          id: 'c',
          label: 'Keep any here; parse results are impossible to type.',
          isCorrect: false,
          feedback:
            'They are not impossible — unknown plus a guard (or a Zod schema at the boundary) types them honestly.',
        },
        {
          id: 'd',
          label: 'const draft: Draft = JSON.parse(raw ?? \'{}\');',
          isCorrect: false,
          feedback:
            'An annotation on an any expression is an assertion in disguise — same silence, different syntax.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which option forces a check before the first use?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'unknown is the honest boundary type: assignable from anything, usable only after narrowing.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Both as Draft and : Draft trust the data without looking at it. One option refuses to trust.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose unknown-then-narrow — the only option where a malformed draft cannot reach the components.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Boundary hardened' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'A malformed saved draft crashed four components that trusted an assertion.',
        },
      ],
      helpLinks: [
        { topicId: 'typescript.unknown-vs-any', label: 'unknown vs any' },
        { topicId: 'zod.runtime-validation', label: 'Validating at boundaries' },
      ],
      successFeedback:
        'unknown puts the compiler back between bad data and your components.',
      failureFeedback:
        'Assertions and annotations both skip the check. Find the option that makes checking mandatory.',
    },
    {
      id: 'tsf-008-c2',
      type: 'code-review',
      title: 'Review: The as Audit',
      difficulty: 'hard',
      tags: ['typescript', 'angular'],
      storyContext:
        'A quick sweep for assertions before the release branch cuts. Same rules as our real audit.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'audit',
          type: 'code',
          title: 'Three assertions from the sweep',
          language: 'ts',
          content:
            "// A — settings.component.html (template)\n<input (change)=\"setSize(($event.target as HTMLInputElement).value)\" />\n\n// B — api.service.ts\nconst user = (await res.json()) as User;\n\n// C — chart.util.ts\nconst el = document.getElementById('chart') as HTMLCanvasElement | null;",
        },
      ],
      findings: [
        {
          id: 'template-cast',
          label: 'A: an as cast inside an Angular template expression',
          isCorrect: true,
          feedback:
            'The exact parser error from our sprint — templates are not TypeScript. Move the cast into a component method.',
        },
        {
          id: 'canvas-cast',
          label: 'C: asserting a DOM lookup to a concrete element type',
          isCorrect: false,
          feedback:
            'A DOM narrowing the developer genuinely knows, kept nullable — this is the acceptable face of as.',
        },
        {
          id: 'json-cast',
          label: 'B: asserting a network payload straight to User with no validation',
          isCorrect: true,
          feedback:
            'The server is a boundary — parse then validate (guard or schema); as User just silences the compiler.',
        },
        {
          id: 'all-as-banned',
          label: 'All three: any use of as should fail review on principle',
          isCorrect: false,
          feedback:
            'Our rule was justification, not prohibition — C carries its justification; A and B do not.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Judge each as by what verifies the claim it makes.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'An assertion is acceptable when the developer holds knowledge the compiler cannot — and unacceptable when nothing holds that knowledge.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'One issue is about where the cast lives (templates); one is about unvalidated boundary data.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Flag the template cast and the JSON-to-User assertion. The nullable canvas lookup stands.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Audit complete' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 9,
          reason: 'Unjustified assertions merged and normalised — the next any cited them as precedent.',
        },
      ],
      helpLinks: [
        { topicId: 'typescript.unknown-vs-any', label: 'unknown vs any' },
      ],
      successFeedback:
        'Justified narrowing stays; silencing goes. That is a review the compiler would thank you for.',
      failureFeedback:
        'Not all as is equal — ask what evidence backs each one, and where the expression is even allowed to live.',
    },
  ],
  reflectionPrompt: 'What justification would you write for the last as you committed?',
  rewards: [{ type: 'xp', amount: 15, label: 'Escape hatches audited' }],
};
