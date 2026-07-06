# 15 — Testing and Quality Strategy

## Testing Goals

The game should be reliable, maintainable and safe to extend.

## Unit Tests

Test:
- XP calculation.
- Rank progression.
- Badge unlock rules.
- Challenge evaluation.
- Hint cost.
- Consequence calculation.
- Content validation.
- Save/load parsing.

## Component Tests

Test:
- Challenge rendering.
- Submission behaviour.
- Help links.
- HUD updates.
- Settings toggles.

## Integration Tests

Test:
- Complete mission flow.
- Campaign unlock flow.
- Save and restore progress.
- Mission completion reward flow.

## Content Tests

All campaign content should be validated.

Required checks:
- Unique IDs.
- Valid challenge types.
- Valid help links.
- At least one hint.
- At least one learning objective.
- Valid rewards.
- No broken references between campaigns/missions/help topics.

## Accessibility Tests

Check:
- Keyboard navigation.
- Focus states.
- Colour contrast.
- Reduced motion.
- ARIA labels where needed.

## Manual QA Checklist

Before release:
- Start new profile.
- Complete first mission.
- Use hints.
- Open Help Centre.
- Complete campaign.
- Reload browser and verify progress.
- Toggle audio.
- Toggle reduced motion.
- Try on smaller viewport.

## Cross References

- Definition of Done: [19_DEFINITION_OF_DONE.md](19_DEFINITION_OF_DONE.md)
- Accessibility: [16_ACCESSIBILITY_AND_INCLUSION.md](16_ACCESSIBILITY_AND_INCLUSION.md)
