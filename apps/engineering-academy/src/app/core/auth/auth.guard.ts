import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  if (!auth.enabled || auth.signedIn()) {
    return true;
  }
  return inject(Router).createUrlTree(['/sign-in'], {
    queryParams: { returnUrl: state.url === '/' ? undefined : state.url },
  });
};
