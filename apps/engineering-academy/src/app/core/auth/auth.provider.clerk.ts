import {
  EnvironmentProviders,
  Injectable,
  Provider,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
  signal,
} from '@angular/core';
import { SAVE_SCOPE } from '@academy/data-access';
import type { Clerk } from '@clerk/clerk-js';
import { AuthService, AuthStatus } from './auth.service';

declare global {
  interface Window {
    __EA_RUNTIME_CONFIG__?: { clerkPublishableKey?: string | null };
    __internal_ClerkUICtor?: unknown;
  }
}

@Injectable({ providedIn: 'root' })
class ClerkAuthService implements AuthService {
  readonly enabled = true;
  readonly status = signal<AuthStatus>('loading');
  readonly signedIn = signal(false);
  readonly userId = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  private clerk: Clerk | null = null;
  private removeListener: (() => void) | null = null;

  async initialize(): Promise<void> {
    const publishableKey = window.__EA_RUNTIME_CONFIG__?.clerkPublishableKey?.trim();
    if (!publishableKey) {
      this.fail('Authentication is not configured for this deployment yet.');
      return;
    }

    try {
      await loadClerkUi(publishableKey);
      const { Clerk } = await import('@clerk/clerk-js');
      const clerk = new Clerk(publishableKey);
      await clerk.load({
        ui: { ClerkUI: window.__internal_ClerkUICtor as never },
      });
      this.clerk = clerk;
      this.syncUser();
      this.removeListener = clerk.addListener(() => this.syncUser());
      this.status.set('ready');
    } catch (error) {
      console.error('[auth] failed to initialize Clerk', error);
      this.fail('Mission Control could not reach the sign-in service. Please refresh and try again.');
    }
  }

  mountSignIn(element: HTMLDivElement): () => void {
    const clerk = this.requireClerk();
    clerk.mountSignIn(element, {
      forceRedirectUrl: '/',
      waitlistUrl: '/waitlist',
    });
    return () => clerk.unmountSignIn(element);
  }

  mountWaitlist(element: HTMLDivElement): () => void {
    const clerk = this.requireClerk();
    clerk.mountWaitlist(element, {
      afterJoinWaitlistUrl: '/waitlist?joined=1',
      signInUrl: '/sign-in',
    });
    return () => clerk.unmountWaitlist(element);
  }

  mountUserButton(element: HTMLDivElement): () => void {
    const clerk = this.requireClerk();
    clerk.mountUserButton(element);
    return () => clerk.unmountUserButton(element);
  }

  private syncUser(): void {
    const wasSignedIn = this.signedIn();
    const user = this.clerk?.user;
    this.userId.set(user?.id ?? null);
    this.signedIn.set(Boolean(user));
    if (wasSignedIn && !user) {
      window.location.assign('/sign-in');
    }
  }

  private fail(message: string): void {
    this.errorMessage.set(message);
    this.status.set('error');
  }

  private requireClerk(): Clerk {
    if (!this.clerk) {
      throw new Error('Clerk has not initialized');
    }
    return this.clerk;
  }
}

async function loadClerkUi(publishableKey: string): Promise<void> {
  if (window.__internal_ClerkUICtor) {
    return;
  }
  const encodedDomain = publishableKey.split('_')[2];
  if (!encodedDomain) {
    throw new Error('Invalid Clerk publishable key');
  }
  const clerkDomain = atob(encodedDomain).slice(0, -1);
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://${clerkDomain}/npm/@clerk/ui@1/dist/ui.browser.js`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load the Clerk UI bundle'));
    document.head.appendChild(script);
  });
}

export const AUTH_PROVIDERS: Array<Provider | EnvironmentProviders> = [
  ClerkAuthService,
  { provide: AuthService, useExisting: ClerkAuthService },
  provideAppInitializer(() => inject(ClerkAuthService).initialize()),
  { provide: SAVE_SCOPE, useFactory: () => inject(ClerkAuthService).userId() },
];

export function provideAcademyAuth(): EnvironmentProviders {
  return makeEnvironmentProviders(AUTH_PROVIDERS);
}
