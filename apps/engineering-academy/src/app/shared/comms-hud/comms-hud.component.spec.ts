import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { SpeechService, SpeechStatus, SpokenLine } from '@academy/data-access';

import { CommsHudComponent } from './comms-hud.component';

/** Minimal stand-in exposing just the signals/methods the HUD reads. */
class FakeSpeech {
  status = signal<SpeechStatus>('off');
  spokenHistory = signal<SpokenLine[]>([]);
  now: ReturnType<SpeechService['nowPlaying']> = null;
  nowPlaying() {
    return this.now;
  }
}

describe('CommsHudComponent', () => {
  let fixture: ComponentFixture<CommsHudComponent>;
  let speech: FakeSpeech;

  beforeEach(async () => {
    speech = new FakeSpeech();
    await TestBed.configureTestingModule({
      imports: [CommsHudComponent],
      providers: [{ provide: SpeechService, useValue: speech }],
    }).compileComponents();
    fixture = TestBed.createComponent(CommsHudComponent);
  });

  const html = () => fixture.nativeElement as HTMLElement;

  it('stays hidden until the engine is ready', () => {
    speech.spokenHistory.set([{ id: 1, speaker: 'Mission Control', text: 'Hello.' }]);
    fixture.detectChanges();
    expect(html().querySelector('.hud')).toBeNull();
  });

  it('stays hidden when ready but nothing has been said', () => {
    speech.status.set('ready');
    fixture.detectChanges();
    expect(html().querySelector('.hud')).toBeNull();
  });

  it('shows the newest line live and the rest in the log', () => {
    speech.status.set('ready');
    speech.spokenHistory.set([
      { id: 1, speaker: 'Senior Dev', text: 'One.' },
      { id: 2, speaker: 'Team Lead', text: 'Two.' },
      { id: 3, speaker: 'Mission Control', text: 'Three.' },
    ]);
    fixture.detectChanges();

    expect(html().querySelector('.hud')).not.toBeNull();
    // Newest line drives the live speaker panel.
    expect(html().querySelector('.hud__live-name')?.textContent).toContain('Mission Control');
    // The earlier two show as log messages.
    expect(html().querySelectorAll('.hud__msg').length).toBe(2);
    expect(html().querySelector('.hud__toggle-count')?.textContent).toContain('2');
  });

  it('renders the live panel first and the log below it, newest message on top', () => {
    speech.status.set('ready');
    speech.spokenHistory.set([
      { id: 1, speaker: 'Senior Dev', text: 'One.' },
      { id: 2, speaker: 'Team Lead', text: 'Two.' },
      { id: 3, speaker: 'Mission Control', text: 'Three.' },
    ]);
    fixture.detectChanges();

    const hud = html().querySelector('.hud');
    const sections = Array.from(hud?.children ?? []).map((el) => el.className);
    expect(sections[0]).toContain('hud__live');
    expect(sections[1]).toContain('hud__log');

    // Log reads top-down, newest first.
    const names = Array.from(html().querySelectorAll('.hud__msg-name')).map((el) =>
      el.textContent?.trim()
    );
    expect(names).toEqual(['Team Lead', 'Senior Dev']);
  });
});
