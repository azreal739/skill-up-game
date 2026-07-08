import { MissionDefinition } from '@academy/content-model';

/** Nx Monorepo Maze 7 — "Tag Rules" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const nxMission007TagRules: MissionDefinition = {
  id: 'nx-monorepo-maze-007-tag-rules',
  campaignId: 'nx-monorepo-maze',
  title: 'Tag Rules',
  summary:
    'Review the boundary lint config so architecture is enforced, not just hoped for.',
  difficulty: 'hard',
  learningObjectives: [
    'Read enforce-module-boundaries depConstraints',
    'Spot rules that allow forbidden dependencies',
    'Turn architecture into an automated check',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The team keeps arguing about dependencies in code review. Encode the rules once so lint enforces them. Review the proposed config before it lands.',
    },
  ],
  contextArtefacts: [
    {
      id: 'boundaries',
      type: 'code',
      title: 'eslint depConstraints (proposed)',
      language: 'ts',
      content:
        "depConstraints: [\n  { sourceTag: 'type:feature', onlyDependOnLibsWithTags: ['type:feature','type:ui','type:data-access','type:util'] },\n  { sourceTag: 'type:ui', onlyDependOnLibsWithTags: ['type:ui','type:util'] },\n  { sourceTag: 'type:util', onlyDependOnLibsWithTags: ['type:util','type:feature'] },\n]",
    },
  ],
  challenges: [
    {
      id: 'nx-monorepo-maze-007-c1',
      type: 'code-review',
      title: 'Review the Boundaries',
      difficulty: 'hard',
      tags: ['nx'],
      storyContext:
        'The rules should point dependencies downward: feature → ui/data-access/util → util.',
      prompt: 'Select every genuine problem with these depConstraints.',
      findings: [
        {
          id: 'ui-util',
          label: 'type:ui may depend on type:util',
          isCorrect: false,
          feedback:
            'UI depending on util (pure helpers) is correct and expected — not a problem.',
        },
        {
          id: 'no-scope',
          label: 'The rules use type tags instead of colour-coding',
          isCorrect: false,
          feedback:
            'Type tags are exactly the right mechanism; colour has nothing to do with it.',
        },
        {
          id: 'feature-to-feature',
          label: 'type:feature may depend on type:feature',
          isCorrect: true,
          feedback:
            'Allowing feature → feature is the tangle this whole campaign fixed. Features should not depend on each other; drop type:feature from that list.',
        },
        {
          id: 'util-feature',
          label: 'type:util is allowed to depend on type:feature',
          isCorrect: true,
          feedback:
            'That inverts the layering — a low-level util depending on a feature creates upward dependencies and cycles. util should depend only on util.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Dependencies should point downward. Which rule points up?',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'enforce-module-boundaries allows a source tag to depend only on the listed target tags. Good layering points down: feature → ui/data-access/util, ui → util, util → util. Anything pointing up or sideways (feature→feature) invites cycles.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'Two rules are wrong: util→feature (upward) and feature→feature (sideways).',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Flag util→feature and feature→feature. The ui→util rule is correct.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Rules encoded' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 15,
          reason:
            'Loose boundary rules let forbidden dependencies keep landing.',
        },
      ],
      helpLinks: [
        { topicId: 'nx.tag-rules', label: 'Tags and boundary rules' },
        {
          topicId: 'nx.libraries-boundaries',
          label: 'Nx libraries and boundaries',
        },
      ],
      successFeedback:
        'Boundaries now point strictly downward — lint enforces the architecture automatically.',
      failureFeedback:
        'Find the rules that point upward (util→feature) or sideways (feature→feature).',
    },
  ],
  reflectionPrompt:
    'Why is a lint rule a better place for architecture decisions than a code-review convention?',
  rewards: [{ type: 'xp', amount: 5, label: 'Boundaries enforced' }],
};
