import { Component, computed, effect, inject, untracked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PercentPipe } from '@angular/common';
import { ContentService, GameStateService, SpeechService, TrackProgressService } from '@academy/data-access';

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
  private readonly gameState = inject(GameStateService);
  private readonly content = inject(ContentService);
  private readonly speech = inject(SpeechService);

  constructor() {
    // Mission Control voices the recommendation once per hub visit, when
    // voice + auto-play are on — the hub is the "what now?" screen.
    let spokenFor = '';
    effect(() => {
      const rec = this.recommended();
      const settings = this.gameState.settings();
      if (
        !rec ||
        !settings.voiceEnabled ||
        !settings.autoPlay ||
        !this.speech.active() ||
        spokenFor === rec.mission.id
      ) {
        return;
      }
      spokenFor = rec.mission.id;
      untracked(() =>
        void this.speech.speak(
          'Mission Control',
          `Recommended next: ${rec.mission.title}, in ${rec.campaign.title}. Jump in when ready.`
        )
      );
    });
  }

  protected readonly paths = this.tracks.summaries;

  /**
   * The track the player most recently made progress on — the track of the
   * mission with the latest `completedAt`. Null until anything is completed.
   */
  private readonly lastActiveTrackId = computed(() => {
    const completed = this.gameState.state()?.completedMissions ?? {};
    let latestId: string | null = null;
    let latestAt = '';
    for (const [missionId, record] of Object.entries(completed)) {
      if (record.completedAt > latestAt) {
        latestAt = record.completedAt;
        latestId = missionId;
      }
    }
    if (!latestId) {
      return null;
    }
    const campaignId = this.content.missionById(latestId)?.campaignId;
    return campaignId ? this.content.campaignById(campaignId)?.track ?? null : null;
  });

  /**
   * The recommended next mission, carrying its path and campaign so the
   * overview can show where it drops you. Prefers the player's last active
   * path (if it still has an unlocked, unfinished mission); otherwise the
   * first path in display order that does. Reuses each path's own `next` so
   * the two never disagree.
   */
  protected readonly recommended = computed(() => {
    const paths = this.paths();
    const lastTrack = this.lastActiveTrackId();
    const preferred = lastTrack ? paths.find((path) => path.track.id === lastTrack) : undefined;
    const ordered = preferred ? [preferred, ...paths.filter((p) => p !== preferred)] : paths;
    for (const path of ordered) {
      if (path.next) {
        return { track: path.track, campaign: path.next.campaign, mission: path.next.mission };
      }
    }
    return null;
  });
}
