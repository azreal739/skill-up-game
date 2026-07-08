import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { ContentService, GameStateService } from '@academy/data-access';

/** Screens that need a save file redirect to the landing screen. */
export const profileGuard: CanActivateFn = () => {
  const gameState = inject(GameStateService);
  const router = inject(Router);
  return gameState.hasProfile() ? true : router.parseUrl('/');
};

/**
 * Blocks direct navigation to a mission whose campaign is still locked.
 * The campaign hub and detail screens already gate visually; this closes
 * the direct-URL path back to the hub.
 */
export const missionUnlockedGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const content = inject(ContentService);
  const gameState = inject(GameStateService);
  const router = inject(Router);

  const mission = content.missionById(route.paramMap.get('missionId') ?? '');
  if (!mission) {
    // Unknown mission: let the player component render its "not found" state.
    return true;
  }
  const campaign = content.campaignById(mission.campaignId);
  if (!campaign) {
    return true;
  }
  const prerequisite = campaign.requiredCampaignId
    ? content.campaignById(campaign.requiredCampaignId)
    : undefined;

  return gameState.isCampaignUnlocked(campaign, prerequisite)
    ? true
    : router.parseUrl('/campaigns');
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
    canActivate: [profileGuard, missionUnlockedGuard],
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
    path: 'backlog',
    canActivate: [profileGuard],
    loadComponent: () =>
      import('./features/backlog/backlog.component').then((m) => m.BacklogComponent),
  },
  {
    path: 'notes',
    canActivate: [profileGuard],
    loadComponent: () =>
      import('./features/notes/notes.component').then((m) => m.NotesComponent),
  },
  {
    path: 'review/:debtItemId',
    canActivate: [profileGuard],
    loadComponent: () =>
      import('./features/review/review.component').then((m) => m.ReviewComponent),
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
