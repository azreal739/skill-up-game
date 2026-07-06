# 07 — UI/UX Specification

## Visual Theme

Engineering Academy should look like a futuristic mission-control platform.

Design keywords:
- Dark mode.
- Glass panels.
- Neon accents.
- Terminal-inspired details.
- Clean dashboard layout.
- Animated status indicators.
- Professional but playful.

## Primary Screens

### 1. Landing Screen

Purpose:
Introduce the Academy.

Elements:
- Animated title.
- Tagline.
- Start / Continue button.
- Settings button.
- Sound toggle.

### 2. Player Profile

Elements:
- Avatar.
- Rank.
- XP bar.
- Badges.
- Campaign completion.
- Lifetime stats.

### 3. Campaign Hub

Elements:
- Campaign map.
- Locked/unlocked states.
- Campaign cards.
- Recommended next mission.
- Progress percentage.

### 4. Mission Briefing

Elements:
- AI mentor dialogue.
- Mission title.
- Incident severity.
- Learning objectives.
- Start mission button.

### 5. Mission Workspace

The main gameplay screen.

Recommended layout:
- Left: mission context and artefacts.
- Centre: challenge interaction.
- Right: Help / hints / tools.
- Top HUD: XP, stability, debt, severity.
- Bottom: submit and navigation controls.

### 6. Results Screen

Elements:
- Score.
- XP gained.
- Badges unlocked.
- Consequences.
- Lesson summary.
- Retry / continue options.

### 7. Help Centre

Searchable reference content.

See [10_HELP_CENTRE_AND_HINT_SYSTEM.md](10_HELP_CENTRE_AND_HINT_SYSTEM.md).

### 8. Settings

Elements:
- Music volume.
- SFX volume.
- Reduced motion.
- High contrast.
- Text size.
- Reset progress.

## HUD Requirements

The HUD should show:

- Current rank.
- XP.
- Campaign.
- Mission.
- Platform stability.
- Technical debt.
- Incident severity.
- Available tools.
- Hint count.

## Status Visuals

### Platform Stability

Green: healthy.
Yellow: degraded.
Orange: unstable.
Red: critical.

### Technical Debt

Low: subtle.
Medium: warning.
High: visible system noise.
Critical: glitch effects.

### Incident Severity

Info, Low, Medium, High, Critical, P1.

## Responsive Behaviour

Desktop-first but responsive.

Minimum support:
- 1366px desktop.
- 1024px tablet.
- Mobile should be usable for reading and simple interactions, but complex code challenges may be best on desktop.

## UI Tone

Use language that feels like an engineering incident simulator.

Examples:
- "Mission Control has detected a contract mismatch."
- "Platform stability improved."
- "Technical debt increased."
- "Zod validation prevented a runtime failure."
- "Deployment pipeline is stable."

## Cross References

- Audio and animation: [08_AUDIO_ANIMATION_AND_FEEDBACK.md](08_AUDIO_ANIMATION_AND_FEEDBACK.md)
- Accessibility: [16_ACCESSIBILITY_AND_INCLUSION.md](16_ACCESSIBILITY_AND_INCLUSION.md)
