import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { CampaignDifficulty } from '@academy/content-model';

interface Trace {
  points: string;
  nodeX: number;
  nodeY: number;
}

const DIFFICULTY_COLOR: Record<CampaignDifficulty, string> = {
  beginner: '#34d399',
  intermediate: '#22d3ee',
  advanced: '#fb923c',
  expert: '#f87171',
};

/**
 * Procedural campaign artwork: a hex emblem with circuit traces generated
 * deterministically from the campaign id, tinted by difficulty. No assets,
 * no repetition — every campaign gets its own mark.
 */
@Component({
  selector: 'ea-campaign-emblem',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      class="emblem"
    >
      <path
        [attr.d]="hexPath(24, 24, 20, 0)"
        [attr.stroke]="color"
        stroke-width="1.4"
        opacity="0.9"
      />
      <path
        [attr.d]="hexPath(24, 24, 13, 30)"
        stroke="#a78bfa"
        stroke-width="1"
        opacity="0.55"
      />
      @for (trace of traces; track $index) {
        <polyline
          [attr.points]="trace.points"
          [attr.stroke]="color"
          stroke-width="1.1"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity="0.7"
        />
        <circle [attr.cx]="trace.nodeX" [attr.cy]="trace.nodeY" r="1.7" [attr.fill]="color" />
      }
      <circle cx="24" cy="24" r="3.2" [attr.stroke]="color" stroke-width="1.2" />
      <circle cx="24" cy="24" r="0.9" [attr.fill]="color" />
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        line-height: 0;
        filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.25));
      }
    `,
  ],
})
export class CampaignEmblemComponent implements OnChanges {
  @Input({ required: true }) campaignId!: string;
  @Input({ required: true }) difficulty!: CampaignDifficulty;
  @Input() size = 44;

  traces: Trace[] = [];

  get color(): string {
    return DIFFICULTY_COLOR[this.difficulty] ?? '#22d3ee';
  }

  ngOnChanges(): void {
    this.traces = buildTraces(this.campaignId);
  }

  hexPath(cx: number, cy: number, r: number, rotationDeg: number): string {
    const points: string[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = ((i * 60 + rotationDeg - 90) * Math.PI) / 180;
      points.push(`${(cx + r * Math.cos(angle)).toFixed(2)} ${(cy + r * Math.sin(angle)).toFixed(2)}`);
    }
    return `M${points.join(' L')}Z`;
  }
}

function hashOf(id: string): number {
  let hash = 2166136261;
  for (let i = 0; i < id.length; i++) {
    hash = Math.imul(hash ^ id.charCodeAt(i), 16777619);
  }
  return hash >>> 0;
}

/** Four circuit traces radiating from the core, seeded by the campaign id. */
function buildTraces(id: string): Trace[] {
  const seed = hashOf(id);
  const directions = [0, 60, 120, 180, 240, 300];
  const traces: Trace[] = [];
  for (let i = 0; i < 4; i++) {
    // Unsigned shift: the hash has its high bit set for some ids, and a
    // signed >> would yield a negative index (undefined direction -> NaN).
    const dir = directions[(seed >>> (i * 4)) % 6];
    const elbow = ((seed >> (i * 4 + 2)) & 1 ? 30 : -30) * (((seed >> (i * 4 + 3)) & 1) + 1);
    const a1 = ((dir - 90) * Math.PI) / 180;
    const a2 = ((dir + elbow - 90) * Math.PI) / 180;
    const p1 = [24 + 5.5 * Math.cos(a1), 24 + 5.5 * Math.sin(a1)];
    const p2 = [24 + 11 * Math.cos(a1), 24 + 11 * Math.sin(a1)];
    const p3 = [24 + 16.5 * Math.cos(a2), 24 + 16.5 * Math.sin(a2)];
    traces.push({
      points: [p1, p2, p3].map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' '),
      nodeX: Number(p3[0].toFixed(2)),
      nodeY: Number(p3[1].toFixed(2)),
    });
  }
  return traces;
}
