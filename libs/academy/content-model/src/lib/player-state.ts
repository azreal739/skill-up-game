/**
 * Persisted player state and its Zod schema. Loaded state is validated —
 * anything that fails validation is discarded rather than trusted.
 */
import { z } from 'zod';
import { initialMeters } from './meters';

export const SETTINGS_DEFAULTS = {
  masterVolume: 0.8,
  musicVolume: 0.5,
  sfxVolume: 0.8,
  muted: false,
  reducedMotion: false,
  highContrast: false,
  textScale: 1,
};

export const settingsSchema = z.object({
  masterVolume: z.number().min(0).max(1),
  musicVolume: z.number().min(0).max(1),
  sfxVolume: z.number().min(0).max(1),
  muted: z.boolean(),
  reducedMotion: z.boolean(),
  highContrast: z.boolean(),
  textScale: z.number().min(0.8).max(1.6),
});

export const missionRecordSchema = z.object({
  missionId: z.string(),
  bestScoreRatio: z.number().min(0).max(1),
  bestXp: z.number().int().nonnegative(),
  timesCompleted: z.number().int().positive(),
  perfect: z.boolean(),
  noHints: z.boolean(),
  completedAt: z.string(),
});

export const platformMetersSchema = z.object({
  stability: z.number().min(0).max(100),
  technicalDebt: z.number().min(0).max(100),
  severityIndex: z.number().int().min(0).max(5),
  teamConfidence: z.number().min(0).max(100),
});

export const playerStateSchema = z.object({
  version: z.literal(1),
  profile: z.object({
    name: z.string().min(1),
    callsign: z.string(),
    createdAt: z.string(),
  }),
  xp: z.number().int().nonnegative(),
  badges: z.array(z.string()),
  completedMissions: z.record(z.string(), missionRecordSchema),
  settings: settingsSchema,
  meters: platformMetersSchema,
});

export type PlayerSettings = z.infer<typeof settingsSchema>;
export type MissionRecord = z.infer<typeof missionRecordSchema>;
export type PlayerState = z.infer<typeof playerStateSchema>;

export function createPlayerState(name: string, callsign = ''): PlayerState {
  return {
    version: 1,
    profile: { name, callsign, createdAt: new Date().toISOString() },
    xp: 0,
    badges: [],
    completedMissions: {},
    settings: { ...SETTINGS_DEFAULTS },
    meters: initialMeters(),
  };
}
