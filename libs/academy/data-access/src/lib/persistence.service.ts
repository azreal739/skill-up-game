import { Injectable } from '@angular/core';
import { PlayerState, migrateSave, playerStateSchema } from '@academy/content-model';

const SAVE_KEY = 'engineering-academy:save';

/**
 * Local save state (11_TECHNICAL_ARCHITECTURE.md). Loaded data is validated
 * with Zod — a corrupted or tampered save is discarded rather than trusted.
 */
@Injectable({ providedIn: 'root' })
export class PersistenceService {
  load(): PlayerState | null {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
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
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('[persistence] failed to save state', error);
    }
  }

  clear(): void {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch (error) {
      console.error('[persistence] failed to clear save state', error);
    }
  }
}
