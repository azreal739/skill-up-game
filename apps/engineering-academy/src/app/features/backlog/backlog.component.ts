import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TechnicalDebtItem, TechnicalDebtStatus } from '@academy/content-model';
import { ContentService, GameStateService } from '@academy/data-access';

interface BacklogGroup {
  status: TechnicalDebtStatus;
  label: string;
  hint: string;
  items: TechnicalDebtItem[];
}

const STATUS_ORDER: { status: TechnicalDebtStatus; label: string; hint: string }[] = [
  { status: 'open', label: 'Open', hint: 'Discovered during a mission — awaiting review.' },
  { status: 'reopened', label: 'Reopened', hint: 'Reviewed but the concept still needs work.' },
  { status: 'in-review', label: 'In Review', hint: 'You have started remediating these.' },
  { status: 'remediated', label: 'Remediated', hint: 'Corrected in Academy Review.' },
];

/**
 * Technical Debt Backlog (Review Loop spec 04): the player's misunderstood
 * concepts, grouped by status like an engineering task board. Filterable by
 * status and concept tag, with collapsible sections. Each item links into
 * Academy Review for remediation.
 */
@Component({
  selector: 'ea-backlog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent {
  protected readonly gameState = inject(GameStateService);
  private readonly content = inject(ContentService);

  /** Active filters. 'all' = no constraint. */
  protected readonly statusFilter = signal<TechnicalDebtStatus | 'all'>('all');
  protected readonly tagFilter = signal<string>('all');
  /** Statuses whose section is collapsed. */
  private readonly collapsed = signal<ReadonlySet<TechnicalDebtStatus>>(new Set());

  protected readonly totalItems = computed(() => this.gameState.technicalDebtItems().length);

  protected readonly remediatedCount = computed(
    () => this.gameState.technicalDebtItems().filter((item) => item.status === 'remediated').length
  );

  /** Every concept tag present across the backlog, for the tag filter. */
  protected readonly allTags = computed(() => {
    const tags = new Set<string>();
    for (const item of this.gameState.technicalDebtItems()) {
      item.conceptTags.forEach((tag) => tags.add(tag));
    }
    return [...tags].sort();
  });

  /** Status chips with live counts (after the tag filter). */
  protected readonly statusChips = computed(() => {
    const items = this.tagFiltered();
    return STATUS_ORDER.map(({ status, label }) => ({
      status,
      label,
      count: items.filter((item) => item.status === status).length,
    })).filter((chip) => chip.count > 0);
  });

  private readonly tagFiltered = computed(() => {
    const tag = this.tagFilter();
    const items = this.gameState.technicalDebtItems();
    return tag === 'all' ? items : items.filter((item) => item.conceptTags.includes(tag));
  });

  protected readonly groups = computed<BacklogGroup[]>(() => {
    const items = this.tagFiltered();
    const status = this.statusFilter();
    return STATUS_ORDER.filter((group) => status === 'all' || group.status === status)
      .map(({ status: s, label, hint }) => ({
        status: s,
        label,
        hint,
        items: items.filter((item) => item.status === s),
      }))
      .filter((group) => group.items.length > 0);
  });

  /** True when filters hide everything that exists. */
  protected readonly noMatches = computed(
    () => this.totalItems() > 0 && this.groups().length === 0
  );

  protected isCollapsed(status: TechnicalDebtStatus): boolean {
    return this.collapsed().has(status);
  }

  protected toggleCollapsed(status: TechnicalDebtStatus): void {
    this.collapsed.update((set) => {
      const next = new Set(set);
      if (next.has(status)) {
        next.delete(status);
      } else {
        next.add(status);
      }
      return next;
    });
  }

  protected setStatus(status: TechnicalDebtStatus | 'all'): void {
    this.statusFilter.set(status);
  }

  protected onTagFilter(event: Event): void {
    this.tagFilter.set((event.target as HTMLSelectElement).value);
  }

  protected clearFilters(): void {
    this.statusFilter.set('all');
    this.tagFilter.set('all');
  }

  protected missionTitle(item: TechnicalDebtItem): string {
    return this.content.missionById(item.missionId)?.title ?? item.missionId;
  }

  protected campaignTitle(item: TechnicalDebtItem): string {
    return this.content.campaignById(item.campaignId)?.title ?? item.campaignId;
  }
}
