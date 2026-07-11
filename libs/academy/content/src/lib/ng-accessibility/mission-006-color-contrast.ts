import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — colour, contrast and not relying on colour alone: WCAG
 * ratios and redundant encoding.
 */
export const fnA11y006ColorContrast: MissionDefinition = {
  id: 'a11y-006-color-contrast',
  campaignId: 'ng-accessibility',
  title: 'Colour Is Never the Only Signal',
  summary:
    'Text must meet contrast ratios, and meaning carried by colour must be carried by something else too — shape, text or icon — for the millions who can’t see the difference.',
  difficulty: 'medium',
  learningObjectives: [
    'Apply WCAG contrast ratios to text and UI',
    'Encode meaning redundantly, never by colour alone',
    'Audit a design for colour-only signals',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session six put numbers on something we had eyeballed for years. Our "subtle" grey helper text — #aaa on white — measured 2.3:1. WCAG wants 4.5:1 for body text. And our status system was pure colour: a green dot for healthy, red for down. To the ~8% of men with red-green colour blindness, our status page was a row of identical grey dots.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Two rules. CONTRAST: body text ≥ 4.5:1, large text and UI components ≥ 3:1 — measurable, non-negotiable, and a checker tells you instantly. And NEVER COLOUR ALONE: any meaning shown by colour must ALSO be shown another way — a shape, a label, an icon, a pattern — because colour perception is not universal and colour disappears in greyscale, bright sun, and cheap projectors.',
    },
  ],
  contextArtefacts: [
    {
      id: 'redundant-encoding',
      type: 'code',
      title: 'Meaning, encoded twice',
      language: 'html',
      content:
        '<!-- colour ALONE — invisible distinction to red-green colour blindness -->\n<span class="dot dot--green"></span>\n\n<!-- colour PLUS shape PLUS text — everyone reads it -->\n<span class="status status--ok">\n  <svg aria-hidden="true"><!-- ✓ check shape --></svg>\n  Operational\n</span>\n<!-- and the text is a real label the screen reader announces -->',
    },
  ],
  challenges: [
    {
      id: 'a11y-006-c1',
      type: 'multiple-choice',
      title: 'The Grey Status Dots',
      difficulty: 'medium',
      tags: ['a11y', 'scss'],
      storyContext:
        'The status page: green/amber/red dots, no labels. A colour-blind user reports every service looks the same. A teammate suggests “use a more distinguishable red and green”.',
      prompt: 'What actually fixes it?',
      options: [
        {
          id: 'a',
          label: 'Pick a colour-blind-safe palette (e.g. blue/orange instead of green/red) and keep the dots — safe palettes solve it without adding clutter.',
          isCorrect: false,
          feedback:
            'A safer palette helps SOME colour-vision types but not all (and not greyscale, or a user who simply does not know your colour code). Colour alone still carries 100% of the meaning.',
        },
        {
          id: 'b',
          label:
            'Encode status redundantly: keep colour for quick scanning, but ADD a distinct shape or icon per state (✓ / ! / ✕) and a visible text label ("Operational" / "Degraded" / "Down"). Now the meaning survives colour blindness, greyscale, and screen readers — colour becomes an enhancement, not the message.',
          isCorrect: true,
          feedback:
            'Redundant encoding is the rule: colour may REINFORCE meaning but must never be its sole carrier. The text label also hands the status straight to assistive tech for free.',
        },
        {
          id: 'c',
          label: 'Add a legend at the top of the page mapping each colour to its meaning.',
          isCorrect: false,
          feedback:
            'A legend still requires distinguishing the colours to use it — and forces every user to cross-reference. Redundant per-item encoding needs no lookup.',
        },
        {
          id: 'd',
          label: 'Add title attributes to the dots so hovering reveals the status text.',
          isCorrect: false,
          feedback:
            'title tooltips need a mouse hover (excludes keyboard/touch), are inconsistently read by screen readers, and hide the status behind an interaction — the status should be visible outright.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What carries the meaning if you remove ALL colour from the dots?' },
        { level: 2, title: 'Concept', content: 'Colour may reinforce; it must never be the only signal.' },
        { level: 3, title: 'Specific clue', content: 'Shape + text survive colour blindness AND reach the screen reader.' },
        { level: 4, title: 'Guided solution', content: 'Add distinct shapes/icons and visible text labels.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Signals doubled' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The colour-only status shipped — a colour-blind on-call engineer missed a red service during an incident.',
        },
      ],
      helpLinks: [{ topicId: 'a11y.color-contrast', label: 'Colour & contrast' }],
      successFeedback: 'Shape, text and colour together — status legible to everyone, in any light.',
      failureFeedback: 'Screenshot the dots in greyscale. Can you still tell the states apart? That is the test.',
    },
    {
      id: 'a11y-006-c2',
      type: 'multiple-choice',
      title: 'The 2.3:1 Helper Text',
      difficulty: 'medium',
      tags: ['a11y', 'scss'],
      storyContext:
        'Design pushes back on darkening the #aaa helper text: “low-contrast secondary text is intentional visual hierarchy — making it darker flattens the design”.',
      prompt: 'How do you reconcile hierarchy with the 4.5:1 requirement?',
      options: [
        {
          id: 'a',
          label:
            'Hierarchy has many tools besides contrast-below-threshold: size, weight, spacing, position, and colour differences that STILL clear 4.5:1 (a mid-grey like #767676 on white passes and still reads as secondary). Meet the ratio using those; low-contrast-as-hierarchy is a preference, and legibility for low-vision users is a requirement — the requirement wins, and design keeps its hierarchy through the other levers.',
          isCorrect: true,
          feedback:
            'It is a false trade: you can have clear hierarchy AND pass contrast. The failing greys were never the only way to signal "secondary" — they were just the laziest.',
        },
        {
          id: 'b',
          label: 'Exempt helper text — WCAG’s 4.5:1 applies to primary content; secondary/decorative text is out of scope.',
          isCorrect: false,
          feedback:
            'Helper text conveys meaning (it guides input) — it is not decorative. The only text exempt from contrast is purely decorative or disabled-control text; guidance is neither.',
        },
        {
          id: 'c',
          label: 'Add a high-contrast mode toggle and keep the low-contrast greys as the default.',
          isCorrect: false,
          feedback:
            'A high-contrast mode is a nice extra, but shipping an inaccessible DEFAULT and hiding the accessible version behind a toggle most users never find fails the baseline.',
        },
        {
          id: 'd',
          label: 'Increase the font size of the helper text — large text only needs 3:1, so #aaa may then pass.',
          isCorrect: false,
          feedback:
            'Clever, but 3:1 large-text still fails #aaa (2.3:1), and enlarging secondary text inverts the very hierarchy design wanted. Fix the colour, not the size.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is contrast the ONLY way to make text read as secondary?' },
        { level: 2, title: 'Concept', content: 'Hierarchy via size/weight/spacing; colour still clears 4.5:1.' },
        { level: 3, title: 'Specific clue', content: 'A darker grey (#767676) passes and still looks secondary.' },
        { level: 4, title: 'Guided solution', content: 'Meet the ratio; keep hierarchy through other levers.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Hierarchy kept legible' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The #aaa greys stayed — a low-vision user could not read any helper text and mis-filled the form repeatedly.',
        },
      ],
      helpLinks: [{ topicId: 'a11y.color-contrast', label: 'Colour & contrast' }],
      successFeedback: 'Hierarchy and legibility both — the trade was never real.',
      failureFeedback: 'Run the greys through a contrast checker. Then list every non-colour way to signal "secondary".',
    },
  ],
  reflectionPrompt: 'Run our palette through a contrast checker and view a key screen in greyscale: what meaning vanishes when colour does?',
  rewards: [{ type: 'xp', amount: 10, label: 'Colour reinforced' }],
};
