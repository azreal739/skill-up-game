import { AfterViewInit, Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'ea-auth-user-button',
  standalone: true,
  template: `<div #mount class="auth-user-button" aria-label="Account menu"></div>`,
  styles: `
    :host { display: inline-grid; min-width: 2rem; min-height: 2rem; place-items: center; }
    .auth-user-button { display: grid; place-items: center; }
  `,
})
export class AuthUserButtonComponent implements AfterViewInit {
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly mount = viewChild.required<ElementRef<HTMLDivElement>>('mount');

  ngAfterViewInit(): void {
    if (!this.auth.enabled || !this.auth.signedIn()) {
      return;
    }
    this.destroyRef.onDestroy(this.auth.mountUserButton(this.mount().nativeElement));
  }
}
