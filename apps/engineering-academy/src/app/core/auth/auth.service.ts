import { Signal } from '@angular/core';

export type AuthStatus = 'ready' | 'loading' | 'error';

export abstract class AuthService {
  abstract readonly enabled: boolean;
  abstract readonly status: Signal<AuthStatus>;
  abstract readonly signedIn: Signal<boolean>;
  abstract readonly userId: Signal<string | null>;
  abstract readonly errorMessage: Signal<string | null>;

  abstract mountSignIn(element: HTMLDivElement): () => void;
  abstract mountWaitlist(element: HTMLDivElement): () => void;
  abstract mountUserButton(element: HTMLDivElement): () => void;
}
