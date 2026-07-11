import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — AI across the SDLC: from requirements and design through
 * testing, review and docs, not just code generation.
 */
export const fnAi005AiInSdlc: MissionDefinition = {
  id: 'ai-005-ai-in-sdlc',
  campaignId: 'ai-assisted-engineering',
  title: 'Beyond Autocomplete',
  summary:
    'AI helps across the whole software lifecycle — requirements, design exploration, tests, review, docs, debugging — not only writing code; the leverage is in the phases teams overlook.',
  difficulty: 'hard',
  learningObjectives: [
    'Apply AI across SDLC phases, not just coding',
    'Use AI to strengthen review, tests, and docs',
    'Keep human judgement as the decision-maker in each phase',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session five widened the lens: most teams use AI as a fancy autocomplete and stop there — the code-writing phase, which is maybe a third of the work. The leverage they miss is everywhere else: rubber-ducking a design, generating a first test suite, drafting the PR description, explaining a legacy module, brainstorming edge cases, writing the docs nobody wants to write.',
    },
    {
      speaker: 'Senior Dev',
      text: 'AI touches the whole SDLC. REQUIREMENTS/DESIGN: explore approaches, poke holes, draft a design doc (you decide). IMPLEMENTATION: the code generation everyone knows. TESTING: generate test cases and edge-case ideas for YOUR logic (you verify they test the right thing). REVIEW: a first-pass reviewer that flags obvious issues before a human review (not replacing it). DOCS: the drudge-work drafts. DEBUGGING: explain this error, hypothesise causes. In every phase the pattern holds: AI drafts and explores; the human decides and owns.',
    },
  ],
  contextArtefacts: [
    {
      id: 'ai-across-sdlc',
      type: 'code',
      title: 'AI across the lifecycle (draft ↔ decide)',
      language: 'text',
      content:
        'REQUIREMENTS/DESIGN  explore options, poke holes, draft the doc → YOU decide\nIMPLEMENTATION       generate code (the familiar use) → YOU review+own\nTESTING              suggest cases + edge ideas for your logic → YOU verify\nREVIEW               first-pass flag of obvious issues → HUMAN review still runs\nDOCS                 draft the tedious docs/PR body → YOU correct\nDEBUGGING            explain error, hypothesise causes → YOU confirm the repro\n\npattern in every phase: AI drafts/explores; the human decides/owns',
    },
  ],
  challenges: [
    {
      id: 'ai-005-c1',
      type: 'multiple-choice',
      title: 'The Untapped Phases',
      difficulty: 'hard',
      tags: ['ai'],
      storyContext:
        'A team uses AI heavily for code generation but nowhere else. A lead argues "we’ve fully adopted AI". A skeptic says "we’re barely scratching it".',
      prompt: 'Who is right, and where is the untapped leverage?',
      options: [
        {
          id: 'a',
          label:
            'The skeptic — code generation is one phase (and not the largest). AI helps across the whole SDLC in a draft-then-decide pattern: exploring and stress-testing DESIGNS before building, generating first-pass TESTS and edge-case ideas for existing logic, a first-pass REVIEW that flags obvious issues before human review, drafting the DOCS and PR descriptions teams neglect, and DEBUGGING assistance (explain this error, hypothesise causes). In each the AI drafts and the human decides — using it only for codegen leaves most of the leverage on the table.',
          isCorrect: true,
          feedback:
            'Autocomplete-only is scratching the surface: the high-leverage uses are often in the phases teams under-invest in — design exploration, test generation, docs, first-pass review. The draft-then-decide pattern extends everywhere, keeping the human as decision-maker.',
        },
        {
          id: 'b',
          label: 'The lead — code generation IS the core engineering work; the other phases are minor and not worth AI effort.',
          isCorrect: false,
          feedback:
            'Coding is roughly a third of the work; design, testing, review, docs and debugging are the rest, and AI meaningfully accelerates each. Calling them "minor" ignores where a lot of engineering time actually goes — and where AI leverage is under-tapped.',
        },
        {
          id: 'c',
          label: 'The skeptic, but the answer is to let AI AUTONOMOUSLY handle design, testing, and review to free up humans.',
          isCorrect: false,
          feedback:
            'Right that there is untapped leverage, wrong that AI should own those phases — the draft-then-decide pattern keeps the HUMAN as decision-maker (you verify tests test the right thing, human review still runs). Autonomous AI design/review re-introduces the accountability failure the block warns against.',
        },
        {
          id: 'd',
          label: 'The lead — expanding AI beyond code risks it making architectural and testing decisions it is not qualified for.',
          isCorrect: false,
          feedback:
            'Using AI to DRAFT and EXPLORE across phases does not mean it DECIDES — the human still owns design and verifies tests. Avoiding those phases entirely forfeits real leverage out of a fear (AI deciding) that the draft-then-decide pattern already prevents.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is code-writing the whole job, or one phase of it?' },
        { level: 2, title: 'Concept', content: 'AI drafts/explores across all SDLC phases; the human decides in each.' },
        { level: 3, title: 'Specific clue', content: 'Which under-invested phases (design, tests, docs, review) could AI accelerate?' },
        { level: 4, title: 'Guided solution', content: 'Pick the skeptic + draft-then-decide across the SDLC.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Phases mapped' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: '"Fully adopted" meant autocomplete-only — the team kept neglecting docs, edge-case tests, and design exploration AI could have accelerated.',
        },
      ],
      helpLinks: [{ topicId: 'ai.sdlc', label: 'AI across the SDLC' }],
      successFeedback: 'Draft-then-decide across every phase — the leverage was in the phases they never used it for.',
      failureFeedback: 'Code generation is one phase. Where else in the lifecycle could AI draft while you decide?',
    },
    {
      id: 'ai-005-c2',
      type: 'multiple-choice',
      title: 'AI as a First-Pass Reviewer',
      difficulty: 'hard',
      tags: ['ai'],
      storyContext:
        'A team adds an AI first-pass review to CI that comments on every PR. Some engineers now skip human review for "small" PRs the AI approved; others ignore the AI comments entirely as noise.',
      prompt: 'What is the correct role for AI first-pass review?',
      options: [
        {
          id: 'a',
          label:
            'A first-pass FILTER that catches obvious issues before a human looks — never a REPLACEMENT for human review. It’s valuable for flagging low-hanging problems (a missed null check, an obvious anti-pattern) so the human reviewer spends attention on judgement, architecture, and subtle correctness the AI misses. But it cannot own accountability: it misses context-dependent bugs and can be confidently wrong, so human review still runs on every PR (proportionate to risk), and its comments are triaged (act on the real ones, dismiss noise) — not blindly obeyed nor blanket-ignored.',
          isCorrect: true,
          feedback:
            'The draft-then-decide pattern for review: AI pre-filters the obvious, humans own the decision. Skipping human review because AI approved re-creates the accountability gap; ignoring all AI comments wastes a real first-pass. Triage its output; keep the human review.',
        },
        {
          id: 'b',
          label: 'If the AI review is good enough, human review of small PRs is redundant — trust the AI to gate them.',
          isCorrect: false,
          feedback:
            'AI review misses context-dependent and subtle issues and can be confidently wrong — gating PRs on it alone ships the exact bugs the block warns about (the polished off-by-one an AI reviewer also misses). Small PRs still get proportionate human review; AI is a pre-filter, not a gate.',
        },
        {
          id: 'c',
          label: 'The AI comments are noise if engineers dislike them; remove the AI reviewer to reduce PR friction.',
          isCorrect: false,
          feedback:
            'Some comments being noise means TRIAGE them, not remove a tool that also catches real issues (missed null checks, obvious anti-patterns) before human time is spent. The fix is treating it as a triaged first-pass, not deleting the pre-filter.',
        },
        {
          id: 'd',
          label: 'Configure the AI reviewer to only approve or reject, with no comments, so it acts as a clean gate.',
          isCorrect: false,
          feedback:
            'A binary AI gate is worse: it hides the reasoning engineers need to triage, and it still cannot own accountability — a "reject" with no explanation is unactionable and an "approve" that skips human review ships AI’s blind spots. Keep it advisory, keep human review.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Can an AI reviewer own ACCOUNTABILITY for what merges?' },
        { level: 2, title: 'Concept', content: 'AI review = triaged first-pass filter; human review still owns the decision.' },
        { level: 3, title: 'Specific clue', content: 'What does the polished-off-by-one lesson say an AI reviewer will also miss?' },
        { level: 4, title: 'Guided solution', content: 'Pick first-pass-filter, triaged, human review still runs.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Review role set' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'Small PRs skipped human review on AI approval — a context-dependent bug the AI could not see shipped through the gap.',
        },
      ],
      helpLinks: [
        { topicId: 'ai.sdlc', label: 'AI across the SDLC' },
        { topicId: 'ai.reviewing', label: 'Reviewing AI code' },
      ],
      successFeedback: 'A triaged first-pass that frees human attention — not a gate that owns accountability it cannot hold.',
      failureFeedback: 'AI review misses context and can be confidently wrong. Can it REPLACE human review, or only precede it?',
    },
  ],
  reflectionPrompt: 'Across our SDLC — design, tests, review, docs, debugging — where do we use AI, and where are we leaving its draft-then-decide leverage untapped?',
  rewards: [{ type: 'xp', amount: 15, label: 'SDLC mapped' }],
};
