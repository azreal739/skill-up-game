import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ChallengeOption, OptionOutcome } from '@academy/content-model';

/**
 * Selectable option list shared by every ID-based challenge type.
 * Multiline labels render as code. After submission each option shows its
 * outcome with an icon + text (never colour alone — doc 16).
 */
@Component({
  selector: 'ea-option-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="options" [attr.role]="multiSelect ? 'group' : 'radiogroup'">
      @for (option of options; track option.id) {
        <li>
          <button
            type="button"
            class="option"
            [class.option--selected]="selectedIds.includes(option.id)"
            [class.option--correct]="submitted && outcomeFor(option.id)?.isCorrect"
            [class.option--incorrect]="isIncorrectSelection(option.id)"
            [disabled]="disabled"
            [attr.role]="multiSelect ? 'checkbox' : 'radio'"
            [attr.aria-checked]="selectedIds.includes(option.id)"
            (click)="toggle.emit(option.id)"
          >
            <span class="option__marker" aria-hidden="true">{{ markerFor(option.id) }}</span>
            <span class="option__label" [class.option__label--code]="isCode(option.label)">{{
              option.label
            }}</span>
            @if (submitted && verdictFor(option.id); as verdict) {
              <span class="option__verdict">{{ verdict }}</span>
            }
          </button>
          @if (submitted && feedbackFor(option.id); as feedback) {
            <p class="option__feedback">{{ feedback }}</p>
          }
        </li>
      }
    </ul>
  `,
  styleUrls: ['./option-list.component.scss'],
})
export class OptionListComponent {
  @Input({ required: true }) options!: ChallengeOption[];
  @Input({ required: true }) selectedIds!: string[];
  @Input() multiSelect = false;
  @Input() disabled = false;
  /** Present once the answer has been submitted. */
  @Input() outcomes: OptionOutcome[] | null = null;
  @Output() toggle = new EventEmitter<string>();

  get submitted(): boolean {
    return this.outcomes !== null;
  }

  markerFor(id: string): string {
    const selected = this.selectedIds.includes(id);
    if (this.multiSelect) {
      return selected ? '☑' : '☐';
    }
    return selected ? '◉' : '○';
  }

  outcomeFor(id: string): OptionOutcome | undefined {
    return this.outcomes?.find((outcome) => outcome.id === id);
  }

  isIncorrectSelection(id: string): boolean {
    const outcome = this.outcomeFor(id);
    return !!outcome && outcome.wasSelected && !outcome.isCorrect;
  }

  verdictFor(id: string): string | false {
    const outcome = this.outcomeFor(id);
    if (!outcome) {
      return false;
    }
    if (outcome.isCorrect && outcome.wasSelected) return '✓ correct';
    if (outcome.isCorrect && !outcome.wasSelected) return '✓ this was correct';
    if (outcome.wasSelected) return '✗ not this one';
    return false;
  }

  /** Show explanations for options the player selected or should have. */
  feedbackFor(id: string): string | false {
    const outcome = this.outcomeFor(id);
    if (!outcome?.feedback) {
      return false;
    }
    return outcome.wasSelected || outcome.isCorrect ? outcome.feedback : false;
  }

  isCode(label: string): boolean {
    return label.includes('\n') || label.includes('{');
  }
}
