import { Component, HostListener, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  EvaluationResult,
  HelpTopic,
  badgeById,
  hintCost,
} from '@academy/content-model';
import {
  AudioService,
  ContentService,
  GameStateService,
  MissionSessionService,
} from '@academy/data-access';
import { CodeViewerComponent, HudComponent, MentorDialogueComponent, BadgeChipComponent } from '@academy/ui';
import { ChallengeHostComponent } from '@academy/challenges';
import { HelpDrawerComponent } from './help-drawer.component';
import { WaveStateService } from '../../shared/wave-background/wave-state.service';

@Component({
  selector: 'ea-mission-player',
  standalone: true,
  imports: [
    RouterLink,
    CodeViewerComponent,
    HudComponent,
    MentorDialogueComponent,
    BadgeChipComponent,
    ChallengeHostComponent,
    HelpDrawerComponent,
  ],
  templateUrl: './mission-player.component.html',
  styleUrls: ['./mission-player.component.scss'],
})
export class MissionPlayerComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly content = inject(ContentService);
  private readonly audio = inject(AudioService);
  private readonly waves = inject(WaveStateService);
  protected readonly session = inject(MissionSessionService);
  protected readonly gameState = inject(GameStateService);

  private readonly missionId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('missionId') ?? '')),
    { initialValue: '' }
  );

  protected readonly mission = computed(() => this.content.missionById(this.missionId()));

  /** Evaluation of the attempt currently on screen (cleared on retry). */
  protected readonly attemptEvaluation = signal<EvaluationResult | null>(null);
  protected readonly helpTopic = signal<HelpTopic | null>(null);
  /** Mission-brief overlay, reachable from the HUD during challenges. */
  protected readonly briefOpen = signal(false);

  protected readonly campaign = computed(() => {
    const mission = this.mission();
    return mission ? (this.content.campaignById(mission.campaignId) ?? null) : null;
  });

  protected readonly campaignMissions = computed(() => {
    const campaign = this.campaign();
    return campaign ? this.content.missionsForCampaign(campaign.id) : [];
  });

  protected readonly missionIndex = computed(() => {
    const campaign = this.campaign();
    const mission = this.mission();
    return campaign && mission ? campaign.missions.indexOf(mission.id) : -1;
  });

  protected readonly isBoss = computed(() => this.mission()?.difficulty === 'boss');

  /** Boss stages beaten so far — drives the System Integrity bar. */
  protected readonly stagesCleared = computed(
    () => this.session.runs().filter((run) => run.completed).length
  );

  constructor() {
    effect(
      () => {
        const mission = this.mission();
        if (mission && this.session.mission()?.id !== mission.id) {
          this.session.start(mission);
          this.attemptEvaluation.set(null);
        }
      },
      { allowSignalWrites: true }
    );
  }

  protected readonly totalHintsUsed = computed(() =>
    this.session.runs().reduce((sum, run) => sum + run.hintsRevealed, 0)
  );

  protected readonly nextHintCost = computed(() => {
    const hint = this.session.nextHint();
    return hint ? hintCost(hint) : null;
  });

  /** How flustered the Senior Dev is for the current challenge (0-4). */
  protected readonly seniorDevStress = computed(
    () => this.session.currentRun()?.hintsRevealed ?? 0
  );

  protected readonly seniorDevAvatar = computed(
    () => SENIOR_DEV_AVATARS[this.seniorDevStress()] ?? SENIOR_DEV_AVATARS[0]
  );

  protected readonly seniorDevStatus = computed(
    () => SENIOR_DEV_STATUS[this.seniorDevStress()] ?? SENIOR_DEV_STATUS[0]
  );

  protected seniorDevLine(level: number): string {
    return SENIOR_DEV_LINES[level] ?? '';
  }

  /** Tracker state for a mission node in the campaign sidebar. */
  protected trackerState(missionId: string): 'current' | 'done' | 'locked' | 'next' {
    if (missionId === this.mission()?.id) {
      return 'current';
    }
    if (this.gameState.isMissionCompleted(missionId)) {
      return 'done';
    }
    const campaign = this.campaign();
    if (campaign && !this.gameState.isMissionUnlocked(campaign, missionId)) {
      return 'locked';
    }
    return 'next';
  }

  protected readonly currentChallengeCompleted = computed(
    () => this.session.currentRun()?.completed ?? false
  );

  /** Lesson summary for the results screen. */
  protected readonly lessons = computed(
    () => this.mission()?.challenges.map((challenge) => challenge.successFeedback) ?? []
  );

  protected readonly nextMission = computed(() => {
    const mission = this.mission();
    if (!mission) {
      return null;
    }
    const campaign = this.content.campaignById(mission.campaignId);
    if (!campaign) {
      return null;
    }
    const index = campaign.missions.indexOf(mission.id);
    const nextId = campaign.missions[index + 1];
    return nextId ? (this.content.missionById(nextId) ?? null) : null;
  });

  /** Campaign-completion celebration (confetti per 08_AUDIO_ANIMATION...). */
  protected readonly campaignCompleted = computed(() => {
    const result = this.session.result();
    const mission = this.mission();
    if (!result || !mission) {
      return false;
    }
    const campaign = this.content.campaignById(mission.campaignId);
    const campaignBadgeIds =
      campaign?.rewards.filter((r) => r.type === 'badge' && r.id).map((r) => r.id as string) ?? [];
    return result.completion.newBadges.some((id) => campaignBadgeIds.includes(id));
  });

  protected readonly confettiPieces = Array.from({ length: 28 }, (_, i) => i);

  protected badgeFor(id: string) {
    return badgeById(id);
  }

  startMission(): void {
    this.audio.play('click');
    this.session.beginChallenges();
  }

  onSubmit(selectedIds: string[]): void {
    const evaluation = this.session.submit(selectedIds);
    if (!evaluation) {
      return;
    }
    this.attemptEvaluation.set(evaluation);
    this.audio.play(evaluation.correct ? 'correct' : 'incorrect');
    this.waves.pulse(evaluation.correct ? 'correct' : 'incorrect');
  }

  tryAgain(): void {
    this.audio.play('click');
    this.attemptEvaluation.set(null);
  }

  continueAfterCorrect(): void {
    this.advance();
  }

  acceptPartial(): void {
    this.session.acceptPartial();
    this.advance();
  }

  private advance(): void {
    this.attemptEvaluation.set(null);
    this.session.advance();
    if (this.session.phase() === 'results') {
      const result = this.session.result();
      this.audio.play('mission-complete');
      if (result && result.completion.rankAfter.id !== result.completion.rankBefore.id) {
        this.audio.play('rank-up');
      } else if (result && result.completion.newBadges.length > 0) {
        this.audio.play('badge');
      }
    }
  }

  revealHint(): void {
    const hint = this.session.revealNextHint();
    if (hint) {
      this.audio.play('hint');
    }
  }

  openHelp(topicId: string): void {
    const topic = this.content.helpTopicById(topicId);
    if (topic) {
      this.audio.play('click');
      this.helpTopic.set(topic);
    }
  }

  replay(): void {
    const mission = this.mission();
    if (mission) {
      this.audio.play('click');
      this.session.start(mission);
      this.attemptEvaluation.set(null);
    }
  }

  goToNextMission(): void {
    const next = this.nextMission();
    if (next) {
      this.audio.play('click');
      this.router.navigate(['/missions', next.id]);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.briefOpen.set(false);
  }
}

/**
 * The Senior Dev hint character (10_HELP_CENTRE_AND_HINT_SYSTEM.md tone
 * rules): always kind, increasingly caffeinated. Indexed by hints revealed
 * on the current challenge.
 */
const SENIOR_DEV_AVATARS: Record<number, string> = {
  0: '🧑‍💻',
  1: '🧑‍💻',
  2: '😅',
  3: '😰',
  4: '🥲',
};

const SENIOR_DEV_STATUS: Record<number, string> = {
  0: 'online — no judgement, ever',
  1: 'sipping coffee, happy to help',
  2: 'leaning in a little closer',
  3: 'speed-reading the docs, just in case',
  4: 'third coffee. still believes in you',
};

const SENIOR_DEV_LINES: Record<number, string> = {
  1: 'Sure — here’s where I’d start looking.',
  2: 'Okay, let’s look a little closer together.',
  3: 'Hmm, right. Quick thought — the Help Centre has a page on exactly this. I may or may not have it open myself.',
  4: 'Deep breath — we’ve got this. Here’s basically the answer… and next time, let’s peek at the contextual help earlier. For both our heart rates.',
};
