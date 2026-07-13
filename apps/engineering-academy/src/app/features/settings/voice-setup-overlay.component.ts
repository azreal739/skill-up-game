import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NarrativeBlock } from '@academy/content-model';
import { SpeechService } from '@academy/data-access';
import { MentorDialogueComponent } from '@academy/ui';

/**
 * The one-time "getting things ready" screen while the on-device voice model
 * loads. Reuses the briefing transmission style: the mentors banter about the
 * calibration while a progress meter tracks the real download/initialisation.
 * Shown by the settings page whenever the engine is loading; if the player
 * navigates away the load continues in the background.
 */
@Component({
  selector: 'ea-voice-setup-overlay',
  standalone: true,
  imports: [MentorDialogueComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="setup" role="dialog" aria-modal="true" aria-labelledby="voice-setup-title">
      <div class="setup__panel ea-panel">
        <p class="ea-eyebrow">One-time calibration</p>
        <h2 id="voice-setup-title" class="setup__title">Bringing voice systems online</h2>

        <ea-mentor-dialogue [blocks]="banter" [live]="true" [instant]="instant" />

        <div class="setup__meter" role="progressbar" aria-label="Voice systems loading"
          [attr.aria-valuenow]="speech.progress()" aria-valuemin="0" aria-valuemax="100">
          <div class="setup__meter-fill" [style.width.%]="speech.progress()"></div>
        </div>
        <p class="setup__pct" role="status">
          @if (speech.warming()) {
            calibrating the mentors' voices…
          } @else {
            {{ speech.progress() }}%
          }
        </p>

        <p class="setup__note">
          Everything installs onto this computer — after this, the mentors speak instantly
          and never need a connection. Feel free to keep playing; we'll finish in the background.
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .setup {
        position: fixed;
        inset: 0;
        z-index: 60;
        display: grid;
        place-items: center;
        padding: 1.5rem;
        background: color-mix(in srgb, var(--ea-bg, #070b14) 88%, transparent);
        backdrop-filter: blur(4px);
      }

      .setup__panel {
        width: min(620px, 100%);
        display: grid;
        gap: 1rem;
        padding: 1.6rem 1.8rem;
      }

      .setup__title {
        margin: 0;
      }

      .setup__meter {
        height: 10px;
        border-radius: 999px;
        border: 1px solid var(--ea-border);
        overflow: hidden;
        background: rgba(255, 255, 255, 0.04);
      }

      .setup__meter-fill {
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, var(--ea-accent), var(--ea-accent-2));
        transition: width 0.4s ease;
      }

      .setup__pct {
        margin: -0.4rem 0 0;
        font-family: var(--ea-mono);
        font-size: 0.75rem;
        color: var(--ea-muted);
        text-align: right;
      }

      .setup__note {
        margin: 0;
        font-size: 0.85rem;
        color: var(--ea-muted);
        line-height: 1.5;
      }
    `,
  ],
})
export class VoiceSetupOverlayComponent {
  protected readonly speech = inject(SpeechService);

  /** Respect reduced motion: render the banter statically. */
  protected get instant(): boolean {
    return document.body.classList.contains('ea-reduced-motion');
  }

  protected readonly banter: NarrativeBlock[] = [
    {
      speaker: 'Mission Control',
      text: 'All stations — voice synthesizers coming online. First calibration installs the whole array onto this machine, so give it a moment. No uplink needed after this.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Eighty-two million parameters of neural vocoder, running fully local. Classic trade-off: a bigger first load, then it belongs to you — instant, offline, private.',
    },
    {
      speaker: 'Team Lead',
      text: 'While it spins up: status boards stay green, nobody touches production. Next briefing, you will actually hear us. Try not to be disappointed by my voice.',
    },
  ];
}
