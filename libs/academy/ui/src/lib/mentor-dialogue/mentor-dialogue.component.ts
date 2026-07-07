import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NarrativeBlock } from '@academy/content-model';

/** Authored Game Master dialogue (09_AI_GAME_MASTER.md). */
@Component({
  selector: 'ea-mentor-dialogue',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dialogue">
      @for (block of blocks; track block) {
        <div class="dialogue__block">
          <span class="dialogue__speaker">{{ block.speaker }}</span>
          <p class="dialogue__text">{{ block.text }}</p>
        </div>
      }
    </div>
    `,
  styleUrls: ['./mentor-dialogue.component.scss'],
})
export class MentorDialogueComponent {
  @Input({ required: true }) blocks!: NarrativeBlock[];
}
