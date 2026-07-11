import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — risks and responsibilities: security, IP/licensing,
 * privacy, and skill atrophy in AI-assisted work.
 */
export const fnAi007Risks: MissionDefinition = {
  id: 'ai-007-risks',
  campaignId: 'ai-assisted-engineering',
  title: 'The Risks You Own',
  summary:
    'AI assistance carries risks the engineer still owns — leaking secrets into prompts, insecure or unlicensed generated code, and the slow atrophy of skills you stop practising.',
  difficulty: 'hard',
  learningObjectives: [
    'Avoid leaking secrets and private data into AI tools',
    'Treat AI-generated code as an IP, license, and security surface',
    'Guard against skill atrophy from over-reliance',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session seven, the uncomfortable one: the risks that come with the productivity. An engineer pasted a chunk of our proprietary code — including a config with a live credential — into a public AI tool to "ask about a bug". That credential and that code left our control. And a subtler risk: a junior who lets AI write everything never builds the judgement to review it.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Four risks you still OWN. DATA LEAKAGE: what you paste into an AI tool may leave your control (secrets, proprietary code, customer data, PII) — know your tool’s data policy and never paste what must not leave. SECURITY: AI generates insecure patterns confidently (the security campaign applies to AI code MORE, not less). IP/LICENSING: generated code may echo licensed training data — a real legal consideration for some orgs. And SKILL ATROPHY: skills you stop practising fade; if AI writes everything and you never reason through it, you lose the ability to REVIEW it — which is the one thing that kept it safe.',
    },
  ],
  contextArtefacts: [
    {
      id: 'ai-risks',
      type: 'code',
      title: 'The risks you own',
      language: 'text',
      content:
        'DATA LEAKAGE  prompts may leave your control → never paste secrets, proprietary\n              code, customer data, PII; know the tool’s data/retention policy\nSECURITY      AI writes insecure patterns confidently → security review applies MORE\nIP/LICENSING  generated code may echo licensed training data → org legal consideration\nSKILL ATROPHY skills unpractised fade → if AI writes everything and you never reason,\n              you lose the ability to REVIEW it (the safeguard that made it safe)',
    },
  ],
  challenges: [
    {
      id: 'ai-007-c1',
      type: 'multiple-choice',
      title: 'What Left the Building',
      difficulty: 'hard',
      tags: ['ai', 'security'],
      storyContext:
        'The pasted-credential incident: proprietary code with a live API key was pasted into a public AI chat tool to debug it. A teammate shrugs — "the AI won’t do anything malicious with it".',
      prompt: 'Why is this a serious problem regardless of the AI’s intentions?',
      options: [
        {
          id: 'a',
          label:
            'The issue is not the AI’s intent — it is that the data LEFT your control. Depending on the tool and its policy, prompts may be logged, retained, used for training, or exposed in a breach, so a live credential and proprietary code are now outside your security boundary (the security campaign’s trust-boundary lesson: pasting into a third party is crossing one). Treat the credential as COMPROMISED (rotate it immediately) and set a rule: never paste secrets, proprietary code, customer data, or PII into tools whose data handling you don’t control. Use enterprise/self-hosted tooling with a known policy for sensitive work.',
          isCorrect: true,
          feedback:
            'Sending data to a third party is a disclosure regardless of the recipient’s intentions — the credential must be rotated and the practice stopped. Know your tool’s data policy; keep secrets and proprietary data on the safe side of the boundary.',
        },
        {
          id: 'b',
          label: 'It is fine as long as the AI is from a reputable vendor who promises not to misuse data.',
          isCorrect: false,
          feedback:
            'A promise not to MISUSE data does not undo the DISCLOSURE — the credential still left your boundary and could be logged, retained, or breached, and a live key must be rotated regardless. Reputability reduces some risk but the correct move is not to send secrets at all.',
        },
        {
          id: 'c',
          label: 'The only issue is the API key; the proprietary code is fine to share since AI is trained on public code anyway.',
          isCorrect: false,
          feedback:
            'Proprietary code is your IP and may contain business logic, architecture, or embedded data you do not want leaving your control — "AI is trained on public code" does not make YOUR private code public. Both the key and the code crossed the boundary.',
        },
        {
          id: 'd',
          label: 'Just delete the chat afterward — removing the conversation removes the data exposure.',
          isCorrect: false,
          feedback:
            'Deleting your view of the chat does not guarantee the provider purges logs, training pipelines, or backups — and the credential was exposed the moment it was sent. Deletion is not a remedy; rotate the key and never send secrets.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The problem is not what the AI DOES — it is where the data now IS.' },
        { level: 2, title: 'Concept', content: 'Pasting into a third party crosses a trust boundary; secrets leave your control.' },
        { level: 3, title: 'Specific clue', content: 'A live key was disclosed to an external service. What must happen to it now?' },
        { level: 4, title: 'Guided solution', content: 'Pick data-left-your-control; rotate the key, never paste secrets.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Leakage understood' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The exposed credential was not rotated ("the AI is reputable") — it appeared in an unrelated breach dump months later.',
        },
      ],
      helpLinks: [
        { topicId: 'ai.risks', label: 'AI risks & responsibilities' },
        { topicId: 'sec.trust-boundaries', label: 'Trust boundaries' },
      ],
      successFeedback: 'Disclosure, not intent, is the harm — rotate the key, keep secrets on your side of the boundary.',
      failureFeedback: 'The AI’s intentions are irrelevant. What happened to the credential the moment it was pasted?',
    },
    {
      id: 'ai-007-c2',
      type: 'multiple-choice',
      title: 'The Atrophy Risk',
      difficulty: 'hard',
      tags: ['ai'],
      storyContext:
        'A junior engineer, six months into heavy AI use, has shipped a lot — but in a code review cannot explain why the AI’s solution works, cannot spot a subtle bug a senior flags, and freezes when asked to write a non-trivial function without AI. They ask if this matters.',
      prompt: 'What is the risk here, and how is it managed?',
      options: [
        {
          id: 'a',
          label:
            'SKILL ATROPHY: skills you don’t practise fade, and the junior has been OUTSOURCING the reasoning — so the very judgement needed to REVIEW AI output (which is the safeguard that keeps it safe) never developed. The danger is a spiral: less capable of reviewing → more reliant on trusting AI → ships more of its mistakes. Manage it by deliberately practising the fundamentals (write things without AI sometimes, reason through AI output rather than accepting it, treat AI as a collaborator to learn FROM not a replacement to defer TO). AI should amplify a growing engineer, not replace their growth.',
          isCorrect: true,
          feedback:
            'The review ability the whole block depends on is a SKILL — and skills atrophy without practice. A junior who never reasons cannot review, which removes the human safeguard entirely. Use AI to learn from, and keep practising the fundamentals so your judgement grows alongside the tool.',
        },
        {
          id: 'b',
          label: 'It does not matter — AI is the future, so the ability to code and review without it is becoming obsolete.',
          isCorrect: false,
          feedback:
            'The block’s entire safety model rests on the human being able to REVIEW and UNDERSTAND AI output — an ability that IS coding/reasoning skill. If that atrophies, there is no safeguard against confident-but-wrong output. Review skill is not obsolete; it is the load-bearing skill.',
        },
        {
          id: 'c',
          label: 'The junior just needs better prompts; with prompting skill they won’t need to understand the output.',
          isCorrect: false,
          feedback:
            'Prompting cannot substitute for understanding — even perfect prompts produce output that must be reviewed against subtle correctness the junior currently cannot assess. Prompting is a real skill, but it does not replace the judgement to evaluate results (the accountability lesson).',
        },
        {
          id: 'd',
          label: 'Restrict the junior from AI entirely until they can code without it, then let them use it freely.',
          isCorrect: false,
          feedback:
            'A total ban forfeits AI’s genuine learning value (explaining code, exploring approaches) and is heavy-handed — the fix is DELIBERATE practice of fundamentals alongside AI use (reason through its output, write some things solo), so judgement grows WITH the tool rather than instead of it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What skill does the whole block’s safety depend on — and is the junior building it?' },
        { level: 2, title: 'Concept', content: 'Skill atrophy removes the review ability that makes AI use safe; practise fundamentals.' },
        { level: 3, title: 'Specific clue', content: 'If you cannot review AI output, what is left to protect you from its mistakes?' },
        { level: 4, title: 'Guided solution', content: 'Pick skill-atrophy; practise fundamentals, learn FROM AI.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Atrophy managed' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'Atrophy was dismissed as "AI is the future" — a cohort of engineers grew unable to review the output they depended on.',
        },
      ],
      helpLinks: [{ topicId: 'ai.risks', label: 'AI risks & responsibilities' }],
      successFeedback: 'Practise the fundamentals so judgement grows with the tool — the review skill is the safeguard.',
      failureFeedback: 'AI safety depends on the human reviewing it. What happens to that safeguard if the review skill never develops?',
    },
  ],
  reflectionPrompt: 'Do we have a rule against pasting secrets/proprietary data into AI tools — and are our engineers still practising the fundamentals, or outsourcing the reasoning that lets them review?',
  rewards: [{ type: 'xp', amount: 15, label: 'Risks owned' }],
};
