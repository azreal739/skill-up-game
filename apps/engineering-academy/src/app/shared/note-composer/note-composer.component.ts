import { Component, EventEmitter, Input, OnChanges, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteLinkType, PlayerNote } from '@academy/content-model';
import { AudioService, GameStateService } from '@academy/data-access';

/** Placeholder that models the reflection template from Review Loop spec 06. */
const BODY_TEMPLATE = `What did I misunderstand?
What is the correct engineering principle?
Where would I apply this in real code?`;

/**
 * Reusable note editor (Review Loop spec 06). Drop it anywhere the player
 * might want to capture a lesson — mission feedback, Academy Review, the Help
 * Centre, the backlog, or the Notes page. It owns persistence so hosts only
 * pass the link context and react to (saved)/(dismissed).
 *
 * In create mode it links the note to `linkType`/`linkId`; pass `note` to edit
 * an existing one instead. Always skippable — it never traps the player.
 */
@Component({
  selector: 'ea-note-composer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './note-composer.component.html',
  styleUrls: ['./note-composer.component.scss'],
})
export class NoteComposerComponent implements OnChanges {
  private readonly gameState = inject(GameStateService);
  private readonly audio = inject(AudioService);

  /** Link context for a new note. Ignored when editing an existing `note`. */
  @Input() linkType: NoteLinkType = 'general';
  @Input() linkId = '';
  /** Pre-fills the title on a fresh note. */
  @Input() suggestedTitle = '';
  /** A short Senior-Dev / Mission Control nudge shown above the form. */
  @Input() nudge = '';
  /** When set, the composer edits this note instead of creating one. */
  @Input() note: PlayerNote | null = null;

  @Output() readonly saved = new EventEmitter<PlayerNote>();
  @Output() readonly dismissed = new EventEmitter<void>();

  protected readonly title = signal('');
  protected readonly body = signal('');
  protected readonly tagsText = signal('');
  protected readonly pinned = signal(false);

  protected readonly bodyPlaceholder = BODY_TEMPLATE;

  ngOnChanges(): void {
    if (this.note) {
      this.title.set(this.note.title);
      this.body.set(this.note.body);
      this.tagsText.set(this.note.tags.join(', '));
      this.pinned.set(this.note.pinned);
    } else {
      this.title.set(this.suggestedTitle);
      this.body.set('');
      this.tagsText.set('');
      this.pinned.set(false);
    }
  }

  protected get canSave(): boolean {
    return this.title().trim().length > 0 || this.body().trim().length > 0;
  }

  protected save(): void {
    if (!this.canSave) {
      return;
    }
    const tags = this.parseTags(this.tagsText());
    const title = this.title().trim() || 'Untitled note';

    if (this.note) {
      this.gameState.updateNote(this.note.id, {
        title,
        body: this.body().trim(),
        tags,
        pinned: this.pinned(),
      });
      this.audio.play('click');
      this.saved.emit({ ...this.note, title, body: this.body().trim(), tags, pinned: this.pinned() });
      return;
    }

    const created = this.gameState.createNote({
      title,
      body: this.body().trim(),
      tags,
      pinned: this.pinned(),
      linkedEntityType: this.linkType,
      linkedEntityId: this.linkId,
    });
    this.audio.play('correct');
    this.saved.emit(created);
  }

  protected cancel(): void {
    this.audio.play('click');
    this.dismissed.emit();
  }

  /** Splits a comma/newline list into trimmed, de-duplicated, lowercased tags. */
  private parseTags(raw: string): string[] {
    const seen = new Set<string>();
    for (const part of raw.split(/[,\n]/)) {
      const tag = part.trim().toLowerCase();
      if (tag) {
        seen.add(tag);
      }
    }
    return [...seen];
  }
}
