import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  computed,
  inject,
  signal,
} from '@angular/core';

import { NarrativeBlock } from '@academy/content-model';

import { PersonaAvatarComponent } from '../persona-avatar/persona-avatar.component';
import { EA_SPEECH_PLAYER } from './speech-player';

/** Ms before a block starts typing — the "incoming transmission" beat. */
const INCOMING_MS = 500;
/** Ms per typed tick and characters revealed per tick. */
const TICK_MS = 18;
const CHARS_PER_TICK = 2;
/** Pause between one block settling and the next arriving. */
const BLOCK_GAP_MS = 350;

/**
 * Authored Game Master dialogue (09_AI_GAME_MASTER.md). In `live` mode the
 * blocks arrive as transmissions: an incoming state, a typed-out message with
 * cursor, then the next block. Clicking (or Skip) completes everything
 * instantly, and `instant` (reduced motion) renders statically.
 */
@Component({
  selector: 'ea-mentor-dialogue',
  standalone: true,
  imports: [PersonaAvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="dialogue"
      [class.dialogue--live]="animating()"
      (click)="skip()"
      [attr.title]="animating() ? 'Click to show the full transmission' : null"
    >
      @for (block of blocks; track $index) {
        @if ($index < revealedCount()) {
          <div class="dialogue__block dialogue__block--settled">
            <ea-persona-avatar [speaker]="block.speaker" />
            <div class="dialogue__body">
              <span class="dialogue__speaker">{{ block.speaker }}</span>
              <p class="dialogue__text">{{ block.text }}</p>
            </div>
          </div>
        } @else if ($index === revealedCount() && animating()) {
          <div class="dialogue__block dialogue__block--active">
            <ea-persona-avatar [speaker]="block.speaker" [talking]="!incoming()" />
            <div class="dialogue__body">
              <span class="dialogue__speaker">
                {{ block.speaker }}
                <span class="dialogue__signal" aria-hidden="true">▮ transmitting</span>
              </span>
              <!-- Screen readers get the full text at once; the animation is decoration. -->
              <p class="ea-visually-hidden">{{ block.text }}</p>
              <p class="dialogue__text" aria-hidden="true">
                @if (incoming()) {
                  <span class="dialogue__incoming">incoming transmission…</span>
                } @else {
                  {{ typed() }}<span class="dialogue__cursor">▊</span>
                }
              </p>
            </div>
          </div>
        }
      }

      @if (animating()) {
        <button type="button" class="dialogue__skip" (click)="skip()">Skip transmission ⏩</button>
      }
    </div>
  `,
  styleUrls: ['./mentor-dialogue.component.scss'],
})
export class MentorDialogueComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) blocks!: NarrativeBlock[];
  /** Animate blocks in as live transmissions (briefings). */
  @Input() live = false;
  /** Render everything immediately (reduced motion). */
  @Input() instant = false;

  /** Blocks fully revealed; the block at this index is the one typing. */
  protected readonly revealedCount = signal(0);
  protected readonly typed = signal('');
  protected readonly incoming = signal(false);

  protected readonly animating = computed(
    () => this.live && !this.instant && this.revealedCount() < (this.blocks?.length ?? 0)
  );

  /** Optional narration engine (provided by the app; absent = silent). */
  private readonly player = inject(EA_SPEECH_PLAYER, { optional: true });

  private timer: ReturnType<typeof setTimeout> | null = null;
  /** Invalidates pending timers/speech continuations on skip/restart. */
  private runId = 0;
  /** Resolves when the active block's narration finishes (or immediately). */
  private speechDone: Promise<void> = Promise.resolve();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['blocks'] || changes['live'] || changes['instant']) {
      this.restart();
    }
  }

  ngOnDestroy(): void {
    this.runId++;
    this.clearTimer();
    this.player?.cancel();
  }

  skip(): void {
    if (!this.animating()) {
      return;
    }
    this.runId++;
    this.clearTimer();
    this.player?.cancel();
    this.revealedCount.set(this.blocks.length);
    this.typed.set('');
  }

  private restart(): void {
    this.runId++;
    this.clearTimer();
    this.player?.cancel();
    if (!this.live || this.instant) {
      this.revealedCount.set(this.blocks?.length ?? 0);
      return;
    }
    this.revealedCount.set(0);
    this.beginBlock();
  }

  private beginBlock(): void {
    if (this.revealedCount() >= this.blocks.length) {
      return;
    }
    const run = this.runId;
    this.incoming.set(true);
    this.typed.set('');
    this.timer = setTimeout(() => {
      this.incoming.set(false);
      const block = this.blocks[this.revealedCount()];
      // Narration runs alongside the typewriter; the block only settles when
      // both are done, so the avatar keeps talking to the end of the line.
      this.speechDone =
        this.player?.active() && block
          ? this.player.speak(block.speaker, block.text).catch(() => undefined)
          : Promise.resolve();
      this.typeFrom(0, run);
    }, INCOMING_MS);
  }

  private typeFrom(position: number, run: number): void {
    const text = this.blocks[this.revealedCount()]?.text ?? '';
    if (position >= text.length) {
      this.timer = setTimeout(() => {
        void this.speechDone.then(() => {
          if (run !== this.runId) {
            return;
          }
          this.revealedCount.update((count) => count + 1);
          this.beginBlock();
        });
      }, BLOCK_GAP_MS);
      return;
    }
    const next = Math.min(position + CHARS_PER_TICK, text.length);
    this.typed.set(text.slice(0, next));
    this.timer = setTimeout(() => this.typeFrom(next, run), TICK_MS);
  }

  private clearTimer(): void {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
