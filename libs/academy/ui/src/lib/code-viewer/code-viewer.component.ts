import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ArtefactDefinition } from '@academy/content-model';

/**
 * Terminal-style artefact viewer. Styled pre/code per the v1 guidance in
 * 12_ANGULAR_NX_IMPLEMENTATION_GUIDE.md — syntax highlighting must not
 * block the project.
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
      </figcaption>
      <pre class="artefact__body"><code>{{ artefact.content }}</code></pre>
    </figure>
    `,
  styleUrls: ['./code-viewer.component.scss'],
})
export class CodeViewerComponent {
  @Input({ required: true }) artefact!: ArtefactDefinition;

  get kindLabel(): string {
    return KIND_LABELS[this.artefact.type] ?? this.artefact.type;
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
