import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PercentPipe } from '@angular/common';
import { ContentService, GameStateService } from '@academy/data-access';

@Component({
  selector: 'ea-campaign-hub',
  standalone: true,
  imports: [RouterLink, PercentPipe],
  templateUrl: './campaign-hub.component.html',
  styleUrls: ['./campaign-hub.component.scss'],
})
export class CampaignHubComponent {
  protected readonly content = inject(ContentService);
  protected readonly gameState = inject(GameStateService);

  protected readonly campaigns = this.content.campaigns();

  /** The first incomplete mission across unlocked campaigns. */
  protected readonly recommendedMission = computed(() => {
    for (const campaign of this.campaigns) {
      for (const missionId of campaign.missions) {
        if (!this.gameState.isMissionCompleted(missionId)) {
          const mission = this.content.missionById(missionId);
          if (mission) {
            return mission;
          }
        }
      }
    }
    return null;
  });

  progressFor(campaignId: string): number {
    const campaign = this.content.campaignById(campaignId);
    return campaign ? this.gameState.campaignProgress(campaign) : 0;
  }

  missionCount(campaignId: string): number {
    return this.content.campaignById(campaignId)?.missions.length ?? 0;
  }

  isCompleted(campaignId: string): boolean {
    const campaign = this.content.campaignById(campaignId);
    return campaign ? this.gameState.isCampaignCompleted(campaign) : false;
  }
}
