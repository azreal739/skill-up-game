import { Component, computed, effect, inject, signal } from '@angular/core';
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
}
