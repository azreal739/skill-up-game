import { PERSONAS, personaForSpeaker } from './personas';

describe('personas', () => {
  it('registers each speaker exactly once', () => {
    const speakers = PERSONAS.map((persona) => persona.speaker);
    expect(new Set(speakers).size).toBe(speakers.length);
    const ids = PERSONAS.map((persona) => persona.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('resolves every registered speaker to its persona', () => {
    for (const persona of PERSONAS) {
      expect(personaForSpeaker(persona.speaker)).toEqual(persona);
    }
  });

  it('falls back to the generic operator for unknown speakers', () => {
    const unknown = personaForSpeaker('Guest Star');
    expect(unknown.id).toBe('operator');
    expect(unknown.speaker).toBe('Guest Star');
    expect(unknown.accent).toBeTruthy();
    expect(unknown.voiceId).toBeTruthy();
  });

  it('gives every persona a Kokoro voice id', () => {
    // Ids follow Kokoro's <lang+gender>_<name> shape; the local-package
    // script must bundle a .bin for each (tools/package-academy-local.mjs).
    for (const persona of PERSONAS) {
      expect(persona.voiceId).withContext(persona.id).toMatch(/^[ab][fm]_[a-z]+$/);
    }
  });
});
