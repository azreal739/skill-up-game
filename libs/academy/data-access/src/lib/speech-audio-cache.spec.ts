import { SpeechAudioCache } from './speech-audio-cache';

describe('SpeechAudioCache', () => {
  let cache: SpeechAudioCache;
  let dbName: string;

  const wav = (text: string) => new Blob([text], { type: 'audio/wav' });

  beforeEach(() => {
    // Unique DB per test so runs never interfere.
    dbName = `ea-speech-cache-test-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    cache = new SpeechAudioCache(dbName, 3);
  });

  afterEach(async () => {
    await cache.clear();
    indexedDB.deleteDatabase(dbName);
  });

  it('round-trips a line', async () => {
    const chunks = [wav('sentence one'), wav('sentence two')];
    await cache.save('af_bella|Hello there.', chunks);

    const loaded = await cache.load('af_bella|Hello there.');
    expect(loaded?.length).toBe(2);
    expect(await loaded?.[0].text()).toBe('sentence one');
    expect(await loaded?.[1].text()).toBe('sentence two');
  });

  it('returns null for unknown lines and never stores empty ones', async () => {
    expect(await cache.load('af_bella|Never generated.')).toBeNull();
    await cache.save('af_bella|Empty.', []);
    expect(await cache.load('af_bella|Empty.')).toBeNull();
  });

  it('prunes the oldest entries beyond the cap', async () => {
    for (let i = 1; i <= 5; i++) {
      await cache.save(`voice|line ${i}`, [wav(`audio ${i}`)]);
      // savedAt is a Date.now() index — keep timestamps strictly ordered.
      await new Promise((resolve) => setTimeout(resolve, 3));
    }

    // Cap is 3: the two oldest lines are gone, the three newest remain.
    expect(await cache.load('voice|line 1')).toBeNull();
    expect(await cache.load('voice|line 2')).toBeNull();
    expect(await cache.load('voice|line 3')).not.toBeNull();
    expect(await cache.load('voice|line 5')).not.toBeNull();
  });
});
