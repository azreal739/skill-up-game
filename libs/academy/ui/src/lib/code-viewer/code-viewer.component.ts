import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  ViewChild,
  computed,
  signal,
} from '@angular/core';

import { ArtefactDefinition } from '@academy/content-model';
import { highlight } from './syntax-highlight';

/** Artefacts taller than this many lines collapse behind an Expand control. */
const COLLAPSE_LINES = 14;

/**
 * Terminal-style artefact viewer. Code and diff artefacts get lightweight,
 * dependency-free syntax tinting and a line-number gutter; long artefacts
 * collapse with a fade and can be expanded into a full-screen reader modal.
 */
@Component({
  selector: 'ea-code-viewer',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="artefact" [attr.data-type]="artefact.type">
      <figcaption class="artefact__header">
        <span class="artefact__kind">{{ kindLabel }}</span>
        <span class="artefact__title">{{ artefact.title }}</span>
        @if (artefact.language) {
          <span class="artefact__lang">{{ artefact.language }}</span>
        }
        @if (isLong) {
          <button
            #expandBtn
            type="button"
            class="artefact__expand"
            (click)="open()"
            [attr.aria-label]="'Expand ' + artefact.title"
          >
            ⤢ Expand
          </button>
        }
      </figcaption>
      <div class="artefact__scroll" [class.artefact__scroll--collapsed]="isLong">
        <div class="artefact__code">
          @if (showLineNumbers) {
            <div class="artefact__gutter" aria-hidden="true">
              @for (n of lineNumbers; track n) {
                <span>{{ n }}</span>
              }
            </div>
          }
          <pre class="artefact__body"><code [innerHTML]="html()"></code></pre>
        </div>
        @if (isLong) {
          <button type="button" class="artefact__more" (click)="open()">
            Show all {{ lineCount }} lines
          </button>
        }
      </div>
    </figure>

    @if (expanded()) {
      <div class="artefact-modal" (click)="close()">
        <div
          #dialog
          class="artefact-modal__panel"
          role="dialog"
          aria-modal="true"
          [attr.aria-label]="artefact.title"
          tabindex="-1"
          (click)="$event.stopPropagation()"
        >
          <header class="artefact-modal__header">
            <span class="artefact__kind">{{ kindLabel }}</span>
            <span class="artefact-modal__title">{{ artefact.title }}</span>
            @if (artefact.language) {
              <span class="artefact__lang">{{ artefact.language }}</span>
            }
            <button
              type="button"
              class="artefact-modal__close"
              (click)="close()"
              aria-label="Close expanded view"
            >
              ✕
            </button>
          </header>
          <div class="artefact__code artefact-modal__code">
            @if (showLineNumbers) {
              <div class="artefact__gutter" aria-hidden="true">
                @for (n of lineNumbers; track n) {
                  <span>{{ n }}</span>
                }
              </div>
            }
            <pre class="artefact__body"><code [innerHTML]="html()"></code></pre>
          </div>
        </div>
      </div>
    }
  `,
  styleUrls: ['./code-viewer.component.scss'],
})
export class CodeViewerComponent implements OnChanges {
  @Input({ required: true }) artefact!: ArtefactDefinition;
  @ViewChild('dialog') dialog?: ElementRef<HTMLElement>;
  @ViewChild('expandBtn') expandBtn?: ElementRef<HTMLButtonElement>;

  readonly expanded = signal(false);

  private readonly artefactSignal = signal<ArtefactDefinition | null>(null);

  readonly html = computed(() => {
    const artefact = this.artefactSignal();
    return artefact ? highlight(artefact.content, artefact.language, artefact.type) : '';
  });

  ngOnChanges(): void {
    this.artefactSignal.set(this.artefact);
    this.expanded.set(false);
  }

  get kindLabel(): string {
    return KIND_LABELS[this.artefact.type] ?? this.artefact.type;
  }

  get lineCount(): number {
    return this.artefact.content.split('\n').length;
  }

  get lineNumbers(): number[] {
    return Array.from({ length: this.lineCount }, (_, i) => i + 1);
  }

  get isLong(): boolean {
    return this.lineCount > COLLAPSE_LINES;
  }

  get showLineNumbers(): boolean {
    return (this.artefact.type === 'code' || this.artefact.type === 'diff') && this.lineCount > 1;
  }

  open(): void {
    this.expanded.set(true);
    queueMicrotask(() => this.dialog?.nativeElement.focus());
  }

  close(): void {
    this.expanded.set(false);
    queueMicrotask(() => this.expandBtn?.nativeElement.focus());
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.expanded()) {
      this.close();
    }
  }
}

const KIND_LABELS: Record<string, string> = {
  code: 'CODE',
  log: 'LOG',
  'api-response': 'API RESPONSE',
  diagram: 'DIAGRAM',
  pipeline: 'PIPELINE',
  dashboard: 'DASHBOARD',
  message: 'MESSAGE',
  ticket: 'TICKET',
  diff: 'DIFF',
};
