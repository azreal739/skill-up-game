import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PERSONAS } from '@academy/content-model';
import { AudioService, GameStateService, SpeechService } from '@academy/data-access';
import { VoiceButtonComponent } from '@academy/ui';
import { VoiceSetupOverlayComponent } from './voice-setup-overlay.component';

@Component({
  selector: 'ea-settings',
  standalone: true,
  imports: [DecimalPipe, VoiceButtonComponent, VoiceSetupOverlayComponent],
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

  onVoiceSpeed(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.gameState.updateSettings({ voiceSpeed: Number(input.value) });
    // Hear the new pace immediately, in Mission Control's voice.
    void this.speech.speak('Mission Control', `Narration speed set to ${input.value}.`);
  }

  /** The full cast, for the test-a-voice dropdown. */
  protected readonly personas = PERSONAS;
  protected readonly testSpeaker = signal(PERSONAS[0].speaker);
  protected readonly testLine = computed(
    () =>
      `${this.testSpeaker()} here — this is my voice. You'll hear me like this throughout the Academy.`
  );

  onTestSpeaker(event: Event): void {
    this.testSpeaker.set((event.target as HTMLSelectElement).value);
  }

  /** Tear the engine down and run the full calibration (with voice check). */
  recalibrate(): void {
    this.audio.play('click');
    this.speech.disable();
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
