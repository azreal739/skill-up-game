import { Routes } from '@angular/router';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { BlackJackComponent } from './black-jack/black-jack.component';
import { AboutComponent } from './about/about.component';
import { ResolutionsComponent } from './resolutions/resolutions.component';
import { ChessGameComponent } from './chess/chess-game.component';

export const routes: Routes = [
  { path: 'tic-tac-toe', component: TicTacToeComponent },
  { path: 'black-jack', component: BlackJackComponent },
  { path: 'about', component: AboutComponent },
  { path: 'resolutions', component: ResolutionsComponent },
  { path: 'chess', component: ChessGameComponent },
  { path: '', redirectTo: '/tic-tac-toe', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/tic-tac-toe' }, // Wildcard route
];
