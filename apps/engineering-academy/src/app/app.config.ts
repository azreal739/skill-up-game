import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withHashLocation,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appRoutes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      // Smooth cross-fade between screens (View Transitions API); disabled
      // under reduced motion via the html.ea-reduced-motion override in
      // styles.scss.
      withViewTransitions({ skipInitialTransition: true }),
      // The shareable local build serves from a dumb static server with no
      // SPA fallback, so routes must live in the URL hash there.
      ...(environment.useHashRouting ? [withHashLocation()] : [])
    ),
    provideAnimationsAsync(),
  ],
};
