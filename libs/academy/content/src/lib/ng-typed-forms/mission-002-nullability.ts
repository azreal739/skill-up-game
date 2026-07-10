import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — form nullability (knowledge pack 07: "Ignoring typed form
 * nullability" — controls initialised with strings can still reset to null).
 */
export const fnTf002Nullability: MissionDefinition = {
  id: 'tf-002-nullability',
  campaignId: 'ng-typed-forms',
  title: 'The null That reset() Brings',
  summary:
    'The team’s real forms bug: a control born with a string reset to null, and the code downstream never expected it.',
  difficulty: 'easy',
  learningObjectives: [
    'Explain why default controls type as T | null',
    'Trace the reset() path that reintroduces null',
    'Handle string | null honestly at the read site',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: 'Our bug, replayed: the search filter control started as FormControl("") and a Clear button called form.reset(). The filter pipeline then called query.toLowerCase() — on null.',
    },
    {
      speaker: 'Team Lead',
      text: 'The session rule: teach reset behaviour EARLY. A control’s type includes null unless you explicitly opt out, because reset() without arguments installs null, not the initial value.',
    },
  ],
  contextArtefacts: [
    {
      id: 'reset-bug',
      type: 'code',
      title: 'The Clear-button incident',
      language: 'ts',
      content:
        "readonly query = new FormControl('');\n// type: FormControl<string | null>\n\nclearFilters() {\n  this.filterForm.reset(); // query.value is now null\n}\n\napplyFilter(q = this.query.value) {\n  return items.filter((i) => i.name.includes(q.toLowerCase())); // 💥\n}",
    },
  ],
  challenges: [
    {
      id: 'tf-002-c1',
      type: 'multiple-choice',
      title: 'Explain the Crash',
      difficulty: 'easy',
      tags: ['angular', 'typescript'],
      storyContext: 'The Clear button crashed the filter. Say precisely why.',
      prompt: 'What sequence produced the toLowerCase-on-null crash?',
      options: [
        {
          id: 'a',
          label: 'reset() emptied the items array, so filter() iterated over null entries.',
          isCorrect: false,
          feedback: 'reset() touches controls, not data arrays — the null is in the query, not the items.',
        },
        {
          id: 'b',
          label:
            'reset() without arguments sets the control to null (not the initial \'\'), and the read site assumed string.',
          isCorrect: true,
          feedback:
            'Exactly the incident: null is reset’s default installation, and the union type had warned us all along.',
        },
        {
          id: 'c',
          label: 'The template unbound the input on reset, making value undefined rather than null.',
          isCorrect: false,
          feedback: 'Bindings survive reset; and the default control installs null, never undefined.',
        },
        {
          id: 'd',
          label: 'toLowerCase is unavailable inside filter callbacks due to this-binding.',
          isCorrect: false,
          feedback: 'Arrow callbacks have no this problem — the receiver was null, not misbound.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What VALUE does reset() install when you pass nothing?' },
        {
          level: 2,
          title: 'Concept',
          content: 'Default (nullable) controls reset to null — that is why null is in their value type.',
        },
        { level: 3, title: 'Specific clue', content: 'The compiler had flagged q.toLowerCase() — someone silenced it.' },
        { level: 4, title: 'Guided solution', content: 'Choose the reset-installs-null explanation.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Crash explained' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The Clear button crashed filtering for every user who pressed it.',
        },
      ],
      helpLinks: [{ topicId: 'forms.nullability', label: 'Form nullability' }],
      successFeedback: 'reset() → null → crash: the union type was documentation all along.',
      failureFeedback: 'Follow the value: what is query.value the instant after reset()?',
    },
    {
      id: 'tf-002-c2',
      type: 'multiple-choice',
      title: 'Read Site, Fixed Honestly',
      difficulty: 'easy',
      tags: ['angular', 'typescript'],
      storyContext:
        'Before touching the control’s configuration (next mission), fix applyFilter to handle string | null truthfully.',
      prompt: 'Which read-site fix is honest?',
      options: [
        {
          id: 'a',
          label: 'items.filter((i) => i.name.includes(q!.toLowerCase()))',
          isCorrect: false,
          feedback:
            'The non-null assertion is mission ts-8 all over again: a promise nothing verifies, crashing on the very next reset.',
        },
        {
          id: 'b',
          label: 'items.filter((i) => i.name.includes(String(q).toLowerCase()))',
          isCorrect: false,
          feedback:
            "String(null) is the string 'null' — the filter now searches for the word null. Silent nonsense beats a crash, barely.",
        },
        {
          id: 'c',
          label: 'Catch the TypeError around the filter and return the unfiltered list on failure.',
          isCorrect: false,
          feedback:
            'Catching the symptom keeps the lie alive — and returns different results for the same UI state.',
        },
        {
          id: 'd',
          label: "const term = (q ?? '').toLowerCase();\nitems.filter((i) => i.name.includes(term));",
          isCorrect: true,
          feedback:
            'null means “no filter”, so ?? maps it to the empty search — absence handled as a value, campaign-1 style.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What SHOULD a null query mean for filtering? Encode that meaning.' },
        {
          level: 2,
          title: 'Concept',
          content: '?? turns the absent case into your chosen fallback — here, the match-everything empty string.',
        },
        { level: 3, title: 'Specific clue', content: "Beware String(null) — it produces the four-letter word 'null'." },
        { level: 4, title: 'Guided solution', content: 'Choose the ?? \'\' normalisation before toLowerCase.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Read site honest' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'A non-null assertion patched the crash and waited for the next reset to fire again.',
        },
      ],
      helpLinks: [
        { topicId: 'forms.nullability', label: 'Form nullability' },
        { topicId: 'typescript.strict-null-checks', label: 'Strict null checks' },
      ],
      successFeedback: 'Null given a meaning, not a silencing — the honest fix.',
      failureFeedback: 'Two options silence, one mistranslates. Find the one that DEFINES what null means here.',
    },
  ],
  reflectionPrompt: 'Which of our forms has a Clear/reset path nobody has tested since the migration?',
  rewards: [{ type: 'xp', amount: 5, label: 'Reset understood' }],
};
