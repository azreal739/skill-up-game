import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'tic-tac-toe',
    loadComponent: () =>
      import('./tic-tac-toe/tic-tac-toe.component').then(m => m.TicTacToeComponent),
  },
  {
    path: 'black-jack',
    loadComponent: () =>
      import('./black-jack/black-jack.component').then(m => m.BlackJackComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'resolutions',
    loadComponent: () =>
      import('./resolutions/resolutions.component').then(m => m.ResolutionsComponent),
  },
  {
    path: 'chess',
    loadComponent: () =>
      import('./chess/chess-game.component').then(m => m.ChessGameComponent),
  },
  {
    path: 'calculator',
    loadComponent: () =>
      import('./calculator/skill-up-calculator.component').then(m => m.SkillUpCalculatorComponent),
  },
  {
    path: 'academy',
    loadComponent: () => import('./academy/academy.component').then(m => m.AcademyComponent),
  },
  { path: '**', redirectTo: '' },
];
