import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService, GameStateService } from '@academy/data-access';

@Component({
  selector: 'ea-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  protected readonly gameState = inject(GameStateService);
  private readonly audio = inject(AudioService);
  private readonly router = inject(Router);

  onVolume(key: 'masterVolume' | 'musicVolume' | 'sfxVolume', event: Event): void {
    const input = event.target as HTMLInputElement;
    this.gameState.updateSettings({ [key]: Number(input.value) });
    this.audio.play('click');
  }

  onToggle(
    key: 'muted' | 'reducedMotion' | 'highContrast',
    event: Event
  ): void {
    const input = event.target as HTMLInputElement;
    this.gameState.updateSettings({ [key]: input.checked });
    if (key !== 'muted' || !input.checked) {
      this.audio.play('click');
    }
  }

  onTextScale(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.gameState.updateSettings({ textScale: Number(select.value) });
  }

  resetProgress(): void {
    if (confirm('Reset all Academy progress on this device? This cannot be undone.')) {
      this.gameState.resetProgress();
      this.router.navigateByUrl('/');
    }
  }
}
