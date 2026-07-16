import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';

import { personaForSpeaker } from '@academy/content-model';
import { SpeechService, SpokenLine } from '@academy/data-access';
import { PersonaAvatarComponent, VoiceButtonComponent } from '@academy/ui';

/** Ms per typewriter tick and characters revealed each tick (live panel). */
const TICK_MS = 18;
const CHARS_PER_TICK = 2;

/**
 * Persistent "comms" HUD anchored bottom-right: a dedicated speaker panel that
 * shows whoever is currently speaking (avatar with active-speaker ring + the
 * line typing out), with a collapsible group-chat log of recent lines above
 * it. Each logged message is outlined/tinted in its persona's colour and has a
 * replay button. Only shown once the on-device voice engine is calibrated and
 * something has actually been said.
 */
@Component({
  selector: 'ea-comms-hud',
  standalone: true,
  imports: [PersonaAvatarComponent, VoiceButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <aside class="hud" aria-label="Mentor comms">
        @if (past().length) {
          <section class="hud__log" [class.hud__log--collapsed]="collapsed()">
            <button
              type="button"
              class="hud__toggle"
              (click)="collapsed.set(!collapsed())"
              [attr.aria-expanded]="!collapsed()"
            >
              <span class="hud__toggle-label">Comms log</span>
              <span class="hud__toggle-count">{{ past().length }}</span>
              <span class="hud__chevron" aria-hidden="true">{{ collapsed() ? '▸' : '▾' }}</span>
            </button>
            @if (!collapsed()) {
              <ul #list class="hud__messages">
                @for (m of past(); track m.id) {
                  <li class="hud__msg" [style.--msg-accent]="accentFor(m.speaker)">
                    <div class="hud__msg-head">
                      <span class="hud__msg-name">{{ m.speaker }}</span>
                      <ea-voice-button [speaker]="m.speaker" [text]="m.text" />
                    </div>
                    <p class="hud__msg-text">{{ m.text }}</p>
                  </li>
                }
              </ul>
            }
          </section>
        }

        <section class="hud__live" [style.--live-accent]="accentFor(live()!.speaker)">
          @for (l of liveList(); track l.id) {
            <div class="hud__live-inner">
              <ea-persona-avatar class="hud__avatar" [speaker]="l.speaker" [talking]="speaking()" />
              <div class="hud__live-body">
                <span class="hud__live-name">
                  {{ l.speaker }}
                  @if (speaking()) {
                    <span class="hud__transmit" aria-hidden="true">▮ transmitting</span>
                  }
                </span>
                <p class="hud__live-text">
                  {{ typed()
                  }}<span class="hud__cursor" [class.is-on]="speaking()" aria-hidden="true">▊</span>
                </p>
              </div>
            </div>
          }
        </section>
      </aside>
    }
  `,
  styleUrls: ['./comms-hud.component.scss'],
})
export class CommsHudComponent {
  private readonly speech = inject(SpeechService);
  private readonly list = viewChild<ElementRef<HTMLElement>>('list');

  /** Only show once the engine is calibrated AND someone has spoken. */
  protected readonly visible = computed(
    () => this.speech.status() === 'ready' && this.speech.spokenHistory().length > 0
  );

  /** The most recent line goes in the speaker panel; the rest are the log. */
  protected readonly live = computed<SpokenLine | null>(
    () => this.speech.spokenHistory().at(-1) ?? null
  );
  protected readonly past = computed<SpokenLine[]>(() => {
    const all = this.speech.spokenHistory();
    return all.slice(0, Math.max(0, all.length - 1));
  });
  /** Single-item list so the panel re-mounts (fades in) on speaker change. */
  protected readonly liveList = computed(() => (this.live() ? [this.live()!] : []));

  /** True while the live line is actually playing (drives ring + typewriter). */
  protected readonly speaking = computed(() => {
    const now = this.speech.nowPlaying();
    const l = this.live();
    return !!now && !!l && now.phase === 'playing' && now.speaker === l.speaker && now.text === l.text;
  });

  protected readonly collapsed = signal(false);
  protected readonly typed = signal('');
  private typeTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    // Typewriter for the live line: type it out while it's playing, otherwise
    // show it in full. Re-runs when the line or speaking state changes.
    effect(() => {
      const line = this.live();
      const speaking = this.speaking();
      untracked(() => this.retype(line, speaking));
    });

    // Keep the log scrolled to the newest message.
    effect(() => {
      this.past();
      this.collapsed();
      const el = this.list()?.nativeElement;
      if (el) {
        queueMicrotask(() => (el.scrollTop = el.scrollHeight));
      }
    });
  }

  protected accentFor(speaker: string): string {
    return personaForSpeaker(speaker).accent;
  }

  private retype(line: SpokenLine | null, speaking: boolean): void {
    if (this.typeTimer) {
      clearInterval(this.typeTimer);
      this.typeTimer = null;
    }
    if (!line) {
      this.typed.set('');
      return;
    }
    const reducedMotion = document.body.classList.contains('ea-reduced-motion');
    if (!speaking || reducedMotion) {
      this.typed.set(line.text);
      return;
    }
    let i = 0;
    this.typed.set('');
    this.typeTimer = setInterval(() => {
      i = Math.min(i + CHARS_PER_TICK, line.text.length);
      this.typed.set(line.text.slice(0, i));
      if (i >= line.text.length && this.typeTimer) {
        clearInterval(this.typeTimer);
        this.typeTimer = null;
      }
    }, TICK_MS);
  }
}
