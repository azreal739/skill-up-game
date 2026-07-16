import {
  Component,
  HostListener,
  OnDestroy,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  ChallengeDefinition,
  EvaluationResult,
  HelpTopic,
  badgeById,
  hintCost,
} from '@academy/content-model';
import {
  AudioService,
  ContentService,
  GameStateService,
  LearningAnalyticsService,
  MissionSessionService,
  SpeechService,
} from '@academy/data-access';
import {
  BadgeChipComponent,
  CodeViewerComponent,
  CountUpComponent,
  HudComponent,
  MentorDialogueComponent,
  VoiceButtonComponent,
} from '@academy/ui';
import { ChallengeHostComponent } from '@academy/challenges';
import { HelpDrawerComponent } from './help-drawer.component';
import { WaveStateService } from '../../shared/wave-background/wave-state.service';
import { NoteComposerComponent } from '../../shared/note-composer/note-composer.component';

@Component({
  selector: 'ea-mission-player',
  standalone: true,
  imports: [
    RouterLink,
    CodeViewerComponent,
    CountUpComponent,
    HudComponent,
    MentorDialogueComponent,
    BadgeChipComponent,
    ChallengeHostComponent,
    HelpDrawerComponent,
    NoteComposerComponent,
    VoiceButtonComponent,
  ],
  templateUrl: './mission-player.component.html',
  styleUrls: ['./mission-player.component.scss'],
})
export class MissionPlayerComponent implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly content = inject(ContentService);
  private readonly audio = inject(AudioService);
  private readonly waves = inject(WaveStateService);
  private readonly analytics = inject(LearningAnalyticsService);
  protected readonly session = inject(MissionSessionService);
  protected readonly gameState = inject(GameStateService);
  private readonly speech = inject(SpeechService);

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
  /** Whether the "capture a lesson" note composer is open under the feedback. */
  protected readonly noteOpen = signal(false);

  /** Senior-Dev nudge shown above the note composer (Review Loop spec 06). */
  protected readonly noteNudge =
    'Want to write this down? This is one of those lessons that saves production later.';

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
    effect(() => {
      const mission = this.mission();
      if (mission && this.session.mission()?.id !== mission.id) {
        this.session.start(mission);
        this.attemptEvaluation.set(null);
      }
    });

    // Boss engagements push the ambient environment into alert mode.
    effect(() => {
      this.waves.setAlert(this.isBoss() && this.session.phase() === 'challenge');
    });

    // ---- Auto-play "conversation": mentors narrate each beat as it appears,
    // so voice users experience the mission as one continuous exchange. Each
    // effect fires once per logical unit (guarded by a last-played key) and
    // only when voice + auto-play are on. Playback flows through the comms HUD.

    // Briefing: Mission Control + mentors read the whole brief on arrival.
    effect(() => {
      const mission = this.mission();
      const isBriefing = this.session.phase() === 'briefing';
      const active = this.autoNarrateActive();
      if (!mission || !isBriefing || !active || this.lastBriefingPlayed === mission.id) {
        return;
      }
      this.lastBriefingPlayed = mission.id;
      const lines = this.briefingLines();
      untracked(() => void this.speech.speakAll(lines));
    });

    // Question: Mission Control reads the scenario + ask when a challenge opens
    // (but not one already answered, e.g. when revisiting).
    effect(() => {
      const run = this.session.currentRun();
      const isChallenge = this.session.phase() === 'challenge';
      const answered = !!this.attemptEvaluation();
      const active = this.autoNarrateActive();
      if (!run || !isChallenge || !active) {
        return;
      }
      const key = `${this.mission()?.id}:${run.challenge.id}`;
      if (this.lastQuestionPlayed === key || run.completed || answered) {
        return;
      }
      this.lastQuestionPlayed = key;
      const text = `${run.challenge.storyContext} ${run.challenge.prompt}`;
      untracked(() => void this.speech.speak('Mission Control', text));
    });

    // Debrief: the Senior Dev reads the feedback right after the player answers.
    effect(() => {
      const evaluation = this.attemptEvaluation();
      const run = this.session.currentRun();
      const active = this.autoNarrateActive();
      if (!evaluation || !run || !active) {
        return;
      }
      const key = `${this.mission()?.id}:${run.challenge.id}`;
      if (this.lastFeedbackPlayed === key) {
        return;
      }
      this.lastFeedbackPlayed = key;
      const text = this.spokenFeedback(run.challenge, evaluation);
      const speaker = this.feedbackSpeaker(evaluation);
      untracked(() => void this.speech.speak(speaker, text));
    });

    // Debrief: the results screen narrates as a short hand-off between mentors
    // — Mission Control calls the outcome, the Team Lead marks a promotion, the
    // Senior Dev recaps the lessons, the Archivist prompts reflection.
    effect(() => {
      const isResults = this.session.phase() === 'results';
      const result = this.session.result();
      const active = this.autoNarrateActive();
      if (!isResults || !result || !active || this.lastDebriefResult === result) {
        return;
      }
      this.lastDebriefResult = result;
      const lines = this.debriefLines();
      untracked(() => void this.speech.speakAll(lines));
    });
  }

  /** Keys of the last auto-played beats, so each plays at most once. */
  private lastBriefingPlayed = '';
  private lastQuestionPlayed = '';
  private lastFeedbackPlayed = '';
  /** The result whose debrief was last auto-narrated (identity-compared). */
  private lastDebriefResult: object | null = null;

  /** Auto-narration is on when voice + auto-play are enabled and the engine is up. */
  private autoNarrateActive(): boolean {
    const settings = this.gameState.settings();
    return settings.voiceEnabled && settings.autoPlay && this.speech.active();
  }

  /**
   * Whether the briefing's transmission text shows on the main screen. When
   * voice is off it always shows (so the story is never lost); when voice is
   * on the words are carried by the comms HUD, so on-screen text is opt-in.
   */
  protected readonly showBriefingText = computed(() => {
    const settings = this.gameState.settings();
    return (
      !settings.voiceEnabled || !this.speech.active() || settings.displayTransmissions
    );
  });

  ngOnDestroy(): void {
    this.speech.cancel();
    this.waves.setAlert(false);
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

  /**
   * The whole hint as the Senior Dev speaks it: their framing aside, then the
   * hint's level/title, then the hint content — the full section, not just
   * the clue text.
   */
  protected spokenHint(hint: { level: number; title: string; content: string }): string {
    return `${this.seniorDevLine(hint.level)} Hint ${hint.level}, ${hint.title}. ${hint.content}`;
  }

  /**
   * The whole mission brief as a spoken sequence: Mission Control announces
   * the title/summary, then each mentor reads their own briefing block.
   * Memoised so the popup's play button gets a stable array reference.
   */
  protected readonly briefingLines = computed(() => {
    const mission = this.mission();
    if (!mission) {
      return [];
    }
    return [
      { speaker: 'Mission Control', text: `${mission.title}. ${mission.summary}` },
      ...mission.briefing.map((block) => ({ speaker: block.speaker, text: block.text })),
    ];
  });

  /**
   * Who voices the post-answer debrief: Mission Control confirms a correct
   * decision; the Senior Dev coaches a miss. (Keeps the tone right — a win
   * shouldn't be read in the "here's help" hint voice.)
   */
  protected feedbackSpeaker(evaluation: EvaluationResult): string {
    return evaluation.correct ? 'Mission Control' : 'Senior Dev';
  }

  /**
   * The post-answer debrief as it's read aloud: the verdict first (so a
   * correct answer is clearly acknowledged), then the success/failure line,
   * then the feedback for every option the player chose or should have chosen
   * (mirrors what the option list displays).
   */
  protected spokenFeedback(challenge: ChallengeDefinition, evaluation: EvaluationResult): string {
    const verdict = evaluation.correct ? 'Decision confirmed.' : 'Not quite.';
    const lines = [verdict, evaluation.correct ? challenge.successFeedback : challenge.failureFeedback];
    for (const outcome of evaluation.options) {
      if (outcome.feedback && (outcome.wasSelected || outcome.isCorrect)) {
        lines.push(outcome.feedback);
      }
    }
    return lines.filter(Boolean).join(' ');
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

  /**
   * The results debrief as a spoken hand-off between mentors — different
   * personas voice different parts (outcome, promotion, lessons, reflection).
   * Drives both the "Play debrief" button and the auto-play on results.
   */
  protected readonly debriefLines = computed<{ speaker: string; text: string }[]>(() => {
    const result = this.session.result();
    const mission = this.mission();
    if (!result || !mission) {
      return [];
    }
    const lines: { speaker: string; text: string }[] = [];

    const outcomeText =
      result.outcome === 'perfect'
        ? 'Perfect resolution — flawless work.'
        : result.outcome === 'stable'
          ? 'Stable resolution — the platform holds.'
          : 'Partial resolution — recovery recommended.';
    let mc = `Mission resolved. ${outcomeText} You banked ${result.completion.xpAwarded} experience points.`;
    if (this.isBoss()) {
      mc += ' Boss encounter complete — the platform stands.';
    }
    if (this.campaignCompleted()) {
      mc += ' Campaign complete — production is safe in your hands.';
    }
    lines.push({ speaker: 'Mission Control', text: mc });

    if (result.completion.rankAfter.id !== result.completion.rankBefore.id) {
      lines.push({
        speaker: 'Team Lead',
        text: `Promotion confirmed — you've advanced to ${result.completion.rankAfter.title}. Well earned.`,
      });
    }

    const lessons = this.lessons().filter(Boolean);
    if (lessons.length) {
      lines.push({
        speaker: 'Senior Dev',
        text: `Here's what this mission taught. ${lessons.join(' ')}`,
      });
    }

    if (mission.reflectionPrompt) {
      lines.push({
        speaker: 'Academy Archivist',
        text: `A moment to reflect. ${mission.reflectionPrompt}`,
      });
    }

    return lines;
  });

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
    this.noteOpen.set(false);
    this.audio.play(evaluation.correct ? 'correct' : 'incorrect');
    this.waves.pulse(evaluation.correct ? 'correct' : 'incorrect');
  }

  toggleNote(): void {
    this.audio.play('click');
    this.noteOpen.update((open) => !open);
  }

  /** The Technical Debt item filed for the current challenge, if it was missed. */
  protected readonly currentDebtItem = computed(
    () => this.session.currentRun()?.debtItem ?? null
  );

  /** Learning outcomes for the results screen (Review Loop spec 07). */
  protected readonly missionLearning = computed(() => {
    const runs = this.session.runs();
    const firstCorrect = runs.filter((run) => run.firstTryCorrect).length;
    const debtAdded = runs.filter((run) => run.debtItem).length;
    return {
      challenges: runs.length,
      firstCorrect,
      incorrect: runs.length - firstCorrect,
      debtAdded,
    };
  });

  /** Concept mastery scoped to this mission's challenges. */
  protected readonly missionConcepts = computed(() => {
    const missionId = this.mission()?.id;
    const progress = this.gameState
      .challengeProgress()
      .filter((p) => p.missionId === missionId);
    return this.analytics.conceptMastery(progress);
  });

  /** Open/reopened debt still outstanding for this mission's campaign. */
  protected readonly campaignOpenDebt = computed(() => {
    const campaignId = this.mission()?.campaignId;
    return this.gameState
      .technicalDebtItems()
      .filter(
        (item) =>
          item.campaignId === campaignId &&
          (item.status === 'open' || item.status === 'reopened')
      );
  });

  /** Boss missions nudge the player to clear campaign debt first (spec 07). */
  protected readonly showBossDebtNudge = computed(
    () => this.isBoss() && this.campaignOpenDebt().length > 0
  );

  /** First outstanding debt item, for a one-click "Review now". */
  protected readonly firstOpenDebtId = computed(() => this.campaignOpenDebt()[0]?.id ?? null);

  /** A single Continue that always advances — the first answer is final. */
  continueAfterDecision(): void {
    this.audio.play('click');
    this.advance();
  }

  private advance(): void {
    this.attemptEvaluation.set(null);
    this.noteOpen.set(false);
    this.session.advance();
    if (this.session.phase() === 'results') {
      const result = this.session.result();
      this.waves.pulse('complete');
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
      // Clicking to ask the Senior Dev also plays the reply, if auto-play is on.
      if (this.autoNarrateActive()) {
        void this.speech.speak('Senior Dev', this.spokenHint(hint));
      }
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
      this.resetAutoNarrationState();
      this.session.start(mission);
      this.attemptEvaluation.set(null);
    }
  }

  /** Let a replay narrate every beat again, including single-challenge missions. */
  private resetAutoNarrationState(): void {
    this.lastBriefingPlayed = '';
    this.lastQuestionPlayed = '';
    this.lastFeedbackPlayed = '';
    this.lastDebriefResult = null;
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
