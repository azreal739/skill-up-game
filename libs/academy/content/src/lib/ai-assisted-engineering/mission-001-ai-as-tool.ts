import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — the AI collaboration mindset: a powerful tool that
 * accelerates, not an oracle that decides; you stay accountable.
 */
export const fnAi001AiAsTool: MissionDefinition = {
  id: 'ai-001-ai-as-tool',
  campaignId: 'ai-assisted-engineering',
  title: 'A Power Tool, Not an Oracle',
  summary:
    'AI coding assistants accelerate a skilled engineer and mislead an unskilled one — the human stays accountable for every line, because the tool is confidently fallible.',
  difficulty: 'intro',
  learningObjectives: [
    'Frame AI as an accelerator, not a decision-maker',
    'Recognise confident-but-wrong output as the core hazard',
    'Keep human accountability for all AI-assisted code',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Final block, and the newest: AI-assisted engineering. It opened with two stories from the same month. A senior shipped a week of work in two days with an AI assistant. A junior shipped a subtle auth bug the AI had written with total confidence, and did not catch it because they had not understood the code they accepted. Same tool, opposite outcomes.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The mental model that separates those two: AI is a POWER TOOL, not an oracle. It is astonishingly fast and astonishingly confident — and confidence is not correctness. It will invent APIs that do not exist, write plausible code with subtle bugs, and defend wrong answers fluently. It amplifies whoever is driving: a skilled engineer who reviews everything goes faster; someone who accepts output they cannot evaluate ships the AI’s mistakes as their own. YOU remain accountable for every line, because the tool cannot be.',
    },
  ],
  contextArtefacts: [
    {
      id: 'tool-not-oracle',
      type: 'code',
      title: 'The collaboration model',
      language: 'text',
      content:
        'AI IS        a fast, tireless, confident PAIR — great at boilerplate, drafts,\n             recall, exploration; amplifies the engineer driving it\nAI IS NOT     an authority — confidence ≠ correctness; it invents APIs,\n             writes plausible-but-buggy code, defends wrong answers fluently\nYOU REMAIN    accountable for every line: you review, understand, and own it\n             — accepting code you can’t evaluate = shipping its mistakes as yours\n\nit amplifies skill; it does not replace judgement',
    },
  ],
  challenges: [
    {
      id: 'ai-001-c1',
      type: 'multiple-choice',
      title: 'Two Engineers, One Tool',
      difficulty: 'intro',
      tags: ['ai'],
      storyContext: 'The two stories: the senior who shipped faster, the junior who shipped the AI’s auth bug. A teammate concludes "AI is dangerous for juniors, so restrict it to seniors".',
      prompt: 'What is the right lesson from the two outcomes?',
      options: [
        {
          id: 'a',
          label:
            'The difference was not seniority per se but whether the engineer REVIEWED and UNDERSTOOD the output before accepting it. AI amplifies the driver: the senior treated it as a fast draft to verify (catching its mistakes), the junior treated it as an authority to trust (shipping its mistakes). The lesson is to teach everyone the collaboration discipline — never accept code you cannot evaluate — not to gatekeep the tool by title. A junior who reviews critically benefits; a senior who blindly accepts would ship the same bug.',
          isCorrect: true,
          feedback:
            'Accountability, not seniority, is the variable. The tool amplifies whoever drives it — the fix is teaching the review-and-understand discipline, which makes the junior faster AND safer, rather than restricting a productivity tool by rank.',
        },
        {
          id: 'b',
          label: 'Correct — AI should be restricted to senior engineers who can catch its mistakes; juniors should not use it.',
          isCorrect: false,
          feedback:
            'This misreads the cause (understanding, not title) and harms juniors most — it denies them a powerful learning and productivity tool AND fails to teach the review discipline they need. A senior who blindly accepts ships the same bug; the fix is the discipline, for everyone.',
        },
        {
          id: 'c',
          label: 'The lesson is that AI is unreliable and should be avoided for anything security-related like auth.',
          isCorrect: false,
          feedback:
            'AI can help with auth code (drafting, spotting issues) IF the human reviews it against the security campaign’s principles — the bug shipped because it was accepted unreviewed, not because AI touched auth. Avoidance forfeits the acceleration; disciplined review captures it safely.',
        },
        {
          id: 'd',
          label: 'The junior just needs more training on the specific framework; then the AI’s output would have been fine.',
          isCorrect: false,
          feedback:
            'Framework knowledge helps, but the core failure was accepting output without EVALUATING it — a discipline that applies regardless of framework. Even an expert who rubber-stamps confident AI output ships its subtle bugs. The lesson is about the review habit, not one framework’s docs.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What did the senior DO with the output that the junior did not?' },
        { level: 2, title: 'Concept', content: 'AI amplifies the driver; accountability (review + understand) is the variable.' },
        { level: 3, title: 'Specific clue', content: 'Would a senior who blindly accepted the auth code have caught the bug?' },
        { level: 4, title: 'Guided solution', content: 'Pick the review-and-understand discipline, taught to everyone.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Model set' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'AI was gated to seniors — juniors lost a learning tool and never learned the review discipline the incident actually called for.',
        },
      ],
      helpLinks: [{ topicId: 'ai.collaboration', label: 'AI collaboration mindset' }],
      successFeedback: 'Accountability, not title — the tool amplifies whoever reviews what it produces.',
      failureFeedback: 'A senior who blindly accepted would have shipped the same bug. What is the real variable — rank, or review?',
    },
    {
      id: 'ai-001-c2',
      type: 'multiple-choice',
      title: 'The Confident Wrong Answer',
      difficulty: 'easy',
      tags: ['ai'],
      storyContext:
        'An engineer asks an AI how to do something in a library. It responds with clean, confident code using a method — library.streamWithBackpressure() — that reads perfectly but does not exist in that library. The engineer, trusting the confidence, spends an hour debugging why it "isn’t working".',
      prompt: 'What does this illustrate about working with AI?',
      options: [
        {
          id: 'a',
          label:
            'Confidence is not correctness — AI can HALLUCINATE plausible-looking APIs, methods, and facts that do not exist, and it presents them with the same fluent certainty as correct answers. There is no reliability signal in the TONE. The discipline: verify claims against authoritative sources (the actual docs, the type definitions, a quick test) especially for specific APIs, versions, and facts — treat confident output as a hypothesis to check, not a fact to trust. The hour was lost trusting fluency over verification.',
          isCorrect: true,
          feedback:
            'Hallucination is the signature AI hazard: it does not KNOW it is wrong, so it is exactly as confident about the invented method as a real one. The only defense is verification against ground truth — the AI’s certainty carries zero information about correctness.',
        },
        {
          id: 'b',
          label: 'The AI was using a newer version of the library; upgrading the dependency would make the method appear.',
          isCorrect: false,
          feedback:
            'Assuming a hallucinated method is real-but-newer sends you chasing phantom upgrades — the method does not exist in ANY version. Verify against the actual docs/types FIRST; do not assume confident output corresponds to some real version.',
        },
        {
          id: 'c',
          label: 'This is rare — modern AI models are trained on documentation, so their API suggestions are reliable.',
          isCorrect: false,
          feedback:
            'Hallucinated APIs are common, not rare — models generate plausible token sequences, and a plausible-sounding method name is exactly what they produce even when none exists. "Trained on docs" does not guarantee any specific output is factual. Always verify.',
        },
        {
          id: 'd',
          label: 'The engineer should have given the AI more context about the library so it would answer correctly.',
          isCorrect: false,
          feedback:
            'More context helps AND the output STILL needs verification — even well-prompted, models hallucinate specifics. Better prompting reduces but never eliminates the need to check APIs/facts against ground truth. Context is not a substitute for verification.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Did the AI’s confident TONE tell you anything about whether the method exists?' },
        { level: 2, title: 'Concept', content: 'Hallucination: confident, plausible, non-existent — verify specifics against ground truth.' },
        { level: 3, title: 'Specific clue', content: 'What is the fastest way to check if a method actually exists? (docs / types / a test.)' },
        { level: 4, title: 'Guided solution', content: 'Pick confidence-≠-correctness, verify against sources.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Hallucination understood' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The team kept trusting confident API suggestions unverified — several hallucinated calls reached PRs before anyone checked the docs.',
        },
      ],
      helpLinks: [{ topicId: 'ai.collaboration', label: 'AI collaboration mindset' }],
      successFeedback: 'Fluent certainty carries no correctness signal — verify specifics against ground truth.',
      failureFeedback: 'The method was invented but sounded real. What is the ONLY way to know — its tone, or the actual docs?',
    },
  ],
  reflectionPrompt: 'When we use AI, do we verify its specific claims (APIs, facts) against ground truth — or does its confidence do the verifying for us?',
  rewards: [{ type: 'xp', amount: 5, label: 'Mindset set' }],
};
