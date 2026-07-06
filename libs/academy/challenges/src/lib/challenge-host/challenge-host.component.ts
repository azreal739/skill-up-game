import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ChallengeDefinition, EvaluationResult } from '@academy/content-model';
import { CodeViewerComponent } from '@academy/ui';
import { OptionListComponent } from '../option-list/option-list.component';

/**
 * Data-driven challenge renderer (05_CHALLENGE_ENGINE.md). Renders any
 * challenge definition, manages the player's selection and emits it for
 * evaluation. Adding a challenge type extends the @switch — core flow logic
 * stays untouched.
 */
@Component({
  selector: 'ea-challenge-host',
  standalone: true,
  imports: [CodeViewerComponent, OptionListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="challenge">
      <header class="challenge__header">
        <span class="challenge__type">{{ typeLabel }}</span>
        <span class="challenge__difficulty">{{ challenge.difficulty }}</span>
      </header>
      <h2 class="challenge__title">{{ challenge.title }}</h2>
      <p class="challenge__story">{{ challenge.storyContext }}</p>

      @for (artefact of challenge.artefacts; track artefact.id) {
        <ea-code-viewer [artefact]="artefact" />
      }

      <p class="challenge__prompt">{{ challenge.prompt }}</p>

      @switch (challenge.type) {
        @case ('multiple-choice') {
          <ea-option-list
            [options]="challenge.options"
            [selectedIds]="selectedIds"
            [multiSelect]="challenge.multiSelect ?? false"
            [disabled]="locked"
            [outcomes]="evaluation?.options ?? null"
            (toggle)="onToggle($event, challenge.multiSelect ?? false)"
          />
        }
        @case ('contract-comparison') {
          <ea-option-list
            [options]="challenge.options"
            [selectedIds]="selectedIds"
            [disabled]="locked"
            [outcomes]="evaluation?.options ?? null"
            (toggle)="onToggle($event, false)"
          />
        }
        @case ('code-review') {
          <p class="challenge__instruction">Select every real issue — and nothing that is fine.</p>
          <ea-option-list
            [options]="challenge.findings"
            [selectedIds]="selectedIds"
            [multiSelect]="true"
            [disabled]="locked"
            [outcomes]="evaluation?.options ?? null"
            (toggle)="onToggle($event, true)"
          />
        }
      }

      <div class="challenge__actions">
        <button
          type="button"
          class="ea-btn ea-btn--primary"
          [disabled]="selectedIds.length === 0 || locked"
          (click)="submitted.emit(selectedIds)"
        >
          Submit Decision
        </button>
      </div>
    </section>
  `,
  styleUrls: ['./challenge-host.component.scss'],
})
export class ChallengeHostComponent implements OnChanges {
  @Input({ required: true }) challenge!: ChallengeDefinition;
  /** Latest evaluation for the current attempt, if any. */
  @Input() evaluation: EvaluationResult | null = null;
  /** Locks interaction once the challenge is completed. */
  @Input() locked = false;
  @Output() submitted = new EventEmitter<string[]>();
  @Output() selectionChanged = new EventEmitter<void>();

  selectedIds: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['challenge'] && !changes['challenge'].firstChange) {
      this.selectedIds = [];
    }
  }

  get typeLabel(): string {
    return TYPE_LABELS[this.challenge.type];
  }

  onToggle(id: string, multiSelect: boolean): void {
    if (this.locked) {
      return;
    }
    if (multiSelect) {
      this.selectedIds = this.selectedIds.includes(id)
        ? this.selectedIds.filter((existing) => existing !== id)
        : [...this.selectedIds, id];
    } else {
      this.selectedIds = [id];
    }
    this.selectionChanged.emit();
  }
}

const TYPE_LABELS: Record<ChallengeDefinition['type'], string> = {
  'multiple-choice': 'Decision',
  'code-review': 'Code Review',
  'contract-comparison': 'Contract Comparison',
};
