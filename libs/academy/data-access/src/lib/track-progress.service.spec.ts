import { TestBed } from '@angular/core/testing';
import { TrackProgressService } from './track-progress.service';
import { ContentService } from './content.service';
import { GameStateService } from './game-state.service';

describe('TrackProgressService', () => {
  let service: TrackProgressService;
  let content: ContentService;
  let gameState: GameStateService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackProgressService);
    content = TestBed.inject(ContentService);
    gameState = TestBed.inject(GameStateService);
    gameState.createProfile('Avery');
  });

  afterEach(() => localStorage.clear());

  /** Mark every mission of a campaign complete. */
  function completeCampaign(campaignId: string): void {
    for (const mission of content.missionsForCampaign(campaignId)) {
      gameState.completeMission(
        { missionId: mission.id, scoreRatio: 1, xpEarned: 10, perfect: true, noHints: true },
        []
      );
    }
  }

  it('summarises one path per non-empty track, in TRACKS order', () => {
    const summaries = service.summaries();
    expect(summaries.map((s) => s.track.id)).toEqual([
      'mission-control',
      'field-notes',
      'dance-judging',
    ]);
  });

  it('reports campaign and mission totals straight from content', () => {
    for (const summary of service.summaries()) {
      const campaigns = content.campaignsForTrack(summary.track.id);
      const missions = campaigns.reduce((sum, c) => sum + c.missions.length, 0);
      expect(summary.campaignsTotal).toBe(campaigns.length);
      expect(summary.missionsTotal).toBe(missions);
    }
  });

  it('starts every path at zero progress with the first mission recommended', () => {
    for (const summary of service.summaries()) {
      const firstCampaign = content.campaignsForTrack(summary.track.id)[0];
      expect(summary.campaignsDone).toBe(0);
      expect(summary.missionsDone).toBe(0);
      expect(summary.ratio).toBe(0);
      expect(summary.complete).toBeFalse();
      expect(summary.next?.mission.id).toBe(firstCampaign.missions[0]);
      expect(summary.next?.campaign.id).toBe(firstCampaign.id);
    }
  });

  it('advances campaignsDone and the recommendation as campaigns finish', () => {
    const track = 'mission-control';
    const campaigns = content.campaignsForTrack(track);
    const first = campaigns[0];

    completeCampaign(first.id);

    const summary = service.summaryFor(track)!;
    expect(summary.campaignsDone).toBe(1);
    expect(summary.missionsDone).toBe(first.missions.length);
    // The next recommendation rolls into the second campaign's first mission.
    expect(summary.next?.campaign.id).toBe(campaigns[1].id);
    expect(summary.next?.mission.id).toBe(campaigns[1].missions[0]);
  });

  it('marks a path complete and clears the recommendation when every campaign is done', () => {
    const track = 'mission-control';
    for (const campaign of content.campaignsForTrack(track)) {
      completeCampaign(campaign.id);
    }

    const summary = service.summaryFor(track)!;
    expect(summary.complete).toBeTrue();
    expect(summary.ratio).toBe(1);
    expect(summary.next).toBeNull();
  });

  it('returns undefined for an unknown path id', () => {
    expect(service.summaryFor('no-such-path')).toBeUndefined();
  });
});
