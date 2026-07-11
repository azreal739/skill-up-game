import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PercentPipe } from '@angular/common';
import { ContentService, GameStateService, TrackProgressService } from '@academy/data-access';

/**
 * Campaign hub / path overview (`/campaigns`). The top level of the game: a
 * recommended next mission, then one summary card per path. Drilling into a
 * card opens that path's campaign list ({@link PathViewComponent}). Cards are
 * driven by {@link TrackProgressService}, so new paths appear automatically.
 */
@Component({
  selector: 'ea-campaign-hub',
  standalone: true,
  imports: [RouterLink, PercentPipe],
  templateUrl: './campaign-hub.component.html',
  styleUrls: ['./campaign-hub.component.scss'],
})
export class CampaignHubComponent {
  private readonly content = inject(ContentService);
  protected readonly gameState = inject(GameStateService);
  protected readonly tracks = inject(TrackProgressService);

  protected readonly paths = this.tracks.summaries;

  /** The first incomplete mission across unlocked campaigns, any path. */
  protected readonly recommendedMission = computed(() => {
    for (const campaign of this.content.campaigns()) {
      const prerequisite = campaign.requiredCampaignId
        ? this.content.campaignById(campaign.requiredCampaignId)
        : undefined;
      if (!this.gameState.isCampaignUnlocked(campaign, prerequisite)) {
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
}
