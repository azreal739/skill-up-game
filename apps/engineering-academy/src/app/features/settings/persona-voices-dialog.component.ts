import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output, inject } from '@angular/core';

import { PERSONAS } from '@academy/content-model';
import { SpeechService } from '@academy/data-access';
import { PersonaAvatarComponent, VoiceButtonComponent } from '@academy/ui';

/** Short in-character intro spoken when you preview a mentor's voice. */
interface CastMember {
  speaker: string;
  role: string;
  line: string;
}

/**
 * "Meet the mentors" modal, opened from Settings. Shows the whole cast as
 * illustrated portraits with a play button each; pressing play speaks that
 * mentor's intro in their own voice and lights their active-speaker ring while
 * it plays. Replaces the old test-a-voice dropdown with something that also
 * shows the player who they'll be hearing.
 */
@Component({
  selector: 'ea-persona-voices-dialog',
  standalone: true,
  imports: [PersonaAvatarComponent, VoiceButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cast" role="dialog" aria-modal="true" aria-labelledby="cast-title" (click)="onBackdrop($event)">
      <div class="cast__panel ea-panel">
        <header class="cast__head">
          <div>
            <p class="ea-eyebrow">Mentor voices</p>
            <h2 id="cast-title" class="cast__title">Meet the mentors</h2>
          </div>
          <button type="button" class="cast__close" (click)="close.emit()" aria-label="Close">✕</button>
        </header>
        <p class="cast__note">
          Press play on any mentor to hear their voice. You'll meet them throughout the Academy —
          each one narrates their own part of your missions.
        </p>

        <ul class="cast__grid">
          @for (member of cast; track member.speaker) {
            <li class="cast__card" [style.--card-accent]="accentOf(member.speaker)">
              <div class="cast__top">
                <ea-persona-avatar
                  class="cast__avatar"
                  [speaker]="member.speaker"
                  [talking]="isSpeaking(member.speaker)"
                />
                <div class="cast__meta">
                  <span class="cast__name">{{ member.speaker }}</span>
                  <span class="cast__role">{{ member.role }}</span>
                </div>
              </div>
              <ea-voice-button [speaker]="member.speaker" [text]="member.line" label="Play" />
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .cast {
        position: fixed;
        inset: 0;
        z-index: 80;
        display: grid;
        place-items: center;
        padding: 1.5rem;
        background: color-mix(in srgb, var(--ea-bg, #070b14) 86%, transparent);
        backdrop-filter: blur(4px);
      }

      .cast__panel {
        width: min(720px, 100%);
        max-height: min(86vh, 720px);
        overflow-y: auto;
        display: grid;
        gap: 1rem;
        padding: 1.5rem 1.7rem 1.7rem;
      }

      .cast__head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
      }

      .cast__title {
        margin: 0.1rem 0 0;
      }

      .cast__close {
        flex: 0 0 auto;
        width: 2rem;
        height: 2rem;
        border-radius: 999px;
        border: 1px solid var(--ea-border);
        background: transparent;
        color: var(--ea-muted);
        cursor: pointer;
        font-size: 0.9rem;
        line-height: 1;
      }

      .cast__close:hover {
        color: var(--ea-text);
        border-color: var(--ea-accent);
      }

      .cast__note {
        margin: 0;
        font-size: 0.85rem;
        color: var(--ea-muted);
        line-height: 1.55;
      }

      .cast__grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
        gap: 0.85rem;
      }

      .cast__card {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 0.85rem 0.95rem;
        border-radius: 14px;
        border: 1px solid color-mix(in srgb, var(--card-accent, var(--ea-accent)) 45%, var(--ea-border));
        background: color-mix(in srgb, var(--card-accent, var(--ea-accent)) 8%, transparent);
      }

      .cast__top {
        display: flex;
        align-items: center;
        gap: 0.85rem;
      }

      .cast__avatar {
        width: 60px;
        height: 60px;
      }

      .cast__meta {
        flex: 1 1 auto;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
      }

      .cast__name {
        font-weight: 600;
        font-size: 0.92rem;
        color: var(--ea-text);
      }

      .cast__role {
        font-size: 0.75rem;
        color: var(--ea-muted);
        line-height: 1.35;
      }
    `,
  ],
})
export class PersonaVoicesDialogComponent {
  @Output() close = new EventEmitter<void>();

  private readonly speech = inject(SpeechService);

  protected readonly cast: CastMember[] = [
    {
      speaker: 'Mission Control',
      role: 'Runs point on every operation',
      line: `Mission Control, on the channel. I set the scene and call the shots — stay sharp and we'll get through this clean.`,
    },
    {
      speaker: 'Senior Dev',
      role: 'The calm voice with a hint',
      line: `Senior Dev here. When you're stuck, I'm the one with the nudge — no judgement, just the next step.`,
    },
    {
      speaker: 'Team Lead',
      role: 'Keeps the crew aligned',
      line: `Team Lead speaking. I keep the stakes clear and the team moving. Let's ship something we're proud of.`,
    },
    {
      speaker: 'Mentor Judge',
      role: 'Teaches you to see the dance',
      line: `Mentor Judge here. I'll teach you to read a floor the way a judge does — timing, motion, character.`,
    },
    {
      speaker: 'Head Judge',
      role: 'Final calls come through them',
      line: `Head Judge. The final call is mine to make — precision and fairness, every single round.`,
    },
    {
      speaker: 'Academy Archivist',
      role: 'Keeps the reference library',
      line: `The Academy Archivist. Ask me anything and I'll read you the entry, calm and clear.`,
    },
  ];

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.close.emit();
  }

  protected onBackdrop(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('cast')) {
      this.close.emit();
    }
  }

  protected accentOf(speaker: string): string {
    return PERSONAS.find((p) => p.speaker === speaker)?.accent ?? 'var(--ea-accent)';
  }

  protected isSpeaking(speaker: string): boolean {
    const now = this.speech.nowPlaying();
    return !!now && now.speaker === speaker && now.phase !== 'generating';
  }
}
