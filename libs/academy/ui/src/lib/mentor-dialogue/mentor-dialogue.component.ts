import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NarrativeBlock } from '@academy/content-model';

/** Authored Game Master dialogue (09_AI_GAME_MASTER.md). */
@Component({
  selector: 'ea-mentor-dialogue',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dialogue">
      <div class="dialogue__block" *ngFor="let block of blocks">
        <span class="dialogue__speaker">{{ block.speaker }}</span>
        <p class="dialogue__text">{{ block.text }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./mentor-dialogue.component.scss'],
})
export class MentorDialogueComponent {
  @Input({ required: true }) blocks!: NarrativeBlock[];
}
