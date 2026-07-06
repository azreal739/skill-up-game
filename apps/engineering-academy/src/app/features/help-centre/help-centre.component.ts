import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '@academy/data-access';
import { HelpTopic } from '@academy/content-model';

@Component({
  selector: 'ea-help-centre',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './help-centre.component.html',
  styleUrls: ['./help-centre.component.scss'],
})
export class HelpCentreComponent {
  private readonly content = inject(ContentService);
  private readonly route = inject(ActivatedRoute);

  protected readonly query = signal(this.route.snapshot.queryParamMap.get('q') ?? '');
  protected readonly selectedId = signal<string | null>(null);

  protected readonly results = computed(() => this.content.searchHelp(this.query()));

  protected readonly selected = computed<HelpTopic | null>(() => {
    const id = this.selectedId();
    if (id) {
      return this.content.helpTopicById(id) ?? null;
    }
    return this.results()[0] ?? null;
  });

  select(topic: HelpTopic): void {
    this.selectedId.set(topic.id);
  }
}
