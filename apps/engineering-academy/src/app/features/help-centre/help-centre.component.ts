import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContentService, GameStateService } from '@academy/data-access';
import { HelpTopic } from '@academy/content-model';
import { VoiceButtonComponent } from '@academy/ui';
import { NoteComposerComponent } from '../../shared/note-composer/note-composer.component';

/** Tag chips shown before the player expands the full tag list. */
const TOP_TAGS_SHOWN = 10;

@Component({
  selector: 'ea-help-centre',
  standalone: true,
  imports: [FormsModule, NoteComposerComponent, VoiceButtonComponent],
  templateUrl: './help-centre.component.html',
  styleUrls: ['./help-centre.component.scss'],
})
export class HelpCentreComponent {
  private readonly content = inject(ContentService);
  private readonly route = inject(ActivatedRoute);
  protected readonly gameState = inject(GameStateService);

  protected readonly query = signal(this.route.snapshot.queryParamMap.get('q') ?? '');
  protected readonly tagFilter = signal<string | null>(null);
  protected readonly allTagsShown = signal(false);
  protected readonly selectedId = signal<string | null>(null);
  protected readonly noteOpen = signal(false);

  /** Help-reading nudge (Review Loop spec 06). */
  protected readonly noteNudge =
    'This concept appears in multiple campaigns. Add a note if you want to remember it.';

  /** Every tag across the library with its topic count, most common first. */
  protected readonly allTags = computed(() => {
    const counts = new Map<string, number>();
    for (const topic of this.content.helpTopics()) {
      for (const tag of topic.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  });

  /** The chips on display: the most common few, or all once expanded. The
   *  active tag always stays visible so the filter can be seen and cleared. */
  protected readonly visibleTags = computed(() => {
    const all = this.allTags();
    if (this.allTagsShown()) {
      return all;
    }
    const top = all.slice(0, TOP_TAGS_SHOWN);
    const active = this.tagFilter();
    if (active && !top.some(({ tag }) => tag === active)) {
      const held = all.find(({ tag }) => tag === active);
      if (held) {
        top.push(held);
      }
    }
    return top;
  });

  protected readonly hasMoreTags = computed(() => this.allTags().length > TOP_TAGS_SHOWN);

  /** Search + tag filter combined. */
  protected readonly results = computed(() => {
    const tag = this.tagFilter();
    const matches = this.content.searchHelp(this.query());
    return tag ? matches.filter((topic) => topic.tags.includes(tag)) : matches;
  });

  protected readonly totalTopics = computed(() => this.content.helpTopics().length);

  protected readonly filtersActive = computed(
    () => this.query().trim().length > 0 || this.tagFilter() !== null
  );

  /** Falls back to the first result when nothing (or a filtered-out topic) is selected. */
  protected readonly selected = computed<HelpTopic | null>(() => {
    const id = this.selectedId();
    const results = this.results();
    if (id) {
      const inResults = results.find((topic) => topic.id === id);
      if (inResults) {
        return inResults;
      }
    }
    return results[0] ?? null;
  });

  /** Topics sharing a tag with the selected one — quick sideways reading. */
  protected readonly related = computed<HelpTopic[]>(() => {
    const current = this.selected();
    if (!current) {
      return [];
    }
    const tags = new Set(current.tags);
    return this.content
      .helpTopics()
      .filter((topic) => topic.id !== current.id && topic.tags.some((tag) => tags.has(tag)))
      .slice(0, 4);
  });

  select(topic: HelpTopic): void {
    this.selectedId.set(topic.id);
    this.noteOpen.set(false);
  }

  toggleTag(tag: string): void {
    this.tagFilter.update((current) => (current === tag ? null : tag));
  }

  clearFilters(): void {
    this.query.set('');
    this.tagFilter.set(null);
  }

  toggleNote(): void {
    this.noteOpen.update((open) => !open);
  }

  /** The topic as the Archivist reads it: title, then the full entry. */
  spokenTopic(topic: HelpTopic): string {
    return `${topic.title}. ${topic.content}`;
  }
}
