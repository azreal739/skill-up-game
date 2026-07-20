import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface GameCard {
  title: string;
  description: string;
  emblem: string;
  route: string;
  accent: string;
  cta: string;
  featured?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly games: GameCard[] = [
    {
      title: 'Tic Tac Toe',
      description: 'Classic three-in-a-row. Outsmart your opponent on the grid.',
      emblem: '🎯',
      route: '/tic-tac-toe',
      accent: '#22d3ee',
      cta: 'Play',
    },
    {
      title: 'Black Jack',
      description: 'Hit, stand or double down. Beat the dealer to twenty-one.',
      emblem: '🃏',
      route: '/black-jack',
      accent: '#a78bfa',
      cta: 'Deal',
    },
    {
      title: 'Chess',
      description: 'Drag-and-drop chess with captures, check and promotion.',
      emblem: '♟️',
      route: '/chess',
      accent: '#fb923c',
      cta: 'Play',
    },
    {
      title: 'Calculator',
      description: 'A tidy signals-powered calculator for quick maths.',
      emblem: '🧮',
      route: '/calculator',
      accent: '#34d399',
      cta: 'Open',
    },
    {
      title: 'Resolutions',
      description: "Track and tick off your New Year's resolutions.",
      emblem: '✨',
      route: '/resolutions',
      accent: '#fbbf24',
      cta: 'Open',
    },
    {
      title: 'About',
      description: 'What this playground is and the tools that power it.',
      emblem: 'ℹ️',
      route: '/about',
      accent: '#38bdf8',
      cta: 'Read',
    },
    {
      title: 'Engineering Academy',
      description: 'Step into the story-driven training game for platform engineers.',
      emblem: '🎓',
      route: '/academy',
      accent: '#a78bfa',
      cta: 'Launch',
      featured: true,
    },
  ];
}
