import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { HelpTopic } from '@academy/content-model';

/**
 * Slide-over contextual help. Opens without leaving the challenge, closes on
 * Escape or backdrop click (10_HELP_CENTRE_AND_HINT_SYSTEM.md).
 */
@Component({
  selector: 'ea-help-drawer',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="drawer-backdrop">
      <button type="button" class="drawer-shield" aria-label="Close help" (click)="closed.emit()"></button>
      <aside class="drawer" role="dialog" aria-modal="true" [attr.aria-label]="topic.title">
        <header class="drawer__header">
          <p class="ea-eyebrow">Help Centre</p>
          <button type="button" class="drawer__close" (click)="closed.emit()" aria-label="Close">✕</button>
        </header>
        <h2 class="drawer__title">{{ topic.title }}</h2>
        <p class="drawer__summary">{{ topic.summary }}</p>
        <p class="drawer__content">{{ topic.content }}</p>
        <div class="drawer__tags">
          @for (tag of topic.tags; track tag) {
            <span class="ea-chip">{{ tag }}</span>
          }
        </div>
        <a class="drawer__more" routerLink="/help" [queryParams]="{ q: topic.title }">
          Open the full Help Centre →
        </a>
      </aside>
    </div>
  `,
  styleUrls: ['./help-drawer.component.scss'],
})
export class HelpDrawerComponent {
  @Input({ required: true }) topic!: HelpTopic;
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closed.emit();
  }
}
