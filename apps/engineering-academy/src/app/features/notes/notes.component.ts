import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoteLinkType, PlayerNote } from '@academy/content-model';
import { AudioService, ContentService, GameStateService } from '@academy/data-access';
import { VoiceButtonComponent, ToastService } from '@academy/ui';
import { NoteComposerComponent } from '../../shared/note-composer/note-composer.component';

/** Friendly names for each link context, shown on a note card. */
const LINK_LABELS: Record<NoteLinkType, string> = {
  campaign: 'Campaign',
  mission: 'Mission',
  challenge: 'Challenge',
  'technical-debt': 'Technical Debt',
  'help-topic': 'Help Centre',
  general: 'General',
};

/**
 * Notes hub (Review Loop spec 06): every lesson the player has captured,
 * pinned first, filterable by tag, with inline create/edit/delete/pin. Notes
 * are also created contextually from missions, review and the Help Centre;
 * this is where they all live and can be managed.
 */
@Component({
  selector: 'ea-notes',
  standalone: true,
  imports: [RouterLink, NoteComposerComponent, VoiceButtonComponent],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent {
  protected readonly gameState = inject(GameStateService);
  private readonly content = inject(ContentService);
  private readonly audio = inject(AudioService);
  private readonly toast = inject(ToastService);

  /** Which note is open in the editor, or 'new' for a fresh general note. */
  protected readonly editing = signal<string | 'new' | null>(null);
  protected readonly activeTag = signal<string | null>(null);

  /** All distinct tags across the player's notes, alphabetical. */
  protected readonly allTags = computed(() => {
    const tags = new Set<string>();
    for (const note of this.gameState.notes()) {
      note.tags.forEach((tag) => tags.add(tag));
    }
    return [...tags].sort();
  });

  /** Notes matching the active tag filter, pinned first then newest first. */
  protected readonly visibleNotes = computed(() => {
    const tag = this.activeTag();
    return this.gameState
      .notes()
      .filter((note) => !tag || note.tags.includes(tag))
      .slice()
      .sort((a, b) => {
        if (a.pinned !== b.pinned) {
          return a.pinned ? -1 : 1;
        }
        return b.createdAt.localeCompare(a.createdAt);
      });
  });

  protected startNewNote(): void {
    this.audio.play('click');
    this.editing.set('new');
  }

  protected editNote(note: PlayerNote): void {
    this.audio.play('click');
    this.editing.set(note.id);
  }

  protected onSaved(): void {
    this.toast.show('Note saved');
    this.closeEditor();
  }

  protected closeEditor(): void {
    this.editing.set(null);
  }

  protected deleteNote(note: PlayerNote): void {
    this.audio.play('click');
    this.gameState.deleteNote(note.id);
    this.toast.show('Note deleted', 'info');
    if (this.editing() === note.id) {
      this.editing.set(null);
    }
  }

  protected togglePin(note: PlayerNote): void {
    this.audio.play('click');
    this.gameState.toggleNotePin(note.id);
  }

  protected filterByTag(tag: string | null): void {
    this.audio.play('click');
    this.activeTag.set(tag);
  }

  protected linkLabel(note: PlayerNote): string {
    return LINK_LABELS[note.linkedEntityType];
  }

  /** Best-effort human name for the linked entity, when resolvable. */
  protected linkTarget(note: PlayerNote): string | null {
    switch (note.linkedEntityType) {
      case 'campaign':
        return this.content.campaignById(note.linkedEntityId)?.title ?? null;
      case 'mission':
        return this.content.missionById(note.linkedEntityId)?.title ?? null;
      case 'help-topic':
        return this.content.helpTopicById(note.linkedEntityId)?.title ?? null;
      case 'technical-debt':
        return this.gameState.debtItemById(note.linkedEntityId)?.challengeTitle ?? null;
      case 'challenge': {
        const missionId = this.gameState.progressForChallenge(note.linkedEntityId)?.missionId;
        return missionId
          ? (this.content.challengeById(missionId, note.linkedEntityId)?.title ?? null)
          : null;
      }
      default:
        return null;
    }
  }
}
