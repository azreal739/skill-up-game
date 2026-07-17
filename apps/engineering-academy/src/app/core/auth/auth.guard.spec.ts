import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { AuthService, AuthStatus } from './auth.service';
import { authGuard } from './auth.guard';

class AuthStub implements AuthService {
  enabled = true;
  status = signal<AuthStatus>('ready');
  signedIn = signal(false);
  userId = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  mountSignIn = () => () => undefined;
  mountWaitlist = () => () => undefined;
  mountUserButton = () => () => undefined;
}

describe('authGuard', () => {
  let auth: AuthStub;
  let router: Router;

  beforeEach(() => {
    auth = new AuthStub();
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AuthService, useValue: auth }],
    });
    router = TestBed.inject(Router);
  });

  const run = (url = '/campaigns') =>
    TestBed.runInInjectionContext(() => authGuard({} as never, { url } as never));

  it('redirects a signed-out hosted visitor to sign in', () => {
    expect(run().toString()).toBe(
      router.createUrlTree(['/sign-in'], { queryParams: { returnUrl: '/campaigns' } }).toString()
    );
  });

  it('allows a signed-in visitor through', () => {
    auth.signedIn.set(true);
    expect(run()).toBeTrue();
  });

  it('leaves local accountless builds unchanged', () => {
    auth.enabled = false;
    expect(run()).toBeTrue();
  });
});
