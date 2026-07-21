import { Injectable, signal } from '@angular/core';

export type ToastTone = 'success' | 'info' | 'warn';

export interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
}

/** How long a toast stays up, and how many can stack before the oldest drops. */
const TOAST_MS = 3500;
const MAX_TOASTS = 3;
/** How long an SR-only announcement stays in the live region. */
const ANNOUNCE_MS = 4000;

/**
 * Transient feedback for quiet actions (note saved, settings changed,
 * progress reset). Toasts render via {@link ToastHostComponent} — mounted
 * once in the app shell — inside a polite live region, so every toast is
 * also announced to screen readers. `announce()` speaks to the live region
 * WITHOUT a visual toast, for state changes that are already visible
 * on-screen (rank-ups, comms lines) but invisible to assistive tech.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 0;
  private readonly timers = new Map<number, ReturnType<typeof setTimeout>>();

  readonly toasts = signal<readonly Toast[]>([]);
  /** SR-only live-region text (empty when idle). */
  readonly announcement = signal('');
  private announceTimer: ReturnType<typeof setTimeout> | null = null;

  show(message: string, tone: ToastTone = 'success'): void {
    const toast: Toast = { id: ++this.nextId, message, tone };
    this.toasts.update((list) => {
      const next = [...list, toast];
      return next.length > MAX_TOASTS ? next.slice(next.length - MAX_TOASTS) : next;
    });
    this.timers.set(
      toast.id,
      setTimeout(() => this.dismiss(toast.id), TOAST_MS)
    );
  }

  dismiss(id: number): void {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
    this.toasts.update((list) => list.filter((toast) => toast.id !== id));
  }

  /** Screen-reader-only announcement (no visual toast). */
  announce(message: string): void {
    this.announcement.set(message);
    if (this.announceTimer) {
      clearTimeout(this.announceTimer);
    }
    this.announceTimer = setTimeout(() => {
      this.announceTimer = null;
      this.announcement.set('');
    }, ANNOUNCE_MS);
  }
}
