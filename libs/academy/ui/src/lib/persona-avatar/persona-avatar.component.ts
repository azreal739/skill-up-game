import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { PersonaDefinition, personaForSpeaker } from '@academy/content-model';

/**
 * Per-persona illustration styling (skin tones, hair, accessory). This is a
 * presentational concern, so it lives in the ui lib keyed by the persona id
 * from the content-model registry — the accent colour still comes from there.
 */
interface PortraitStyle {
  skin: string;
  skinShade: string;
  hair: string;
  hairShade: string;
  garment: string;
  brow: string;
  hairStyle: 'crop' | 'side' | 'undercap' | 'sweep' | 'sweptback' | 'bun' | 'helmet';
  feature: 'headset' | 'glasses' | 'cap' | 'earrings' | 'laurel' | 'spectacles' | 'visor';
  stubble?: boolean;
}

const STYLES: Record<PersonaDefinition['id'], PortraitStyle> = {
  'mission-control': {
    skin: '#d7a279', skinShade: '#b6835c', hair: '#2c3140', hairShade: '#20242f',
    garment: '#1c2a3a', brow: '#20242f', hairStyle: 'crop', feature: 'headset',
  },
  'senior-dev': {
    skin: '#ecc3a0', skinShade: '#cfa07c', hair: '#4a3b2f', hairShade: '#382c22',
    garment: '#2a2f3d', brow: '#3a2c22', hairStyle: 'side', feature: 'glasses', stubble: true,
  },
  'team-lead': {
    skin: '#8a5a3c', skinShade: '#6d4529', hair: '#1f1b22', hairShade: '#141117',
    garment: '#33322c', brow: '#141117', hairStyle: 'undercap', feature: 'cap',
  },
  'mentor-judge': {
    skin: '#e0ad82', skinShade: '#c08b60', hair: '#5c2733', hairShade: '#451c26',
    garment: '#3a2740', brow: '#451c26', hairStyle: 'sweep', feature: 'earrings',
  },
  'head-judge': {
    skin: '#e8c4a6', skinShade: '#cba585', hair: '#c9cdd6', hairShade: '#a7abb6',
    garment: '#3a2c30', brow: '#9aa0ad', hairStyle: 'sweptback', feature: 'laurel',
  },
  archivist: {
    skin: '#e6b98f', skinShade: '#c99a70', hair: '#3a2b24', hairShade: '#2b2019',
    garment: '#2a3242', brow: '#2b2019', hairStyle: 'bun', feature: 'spectacles',
  },
  operator: {
    skin: '#b8c2d0', skinShade: '#98a4b5', hair: '#7c8696', hairShade: '#5b6675',
    garment: '#242c38', brow: '#6c7686', hairStyle: 'helmet', feature: 'visor',
  },
};

/**
 * Illustrated console-portrait bust for the mentor cast. A layered, two-tone
 * SVG head-and-shoulders — per-persona skin, hair and accessory, tinted with
 * the persona's accent. While `talking`, an "active-speaker" ring fades in and
 * holds (like a video call), the mouth animates and the bust gives a subtle
 * bob; idle busts blink and breathe. When the turn ends the ring fades back
 * out. Everything is CSS-only, so the global `.ea-reduced-motion` kill switch
 * freezes it to a static portrait (the ring still shows, just without the
 * fade). Purely decorative — the speaker name is always rendered alongside.
 */
