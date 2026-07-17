import { EnvironmentProviders, Provider, makeEnvironmentProviders, signal } from '@angular/core';
import { SAVE_SCOPE } from '@academy/data-access';
import { AuthService, AuthStatus } from './auth.service';

class NoAuthService implements AuthService {
  readonly enabled = false;
  readonly status = signal<AuthStatus>('ready');
  readonly signedIn = signal(true);
  readonly userId = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  mountSignIn(): () => void {
    return () => undefined;
  }

  mountWaitlist(): () => void {
    return () => undefined;
  }

  mountUserButton(): () => void {
    return () => undefined;
  }
}

export const AUTH_PROVIDERS: Array<Provider | EnvironmentProviders> = [
  { provide: AuthService, useClass: NoAuthService },
  { provide: SAVE_SCOPE, useValue: null },
];

export function provideAcademyAuth(): EnvironmentProviders {
  return makeEnvironmentProviders(AUTH_PROVIDERS);
}
