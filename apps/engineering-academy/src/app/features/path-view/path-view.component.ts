import { Component, computed, effect, inject, untracked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PercentPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import {
  ContentService,
  GameStateService,
  SpeechService,
  TrackProgressService,
} from '@academy/data-access';
import { IconComponent } from '@academy/ui';
import { CampaignEmblemComponent } from '../campaign-hub/campaign-emblem.component';

/**
 * A single path's landing page (`/paths/:trackId`). One generic component
 * serves every path — it reads the id from the route and pulls its summary
 * from {@link TrackProgressService} — so adding a path needs no new component.
 * Shows the path header, its recommended next mission, then the campaign grid
 * (drilling into a campaign opens its mission list).
 */
@Component({
  selector: 'ea-path-view',
  standalone: true,
  imports: [RouterLink, PercentPipe, IconComponent, CampaignEmblemComponent],
  templateUrl: './path-view.component.html',
  styleUrls: ['./path-view.component.scss'],
})
export class PathViewComponent {
  private readonly content = inject(ContentService);
  protected readonly gameState = inject(GameStateService);
  private readonly tracks = inject(TrackProgressService);
  private readonly route = inject(ActivatedRoute);
  private readonly speech = inject(SpeechService);

  private readonly trackId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('trackId') ?? '')),
    { initialValue: '' }
  );

  /** The resolved path summary, or undefined for an unknown id. */
  protected readonly path = computed(() => this.tracks.summaryFor(this.trackId()));

  /** True when this is the path the player most recently progressed on. */
  protected readonly isCurrent = computed(
    () => !!this.path() && this.path()!.track.id === this.tracks.lastActiveTrackId()
  );

  constructor() {
    // Mission Control keeps the conversation going as the player drills in:
    // a spoken status report for the path, once per path visit, when voice +
    // auto-play are on.
    let spokenFor = '';
    effect(() => {
      const path = this.path();
      const settings = this.gameState.settings();
      if (
        !path ||
        !settings.voiceEnabled ||
        !settings.autoPlay ||
        !this.speech.active() ||
        spokenFor === path.track.id
      ) {
        return;
      }
      spokenFor = path.track.id;
      // The full drill-in announcement: what this path IS (its description),
      // where you stand, then the recommended next step (campaign + mission).
      const text = path.next
        ? `${path.track.title}. ${path.track.blurb} ` +
          `${path.campaignsDone} of ${path.campaignsTotal} campaigns cleared. ` +
          `Your next step is ${path.next.mission.title}, in ${path.next.campaign.title}.`
        : `${path.track.title}. ${path.track.blurb} ` +
          `Fully cleared — outstanding work, operator. Replay any campaign for a perfect run.`;
      untracked(() => this.speech.sayAmbient('Mission Control', text));
    });
  }

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
    return campaign
      ? !this.gameState.isCampaignUnlocked(campaign, this.prerequisiteOf(campaign))
      : true;
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
