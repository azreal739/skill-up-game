import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TRACKS } from '@academy/content-model';
import { AudioService, GameStateService, SpeechService } from '@academy/data-access';
import { WaveBackgroundComponent } from './shared/wave-background/wave-background.component';
import { RouteLoaderComponent } from './shared/route-loader/route-loader.component';

@Component({
  selector: 'ea-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    WaveBackgroundComponent,
    RouteLoaderComponent,
  ],
  template: `
    <ea-wave-background />
    <a class="ea-visually-hidden" href="#ea-main">Skip to content</a>
    <header class="topbar">
      <a class="topbar__brand" routerLink="/">
        <span class="topbar__logo" aria-hidden="true">⬡</span>
        <span class="topbar__name">Engineering Academy</span>
      </a>
      <nav class="topbar__nav" aria-label="Primary">
        @if (gameState.hasProfile()) {
          <div
            class="topbar__group"
            [class.is-open]="pathsOpen()"
            (mouseleave)="closePaths()"
            (keydown.escape)="closePaths()"
          >
            <a routerLink="/campaigns" routerLinkActive="is-active">Campaigns</a>
            <button
              type="button"
              class="topbar__caret"
              (click)="togglePaths()"
              [attr.aria-expanded]="pathsOpen()"
              aria-haspopup="true"
              aria-label="Choose a path"
            >
              ▾
            </button>
            <div class="topbar__menu" role="menu">
              <a
                class="topbar__menu-overview"
                routerLink="/campaigns"
                role="menuitem"
                (click)="closePaths()"
                >All paths</a
              >
              @for (path of paths; track path.id) {
                <a
                  [routerLink]="['/paths', path.id]"
                  role="menuitem"
                  (click)="closePaths()"
                >
                  <span class="topbar__menu-emblem" aria-hidden="true">{{ path.emblem }}</span>
                  {{ path.title }}
                </a>
              }
            </div>
          </div>
          <a routerLink="/backlog" routerLinkActive="is-active">
            Backlog
            @if (gameState.openDebtCount() > 0) {
              <span class="topbar__badge" aria-label="{{ gameState.openDebtCount() }} open items">{{
                gameState.openDebtCount()
              }}</span>
            }
          </a>
          <a routerLink="/notes" routerLinkActive="is-active">Notes</a>
          <a routerLink="/profile" routerLinkActive="is-active">Profile</a>
        }
        <a routerLink="/help" routerLinkActive="is-active">Help Centre</a>
        @if (gameState.hasProfile()) {
          <a routerLink="/settings" routerLinkActive="is-active">Settings</a>
        }
      </nav>
      @if (gameState.hasProfile()) {
        <div class="topbar__status">
          <span class="topbar__rank">{{ gameState.rank().title }}</span>
          <span class="topbar__xp">{{ gameState.xp() }} XP</span>
        </div>
      }
    </header>
    <main id="ea-main" (click)="onFirstInteraction()">
      <router-outlet />
    </main>
    <ea-route-loader />
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  protected readonly gameState = inject(GameStateService);
  private readonly audio = inject(AudioService);
  private readonly speech = inject(SpeechService);
  private interacted = false;

  /** Paths listed in the Campaigns nav dropdown (iterated, so extensible). */
  protected readonly paths = TRACKS;
  protected readonly pathsOpen = signal(false);

  togglePaths(): void {
    this.pathsOpen.update((open) => !open);
  }

  closePaths(): void {
    this.pathsOpen.set(false);
  }

  constructor() {
    // Reflect accessibility settings onto <body> so global styles apply
    // everywhere, including overlays (16_ACCESSIBILITY_AND_INCLUSION.md).
    effect(() => {
      const settings = this.gameState.settings();
      document.body.classList.toggle('ea-reduced-motion', settings.reducedMotion);
      document.body.classList.toggle('ea-high-contrast', settings.highContrast);
      // Mirror on <html> so root-level effects (view transitions, fixed
      // overlays outside <body> stacking) also respect the setting.
      document.documentElement.classList.toggle('ea-reduced-motion', settings.reducedMotion);
      // Text scale must land on the root element: rem-based sizes (which is
      // most of the UI) resolve against <html>, not <body>.
      document.documentElement.style.fontSize = `${settings.textScale * 100}%`;
    });

    // Keep the narration engine in step with the voice setting: warm it up
    // on boot for returning voice users, tear it down when switched off.
    // Edge-detected: settings() re-emits on every state write, and enable()
    // must only fire on an actual toggle (it retries from the error state).
    let voiceWasEnabled: boolean | undefined;
    effect(() => {
      const voiceEnabled = this.gameState.settings().voiceEnabled;
      if (voiceEnabled === voiceWasEnabled) {
        return;
      }
      // First run = app boot (restoring a saved setting): warm silently. A
      // later flip is the user toggling in Settings: end calibration with
      // the audible voice check.
      const isBoot = voiceWasEnabled === undefined;
      voiceWasEnabled = voiceEnabled;
      if (voiceEnabled) {
        this.speech.enable({ voiceCheck: !isBoot });
      } else {
        this.speech.disable();
      }
    });
  }

  /** Browsers only allow audio after a user gesture. */
  onFirstInteraction(): void {
    if (!this.interacted) {
      this.interacted = true;
      this.audio.play('click');
    }
  }
}
