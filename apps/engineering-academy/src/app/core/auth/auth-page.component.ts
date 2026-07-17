import { AfterViewInit, Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'ea-auth-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="auth-page" aria-labelledby="auth-title">
      <div class="auth-page__copy">
        <p class="auth-page__eyebrow">Engineering Academy · Early access</p>
        @if (mode === 'waitlist') {
          <h1 id="auth-title">Request Academy clearance</h1>
          <p>
            Join the waitlist for an invitation. Your missions and progress will stay on this
            device when access is approved.
          </p>
          <a routerLink="/sign-in">Already invited? Sign in</a>
        } @else {
          <h1 id="auth-title">Return to Mission Control</h1>
          <p>
            Sign in with your invited account. Academy progress remains local to this device.
          </p>
          <a routerLink="/waitlist">Need access? Join the waitlist</a>
        }
      </div>

      <div class="auth-page__panel">
        @if (auth.status() === 'error') {
          <div class="auth-page__error" role="alert">
            <strong>Sign-in systems are offline</strong>
            <p>{{ auth.errorMessage() }}</p>
          </div>
        } @else {
          <div #clerkMount class="auth-page__mount"></div>
        }
      </div>
    </section>
  `,
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements AfterViewInit {
  protected readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly clerkMount = viewChild<ElementRef<HTMLDivElement>>('clerkMount');

  protected readonly mode = this.route.snapshot.data['mode'] === 'waitlist' ? 'waitlist' : 'sign-in';

  ngAfterViewInit(): void {
    if (this.auth.signedIn()) {
      void this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('returnUrl') ?? '/');
      return;
    }
    if (this.auth.status() !== 'ready') {
      return;
    }
    const element = this.clerkMount()?.nativeElement;
    if (!element) {
      return;
    }
    const unmount =
      this.mode === 'waitlist'
        ? this.auth.mountWaitlist(element)
        : this.auth.mountSignIn(element);
    this.destroyRef.onDestroy(unmount);
  }
}
