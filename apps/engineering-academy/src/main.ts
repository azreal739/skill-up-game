import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Cross-origin isolation unlocks multithreaded WebAssembly for the voice
 * engine (2–4× faster CPU generation). Hosts we control send the COOP/COEP
 * headers directly (crossOriginIsolated is already true → no-op); on
 * header-less static hosts, register coi-sw.js to stamp the headers and
 * reload once so the worker takes control. Best-effort: any failure just
 * means single-threaded voice generation, never a broken app.
 */
async function ensureCrossOriginIsolation(): Promise<boolean> {
  if (
    window.crossOriginIsolated ||
    !window.isSecureContext ||
    !('serviceWorker' in navigator) ||
    sessionStorage.getItem('ea-coi-attempted')
  ) {
    return false;
  }
  try {
    sessionStorage.setItem('ea-coi-attempted', '1');
    const registration = await navigator.serviceWorker.register('coi-sw.js');
    if (navigator.serviceWorker.controller) {
      return false; // Already controlled; headers apply from the next load anyway.
    }
    await new Promise<void>((resolve) => {
      const worker = registration.installing ?? registration.waiting;
      if (registration.active || !worker) {
        resolve();
        return;
      }
      worker.addEventListener('statechange', () => {
        if (worker.state === 'activated') {
          resolve();
        }
      });
      setTimeout(resolve, 3000); // Never hold the app hostage.
    });
    location.reload();
    return true;
  } catch {
    // Isolation is an optimisation only.
    return false;
  }
}

async function startApplication(): Promise<void> {
  // Do not expose an interactive app that can be torn down by the first-load
  // service-worker reload a moment later.
  if (await ensureCrossOriginIsolation()) {
    return;
  }
  await bootstrapApplication(AppComponent, appConfig);
}

void startApplication().catch((err) => console.error(err));
