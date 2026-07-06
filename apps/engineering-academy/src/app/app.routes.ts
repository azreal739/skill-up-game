import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GameStateService } from '@academy/data-access';

/** Screens that need a save file redirect to the landing screen. */
export const profileGuard: CanActivateFn = () => {
  const gameState = inject(GameStateService);
  const router = inject(Router);
  return gameState.hasProfile() ? true : router.parseUrl('/');
};

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then((m) => m.LandingComponent),
  },
  {
    path: 'campaigns',
    canActivate: [profileGuard],
    loadComponent: () =>
      import('./features/campaign-hub/campaign-hub.component').then(
        (m) => m.CampaignHubComponent
      ),
  },
  {
    path: 'campaigns/:campaignId',
    canActivate: [profileGuard],
    loadComponent: () =>
      import('./features/campaign-hub/campaign-detail.component').then(
        (m) => m.CampaignDetailComponent
      ),
  },
  {
    path: 'missions/:missionId',
    canActivate: [profileGuard],
    loadComponent: () =>
      import('./features/mission-player/mission-player.component').then(
        (m) => m.MissionPlayerComponent
      ),
  },
  {
    path: 'profile',
    canActivate: [profileGuard],
    loadComponent: () =>
      import('./features/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'help',
    loadComponent: () =>
      import('./features/help-centre/help-centre.component').then((m) => m.HelpCentreComponent),
  },
  {
    path: 'settings',
    canActivate: [profileGuard],
    loadComponent: () =>
      import('./features/settings/settings.component').then((m) => m.SettingsComponent),
  },
  { path: '**', redirectTo: '' },
];
