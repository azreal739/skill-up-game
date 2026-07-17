import { Injectable, InjectionToken, inject, signal } from '@angular/core';
import {
  PlayerSettings,
  PlayerState,
  migrateSave,
  playerStateSchema,
  settingsSchema,
} from '@academy/content-model';

const SAVE_KEY = 'engineering-academy:save';
const PREFERENCES_KEY = 'engineering-academy:preferences';
const MIGRATION_KEY = 'engineering-academy:save-migration';

/** Optional hosted-auth identity used only to namespace this device's save. */
export const SAVE_SCOPE = new InjectionToken<string | null>('EA_SAVE_SCOPE', {
  factory: () => null,
});

/**
 * Local save state (11_TECHNICAL_ARCHITECTURE.md). Loaded data is validated
 * with Zod — a corrupted or tampered save is discarded rather than trusted.
 */
@Injectable({ providedIn: 'root' })
export class PersistenceService {
  private readonly scope = inject(SAVE_SCOPE);
  private readonly scopedSaveKey = this.scope ? `${SAVE_KEY}:${this.scope}` : SAVE_KEY;
  private readonly scopedPreferencesKey = this.scope
    ? `${PREFERENCES_KEY}:${this.scope}`
    : PREFERENCES_KEY;
  private readonly migrationKey = this.scope ? `${MIGRATION_KEY}:${this.scope}` : null;
  private readonly migrationPendingSignal = signal(this.shouldOfferMigration());

  readonly migrationPending = this.migrationPendingSignal.asReadonly();

  load(): PlayerState | null {
    return this.loadKey(this.scopedSaveKey);
  }

  /** Preferences chosen before enrolment live independently of a profile. */
  loadPreferences(): PlayerSettings | null {
    try {
      const raw = localStorage.getItem(this.scopedPreferencesKey);
      if (raw === null) {
        return null;
      }
      const result = settingsSchema.safeParse(JSON.parse(raw));
      return result.success ? result.data : null;
    } catch (error) {
      console.error('[persistence] failed to load pre-enrolment preferences', error);
      return null;
    }
  }

  savePreferences(settings: PlayerSettings): void {
    try {
      localStorage.setItem(this.scopedPreferencesKey, JSON.stringify(settings));
    } catch (error) {
      console.error('[persistence] failed to save pre-enrolment preferences', error);
    }
  }

  clearPreferences(): void {
    try {
      localStorage.removeItem(this.scopedPreferencesKey);
    } catch (error) {
      console.error('[persistence] failed to clear pre-enrolment preferences', error);
    }
  }

  private loadKey(key: string): PlayerState | null {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) {
        return null;
      }
      // Older saves are migrated forward before validation so progress
      // survives a schema bump; genuinely corrupt saves still fail and reset.
      const result = playerStateSchema.safeParse(migrateSave(JSON.parse(raw)));
      if (!result.success) {
        console.error('[persistence] discarding invalid save state', result.error.issues);
        return null;
      }
      return result.data;
    } catch (error) {
      console.error('[persistence] failed to load save state', error);
      return null;
    }
  }

  save(state: PlayerState): void {
    try {
      localStorage.setItem(this.scopedSaveKey, JSON.stringify(state));
    } catch (error) {
      console.error('[persistence] failed to save state', error);
    }
  }

  clear(): void {
    try {
      localStorage.removeItem(this.scopedSaveKey);
      localStorage.removeItem(this.scopedPreferencesKey);
    } catch (error) {
      console.error('[persistence] failed to clear save state', error);
    }
  }

  /** Copy an accountless save into this signed-in user's device-local slot. */
  adoptUnscopedSave(): PlayerState | null {
    if (!this.scope) {
      return null;
    }
    const state = this.loadKey(SAVE_KEY);
    if (!state) {
      this.completeMigrationChoice();
      return null;
    }
    this.save(state);
    this.completeMigrationChoice();
    return state;
  }

  /** Keep the old accountless save untouched and begin a fresh scoped profile. */
  dismissUnscopedSave(): void {
    this.completeMigrationChoice();
  }

  private shouldOfferMigration(): boolean {
    if (!this.scope || !this.migrationKey) {
      return false;
    }
    return (
      localStorage.getItem(this.scopedSaveKey) === null &&
      localStorage.getItem(SAVE_KEY) !== null &&
      localStorage.getItem(this.migrationKey) === null &&
      this.loadKey(SAVE_KEY) !== null
    );
  }

  private completeMigrationChoice(): void {
    if (this.migrationKey) {
      localStorage.setItem(this.migrationKey, 'complete');
    }
    this.migrationPendingSignal.set(false);
  }
}
