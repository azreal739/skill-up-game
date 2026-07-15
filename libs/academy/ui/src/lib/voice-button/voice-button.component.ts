import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';

import { EA_SPEECH_PLAYER, EaSpeechLine, EaSpeechPhase } from '../mentor-dialogue/speech-player';

/**
 * Reusable "read this aloud" control: idle (speaker icon) → generating
 * (spinner) → playing (pause icon) ⇄ paused (play icon). Renders nothing at
 * all when narration is unavailable (no player provided, or voice disabled),
 * so it can be dropped anywhere text deserves a voice. Clicking while
 * generating cancels; the generation still completes into the cache, so the
 * next tap plays instantly.
 */
@Component({
  selector: 'ea-voice-button',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (player?.active()) {
      <button
        type="button"
        class="voice"
        [class.voice--busy]="phase() === 'generating'"
        [class.voice--live]="phase() === 'playing'"
        (click)="toggle($event)"
        [attr.aria-label]="ariaLabel()"
        [attr.title]="ariaLabel()"
      >
        @switch (phase()) {
          @case ('generating') {
            <svg class="voice__icon voice__spinner" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.25" />
              <path d="M8 2 a6 6 0 0 1 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <span class="voice__label">generating…</span>
          }
          @case ('playing') {
            <!-- Transmitting: an animated equalizer (click still pauses). -->
            <svg class="voice__icon voice__eq" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
              <rect class="voice__bar" x="2" y="4" width="2.4" height="8" rx="1.2" />
              <rect class="voice__bar" x="6.8" y="4" width="2.4" height="8" rx="1.2" />
              <rect class="voice__bar" x="11.6" y="4" width="2.4" height="8" rx="1.2" />
            </svg>
            @if (label) {
              <span class="voice__label">transmitting…</span>
            }
          }
          @case ('paused') {
            <svg class="voice__icon" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
              <path d="M4.5 3.2 13 8 4.5 12.8Z" />
            </svg>
          }
          @default {
            <svg class="voice__icon" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 6.2h2.6L9.4 3v10L5.6 9.8H3Z" fill="currentColor" />
              <path d="M11.2 5.4a3.6 3.6 0 0 1 0 5.2 M12.9 3.6a6 6 0 0 1 0 8.8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            @if (label) {
              <span class="voice__label">{{ label }}</span>
            }
          }
        }
      </button>
    }
  `,
  styleUrls: ['./voice-button.component.scss'],
})
export class VoiceButtonComponent {
  /** Persona whose voice reads the text (registry speaker string). */
  @Input() speaker = '';
  @Input() text = '';
  /**
   * Sequence mode: speak these lines back to back (each in its persona's
   * voice) instead of the single speaker/text pair — e.g. a whole briefing.
   */
  @Input() lines: readonly EaSpeechLine[] | null = null;
  /** Optional visible label next to the idle icon (e.g. "Listen"). */
  @Input() label = '';

  protected readonly player = inject(EA_SPEECH_PLAYER, { optional: true });

  protected phase(): EaSpeechPhase | null {
    const now = this.player?.nowPlaying?.();
    if (!now) {
      return null;
    }
    const mine = this.lines
      ? this.lines.some((line) => line.speaker === now.speaker && line.text === now.text)
      : now.speaker === this.speaker && now.text === this.text;
    return mine ? now.phase : null;
  }

  protected ariaLabel(): string {
    switch (this.phase()) {
      case 'generating':
        return 'Generating audio — click to cancel';
      case 'playing':
        return 'Pause narration';
      case 'paused':
        return 'Resume narration';
      default:
        return this.label ? `${this.label} (read aloud)` : 'Read aloud';
    }
  }

  protected toggle(event: Event): void {
    // Hosts like the mentor dialogue treat container clicks as "skip" —
    // pressing play must never double as that.
    event.stopPropagation();
    const player = this.player;
    if (!player) {
      return;
    }
    switch (this.phase()) {
      case 'playing':
        player.pause?.();
        break;
      case 'paused':
        player.resume?.();
        break;
      case 'generating':
        player.cancel();
        break;
      default:
        if (this.lines) {
          void player.speakAll?.(this.lines);
        } else {
          void player.speak(this.speaker, this.text);
        }
    }
  }
}