@Component({
  selector: 'ea-persona-avatar',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="pa"
      [style.--pa-accent]="persona.accent"
      viewBox="0 0 112 128"
      [attr.role]="'img'"
      [attr.aria-label]="persona.speaker"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient [attr.id]="uid + '-bg'" cx="50%" cy="38%" r="72%">
          <stop offset="0%" [attr.stop-color]="persona.accent" stop-opacity="0.42" />
          <stop offset="52%" stop-color="#111a2b" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#080d18" />
        </radialGradient>
        <linearGradient [attr.id]="uid + '-rim'" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" [attr.stop-color]="persona.accent" stop-opacity="0" />
          <stop offset="100%" [attr.stop-color]="persona.accent" stop-opacity="0.9" />
        </linearGradient>
        <clipPath [attr.id]="uid + '-face'">
          <path d="M56 26 q22 0 22 24 q0 20 -10 30 q-5 6 -12 6 q-7 0 -12 -6 q-10 -10 -10 -30 q0 -24 22 -24Z" />
        </clipPath>
        <clipPath [attr.id]="uid + '-frame'">
          <rect x="2" y="2" width="108" height="124" rx="20" />
        </clipPath>
      </defs>

      <g [attr.clip-path]="'url(#' + uid + '-frame)'">
        <rect x="2" y="2" width="108" height="124" rx="20" [attr.fill]="'url(#' + uid + '-bg)'" />
        <g [attr.stroke]="persona.accent" stroke-width="0.6" opacity="0.06">
          @for (y of scan; track y) {
            <line x1="2" [attr.y1]="y" x2="110" [attr.y2]="y" />
          }
        </g>

        <g class="pa__bust">
          <!-- shoulders / garment -->
          <path d="M14 128 q6 -34 42 -34 q36 0 42 34Z" [attr.fill]="s.garment" />
          <path d="M14 128 q6 -34 42 -34 q36 0 42 34" fill="none" [attr.stroke]="persona.accent" stroke-width="2" opacity="0.55" />
          <path d="M44 96 q12 12 24 0 l0 6 q-12 10 -24 0Z" fill="#000" opacity="0.18" />
          <circle cx="56" cy="112" r="2.6" [attr.fill]="persona.accent" opacity="0.8" />

          <!-- neck -->
          <path d="M48 84 q8 8 16 0 l0 12 q-8 8 -16 0Z" [attr.fill]="s.skinShade" />
          <path d="M48 84 q8 8 16 0 l0 4 q-8 7 -16 0Z" fill="#000" opacity="0.18" />

          <!-- ears: C-shaped, tucked to the head edge with a concha shade -->
          <path d="M36 54 q-6.5 0 -6.5 7 q0 6.5 6.5 7 q-2 -7 0 -14Z" [attr.fill]="s.skin" />
          <path d="M34 57.5 q-2.6 0.8 -2.4 4.2 q1.4 0 2.6 -0.3" fill="none" [attr.stroke]="s.skinShade" stroke-width="1.1" stroke-linecap="round" opacity="0.7" />
          <path d="M76 54 q6.5 0 6.5 7 q0 6.5 -6.5 7 q2 -7 0 -14Z" [attr.fill]="s.skin" />
          <path d="M78 57.5 q2.6 0.8 2.4 4.2 q-1.4 0 -2.6 -0.3" fill="none" [attr.stroke]="s.skinShade" stroke-width="1.1" stroke-linecap="round" opacity="0.7" />

          <!-- head -->
          <path d="M56 26 q22 0 22 24 q0 20 -10 30 q-5 6 -12 6 q-7 0 -12 -6 q-10 -10 -10 -30 q0 -24 22 -24Z" [attr.fill]="s.skin" />
          <g [attr.clip-path]="'url(#' + uid + '-face)'">
            <path d="M60 26 q30 6 24 44 q-6 26 -20 30 l0 -74Z" [attr.fill]="s.skinShade" opacity="0.55" />
            <ellipse cx="56" cy="90" rx="20" ry="10" [attr.fill]="s.skinShade" opacity="0.4" />
            <ellipse cx="45" cy="63" rx="8" ry="10" fill="#ffffff" opacity="0.06" />
            <ellipse cx="49" cy="52" rx="6" ry="3" fill="#ffffff" opacity="0.05" />
            @if (s.stubble) {
              <path d="M40 74 q16 14 32 0 q-4 12 -16 12 q-12 0 -16 -12Z" fill="#3a2c22" opacity="0.28" />
            }
            <path d="M74 56 q6 14 -6 26" fill="none" [attr.stroke]="'url(#' + uid + '-rim)'" stroke-width="2.4" opacity="0.7" />
          </g>

          <!-- hair -->
          @switch (s.hairStyle) {
            @case ('crop') {
              <path d="M31 44 q-3 -26 25 -26 q28 0 25 26 q-4 -12 -25 -12 q-21 0 -25 12Z" [attr.fill]="s.hair" />
              <path d="M31 44 q4 -12 25 -12 q21 0 25 12 q-4 -6 -25 -6 q-21 0 -25 6Z" [attr.fill]="s.hairShade" />
            }
            @case ('side') {
              <path d="M30 46 q-2 -28 26 -28 q30 0 26 27 q-6 -14 -30 -13 q-9 0 -14 5 q3 -7 12 -8 q-16 1 -20 17Z" [attr.fill]="s.hair" />
              <path d="M30 46 q4 -14 16 -16 q-8 5 -10 16Z" [attr.fill]="s.hairShade" />
            }
            @case ('undercap') {
              <path d="M31 52 q-3 -9 3 -14 q-1 7 1 15Z" [attr.fill]="s.hair" />
              <path d="M81 52 q3 -9 -3 -14 q1 7 -1 15Z" [attr.fill]="s.hair" />
              <path d="M33 62 q-2 4 0 8 q3 -3 5 -4Z" [attr.fill]="s.hairShade" />
              <path d="M79 62 q2 4 0 8 q-3 -3 -5 -4Z" [attr.fill]="s.hairShade" />
            }
            @case ('sweep') {
              <path d="M29 50 q-3 -32 27 -32 q30 0 27 30 q-6 -16 -20 -18 q10 6 12 18 q-14 -14 -34 -6 q-10 4 -12 8Z" [attr.fill]="s.hair" />
              <path d="M29 50 q2 -20 18 -26 q-10 10 -10 26Z" [attr.fill]="s.hairShade" />
              <path d="M83 48 q2 10 -2 20 q-2 -14 -6 -22Z" [attr.fill]="s.hairShade" />
            }
            @case ('sweptback') {
              <path d="M31 44 q-2 -25 25 -25 q27 0 25 25 q-6 -13 -25 -11 q-19 -2 -25 11Z" [attr.fill]="s.hair" />
              <g [attr.stroke]="s.hairShade" stroke-width="1.4" fill="none" opacity="0.7">
                <path d="M38 30 q18 -8 36 0" /><path d="M36 36 q20 -9 40 0" />
              </g>
            }
            @case ('bun') {
              <circle cx="56" cy="15" r="8" [attr.fill]="s.hair" />
              <circle cx="56" cy="15" r="8" fill="none" [attr.stroke]="s.hairShade" stroke-width="1.6" opacity="0.6" />
              <path d="M32 46 q-2 -26 24 -26 q26 0 24 26 q-5 -13 -24 -12 q-19 -1 -24 12Z" [attr.fill]="s.hair" />
              <path d="M32 46 q3 -12 12 -14 q-6 6 -6 14Z" [attr.fill]="s.hairShade" />
            }
            @case ('helmet') {
              <path d="M30 48 q0 -30 26 -30 q26 0 26 30 l-3 2 q0 -26 -23 -26 q-23 0 -23 26Z" [attr.fill]="s.hair" />
              <path d="M30 48 q0 -30 26 -30 q26 0 26 30" fill="none" [attr.stroke]="s.hairShade" stroke-width="2" />
            }
          }

          <!-- brows (tilt with stress) -->
          <g class="pa__brows" [attr.fill]="s.brow">
            <path class="pa__brow pa__brow--l" d="M40 50 q6 -3 11 -0.5 l0 2.2 q-5 -2 -11 0.4Z" />
            <path class="pa__brow pa__brow--r" d="M72 50 q-6 -3 -11 -0.5 l0 2.2 q5 -2 11 0.4Z" />
          </g>

          @if (stress >= 2) {
            <!-- sweat: one bead, then two when properly flustered -->
            <path d="M77 40 q3.4 5 0 7.6 q-3.4 -2.6 0 -7.6Z" fill="#9bd8f7" opacity="0.9" />
          }
          @if (stress >= 4) {
            <path d="M34 44 q2.8 4.2 0 6.4 q-2.8 -2.2 0 -6.4Z" fill="#9bd8f7" opacity="0.8" />
          }

          @if (!hideEyes) {
            <g class="pa__eyes">
              <ellipse cx="46" cy="58" rx="4.4" ry="3.4" fill="#f4f6fb" />
              <ellipse cx="66" cy="58" rx="4.4" ry="3.4" fill="#f4f6fb" />
              <circle cx="46.6" cy="58.4" r="2.1" fill="#2b2233" />
              <circle cx="66.6" cy="58.4" r="2.1" fill="#2b2233" />
              <circle cx="47.4" cy="57.6" r="0.7" fill="#fff" />
              <circle cx="67.4" cy="57.6" r="0.7" fill="#fff" />
            </g>
            <g class="pa__lids" [attr.fill]="s.skin">
              <rect x="41" y="53.5" width="10" height="5" rx="2" />
              <rect x="61" y="53.5" width="10" height="5" rx="2" />
            </g>
          }

          <!-- nose -->
          <path d="M56 60 q2 6 3 9 q-3 2 -6 0" fill="none" [attr.stroke]="s.skinShade" stroke-width="1.6" stroke-linecap="round" opacity="0.8" />

          <!-- mouth -->
          <g class="pa__mouth">
            <path d="M49 74 q7 4 14 0" fill="none" stroke="#8a4a48" stroke-width="2.4" stroke-linecap="round" />
            <path class="pa__open" d="M50 73 q6 8 12 0 q-6 4 -12 0Z" fill="#5a2a34" />
          </g>

          <!-- accessory -->
          @switch (s.feature) {
            @case ('headset') {
              <path d="M30 50 a26 26 0 0 1 52 0" fill="none" stroke="#141a24" stroke-width="4" />
              <path d="M30 50 a26 26 0 0 1 52 0" fill="none" [attr.stroke]="persona.accent" stroke-width="1.6" opacity="0.6" />
              <rect x="25" y="47" width="8" height="14" rx="4" fill="#1a212c" />
              <rect x="79" y="47" width="8" height="14" rx="4" fill="#1a212c" />
              <rect x="26.5" y="49" width="5" height="10" rx="2.5" [attr.fill]="persona.accent" opacity="0.75" />
              <path d="M28 60 q-1 12 14 15" fill="none" stroke="#1a212c" stroke-width="3.2" stroke-linecap="round" />
              <circle cx="43" cy="75" r="2.6" [attr.fill]="persona.accent" />
            }
            @case ('glasses') {
              <g fill="none" stroke="#20242f" stroke-width="2.4">
                <rect x="38" y="52" width="15" height="12" rx="3.5" />
                <rect x="59" y="52" width="15" height="12" rx="3.5" />
                <path d="M53 57 h6" /><path d="M38 55 l-6 -1" /><path d="M74 55 l6 -1" />
              </g>
              <rect x="38" y="52" width="15" height="12" rx="3.5" [attr.fill]="persona.accent" opacity="0.12" />
              <rect x="59" y="52" width="15" height="12" rx="3.5" [attr.fill]="persona.accent" opacity="0.12" />
            }
            @case ('cap') {
              <path d="M31 42 q25 -25 50 0 q-25 -10 -50 0Z" fill="#34332c" />
              <path d="M31 42 q25 -25 50 0" fill="none" [attr.stroke]="persona.accent" stroke-width="1.4" opacity="0.55" />
              <path d="M31 42 q25 -9 50 0 l0 3 q-25 -7 -50 0Z" fill="#211f19" />
              <path d="M31 43 q-10 1 -13 8 q10 -3 17 -4Z" fill="#26241d" />
              <path d="M52 35 l4 -3.2 l4 3.2" fill="none" [attr.stroke]="persona.accent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            }
            @case ('earrings') {
              <circle cx="33" cy="66" r="2.4" [attr.fill]="persona.accent" />
              <circle cx="79" cy="66" r="2.4" [attr.fill]="persona.accent" />
            }
            @case ('laurel') {
              <g fill="none" [attr.stroke]="persona.accent" stroke-width="1.4" opacity="0.6">
                <path d="M30 37 q-7 9 -5 20" /><path d="M82 37 q7 9 5 20" />
              </g>
              <g [attr.fill]="persona.accent" opacity="0.92">
                <ellipse cx="29" cy="39" rx="2.1" ry="4" transform="rotate(-45 29 39)" />
                <ellipse cx="26" cy="46" rx="2.1" ry="4" transform="rotate(-28 26 46)" />
                <ellipse cx="25" cy="53" rx="2.1" ry="4" transform="rotate(-12 25 53)" />
                <ellipse cx="83" cy="39" rx="2.1" ry="4" transform="rotate(45 83 39)" />
                <ellipse cx="86" cy="46" rx="2.1" ry="4" transform="rotate(28 86 46)" />
                <ellipse cx="87" cy="53" rx="2.1" ry="4" transform="rotate(12 87 53)" />
              </g>
            }
            @case ('spectacles') {
              <g fill="none" stroke="#241a14" stroke-width="2.2">
                <circle cx="45.5" cy="58" r="8" /><circle cx="66.5" cy="58" r="8" />
                <path d="M53.5 57 h5" /><path d="M37.5 56 l-5 -1" /><path d="M74.5 56 l5 -1" />
              </g>
              <circle cx="45.5" cy="58" r="8" [attr.fill]="persona.accent" opacity="0.12" />
              <circle cx="66.5" cy="58" r="8" [attr.fill]="persona.accent" opacity="0.12" />
            }
            @case ('visor') {
              <rect x="33" y="50" width="46" height="12" rx="6" fill="#0d1420" />
              <rect x="33" y="50" width="46" height="12" rx="6" fill="none" [attr.stroke]="persona.accent" stroke-width="1.6" />
              <rect x="37" y="54" width="16" height="3.5" rx="1.75" [attr.fill]="persona.accent" opacity="0.85" />
              <circle cx="70" cy="56" r="2.2" [attr.fill]="persona.accent" />
            }
          }
        </g>

        <!-- Active-speaker border: a restrained glow plus a bright carrier
             segment travelling around the frame only while speech is live. -->
        <rect class="pa__glow" x="3" y="3" width="106" height="122" rx="19" fill="none" [attr.stroke]="persona.accent" stroke-width="2" />
        <rect class="pa__signal" x="3" y="3" width="106" height="122" rx="19" fill="none" [attr.stroke]="persona.accent" stroke-width="2.8" pathLength="100" />
      </g>
    </svg>
  `,
  styleUrls: ['./persona-avatar.component.scss'],
})
export class PersonaAvatarComponent {
  private static seq = 0;
  protected readonly uid = `pa${PersonaAvatarComponent.seq++}`;
  protected readonly scan = Array.from({ length: 12 }, (_, i) => 14 + i * 9);

  @Input({ required: true }) set speaker(value: string) {
    this.persona = personaForSpeaker(value);
    this.s = STYLES[this.persona.id];
  }

  /** Light the active-speaker ring + animate the mouth while this line plays. */
  @Input()
  @HostBinding('class.pa-talking')
  talking = false;

  /**
   * How rattled this persona looks, 0–4 (the Senior Dev's hint ladder):
   * 0–1 composed, 2 concerned brows + a sweat bead, 4 full flustered.
   */
  @Input() stress = 0;

  @HostBinding('class.pa-stress-mid') get stressMid(): boolean {
    return this.stress >= 2 && this.stress < 4;
  }
  @HostBinding('class.pa-stress-high') get stressHigh(): boolean {
    return this.stress >= 4;
  }

  protected persona!: PersonaDefinition;
  protected s!: PortraitStyle;

  /** Opaque eyewear (the operator's visor) hides the eyes. */
  protected get hideEyes(): boolean {
    return this.s.feature === 'visor';
  }
}
