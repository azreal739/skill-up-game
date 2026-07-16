import { Injectable, Signal, computed, inject } from '@angular/core';
import {
  CampaignDefinition,
  MissionDefinition,
  TRACKS,
  TrackDefinition,
} from '@academy/content-model';
import { ContentService } from './content.service';
import { GameStateService } from './game-state.service';

/** The next mission to play within a path, with its campaign for context. */
export interface PathNextMission {
  mission: MissionDefinition;
  campaign: CampaignDefinition;
}

/**
 * A rolled-up view of one path's progress. Everything the path summary card,
 * the path landing header, and the profile's per-path grouping need — computed
 * once from content + save state so the surfaces stay consistent.
 */
export interface PathSummary {
  track: TrackDefinition;
  campaigns: CampaignDefinition[];
  campaignsTotal: number;
  campaignsDone: number;
  missionsTotal: number;
  missionsDone: number;
  /** 0..1 across every mission in the path. */
  ratio: number;
  complete: boolean;
  /** First not-yet-completed mission in an unlocked campaign, or null if done. */
  next: PathNextMission | null;
}

/**
 * Composes {@link ContentService} (what exists) with {@link GameStateService}
 * (what's done) into per-path summaries. Reactive: the computed reads the save
 * signal through the game-state selectors, so summaries refresh as the player
 * progresses. Iterates `TRACKS`, so a newly-added path needs no changes here.
 */
@Injectable({ providedIn: 'root' })
export class TrackProgressService {
  private readonly content = inject(ContentService);
  private readonly gameState = inject(GameStateService);

  /** Every path that has at least one campaign, in `TRACKS` display order. */
  readonly summaries: Signal<PathSummary[]> = computed(() =>
    TRACKS.map((track) => this.summariseTrack(track)).filter(
      (summary): summary is PathSummary => summary !== null
    )
  );

  /**
   * The player's CURRENT path: the track of the mission with the latest
   * `completedAt` — i.e. where they most recently made progress. Null until
   * anything has been completed. Shared by the hub (current-path badge,
   * recommendation preference) and the path landing header.
   */
  readonly lastActiveTrackId: Signal<string | null> = computed(() => {
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
    return campaignId ? (this.content.campaignById(campaignId)?.track ?? null) : null;
  });

  /** Summary for a single path, or undefined if the id is unknown/empty. */
  summaryFor(trackId: string): PathSummary | undefined {
    return this.summaries().find((summary) => summary.track.id === trackId);
  }

  private summariseTrack(track: TrackDefinition): PathSummary | null {
    const campaigns = this.content.campaignsForTrack(track.id);
    if (campaigns.length === 0) {
      return null;
    }

    let missionsTotal = 0;
    let missionsDone = 0;
    let campaignsDone = 0;
    let next: PathNextMission | null = null;

    for (const campaign of campaigns) {
      missionsTotal += campaign.missions.length;
      missionsDone += campaign.missions.filter((id) =>
        this.gameState.isMissionCompleted(id)
      ).length;

      if (this.gameState.isCampaignCompleted(campaign)) {
        campaignsDone += 1;
      }

      if (!next && this.gameState.isCampaignUnlocked(campaign, this.prerequisiteOf(campaign))) {
        const missionId = campaign.missions.find(
          (id) => !this.gameState.isMissionCompleted(id)
        );
        const mission = missionId ? this.content.missionById(missionId) : undefined;
        if (mission) {
          next = { mission, campaign };
        }
      }
    }

    return {
      track,
      campaigns,
      campaignsTotal: campaigns.length,
      campaignsDone,
      missionsTotal,
      missionsDone,
      ratio: missionsTotal === 0 ? 0 : missionsDone / missionsTotal,
      complete: campaignsDone === campaigns.length,
      next,
    };
  }

  private prerequisiteOf(campaign: CampaignDefinition): CampaignDefinition | undefined {
    return campaign.requiredCampaignId
      ? this.content.campaignById(campaign.requiredCampaignId)
      : undefined;
  }
}
