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
export const campaignTrackSchema = z.enum(['mission-control', 'field-notes']);
export type CampaignTrack = z.infer<typeof campaignTrackSchema>;

export interface TrackDefinition {
  id: CampaignTrack;
  title: string;
  /** One-line framing shown under the track heading in the Campaign Hub. */
  tagline: string;
}

/** Hub display order: story first, then the team's real learnings. */
export const TRACKS: readonly TrackDefinition[] = [
  {
    id: 'mission-control',
    title: 'Mission Control',
    tagline: 'Simulated operations — themed tours of duty on the Academy platform.',
  },
  {
    id: 'field-notes',
    title: 'DMM Field Notes',
    tagline: 'Past learnings from the team — real sessions, real mistakes, real fixes.',
  },
] as const;

export function trackById(id: string): TrackDefinition | undefined {
  return TRACKS.find((track) => track.id === id);
}
