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
import { GameStateService, SpeechService, SpokenLine } from '@academy/data-access';
import { PersonaAvatarComponent, VoiceButtonComponent } from '@academy/ui';

/** Ms per typewriter tick and characters revealed each tick (live panel). */
const TICK_MS = 18;
const CHARS_PER_TICK = 2;

/**
 * Persistent "comms" HUD anchored TOP-right, layered over the nav bar so it
 * never covers the page content below: a dedicated speaker panel — large
 * portrait on the RIGHT, a speech bubble on the LEFT whose text types out as
 * the persona talks (a ~3-line window; earlier lines flow out the top) — plus
 * pause/stop controls, and a collapsible group-chat log of recent lines BELOW
 * it, newest first, bubbles anchored to the right with their mini avatar.
 * Only shown once the voice engine is calibrated and something has been said.
 * The log's collapsed state persists via settings.
 */
@Component({
  selector: 'ea-comms-hud',
  standalone: true,
  imports: [PersonaAvatarComponent, VoiceButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <aside class="hud" aria-label="Mentor comms">
        <section class="hud__live" [style.--live-accent]="accentFor(live()!.speaker)">
          @for (l of liveList(); track l.id) {
            <div class="hud__live-inner">
              <div class="hud__bubble">
                <span class="hud__live-name">
                  {{ l.speaker }}
                  @if (speaking()) {
                    <span class="hud__transmit" aria-hidden="true">▮ transmitting</span>
                  }
                </span>
                <div class="hud__bubble-window">
                  <p class="hud__live-text">
                    {{ typed()
                    }}<span class="hud__cursor" [class.is-on]="speaking()" aria-hidden="true">▊</span>
                  </p>
                </div>
                <div class="hud__controls">
                  @if (paused()) {
                    <button type="button" class="hud__ctl" (click)="resume()" aria-label="Resume narration">
                      ▶ Resume
                    </button>
                  } @else if (speaking()) {
                    <button type="button" class="hud__ctl" (click)="pause()" aria-label="Pause narration">
                      ⏸ Pause
                    </button>
                  }
                  @if (speaking() || paused()) {
                    <button type="button" class="hud__ctl hud__ctl--stop" (click)="stop()" aria-label="Stop narration">
                      ■ Stop
                    </button>
                  }
                </div>
              </div>
              <ea-persona-avatar class="hud__avatar" [speaker]="l.speaker" [talking]="speaking()" />
            </div>
          }
        </section>

        @if (past().length) {
          <section class="hud__log" [class.hud__log--collapsed]="collapsed()">
            <button
              type="button"
              class="hud__toggle"
              (click)="toggleCollapsed()"
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
                    <ea-persona-avatar class="hud__msg-avatar" [speaker]="m.speaker" />
                    <div class="hud__msg-bubble">
                      <span class="hud__msg-name">{{ m.speaker }}</span>
                      <p
                        class="hud__msg-text"
                        [class.hud__msg-text--clamped]="!expanded().has(m.id)"
                      >
                        {{ m.text }}
                      </p>
                      <div class="hud__msg-actions">
                        <ea-voice-button [speaker]="m.speaker" [text]="m.text" />
                        @if (isClampable(m.text)) {
                          <button type="button" class="hud__expand" (click)="toggleExpanded(m.id)">
                            {{ expanded().has(m.id) ? 'Show less' : 'Show more' }}
                          </button>
                        }
                      </div>
                    </div>
                  </li>
                }
              </ul>
            }
          </section>
        }
      </aside>
    }
  `,
  styleUrls: ['./comms-hud.component.scss'],
})
export class CommsHudComponent {
  private readonly speech = inject(SpeechService);
  private readonly gameState = inject(GameStateService);
  private readonly list = viewChild<ElementRef<HTMLElement>>('list');

  /** Only show once the engine is calibrated AND someone has spoken. */
  protected readonly visible = computed(
    () => this.speech.status() === 'ready' && this.speech.spokenHistory().length > 0
  );

  /** The most recent line goes in the speaker panel; the rest are the log. */
  protected readonly live = computed<SpokenLine | null>(
    () => this.speech.spokenHistory().at(-1) ?? null
  );
  /** Earlier lines for the log, newest first (the log reads top-down). */
  protected readonly past = computed<SpokenLine[]>(() => {
    const all = this.speech.spokenHistory();
    return all.slice(0, Math.max(0, all.length - 1)).reverse();
  });
  /** Single-item list so the panel re-mounts (fades in) on speaker change. */
  protected readonly liveList = computed(() => (this.live() ? [this.live()!] : []));

  /** True while the live line is actually playing (drives ring + typewriter). */
  protected readonly speaking = computed(() => {
    const now = this.speech.nowPlaying();
    const l = this.live();
    return !!now && !!l && now.phase === 'playing' && now.speaker === l.speaker && now.text === l.text;
  });

  protected readonly paused = computed(() => {
    const now = this.speech.nowPlaying();
    const l = this.live();
    return !!now && !!l && now.phase === 'paused' && now.speaker === l.speaker && now.text === l.text;
  });

  /** Collapse state persists across sessions via settings. */
  protected readonly collapsed = computed(
    () => this.gameState.settings().commsLogCollapsed ?? false
  );

  /** Log messages the player has expanded past the 3-line clamp. */
  protected readonly expanded = signal<ReadonlySet<number>>(new Set());

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

    // Keep the log scrolled to the newest message (which sits at the top).
    effect(() => {
      this.past();
      this.collapsed();
      const el = this.list()?.nativeElement;
      if (el) {
        queueMicrotask(() => (el.scrollTop = 0));
      }
    });
  }

  protected accentFor(speaker: string): string {
    return personaForSpeaker(speaker).accent;
  }

  protected toggleCollapsed(): void {
    this.gameState.updateSettings({ commsLogCollapsed: !this.collapsed() });
  }

  protected toggleExpanded(id: number): void {
    this.expanded.update((set) => {
      const next = new Set(set);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  /** Cheap "would this clamp?" heuristic so short messages get no button. */
  protected isClampable(text: string): boolean {
    return text.length > 130;
  }

  protected pause(): void {
    this.speech.pause();
  }

  protected resume(): void {
    this.speech.resume();
  }

  protected stop(): void {
    this.speech.cancel();
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
