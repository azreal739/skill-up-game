import { z } from 'zod';

/**
 * Campaign tracks: parallel gameplay paths, each with its own linear unlock
 * chain and its own beginner→expert difficulty curve.
 *
 * - `mission-control` — the original story campaigns: fictional incidents on
 *   the simulated platform.
 * - `field-notes` — DMM Field Notes: real lessons captured from the team's
 *   own skill-up sessions and past work, replayed as campaigns.
 */
export const campaignTrackSchema = z.enum(['mission-control', 'field-notes', 'dance-judging']);
export type CampaignTrack = z.infer<typeof campaignTrackSchema>;

export interface TrackDefinition {
  id: CampaignTrack;
  /** User-facing name of the path. */
  title: string;
  /** One-line framing shown under the path heading. */
  tagline: string;
  /**
   * A short paragraph shown on the path summary card and path landing header —
   * more room than the tagline to set the tone of the path.
   */
  blurb: string;
  /**
   * Glyph/emoji that stands in for the path across the UI (summary card, nav,
   * profile). Purely presentational.
   */
  emblem: string;
  /**
   * The path's signature accent colour (any CSS colour). Drives the accent of
   * the summary card and path view, and is the hook for giving each path its
   * own look later — set once here, themed everywhere via `--ea-path-accent`.
   */
  accent: string;
}

/**
 * Hub display order: story first, then the team's real learnings. Adding a new
 * path is data-only: extend `campaignTrackSchema`, add an entry here, and tag
 * campaigns with the new `track` id — the overview, path view, nav dropdown and
 * profile all iterate `TRACKS`, so they pick it up with no code changes.
 */
export const TRACKS: readonly TrackDefinition[] = [
  {
    id: 'mission-control',
    title: 'Mission Control',
    tagline: 'Simulated operations — themed tours of duty on the Academy platform.',
    blurb:
      'Story-driven simulations of life on the platform team. Work fictional incidents end to end and learn the stack by living through it.',
    emblem: '🛰️',
    accent: '#22d3ee',
  },
  {
    id: 'field-notes',
    title: 'DMM Field Notes',
    tagline: 'Past learnings from the team — real sessions, real mistakes, real fixes.',
    blurb:
      "Real lessons captured from the team's own skill-up sessions, replayed as campaigns. The mistakes are real, and so is what they taught us.",
    emblem: '📓',
    accent: '#a78bfa',
  },
  {
    id: 'dance-judging',
    title: 'Dance Academy — Judge Path',
    tagline: 'UCWDC Judge Level 1 — train your eye for the floor.',
    blurb:
      'Step off the engineering floor and onto the dance floor. Learn to judge couples and line dancing the way a certified panel does — timing, rhythm, motion, character, signature figures and spatial structure — one dance at a time.',
    emblem: '💃',
    accent: '#fb7185',
  },
] as const;

export function trackById(id: string): TrackDefinition | undefined {
  return TRACKS.find((track) => track.id === id);
}
