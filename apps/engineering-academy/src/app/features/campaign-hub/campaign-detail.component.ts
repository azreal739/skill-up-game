import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ContentService, GameStateService } from '@academy/data-access';
import { MissionDefinition } from '@academy/content-model';

interface MissionNode {
  mission: MissionDefinition;
  index: number;
  unlocked: boolean;
  completed: boolean;
  perfect: boolean;
  bestXp: number | null;
}

@Component({
  selector: 'ea-campaign-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss'],
})
export class CampaignDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);
  private readonly gameState = inject(GameStateService);

  private readonly campaignId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('campaignId') ?? '')),
    { initialValue: '' }
  );

  protected readonly campaign = computed(() => this.content.campaignById(this.campaignId()));

  protected readonly nodes = computed<MissionNode[]>(() => {
    const campaign = this.campaign();
    if (!campaign) {
      return [];
    }
    return this.content.missionsForCampaign(campaign.id).map((mission, index) => {
      const record = this.gameState.missionRecord(mission.id);
      return {
        mission,
        index,
        unlocked: this.gameState.isMissionUnlocked(campaign, mission.id),
        completed: record !== undefined,
        perfect: record?.perfect ?? false,
        bestXp: record?.bestXp ?? null,
      };
    });
  });

  protected readonly campaignComplete = computed(() => {
    const campaign = this.campaign();
    return campaign ? this.gameState.isCampaignCompleted(campaign) : false;
  });
}
