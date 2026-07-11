import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PercentPipe } from '@angular/common';
import { TrackProgressService } from '@academy/data-access';

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
  protected readonly tracks = inject(TrackProgressService);

  protected readonly paths = this.tracks.summaries;

  /**
   * The recommended next mission across all paths, carrying its path and
   * campaign so the overview can show where it drops you. Picks the first
   * path (in display order) that still has an unlocked, unfinished mission —
   * reusing each path's own `next` so the two never disagree.
   */
  protected readonly recommended = computed(() => {
    for (const path of this.paths()) {
      if (path.next) {
        return { track: path.track, campaign: path.next.campaign, mission: path.next.mission };
      }
    }
    return null;
  });
}
