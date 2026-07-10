import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — API contract design: additive vs breaking changes,
 * PUT vs PATCH semantics, and reviewing a contract change before it ships.
 */
export const fnHt008ContractDesign: MissionDefinition = {
  id: 'ht-008-contract-design',
  campaignId: 'ng-http-api',
  title: 'Contracts Outlive Code',
  summary:
    'An API contract is a promise to strangers — additive changes keep it, removals and meaning-changes break it, and the verbs carry semantics of their own.',
  difficulty: 'hard',
  learningObjectives: [
    'Classify contract changes as additive or breaking',
    'Use PUT and PATCH according to their replace/merge semantics',
    'Review a proposed API change for silent contract breaks',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session eight went up a level: not calling APIs — PROMISING them. Trigger: our own mobile app, two versions behind, broke when we renamed a response field the web client had stopped using. We forgot we had made a promise to more clients than one.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The asymmetry to internalise: ADDING a response field breaks nobody sane; REMOVING or RENAMING one breaks everyone quietly. Requiring a new request field breaks every existing caller at once. And verbs are contracts too — PUT says “replace with exactly this”, PATCH says “merge these changes”. Mix them up and data disappears politely.',
    },
  ],
  contextArtefacts: [
    {
      id: 'change-rules',
      type: 'code',
      title: 'The change classification, from the board',
      language: 'text',
      content:
        'ADDITIVE (safe):   new OPTIONAL request field · new response field · new endpoint · new enum value*\nBREAKING (loud):   remove/rename any field · change a type or meaning · make optional required\n                   tighten validation on existing input\n* new enum values break clients that switch exhaustively — announce them\n\nPUT  /profile   → body is the WHOLE new profile (missing field = delete it)\nPATCH /profile  → body is ONLY the changes (missing field = leave it alone)',
    },
  ],
  challenges: [
    {
      id: 'ht-008-c1',
      type: 'multiple-choice',
      title: 'The Polite Data Loss',
      difficulty: 'hard',
      tags: ['api'],
      storyContext:
        'Bug: users report their notification settings vanish after renaming their profile. The rename dialog sends PUT /api/profile with { displayName: "New Name" }.',
      prompt: 'What happened, and what is the correct request?',
      options: [
        {
          id: 'a',
          label: 'A server bug — PUT handlers must preserve fields the client omits; file it against the API.',
          isCorrect: false,
          feedback:
            'That would make PUT behave as PATCH — the server honoured PUT’s actual contract: the body IS the new resource, entirely.',
        },
        {
          id: 'b',
          label: 'A race — the settings save and the rename overlapped; serialising the two requests fixes it.',
          isCorrect: false,
          feedback: 'No concurrency needed: one well-formed PUT with a one-field body deletes the rest deterministically.',
        },
        {
          id: 'c',
          label: 'The dialog should GET the full profile first, spread the new name into it, and PUT the merged object back.',
          isCorrect: false,
          feedback:
            'Read-modify-write PUT works — until two dialogs race and the slower one resurrects deleted data. The verb for “change one field” already exists.',
        },
        {
          id: 'd',
          label:
            'PUT means “replace the resource with exactly this body” — a body containing only displayName lawfully erased everything else. A one-field change is PATCH /api/profile { displayName: "New Name" }: merge semantics, untouched fields stay.',
          isCorrect: true,
          feedback:
            'The verbs are semantics, not synonyms: PUT replaces, PATCH merges. The settings did not vanish — they were replaced with absence, as requested.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Read the request as the server must: what does a PUT body CLAIM to be?' },
        { level: 2, title: 'Concept', content: 'PUT: whole new resource. PATCH: just the diffs.' },
        { level: 3, title: 'Specific clue', content: 'What does an omitted field mean under each verb?' },
        { level: 4, title: 'Guided solution', content: 'Pick PUT-replaces, use PATCH.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Verbs restored' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'Profile edits kept silently wiping settings — the bug that looks like a race and reproduces every time.',
        },
      ],
      helpLinks: [{ topicId: 'http.contract-design', label: 'API contract design' }],
      successFeedback: 'Replace vs merge — four letters of method name carrying a whole data-loss class.',
      failureFeedback: 'Under PUT semantics, what is the server told about the fields the body does not mention?',
    },
    {
      id: 'ht-008-c2',
      type: 'code-review',
      title: 'Review the Contract Change',
      difficulty: 'hard',
      tags: ['api'],
      storyContext:
        'A backend PR updates the orders API “for the new dashboard”. The mobile app (release cycle: 6 weeks) consumes every endpoint touched. Review the diff summary.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'contract-diff',
          type: 'code',
          title: 'orders API change summary (proposed)',
          language: 'text',
          content:
            'GET /api/orders\n  + adds response field: riskScore (number)          // new dashboard widget\n  ~ renames response field: total → grandTotal       // "clearer name"\n\nPOST /api/orders\n  ~ request field currency: optional → REQUIRED      // "data quality"\n\nGET /api/orders/{id}\n  + adds status enum value: "pending-review"         // release notes entry included',
        },
      ],
      findings: [
        {
          id: 'rename-total',
          label:
            'Renaming total → grandTotal removes a field every existing client reads — mobile’s order screen shows undefined for six weeks minimum; ship the new name ALONGSIDE the old (or version the endpoint), never as a swap',
          isCorrect: true,
          feedback:
            '“Clearer name” is a breaking change wearing a style guide: removal-by-rename fails silently in clients — exactly the two-versions-behind mobile break that started this session.',
        },
        {
          id: 'add-riskscore',
          label: 'Adding riskScore to the response bloats every client’s payload for one widget — new data belongs on a new endpoint',
          isCorrect: false,
          feedback:
            'Additive response fields are the SAFE change class — well-behaved clients ignore unknown fields, and a number per order is noise. Spinning up endpoints per field is how APIs fragment.',
        },
        {
          id: 'currency-required',
          label:
            'Making currency required rejects every existing POST that omits it — all deployed clients break at once on deploy day; accept-and-default (or warn) first, require in a versioned successor',
          isCorrect: true,
          feedback:
            'Tightening validation on existing input is the loudest break there is: the moment it deploys, every old client’s checkout 4xxes. Data quality is earned by migration, not decree.',
        },
        {
          id: 'enum-addition',
          label: 'The new status enum value will crash clients with exhaustive switches — enum additions are always breaking and need a v2',
          isCorrect: false,
          feedback:
            'The board called this one: enum additions are additive-with-an-asterisk — announce them (done: release notes) and clients following the standard handle-unknown-status rule are fine. Demanding v2 per enum value would version weekly.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Classify each line against the board: additive or breaking?' },
        { level: 2, title: 'Concept', content: 'Removals/renames and newly-required inputs break DEPLOYED clients silently or loudly.' },
        { level: 3, title: 'Specific clue', content: 'The two additions are the safe lines — with the enum’s asterisk honoured.' },
        { level: 4, title: 'Guided solution', content: 'Flag the rename and the required currency.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Contract defended' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The rename shipped — mobile order totals read “undefined” until an emergency release six weeks early.',
        },
      ],
      helpLinks: [
        { topicId: 'http.contract-design', label: 'API contract design' },
        { topicId: 'api.contract-drift', label: 'Contract drift' },
      ],
      successFeedback: 'Changes classified by blast radius, not by intention — contract review at senior standard.',
      failureFeedback: 'For each line ask: what does the OLDEST deployed client do the moment this deploys?',
    },
  ],
  reflectionPrompt: 'Which field in our API would break an unknown consumer if renamed today — and how would we even find out who consumes it?',
  rewards: [{ type: 'xp', amount: 15, label: 'Promises kept' }],
};
