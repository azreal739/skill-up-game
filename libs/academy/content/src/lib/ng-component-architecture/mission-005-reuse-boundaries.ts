import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — reuse boundaries: the rule of three, and why the wrong
 * abstraction costs more than duplication.
 */
export const fnCa005ReuseBoundaries: MissionDefinition = {
  id: 'ca-005-reuse-boundaries',
  campaignId: 'ng-component-architecture',
  title: 'Duplication Is Cheaper Than the Wrong Abstraction',
  summary:
    'Extract shared components when the sameness is real and repeated — premature unification welds different things together and they tear.',
  difficulty: 'medium',
  learningObjectives: [
    'Apply the rule of three before extracting shared components',
    'Distinguish essential sameness from coincidental resemblance',
    'Un-merge an abstraction that two callers are tearing apart',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session five, a case study from our own repo: SharedListItemComponent. Extracted on day one because the contacts list and the deploys list “looked identical”. Two years later it has 9 boolean inputs, and both lists are fighting over its padding.',
    },
    {
      speaker: 'Senior Dev',
      text: 'They looked identical; they never WERE identical — one is a person you message, one is an event you inspect. The resemblance was coincidence, and every divergence since became an if. The discipline: wait for the third real usage, and extract only what varies together. Duplication is a visible, mergeable debt; the wrong abstraction is invisible glue.',
    },
  ],
  contextArtefacts: [
    {
      id: 'nine-booleans',
      type: 'code',
      title: 'The weld, two years on',
      language: 'ts',
      content:
        '// SharedListItemComponent — day 1: title + subtitle. today:\nreadonly showAvatar = input(false);      // contacts: yes, deploys: no\nreadonly showStatusDot = input(false);   // deploys: yes, contacts: no\nreadonly compact = input(false);         // deploys only\nreadonly clickWholeRow = input(true);    // contacts only, now\nreadonly showTimestamp = input(false);   // deploys… and one contacts screen\n// …4 more. every input is one list voting against the merger',
    },
  ],
  challenges: [
    {
      id: 'ca-005-c1',
      type: 'multiple-choice',
      title: 'Read the Booleans',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'Nine booleans, each used by exactly one of the two lists. Ticket: “deploys items need expandable detail rows” — boolean ten.',
      prompt: 'What do the booleans mean, and what is the move?',
      options: [
        {
          id: 'a',
          label: 'Normal growth — shared components accumulate options; add the tenth input and keep the reuse win.',
          isCorrect: false,
          feedback:
            'What reuse win? Nine single-caller flags mean the lists share almost nothing but a file — the “shared” component is two components interleaved with ifs.',
        },
        {
          id: 'b',
          label: 'Refactor the booleans into a variant: "contact" | "deploy" input — one axis instead of nine flags.',
          isCorrect: false,
          feedback:
            'Honest about there being two things, but they still cohabit: every deploy change still risks contacts, and variant three moves in next year.',
        },
        {
          id: 'c',
          label: 'Convert the booleans to projection slots — mission 3’s medicine generalises to this table too.',
          isCorrect: false,
          feedback:
            'Slots fix caller-owned CONTENT variation; these flags encode two different IDENTITIES (row behaviour, layout, semantics) — holes cannot separate conjoined twins.',
        },
        {
          id: 'd',
          label:
            'The booleans are a divergence ledger: two components are trapped in one file, voting to leave. Split into ContactListItem and DeployListItem — each loses ~5 dead inputs and every if — and extract only what is GENUINELY shared (the row layout shell, maybe) beneath both.',
          isCorrect: true,
          feedback:
            'Single-caller flags are the wrong abstraction’s tell. Un-merging deletes the state space; the truly common layout can still be shared — as a smaller, honest piece.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For each boolean: how many of the two callers use it?' },
        { level: 2, title: 'Concept', content: 'Flags used by one caller each = two components in a trench coat.' },
        { level: 3, title: 'Specific clue', content: 'What would each list’s item look like with the other list’s flags deleted?' },
        { level: 4, title: 'Guided solution', content: 'Split them; share only the honest common layer.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Weld cut' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'Boolean ten shipped; boolean twelve broke contacts while styling deploys, exactly as the ledger predicted.',
        },
      ],
      helpLinks: [{ topicId: 'arch.reuse-boundaries', label: 'Reuse boundaries' }],
      successFeedback: 'The ledger read, the twins separated — both lists can finally change alone.',
      failureFeedback: 'Count flags per caller. What fraction of the “shared” component does each list actually use?',
    },
    {
      id: 'ca-005-c2',
      type: 'multiple-choice',
      title: 'The Second Copy',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'New feature: the billing page needs an address form. The signup flow already has one. A teammate says extracting SharedAddressForm now “avoids the SharedListItem mistake by doing the abstraction properly this time”.',
      prompt: 'Extract now or copy now?',
      options: [
        {
          id: 'a',
          label: 'Extract now — two usages is the classic extraction point, and address forms are a solved, stable domain.',
          isCorrect: false,
          feedback:
            'Two is where SharedListItem was extracted. Billing addresses want VAT ids and company names; signup wants speed and autofill — the divergence is already visible if you look.',
        },
        {
          id: 'b',
          label:
            'Copy now, watch the copies: two usages with visibly different pressures (billing: VAT, validation strictness; signup: speed, autofill) is resemblance, not yet sameness. If a third usage lands and the copies have stayed near-identical, extract THEN — from evidence of what actually varies.',
          isCorrect: true,
          feedback:
            'The rule of three is an evidence rule: real usages teach you the true variation axes, so the eventual abstraction is shaped by facts instead of hope. Duplication meanwhile stays visible and mergeable.',
        },
        {
          id: 'c',
          label: 'Copy forever — the SharedListItem lesson is that shared UI components are a mistake as a category.',
          isCorrect: false,
          feedback:
            'The design system’s button disproves the category ban — REAL sameness, repeatedly proven, extracts beautifully. The lesson was about timing and evidence, not sharing.',
        },
        {
          id: 'd',
          label: 'Extract the form logic (validation, submission) now and keep the templates separate — logic is always safe to share.',
          isCorrect: false,
          feedback:
            '“Always safe” is the same bet one layer down: billing’s validation is exactly what diverges first. Logic earns extraction by the same evidence rule.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'List what billing needs that signup does not. Is the sameness essential?' },
        { level: 2, title: 'Concept', content: 'Rule of three = wait for evidence of what truly varies together.' },
        { level: 3, title: 'Specific clue', content: 'Which is easier later: merging two similar copies, or splitting one welded abstraction?' },
        { level: 4, title: 'Guided solution', content: 'Copy, watch, extract on the third with evidence.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Evidence awaited' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'SharedAddressForm shipped “properly” — VAT arrived a sprint later as its first conditional section.',
        },
      ],
      helpLinks: [{ topicId: 'arch.reuse-boundaries', label: 'Reuse boundaries' }],
      successFeedback: 'Merging copies is cheap; splitting welds is surgery — you chose the reversible debt.',
      failureFeedback: 'Fast-forward one quarter under each choice. Which mistake can be undone in an afternoon?',
    },
  ],
  reflectionPrompt: 'Find our shared component with the most single-caller inputs: what is its divergence ledger saying?',
  rewards: [{ type: 'xp', amount: 10, label: 'Boundaries earned' }],
};
