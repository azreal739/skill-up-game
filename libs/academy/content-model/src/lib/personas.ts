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
    | 'operator';
  /** Exact `NarrativeBlock.speaker` string this persona renders for. */
  speaker: string;
  /** Tint for the persona's avatar. */
  accent: string;
}

export const PERSONAS: readonly PersonaDefinition[] = [
  { id: 'mission-control', speaker: 'Mission Control', accent: '#5eead4' },
  { id: 'senior-dev', speaker: 'Senior Dev', accent: '#8ab4ff' },
  { id: 'team-lead', speaker: 'Team Lead', accent: '#fcd34d' },
  { id: 'mentor-judge', speaker: 'Mentor Judge', accent: '#e9a3f5' },
  { id: 'head-judge', speaker: 'Head Judge', accent: '#fda4af' },
];

const GENERIC_PERSONA: Omit<PersonaDefinition, 'speaker'> = {
  id: 'operator',
  accent: '#9fb2c8',
};

/** Resolve a speaker string to its persona (generic operator if unknown). */
export function personaForSpeaker(speaker: string): PersonaDefinition {
  return (
    PERSONAS.find((persona) => persona.speaker === speaker) ?? { ...GENERIC_PERSONA, speaker }
  );
}
