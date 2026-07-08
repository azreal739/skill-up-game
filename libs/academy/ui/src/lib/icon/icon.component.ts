import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

interface IconSpec {
  /** Stroke path `d` strings. */
  paths?: string[];
  /** Stroke circles as [cx, cy, r]. */
  circles?: [number, number, number][];
  /** Optional mono letters for wordmark-style icons (TS, Nx). */
  text?: string;
}

/**
 * Consistent tech icon set: hand-drawn 24x24 stroke glyphs in currentColor,
 * one style across the app. Purely decorative — always pair with a visible
 * label (icons render aria-hidden).
 */
const ICONS: Record<string, IconSpec> = {
  angular: {
    paths: ['M12 3 20 6.2 18.8 17 12 21 5.2 17 4 6.2Z', 'M8.6 15.5 12 7l3.4 8.5', 'M9.9 12.8h4.2'],
  },
  typescript: { paths: ['M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z'], text: 'TS' },
  scss: {
    paths: ['M12 3.5c3.5 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2.5-6 6-10Z', 'M9.2 14.5c1.5 1.2 4.1 1.2 5.6 0'],
  },
  git: {
    paths: ['M6 7.4v9.2', 'M6 13.2c6 0 12-1.3 12-2.9'],
    circles: [
      [6, 5.5, 1.9],
      [6, 18.5, 1.9],
      [18, 8.4, 1.9],
    ],
  },
  testing: {
    paths: ['M9.5 3h5', 'M10.5 3v5.2L5.8 17.5a2.4 2.4 0 0 0 2.2 3.5h8a2.4 2.4 0 0 0 2.2-3.5L13.5 8.2V3'],
    circles: [
      [10.6, 15.2, 0.9],
      [13.4, 17.6, 0.7],
    ],
  },
  api: {
    paths: ['M9 7V3.5', 'M15 7V3.5', 'M7 7h10v3.5a5 5 0 0 1-10 0Z', 'M12 15.5V20.5'],
  },
  java: {
    paths: [
      'M5 9.5h11v5.5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5Z',
      'M16 11h1.5a2.5 2.5 0 0 1 0 5H16',
      'M9 6.5C9 5 10.5 5 10.5 3.2',
      'M12.7 6.5c0-1.5 1.5-1.5 1.5-3.3',
    ],
  },
  zod: {
    paths: ['M12 3l8 3v5.6c0 4.6-3.4 7.9-8 9.4-4.6-1.5-8-4.8-8-9.4V6Z', 'M8.5 12l2.4 2.4 4.6-5'],
  },
  nx: { paths: ['M12 2.6 20.4 7.3v9.4L12 21.4 3.6 16.7V7.3Z'], text: 'Nx' },
  cicd: {
    paths: ['M4.5 12a7.5 7.5 0 0 1 12.8-5.3', 'M17.5 3v4h-4', 'M19.5 12a7.5 7.5 0 0 1-12.8 5.3', 'M6.5 21v-4h4'],
  },
  'incident-response': {
    paths: ['M12 3.6 22 20H2Z', 'M12 9.8v4.6', 'M12 17.3h.01'],
  },
  a11y: {
    paths: ['M4.5 9.3c5 1.5 10 1.5 15 0', 'M12 11.3v4.2', 'M12 15.5 8.6 21', 'M12 15.5l3.4 5.5'],
    circles: [[12, 5, 2]],
  },
  cloud: {
    paths: ['M7 18.5a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 10a4.2 4.2 0 0 1-.5 8.5Z'],
  },
  deploy: {
    paths: [
      'M12 15c-2 0-3-1-3-3 0-3.5 1.5-7 3-9 1.5 2 3 5.5 3 9 0 2-1 3-3 3Z',
      'M9 12.5 6 15l1 3',
      'M15 12.5 18 15l-1 3',
      'M12 15v4.5',
    ],
  },
};

/** Chip tags that map onto another glyph. */
const ALIASES: Record<string, string> = {
  cloudfront: 'cloud',
  aws: 'cloud',
  production: 'incident-response',
  deployment: 'deploy',
};

@Component({
  selector: 'ea-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (spec; as icon) {
      <svg
        [attr.width]="size"
        [attr.height]="size"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        @for (d of icon.paths ?? []; track $index) {
          <path [attr.d]="d" />
        }
        @for (c of icon.circles ?? []; track $index) {
          <circle [attr.cx]="c[0]" [attr.cy]="c[1]" [attr.r]="c[2]" />
        }
        @if (icon.text) {
          <text
            x="12"
            y="15.5"
            text-anchor="middle"
            font-size="8.5"
            font-weight="700"
            font-family="inherit"
            fill="currentColor"
            stroke="none"
          >
            {{ icon.text }}
          </text>
        }
      </svg>
    }
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        line-height: 0;
      }
    `,
  ],
})
export class IconComponent {
  @Input({ required: true }) name!: string;
  @Input() size = 14;

  get spec(): IconSpec | null {
    return ICONS[this.name] ?? ICONS[ALIASES[this.name]] ?? null;
  }
}

/** Names with a glyph (for callers that want to filter). */
export function hasIcon(name: string): boolean {
  return name in ICONS || name in ALIASES;
}
