import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — supply chain security: dependency vulnerabilities, audit
 * discipline, and the risk of the code you didn't write.
 */
export const fnSec006Dependencies: MissionDefinition = {
  id: 'sec-006-dependencies',
  campaignId: 'ng-security',
  title: 'The Code You Didn’t Write',
  summary:
    'Most of your app is third-party code running with full trust — dependency vulnerabilities are your vulnerabilities, and the supply chain needs active defence.',
  difficulty: 'hard',
  learningObjectives: [
    'Treat dependencies as part of your attack surface',
    'Use audit tooling as signal, triaged by reachability',
    'Recognise supply-chain attack vectors beyond known CVEs',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session six put a number on screen: our node_modules had 1,400 packages. We wrote maybe forty of them. The other 1,360 run in our build and ship to users with the same trust as our own code — and we had never looked at most of them.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The supply chain is the attack surface nobody audits. Three shapes: KNOWN vulnerabilities (a CVE in a version you use — npm audit finds these); MALICIOUS packages (a typosquat, or a legit package hijacked and a crypto-miner slipped into a patch release); and TRANSITIVE risk (you trust a package, which trusts fifty more). Defence is discipline: audit regularly, pin and review updates, prefer fewer/smaller deps, and TRIAGE findings by whether the vulnerable code path is even reachable.',
    },
  ],
  contextArtefacts: [
    {
      id: 'supply-chain',
      type: 'code',
      title: 'The dependency attack surface',
      language: 'text',
      content:
        'KNOWN CVE        npm audit / Dependabot flags a vulnerable version\n                 → triage by REACHABILITY (is the vulnerable path used?) + severity\nMALICIOUS PKG    typosquat (react-dom vs reactdom), or a hijacked maintainer\n                 shipping a miner in a patch → pin versions, review diffs on bump\nTRANSITIVE       your 40 deps pull 1,360 more, each with full trust\n                 → fewer/smaller deps; lockfile; provenance where available',
    },
  ],
  challenges: [
    {
      id: 'sec-006-c1',
      type: 'multiple-choice',
      title: 'Forty-Seven Vulnerabilities',
      difficulty: 'hard',
      tags: ['security', 'cicd'],
      storyContext:
        'npm audit reports 47 vulnerabilities (3 critical, 12 high, rest moderate/low). A dev proposes running npm audit fix --force to clear the board before the release.',
      prompt: 'What is the right response to the audit output?',
      options: [
        {
          id: 'a',
          label:
            'Triage, don’t blanket-fix: --force pulls in major version bumps that can silently break the app (and has shipped its own regressions), turning a security task into a firefight. Instead, sort by SEVERITY and REACHABILITY — is the vulnerable code path actually used (a flaw in a dev-only build tool that never ships differs from one in a runtime dependency handling user input)? Fix the reachable criticals/highs deliberately with tested bumps; schedule or accept-with-note the unreachable low-severity noise.',
          isCorrect: true,
          feedback:
            'Audit output is SIGNAL, not a to-do list — a critical CVE in an unreachable dev dependency may matter less than a moderate one in your HTTP-handling path. --force optimises the number to zero at the cost of a working app.',
        },
        {
          id: 'b',
          label: 'Run npm audit fix --force — a clean audit is the goal, and any breakage it causes will surface in tests.',
          isCorrect: false,
          feedback:
            '“Zero vulnerabilities” is a vanity metric if it ships a broken app or silently accepts breaking changes under deadline; and tests do not cover everything. Force-fixing trades a triaged risk for an untriaged regression.',
        },
        {
          id: 'c',
          label: 'Ignore moderate/low and only ever address critical — anything below critical is not worth engineering time.',
          isCorrect: false,
          feedback:
            'Severity is only half the triage — a MODERATE flaw on a directly-reachable, user-input path can outrank a CRITICAL one in unreachable code. Reachability must weigh in; blanket severity thresholds miss context.',
        },
        {
          id: 'd',
          label: 'Add an audit gate to CI that fails the build on ANY vulnerability, forcing immediate fixes always.',
          isCorrect: false,
          feedback:
            'A zero-tolerance gate sounds strong but becomes noise: teams facing a build red over an unreachable low-severity transitive CVE learn to bypass the gate, which then catches nothing. Gate on severity+reachability thresholds you can actually hold.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is a critical CVE in an unused dev tool worse than a moderate one in your request path?' },
        { level: 2, title: 'Concept', content: 'Triage by severity AND reachability; --force optimises the wrong thing.' },
        { level: 3, title: 'Specific clue', content: 'What does --force do to major versions, and what can that break?' },
        { level: 4, title: 'Guided solution', content: 'Triage and fix deliberately; don’t blanket --force.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Audit triaged' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'audit fix --force ran the night before release — a forced major bump broke the build and the security work became a rollback.',
        },
      ],
      helpLinks: [{ topicId: 'sec.dependencies', label: 'Supply chain security' }],
      successFeedback: 'Signal triaged by reachability, fixes deliberate — the audit informs instead of stampeding.',
      failureFeedback: 'Rank the 47 by reachability, not just severity. Does the --force approach even ask that question?',
    },
    {
      id: 'sec-006-c2',
      type: 'multiple-choice',
      title: 'The Helpful New Package',
      difficulty: 'hard',
      tags: ['security'],
      storyContext:
        'A PR adds a tiny date-formatting package: 400 bytes, does exactly one thing, published two weeks ago, 300 weekly downloads, one maintainer. “Why write it ourselves?”',
      prompt: 'What supply-chain risks does adding this package carry?',
      options: [
        {
          id: 'a',
          label:
            'Several worth weighing: a two-week-old, low-download, single-maintainer package has little community scrutiny (malicious or buggy code could sit unnoticed), a name close to popular packages may be a typosquat, and even if benign today, a single maintainer’s account can be compromised to ship a malicious patch to everyone who blindly takes updates. For a trivial date format, writing the ~5 lines yourself removes a trust relationship entirely — the cheapest dependency is the one you don’t take.',
          isCorrect: true,
          feedback:
            'Not every dep is worth its trust cost. A tiny, trivial function is exactly the case where in-housing removes real supply-chain risk for near-zero effort. Reserve dependencies for problems genuinely worth outsourcing.',
        },
        {
          id: 'b',
          label: 'None meaningful — it is 400 bytes and does one obvious thing; the risk of tiny packages is negligible.',
          isCorrect: false,
          feedback:
            'Size is unrelated to risk — the infamous supply-chain incidents (event-stream, tiny left-pad-adjacent packages) were small. 400 bytes of someone else’s code still runs with full trust and updates at their discretion.',
        },
        {
          id: 'c',
          label: 'The only risk is bundle size; if it tree-shakes well, adding it is strictly fine.',
          isCorrect: false,
          feedback:
            'Bundle size is a performance concern, not the security one here. The risk is the TRUST relationship — code and future updates from an unvetted maintainer — which no amount of tree-shaking addresses.',
        },
        {
          id: 'd',
          label: 'Add it but pin the exact version — pinning eliminates supply-chain risk entirely.',
          isCorrect: false,
          feedback:
            'Pinning helps (you don’t auto-take a malicious patch) but does not eliminate risk: the pinned version could ALREADY be malicious/buggy, and you must still consciously review every future bump. For a 5-line function, the trust is not worth taking at all.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What are you actually acquiring — code, or an ongoing trust relationship?' },
        { level: 2, title: 'Concept', content: 'The cheapest dependency is the one you don’t take.' },
        { level: 3, title: 'Specific clue', content: 'What happens to everyone if this single maintainer’s account is compromised?' },
        { level: 4, title: 'Guided solution', content: 'Weigh the trust cost; in-house the trivial function.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Trust weighed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The unvetted micro-package was added by reflex — a later hijacked patch shipped a credential-scraper to production before anyone reviewed the bump.',
        },
      ],
      helpLinks: [{ topicId: 'sec.dependencies', label: 'Supply chain security' }],
      successFeedback: 'Dependencies are trust relationships — the trivial ones aren’t worth the trust.',
      failureFeedback: 'You’re not buying 400 bytes; you’re trusting a maintainer’s every future release. Is a date format worth that?',
    },
  ],
  reflectionPrompt: 'When did we last run npm audit and actually TRIAGE it by reachability — and how many single-maintainer packages are in our critical path?',
  rewards: [{ type: 'xp', amount: 10, label: 'Supply chain guarded' }],
};
