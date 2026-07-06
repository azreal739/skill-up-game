import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { worker } from '../backend/browser';

// Start the MSW mock API before bootstrapping so the Cities/Weather
// demos have a backend to talk to. Unhandled requests (assets, etc.)
// pass through to the network untouched.
worker
  .start({ onUnhandledRequest: 'bypass' })
  .then(() => bootstrapApplication(AppComponent, appConfig))
  .catch((err) => console.error(err));
