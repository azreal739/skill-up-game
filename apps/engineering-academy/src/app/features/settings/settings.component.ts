import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService, GameStateService, SpeechService } from '@academy/data-access';
import { VoiceSetupOverlayComponent } from './voice-setup-overlay.component';

@Component({
  selector: 'ea-settings',
  standalone: true,
  imports: [VoiceSetupOverlayComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  protected readonly gameState = inject(GameStateService);
  protected readonly speech = inject(SpeechService);
  private readonly audio = inject(AudioService);
  private readonly router = inject(Router);

  /** Transient status shown under the import/export controls. */
  protected readonly transferStatus = signal<{ ok: boolean; message: string } | null>(null);

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

  onVoiceToggle(event: Event): void {
    const input = event.target as HTMLInputElement;
    // The AppComponent effect reacts to this setting and starts/stops the
    // engine; the loading overlay below tracks its progress.
    this.gameState.updateSettings({ voiceEnabled: input.checked });
    this.audio.play('click');
  }

  retryVoice(): void {
    this.audio.play('click');
    this.speech.enable({ voiceCheck: true });
  }

  exportProgress(): void {
    this.audio.play('click');
    const name = this.gameState.state()?.profile.name ?? 'engineer';
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'engineer';
    const blob = new Blob([this.gameState.exportState()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `engineering-academy-${slug}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    this.transferStatus.set({ ok: true, message: 'Progress exported.' });
  }

  onImportFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const ok = this.gameState.importState(String(reader.result));
      this.transferStatus.set(
        ok
          ? { ok: true, message: 'Progress imported — your save has been replaced.' }
          : { ok: false, message: 'That file is not a valid Academy save.' }
      );
      this.audio.play(ok ? 'correct' : 'incorrect');
    };
    reader.onerror = () =>
      this.transferStatus.set({ ok: false, message: 'Could not read that file.' });
    reader.readAsText(file);
    // Allow re-importing the same file name again.
    input.value = '';
  }

  resetProgress(): void {
    if (confirm('Reset all Academy progress on this device? This cannot be undone.')) {
      this.gameState.resetProgress();
      this.router.navigateByUrl('/');
    }
  }
}
