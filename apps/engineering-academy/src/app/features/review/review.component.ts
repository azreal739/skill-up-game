import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { EvaluationResult, HelpTopic, badgeById } from '@academy/content-model';
import {
  AcademyReviewService,
  AudioService,
  ContentService,
  GameStateService,
  SpeechService,
} from '@academy/data-access';
import { ChallengeHostComponent } from '@academy/challenges';
import { CodeViewerComponent, VoiceButtonComponent } from '@academy/ui';
import { NoteComposerComponent } from '../../shared/note-composer/note-composer.component';

/**
 * Academy Review mode (Review Loop spec 05): replay a filed Technical Debt
 * item's challenge to remediate it. The original first attempt is preserved;
 * a correct review marks the item Remediated and awards remediation XP.
 */
@Component({
  selector: 'ea-review',
  standalone: true,
  imports: [
    RouterLink,
    ChallengeHostComponent,
    CodeViewerComponent,
    NoteComposerComponent,
    VoiceButtonComponent,
  ],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly content = inject(ContentService);
  private readonly audio = inject(AudioService);
  protected readonly gameState = inject(GameStateService);
  protected readonly reviewService = inject(AcademyReviewService);
  private readonly speech = inject(SpeechService);

  private readonly debtItemId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('debtItemId') ?? '')),
    { initialValue: '' }
  );

  protected readonly item = computed(() => this.gameState.debtItemById(this.debtItemId()) ?? null);

  protected readonly challenge = computed(() => {
    const item = this.item();
    return item ? (this.reviewService.challengeForItem(item) ?? null) : null;
  });

  protected readonly mission = computed(() => {
    const item = this.item();
    return item ? (this.content.missionById(item.missionId) ?? null) : null;
  });

  /** Shared mission context the challenge references — shown so the replay is answerable. */
  protected readonly contextArtefacts = computed(() => this.mission()?.contextArtefacts ?? []);

  protected readonly campaign = computed(() => {
    const item = this.item();
    return item ? (this.content.campaignById(item.campaignId) ?? null) : null;
  });

  /** The player's original (wrong) first answer, as readable labels. */
  protected readonly firstAnswerLabels = computed(() => this.labelsFor(this.item()?.playerAnswerIds ?? []));

  protected readonly relatedHelp = computed<HelpTopic[]>(() =>
    (this.item()?.relatedHelpTopicIds ?? [])
      .map((id) => this.content.helpTopicById(id))
      .filter((topic): topic is HelpTopic => topic !== undefined)
  );

  /**
   * The whole item read as a teaching moment: the Senior Dev explains why it
   * matters and what went wrong, then the Archivist reads the related guidance.
   * This is where the player learns, not just remediates — so it's spoken in
   * full. Drives the play button and the auto-play on open.
   */
  protected readonly reviewLines = computed<{ speaker: string; text: string }[]>(() => {
    const item = this.item();
    if (!item) {
      return [];
    }
    const lines: { speaker: string; text: string }[] = [];
    const recap = [
      "Let's review this one together — this is where it clicks.",
      `Why it matters: ${item.whyItMatters}`,
      item.explanation,
      `The impact recorded: ${item.consequenceSummary}`,
    ]
      .filter(Boolean)
      .join(' ');
    lines.push({ speaker: 'Senior Dev', text: recap });

    const tips = this.relatedHelp();
    if (tips.length) {
      const tipText = tips.map((topic) => `${topic.title}. ${topic.summary}`).join(' ');
      lines.push({ speaker: 'Academy Archivist', text: `Some guidance that will help. ${tipText}` });
    }
    return lines;
  });

  /** Evaluation of the review attempt on screen, if submitted. */
  protected readonly evaluation = signal<EvaluationResult | null>(null);
  protected readonly remediated = signal(false);
  protected readonly xpAwarded = signal(0);
  protected readonly bonusXp = signal(0);
  protected readonly newBadges = signal<string[]>([]);
  protected readonly openHelpTopic = signal<HelpTopic | null>(null);
  protected readonly noteOpen = signal(false);

  /** Post-remediation nudge (Review Loop spec 06). */
  protected readonly noteNudge =
    'Add a short note about what changed in your understanding.';

  toggleNote(): void {
    this.audio.play('click');
    this.noteOpen.update((open) => !open);
  }

  protected badgeFor(id: string) {
    return badgeById(id);
  }

  constructor() {
    // Opening the review marks the item In Review. Read/write the store inside
    // untracked so this effect depends only on the route param — otherwise
    // marking the item would retrigger the effect in a loop.
    effect(() => {
      const id = this.debtItemId();
      if (!id) {
        return;
      }
      untracked(() => {
        if (this.gameState.debtItemById(id)) {
          this.reviewService.beginReview(id);
        }
      });
    });

    // Auto-read the whole item on open (once per item) when voice + auto-play
    // are on — the review page is a lesson, so it narrates itself.
    effect(() => {
      const item = this.item();
      const active = this.autoNarrateActive();
      if (!item || !active || this.lastReadItemId === item.id) {
        return;
      }
      this.lastReadItemId = item.id;
      const lines = this.reviewLines();
      untracked(() => void this.speech.speakAll(lines));
    });
  }

  private lastReadItemId = '';

  /** Auto-narration is on when voice + auto-play are enabled and the engine is up. */
  private autoNarrateActive(): boolean {
    const settings = this.gameState.settings();
    return settings.voiceEnabled && settings.autoPlay && this.speech.active();
  }

  private labelsFor(ids: string[]): string[] {
    const challenge = this.challenge();
    if (!challenge) {
      return ids;
    }
    const options = challenge.type === 'code-review' ? challenge.findings : challenge.options;
    return ids.map((id) => options.find((o) => o.id === id)?.label ?? id);
  }

  onSubmit(selectedIds: string[]): void {
    const id = this.debtItemId();
    const result = this.reviewService.review(id, selectedIds);
    if (!result) {
      return;
    }
    this.evaluation.set(result.evaluation);
    this.remediated.set(result.remediated);
    this.xpAwarded.set(result.xpAwarded);
    this.bonusXp.set(result.bonusXp);
    this.newBadges.set(result.newBadges);
    this.audio.play(result.remediated ? 'correct' : 'incorrect');
    if (result.newBadges.length > 0) {
      this.audio.play('badge');
    }
  }

  tryReviewAgain(): void {
    // Unlike a mission, review can be retried — the point is to learn it.
    this.audio.play('click');
    this.evaluation.set(null);
  }

  showHelp(topic: HelpTopic): void {
    this.audio.play('click');
    this.openHelpTopic.set(topic);
  }

  backToBacklog(): void {
    this.router.navigate(['/backlog']);
  }
}
