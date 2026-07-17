/**
 * The cast of mentors who speak in mission briefings. `speaker` matches the
 * free-text `NarrativeBlock.speaker` used by content packs; content is free
 * to introduce new speakers, which fall back to the generic operator persona
 * so the UI never breaks. A content-integrity guard asserts the packs only
 * use registered speakers, keeping avatars in sync with the cast.
 */
export interface PersonaDefinition {
  id:
    | 'mission-control'
    | 'senior-dev'
    | 'team-lead'
    | 'mentor-judge'
    | 'head-judge'
    | 'archivist'
    | 'operator';
  /** Exact `NarrativeBlock.speaker` string this persona renders for. */
  speaker: string;
  /** Tint for the persona's avatar. */
  accent: string;
  /**
   * Kokoro TTS voice for this persona (best available grade per role fit —
   * the two most talkative mentors get the A-grade voices). Voice ids must
   * exist in the Kokoro-82M voice set; the bundled-voice list in
   * tools/package-academy-local.mjs must cover every id used here.
   */
  voiceId: string;
}

export const PERSONAS: readonly PersonaDefinition[] = [
  { id: 'mission-control', speaker: 'Mission Control', accent: '#5eead4', voiceId: 'am_michael' },
  { id: 'senior-dev', speaker: 'Senior Dev', accent: '#8ab4ff', voiceId: 'am_fenrir' },
  { id: 'team-lead', speaker: 'Team Lead', accent: '#fcd34d', voiceId: 'af_bella' },
  { id: 'mentor-judge', speaker: 'Mentor Judge', accent: '#e9a3f5', voiceId: 'af_heart' },
  { id: 'head-judge', speaker: 'Head Judge', accent: '#fda4af', voiceId: 'bm_george' },
  // Reads the Help Centre: bright, engaged British "librarian" (bf_emma) —
  // af_nicole (Kokoro's whisper voice) tested as too slow and sleepy.
  { id: 'archivist', speaker: 'Academy Archivist', accent: '#b9c6e8', voiceId: 'bf_emma' },
];

const GENERIC_PERSONA: Omit<PersonaDefinition, 'speaker'> = {
  id: 'operator',
  accent: '#9fb2c8',
  voiceId: 'af_sarah',
};

/** Resolve a speaker string to its persona (generic operator if unknown). */
export function personaForSpeaker(speaker: string): PersonaDefinition {
  return (
    PERSONAS.find((persona) => persona.speaker === speaker) ?? { ...GENERIC_PERSONA, speaker }
  );
}
