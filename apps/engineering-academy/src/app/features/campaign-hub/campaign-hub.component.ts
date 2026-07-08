import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PercentPipe } from '@angular/common';
import { ContentService, GameStateService } from '@academy/data-access';
import { IconComponent } from '@academy/ui';
import { CampaignEmblemComponent } from './campaign-emblem.component';

@Component({
  selector: 'ea-campaign-hub',
  standalone: true,
  imports: [RouterLink, PercentPipe, IconComponent, CampaignEmblemComponent],
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
      if (!this.gameState.isCampaignUnlocked(campaign, this.prerequisiteOf(campaign))) {
        continue;
      }
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

  isLocked(campaignId: string): boolean {
    const campaign = this.content.campaignById(campaignId);
    return campaign ? !this.gameState.isCampaignUnlocked(campaign, this.prerequisiteOf(campaign)) : true;
  }

  prerequisiteTitle(campaignId: string): string | null {
    const campaign = this.content.campaignById(campaignId);
    return campaign ? (this.prerequisiteOf(campaign)?.title ?? null) : null;
  }

  private prerequisiteOf(campaign: { requiredCampaignId?: string }) {
    return campaign.requiredCampaignId
      ? this.content.campaignById(campaign.requiredCampaignId)
      : undefined;
  }
}
