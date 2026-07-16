import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import {
  AudioService,
  ContentService,
  GameStateService,
  LearningAnalyticsService,
  MissionSessionService,
  SpeechService,
} from '@academy/data-access';

import { WaveStateService } from '../../shared/wave-background/wave-state.service';
import { MissionPlayerComponent } from './mission-player.component';

describe('MissionPlayerComponent narration lifecycle', () => {
  let fixture: ComponentFixture<MissionPlayerComponent>;
  let phase: ReturnType<typeof signal<'briefing' | 'challenge' | 'results'>>;
  let active: boolean;
  let speakAll: jasmine.Spy;
  let cancel: jasmine.Spy;
  let setAlert: jasmine.Spy;

  beforeEach(async () => {
    const mission = signal<{ id: string } | null>(null);
    phase = signal<'briefing' | 'challenge' | 'results'>('briefing');
    active = true;
    speakAll = jasmine.createSpy('speakAll').and.returnValue(Promise.resolve());
    cancel = jasmine.createSpy('cancel');
    setAlert = jasmine.createSpy('setAlert');

    const settings = signal({
      voiceEnabled: true,
      autoPlay: true,
      displayTransmissions: false,
    });
    const missionDefinition = {
      id: 'mission-1',
      title: 'Mission one',
      summary: 'Summary',
      difficulty: 'easy',
      briefing: [],
    };

    await TestBed.configureTestingModule({
      imports: [MissionPlayerComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ missionId: 'mission-1' })) },
        },
        {
          provide: ContentService,
          useValue: { missionById: () => missionDefinition },
        },
        { provide: AudioService, useValue: { play: jasmine.createSpy('play') } },
        {
          provide: WaveStateService,
          useValue: { setAlert, pulse: jasmine.createSpy('pulse') },
        },
        { provide: LearningAnalyticsService, useValue: {} },
        {
          provide: MissionSessionService,
          useValue: {
            mission,
            phase,
            currentRun: signal(null),
            start: (next: { id: string }) => {
              mission.set(next);
              phase.set('briefing');
            },
          },
        },
        { provide: GameStateService, useValue: { settings } },
        {
          provide: SpeechService,
          useValue: {
            active: () => active,
            speakAll,
            speak: jasmine.createSpy('speak').and.returnValue(Promise.resolve()),
            cancel,
          },
        },
      ],
    })
      .overrideComponent(MissionPlayerComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(MissionPlayerComponent);
    fixture.detectChanges();
  });

  it('shows briefing text when the narration engine is unavailable', () => {
    active = false;

    const component = fixture.componentInstance as unknown as {
      showBriefingText: () => boolean;
    };
    expect(component.showBriefingText()).toBeTrue();
  });

  it('cancels narration when the mission player is destroyed', () => {
    fixture.destroy();

    expect(cancel).toHaveBeenCalled();
    expect(setAlert).toHaveBeenCalledWith(false);
  });

  it('auto-narrates the briefing again when the mission is replayed', () => {
    expect(speakAll).toHaveBeenCalledTimes(1);
    phase.set('results');
    fixture.detectChanges();

    fixture.componentInstance.replay();
    fixture.detectChanges();

    expect(speakAll).toHaveBeenCalledTimes(2);
  });
});
