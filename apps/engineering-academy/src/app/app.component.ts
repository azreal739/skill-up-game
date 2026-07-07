import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AudioService, GameStateService } from '@academy/data-access';

@Component({
  selector: 'ea-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <a class="ea-visually-hidden" href="#ea-main">Skip to content</a>
    <header class="topbar">
      <a class="topbar__brand" routerLink="/">
        <span class="topbar__logo" aria-hidden="true">⬡</span>
        <span class="topbar__name">Engineering Academy</span>
      </a>
      <nav class="topbar__nav" aria-label="Primary">
        @if (gameState.hasProfile()) {
          <a routerLink="/campaigns" routerLinkActive="is-active">Campaigns</a>
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
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  protected readonly gameState = inject(GameStateService);
  private readonly audio = inject(AudioService);
  private interacted = false;

  constructor() {
    // Reflect accessibility settings onto <body> so global styles apply
    // everywhere, including overlays (16_ACCESSIBILITY_AND_INCLUSION.md).
    effect(() => {
      const settings = this.gameState.settings();
      document.body.classList.toggle('ea-reduced-motion', settings.reducedMotion);
      document.body.classList.toggle('ea-high-contrast', settings.highContrast);
      // Text scale must land on the root element: rem-based sizes (which is
      // most of the UI) resolve against <html>, not <body>.
      document.documentElement.style.fontSize = `${settings.textScale * 100}%`;
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
