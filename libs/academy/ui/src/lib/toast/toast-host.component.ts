import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ToastService } from './toast.service';

/**
 * Renders the toast stack (bottom-centre, clear of the comms HUD on the
 * right and the sidebar content) plus the SR-only announcement region.
 * Mount ONCE in the app shell. The stack itself is a polite live region,
 * so every toast is read out as it appears.
 */
@Component({
  selector: 'ea-toast-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="toasts" aria-live="polite">
      @for (toast of service.toasts(); track toast.id) {
        <div class="toast" [attr.data-tone]="toast.tone">
          <span class="toast__message">{{ toast.message }}</span>
          <button
            type="button"
            class="toast__close"
            (click)="service.dismiss(toast.id)"
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      }
    </div>
    <span class="ea-visually-hidden" aria-live="polite">{{ service.announcement() }}</span>
  `,
  styles: [
    `
      .toasts {
        position: fixed;
        bottom: 1.25rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 70;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        pointer-events: none;
      }

      .toast {
        --toast-accent: var(--ea-success, #34d399);
        pointer-events: auto;
        display: flex;
        align-items: center;
        gap: 0.6rem;
        max-width: min(26rem, calc(100vw - 2rem));
        padding: 0.55rem 0.9rem;
        border: 1px solid color-mix(in srgb, var(--toast-accent) 55%, transparent);
        border-radius: 999px;
        background: color-mix(in srgb, var(--ea-bg-0, #070a14) 88%, transparent);
        backdrop-filter: blur(10px);
        box-shadow:
          0 12px 30px rgba(0, 0, 0, 0.45),
          0 0 16px color-mix(in srgb, var(--toast-accent) 18%, transparent);
        animation: toast-in 0.22s ease-out;
      }

      .toast[data-tone='info'] {
        --toast-accent: var(--ea-accent, #22d3ee);
      }

      .toast[data-tone='warn'] {
        --toast-accent: var(--ea-warn, #fbbf24);
      }

      .toast__message {
        font-size: 0.85rem;
        color: var(--ea-text, #e2e8f0);
      }

      .toast__close {
        border: 0;
        padding: 0 0.15rem;
        background: transparent;
        color: var(--ea-muted, #94a3b8);
        font-size: 1rem;
        line-height: 1;
        cursor: pointer;
      }

      .toast__close:hover {
        color: var(--ea-text, #e2e8f0);
      }

      @keyframes toast-in {
        from {
          opacity: 0;
          transform: translateY(8px);
        }

        to {
          opacity: 1;
          transform: none;
        }
      }
    `,
  ],
})
export class ToastHostComponent {
  protected readonly service = inject(ToastService);
}
