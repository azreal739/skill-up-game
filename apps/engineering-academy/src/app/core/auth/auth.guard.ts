import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Browser navigation guard for the hosted UX.
 *
 * This is not an authorization boundary: a visitor can still download and run
 * public client assets. Any future API or non-public content must verify a
 * Clerk session token in the Worker or backend before returning protected data.
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  if (!auth.enabled || auth.signedIn()) {
    return true;
  }
  return inject(Router).createUrlTree(['/sign-in'], {
    queryParams: { returnUrl: state.url === '/' ? undefined : state.url },
  });
};
