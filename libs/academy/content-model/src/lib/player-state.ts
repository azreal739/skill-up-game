/**
 * Persisted player state and its Zod schema. Loaded state is validated —
 * anything that fails validation is discarded rather than trusted.
 */
import { z } from 'zod';
import { initialMeters } from './meters';
import {
  challengeAttemptSchema,
  challengeProgressSchema,
  playerNoteSchema,
  technicalDebtItemSchema,
} from './progress';

/** Current persisted save version. Bumped when the save shape changes. */
export const SAVE_VERSION = 2;

export const SETTINGS_DEFAULTS = {
  masterVolume: 0.8,
  musicVolume: 0.5,
  sfxVolume: 0.8,
  muted: false,
  reducedMotion: false,
  highContrast: false,
  textScale: 1,
  voiceEnabled: false,
  voiceSpeed: 1,
  displayTransmissions: false,
  autoPlay: true,
};

export const settingsSchema = z.object({
  masterVolume: z.number().min(0).max(1),
  musicVolume: z.number().min(0).max(1),
  sfxVolume: z.number().min(0).max(1),
  muted: z.boolean(),
  reducedMotion: z.boolean(),
  highContrast: z.boolean(),
  textScale: z.number().min(0.8).max(1.6),
  // Added after save v2 shipped — defaulted so existing saves keep parsing.
  voiceEnabled: z.boolean().default(false),
  voiceSpeed: z.number().min(0.7).max(1.4).default(1),
  // Show the mentors' transmission text on-screen. When voice is on the words
  // are carried by the comms HUD, so on-screen text is opt-in; when voice is
  // off the text always shows regardless (so briefings are never lost).
  displayTransmissions: z.boolean().default(false),
  // Auto-play narration on mission screens (briefings, questions, feedback,
  // hints) and when opening playable text, so it flows as one conversation.
  autoPlay: z.boolean().default(true),
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
  version: z.literal(SAVE_VERSION),
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
  // Technical Debt Review Loop collections (Review Loop spec 03/04/06/10).
  // Older (v1) saves are migrated to add these as empty arrays.
  challengeAttempts: z.array(challengeAttemptSchema),
  challengeProgress: z.array(challengeProgressSchema),
  technicalDebtItems: z.array(technicalDebtItemSchema),
  notes: z.array(playerNoteSchema),
});

export type PlayerSettings = z.infer<typeof settingsSchema>;
export type MissionRecord = z.infer<typeof missionRecordSchema>;
export type PlayerState = z.infer<typeof playerStateSchema>;

export function createPlayerState(name: string, callsign = ''): PlayerState {
  return {
    version: SAVE_VERSION,
    profile: { name, callsign, createdAt: new Date().toISOString() },
    xp: 0,
    badges: [],
    completedMissions: {},
    settings: { ...SETTINGS_DEFAULTS },
    meters: initialMeters(),
    challengeAttempts: [],
    challengeProgress: [],
    technicalDebtItems: [],
    notes: [],
  };
}

/**
 * Bring an older save forward to the current shape before validation.
 *
 * v1 saves predate the Technical Debt Review Loop and lack its collections;
 * we add them as empty arrays and bump the version so no progress is lost.
 * Anything already at the current version (or unrecognisable) is returned
 * untouched, leaving the Zod validator to accept or discard it.
 */
export function migrateSave(raw: unknown): unknown {
  if (typeof raw !== 'object' || raw === null) {
    return raw;
  }
  const state = raw as Record<string, unknown>;
  if (state['version'] === 1) {
    return {
      ...state,
      version: SAVE_VERSION,
      challengeAttempts: [],
      challengeProgress: [],
      technicalDebtItems: [],
      notes: [],
    };
  }
  return raw;
}
