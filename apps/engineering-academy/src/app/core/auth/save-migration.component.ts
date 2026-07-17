import { Component, inject } from '@angular/core';
import { GameStateService, PersistenceService } from '@academy/data-access';

@Component({
  selector: 'ea-save-migration',
  standalone: true,
  template: `
    @if (persistence.migrationPending()) {
      <div class="migration-backdrop" role="presentation">
        <section class="migration-card" role="dialog" aria-modal="true" aria-labelledby="migration-title">
          <p class="migration-card__eyebrow">Local progress found</p>
          <h2 id="migration-title">Use this device's existing Academy profile?</h2>
          <p>
            This browser already has accountless progress. Choose whether to copy it into your
            signed-in profile on this device. The original local save will be kept either way.
          </p>
          <div class="migration-card__actions">
            <button type="button" class="ea-btn ea-btn--primary" (click)="useExisting()">
              Use existing progress
            </button>
            <button type="button" class="ea-btn" (click)="startFresh()">
              Start fresh
            </button>
          </div>
        </section>
      </div>
    }
  `,
  styles: `
    .migration-backdrop {
      position: fixed; inset: 0; z-index: 200; display: grid; place-items: center;
      padding: 1rem; background: rgba(2, 6, 18, 0.82); backdrop-filter: blur(10px);
    }
    .migration-card {
      width: min(34rem, 100%); padding: 2rem; border: 1px solid var(--ea-border);
      border-radius: 20px; background: var(--ea-panel); box-shadow: 0 30px 80px rgba(0,0,0,.55);
    }
    .migration-card h2 { margin: .4rem 0 1rem; }
    .migration-card p { color: var(--ea-muted); line-height: 1.65; }
    .migration-card__eyebrow { color: var(--ea-accent) !important; font-family: var(--ea-mono); text-transform: uppercase; letter-spacing: .12em; font-size: .75rem; }
    .migration-card__actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1.5rem; }
  `,
})
export class SaveMigrationComponent {
  protected readonly persistence = inject(PersistenceService);
  private readonly gameState = inject(GameStateService);

  protected useExisting(): void {
    this.gameState.adoptUnscopedSave();
  }

  protected startFresh(): void {
    this.persistence.dismissUnscopedSave();
  }
}
