# 08 — Audio, Animation and Feedback

## Goal

The game must feel alive.

Feedback should make learning satisfying.

## Audio System

Provide independent controls:

- Master volume.
- Music volume.
- Sound effects volume.
- Mute all.

Persist settings locally.

## Sound Events

### Positive

- Correct answer.
- XP gained.
- Badge unlocked.
- Mission complete.
- Campaign complete.
- Rank promotion.
- Production restored.

### Negative or Tension

- Incorrect answer.
- Stability decrease.
- Technical debt increase.
- Incident severity increase.
- Pipeline failed.
- Cache issue detected.
- Critical alert.

### Neutral

- Button click.
- Panel open.
- Hint opened.
- Tool activated.
- Mission start.
- Dialogue advance.

## Background Music

Music should be optional.

Suggested states:
- Academy hub: calm futuristic ambience.
- Mission briefing: focused pulse.
- Incident active: tense rhythm.
- Boss mission: intense.
- Victory: triumphant.

If actual audio assets are not available, implement the audio manager and use placeholder assets or generated simple tones.

## Animation System

Animations should be consistent and not excessive.

Required animations:
- Screen transitions.
- XP bar fill.
- Badge unlock.
- Mission card unlock.
- HUD meter changes.
- Correct/incorrect answer feedback.
- Tool activation.
- Incident alert.
- Victory celebration.

## Reduced Motion

All major animations must respect reduced motion mode.

When reduced motion is enabled:
- Avoid screen shake.
- Avoid particle overload.
- Use fades instead of large movement.
- Disable continuous background motion.

## Visual Effects

Use effects sparingly:
- Confetti on campaign completion.
- Red pulse during P1 incidents.
- Glitch effect when technical debt is high.
- Green sweep when production restored.
- Pipeline nodes animate during deployment challenges.

## Feedback Timing

Do not instantly dump long explanations. Sequence feedback:

1. Immediate result.
2. Visual consequence.
3. Explanation.
4. Learning takeaway.
5. Continue button.

## Cross References

- UI spec: [07_UI_UX_SPECIFICATION.md](07_UI_UX_SPECIFICATION.md)
- Accessibility: [16_ACCESSIBILITY_AND_INCLUSION.md](16_ACCESSIBILITY_AND_INCLUSION.md)
