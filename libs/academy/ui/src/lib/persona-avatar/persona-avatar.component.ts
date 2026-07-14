import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PersonaDefinition, personaForSpeaker } from '@academy/content-model';

/**
 * Console-style persona bust for briefing dialogue. One shared head/shoulders
 * glyph with per-persona headgear and insignia, tinted with the persona's
 * accent. While `talking` the mouth bar pulses like an equalizer and the bust
 * glows; idle busts blink occasionally. Both animations are CSS-only, so the
 * global `.ea-reduced-motion` kill switch freezes them to a static portrait.
 * Purely decorative — the speaker name is always rendered next to it.
 */
@Component({
  selector: 'ea-persona-avatar',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="avatar"
      [class.avatar--talking]="talking"
      [style.color]="persona.accent"
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <!-- shoulders + head, shared by every persona -->
        <path d="M9 45 q15 -12 30 0" />
        <circle cx="24" cy="21" r="11" />

        @switch (persona.id) {
          @case ('mission-control') {
            <!-- headset band, earcups, mic boom -->
            <path d="M13.4 18.5 a10.8 10.8 0 0 1 21.2 0" />
            <rect x="11" y="18" width="4" height="7" rx="2" />
            <rect x="33" y="18" width="4" height="7" rx="2" />
            <path d="M14 25 q0 6 7 6.5" />
          }
          @case ('senior-dev') {
            <!-- rectangular glasses -->
            <rect x="15.5" y="17.5" width="7" height="6" rx="1.5" />
            <rect x="25.5" y="17.5" width="7" height="6" rx="1.5" />
            <path d="M22.5 20 h3" />
          }
          @case ('team-lead') {
            <!-- field cap + shoulder chevron -->
            <path d="M13.5 16.5 h21" />
            <path d="M15 16.5 a9.5 9.5 0 0 1 18 0" fill="currentColor" opacity="0.28" stroke="none" />
            <path d="M34 41.5 l2.6 -2 l2.6 2" />
          }
          @case ('mentor-judge') {
            <!-- soft hair sweep + collar pin -->
            <path d="M14.5 17 q9.5 -9 19 0" />
            <circle cx="24" cy="38.5" r="1.4" fill="currentColor" stroke="none" />
          }
          @case ('head-judge') {
            <!-- laurel temples + chest star -->
            <path d="M13.5 20 q-2 -5 2 -8" />
            <path d="M34.5 20 q2 -5 -2 -8" />
            <path d="M24 36.2 l1 2 2.2 .3 -1.6 1.5 .4 2.2 -2 -1 -2 1 .4 -2.2 -1.6 -1.5 2.2 -.3Z" fill="currentColor" stroke="none" />
          }
          @case ('archivist') {
            <!-- round spectacles + collar book -->
            <circle cx="19" cy="20.5" r="3.4" />
            <circle cx="29" cy="20.5" r="3.4" />
            <path d="M22.4 20.5 h3.2" />
            <path d="M20 38.5 h8 M24 36.8 v3.4" />
          }
          @default {
            <!-- generic operator visor -->
            <path d="M15 19 h18" />
          }
        }
      </g>

      <g class="avatar__eyes" fill="currentColor">
        <rect x="18.6" y="19.4" width="2.6" height="3.6" rx="1.2" />
        <rect x="26.8" y="19.4" width="2.6" height="3.6" rx="1.2" />
      </g>
      <rect class="avatar__mouth" fill="currentColor" x="21.4" y="27" width="5.2" height="1.7" rx="0.85" />
    </svg>
  `,
  styleUrls: ['./persona-avatar.component.scss'],
})
export class PersonaAvatarComponent {
  @Input({ required: true }) set speaker(value: string) {
    this.persona = personaForSpeaker(value);
  }
  /** Pulse the mouth + glow while this persona's line is typing out. */
  @Input() talking = false;

  protected persona!: PersonaDefinition;
}
