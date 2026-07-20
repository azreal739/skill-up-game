import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ACADEMY_URL } from './academy.constants';

@Component({
  selector: 'app-academy',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './academy.component.html',
  styleUrl: './academy.component.scss',
})
export class AcademyComponent {
  protected readonly academyUrl = ACADEMY_URL;

  protected readonly features: ReadonlyArray<{ emblem: string; title: string; blurb: string }> = [
    {
      emblem: '🛰️',
      title: 'Mission Control',
      blurb: 'Story-driven simulations where every decision shapes system stability.',
    },
    {
      emblem: '🧭',
      title: 'Guided Paths',
      blurb: 'Linear campaigns that unlock as you rank up from junior to distinguished.',
    },
    {
      emblem: '🎙️',
      title: 'Voiced Mentors',
      blurb: 'A cast of narrated mentors briefs, debriefs and coaches you through it.',
    },
  ];
}
