import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AudioService, GameStateService } from '@academy/data-access';

@Component({
  selector: 'ea-landing',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  protected readonly gameState = inject(GameStateService);
  private readonly audio = inject(AudioService);
  private readonly router = inject(Router);

  protected name = signal('');
  protected callsign = signal('');
  protected showForm = signal(false);

  beginEnrolment(): void {
    this.audio.play('click');
    this.showForm.set(true);
  }

  createProfile(): void {
    const name = this.name().trim();
    if (!name) {
      return;
    }
    this.gameState.createProfile(name, this.callsign().trim());
    this.audio.play('mission-complete');
    this.router.navigateByUrl('/campaigns');
  }

  continueGame(): void {
    this.audio.play('click');
    this.router.navigateByUrl('/campaigns');
  }
}
