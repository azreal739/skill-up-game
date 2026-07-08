import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TechnicalDebtItem, TechnicalDebtStatus } from '@academy/content-model';
import { ContentService, GameStateService } from '@academy/data-access';

interface BacklogGroup {
  status: TechnicalDebtStatus;
  label: string;
  hint: string;
  items: TechnicalDebtItem[];
}

/**
 * Technical Debt Backlog (Review Loop spec 04): the player's misunderstood
 * concepts, grouped by status like an engineering task board. Each item links
 * into Academy Review for remediation.
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

  protected readonly totalItems = computed(() => this.gameState.technicalDebtItems().length);

  protected readonly remediatedCount = computed(
    () => this.gameState.technicalDebtItems().filter((item) => item.status === 'remediated').length
  );

  protected readonly groups = computed<BacklogGroup[]>(() => {
    const items = this.gameState.technicalDebtItems();
    const order: { status: TechnicalDebtStatus; label: string; hint: string }[] = [
      { status: 'open', label: 'Open', hint: 'Discovered during a mission — awaiting review.' },
      { status: 'reopened', label: 'Reopened', hint: 'Reviewed but the concept still needs work.' },
      { status: 'in-review', label: 'In Review', hint: 'You have started remediating these.' },
      { status: 'remediated', label: 'Remediated', hint: 'Corrected in Academy Review.' },
    ];
    return order
      .map(({ status, label, hint }) => ({
        status,
        label,
        hint,
        items: items.filter((item) => item.status === status),
      }))
      .filter((group) => group.items.length > 0);
  });

  protected missionTitle(item: TechnicalDebtItem): string {
    return this.content.missionById(item.missionId)?.title ?? item.missionId;
  }

  protected campaignTitle(item: TechnicalDebtItem): string {
    return this.content.campaignById(item.campaignId)?.title ?? item.campaignId;
  }
}
