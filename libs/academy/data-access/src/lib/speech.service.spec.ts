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
