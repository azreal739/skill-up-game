/**
 * Small id generator for persisted records (attempts, debt items, notes).
 * Prefers crypto.randomUUID where available and degrades to a timestamped
 * random suffix, so ids stay unique across a session without a backend.
 */
export function createId(prefix: string): string {
  const cryptoObj = (globalThis as { crypto?: Crypto }).crypto;
  if (cryptoObj?.randomUUID) {
    return `${prefix}_${cryptoObj.randomUUID()}`;
  }
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}
