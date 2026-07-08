import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      // Smooth cross-fade between screens (View Transitions API); disabled
      // under reduced motion via the html.ea-reduced-motion override in
      // styles.scss.
      withViewTransitions({ skipInitialTransition: true })
    ),
    provideAnimationsAsync(),
  ],
};
