import { SpeechService } from './speech.service';

describe('SpeechService sequence scheduling', () => {
  it('starts the requested line before prefetching later lines', async () => {
    const events: string[] = [];
    const fakeService = {
      playToken: 0,
      active: () => true,
      cancel() {
        this.playToken++;
      },
      status: () => 'ready',
      nowPlayingState: { set: () => undefined },
      maybeDrainAmbient: () => undefined,
      prefetch: (speaker: string) => events.push(`prefetch:${speaker}`),
      speakLine: async (
        speaker: string,
        _text: string,
        _token: number,
        onPlaybackStart?: () => void
      ) => {
        events.push(`speak:${speaker}`);
        onPlaybackStart?.();
      },
    };

    await SpeechService.prototype.speakAll.call(fakeService as never, [
      { speaker: 'Mission Control', text: 'Mission title' },
      { speaker: 'Senior Dev', text: 'First briefing block' },
      { speaker: 'Security Lead', text: 'Second briefing block' },
    ]);

    expect(events).toEqual([
      'speak:Mission Control',
      'prefetch:Senior Dev',
      'prefetch:Security Lead',
      'speak:Senior Dev',
      'speak:Security Lead',
    ]);
  });
});

describe('SpeechService ambient lines', () => {
  type Fn = (this: unknown, ...args: unknown[]) => unknown;
  const proto = SpeechService.prototype as unknown as Record<string, Fn>;

  /** Fake carrying just the state the ambient methods touch. */
  function harness() {
    const spoken: string[] = [];
    let playing: unknown = null;
    const fake = {
      pendingAmbient: null as { speaker: string; text: string } | null,
      ambientDraining: false,
      playToken: 0,
      current: null,
      active: () => true,
      nowPlayingState: Object.assign(() => playing, {
        set: (value: unknown) => (playing = value),
      }),
      speakAll: (lines: readonly { speaker: string; text: string }[]) => {
        spoken.push(lines[0].text);
        return Promise.resolve();
      },
      sayAmbient(speaker: string, text: string) {
        proto['sayAmbient'].call(this, speaker, text);
      },
      maybeDrainAmbient() {
        proto['maybeDrainAmbient'].call(this);
      },
      drainAmbient() {
        return proto['drainAmbient'].call(this) as Promise<void>;
      },
      setPlaying(value: unknown) {
        playing = value;
      },
    };
    return { fake, spoken };
  }

  const flush = () => new Promise<void>((resolve) => setTimeout(resolve));

  it('plays immediately when nothing is speaking', async () => {
    const { fake, spoken } = harness();
    fake.sayAmbient('Mission Control', 'hello');
    await flush();
    expect(spoken).toEqual(['hello']);
  });

  it('waits for the current line instead of cancelling it, and a newer ambient line replaces a waiting one', async () => {
    const { fake, spoken } = harness();
    fake.setPlaying({ speaker: 'Mission Control', text: 'busy', phase: 'playing' });

    fake.sayAmbient('Mission Control', 'greeting');
    fake.sayAmbient('Mission Control', 'recommendation');
    await flush();
    // Nothing interrupted; the newest line replaced the waiting one.
    expect(spoken).toEqual([]);

    // Playback finished: speakAll's finally hook drains the queue.
    fake.setPlaying(null);
    fake.maybeDrainAmbient();
    await flush();
    expect(spoken).toEqual(['recommendation']);
  });

  it('cancel() drops the waiting ambient line', () => {
    const { fake } = harness();
    fake.setPlaying({ speaker: 'Mission Control', text: 'busy', phase: 'playing' });
    fake.sayAmbient('Mission Control', 'greeting');
    expect(fake.pendingAmbient).not.toBeNull();

    proto['cancel'].call(fake);
    expect(fake.pendingAmbient).toBeNull();
  });
});
