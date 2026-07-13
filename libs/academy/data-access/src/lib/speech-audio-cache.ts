/**
 * Persistent cache for generated narration audio (IndexedDB). Generating a
 * line costs real compute — seconds on CPU-only machines — so finished lines
 * are kept across sessions: replaying a briefing, or re-opening the game,
 * plays instantly instead of regenerating.
 *
 * Every method is failure-silent: if IndexedDB is unavailable (private
 * browsing, storage pressure, exotic browsers) the cache simply behaves as
 * always-empty and narration falls back to generating each time.
 */

const STORE = 'lines';

interface CachedLine {
  /** `voiceId|text` — same key the in-memory cache uses. */
  key: string;
  /** One WAV blob per spoken sentence, in playback order. */
  wavs: Blob[];
  savedAt: number;
}

export class SpeechAudioCache {
  private db: Promise<IDBDatabase | null> | null = null;

  constructor(
    private readonly dbName = 'ea-speech-cache',
    /** Oldest entries are pruned beyond this count. */
    private readonly maxEntries = 300
  ) {}

  async load(key: string): Promise<Blob[] | null> {
    const db = await this.open();
    if (!db) {
      return null;
    }
    try {
      const line = await request<CachedLine | undefined>(
        db.transaction(STORE, 'readonly').objectStore(STORE).get(key)
      );
      return line?.wavs?.length ? line.wavs : null;
    } catch {
      return null;
    }
  }

  async save(key: string, wavs: readonly Blob[]): Promise<void> {
    const db = await this.open();
    if (!db || !wavs.length) {
      return;
    }
    try {
      const store = db.transaction(STORE, 'readwrite').objectStore(STORE);
      await request(store.put({ key, wavs: [...wavs], savedAt: Date.now() } satisfies CachedLine));
      await this.prune(db);
    } catch {
      // Storage full or blocked — narration just regenerates next time.
    }
  }

  /** Remove everything (used by tests; could back a future settings button). */
  async clear(): Promise<void> {
    const db = await this.open();
    if (!db) {
      return;
    }
    try {
      await request(db.transaction(STORE, 'readwrite').objectStore(STORE).clear());
    } catch {
      // Ignore.
    }
  }

  private async prune(db: IDBDatabase): Promise<void> {
    const store = db.transaction(STORE, 'readwrite').objectStore(STORE);
    const count = await request(store.count());
    let excess = count - this.maxEntries;
    if (excess <= 0) {
      return;
    }
    // Walk oldest-first via the savedAt index and delete the overflow.
    await new Promise<void>((resolve, reject) => {
      const cursor = store.index('savedAt').openCursor();
      cursor.onerror = () => reject(cursor.error);
      cursor.onsuccess = () => {
        const current = cursor.result;
        if (!current || excess <= 0) {
          resolve();
          return;
        }
        current.delete();
        excess--;
        current.continue();
      };
    });
  }

  private open(): Promise<IDBDatabase | null> {
    this.db ??= new Promise((resolve) => {
      try {
        const openRequest = indexedDB.open(this.dbName, 1);
        openRequest.onupgradeneeded = () => {
          const store = openRequest.result.createObjectStore(STORE, { keyPath: 'key' });
          store.createIndex('savedAt', 'savedAt');
        };
        openRequest.onsuccess = () => resolve(openRequest.result);
        openRequest.onerror = () => resolve(null);
        openRequest.onblocked = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
    return this.db;
  }
}

function request<T>(idbRequest: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    idbRequest.onsuccess = () => resolve(idbRequest.result);
    idbRequest.onerror = () => reject(idbRequest.error);
  });
}
