import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  LocalStorageService,
  LocalStorageKey,
} from 'src/services/LocalStorageService';
import { GameHistoryItem } from '../shared/modal/game-history-modal/game-history-modal.component';

interface Card {
  value: string;
  suit: string;
}

const CARD_VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const SUITS = ['♠', '♥', '♦', '♣'];
const DEALER_STAND_SCORE = 17;
const DEALER_DRAW_DELAY_MS = 600;

@Component({
  selector: 'app-black-jack',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './black-jack.component.html',
  styleUrl: './black-jack.component.scss',
})
export class BlackJackComponent implements OnInit, OnDestroy {
  playerCards: Card[] = [];
  dealerCards: Card[] = [];
  playerScore = 0;
  dealerScore = 0;
  gameOver = false;
  holeCardHidden = true;
  dealerDrawing = false;
  result = '';
  ready = false;
  playerName = '';
  blackJackHistory: GameHistoryItem[] = [];

  private deck: Card[] = [];
  private dealerDrawTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private _localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.blackJackHistory =
      this._localStorageService.get<GameHistoryItem[]>(LocalStorageKey.blackJackHistory) ?? [];
    this.resetGame();
  }

  ngOnDestroy(): void {
    this.cancelDealerDraw();
  }

  startGame(): void {
    this.ready = true;
  }

  /** Dealer score shown in the UI: hides the hole card until the dealer plays. */
  get visibleDealerScore(): number {
    if (this.holeCardHidden) {
      return this.calculateScore(this.dealerCards.slice(0, 1));
    }
    return this.dealerScore;
  }

  get canAct(): boolean {
    return !this.gameOver && !this.dealerDrawing;
  }

  get canDoubleDown(): boolean {
    return this.canAct && this.playerCards.length === 2;
  }

  /** Score a hand: aces count as 11, demoted to 1 while the hand busts. */
  calculateScore(cards: Card[]): number {
    let score = 0;
    let aces = 0;
    for (const card of cards) {
      if (['J', 'Q', 'K'].includes(card.value)) {
        score += 10;
      } else if (card.value === 'A') {
        score += 11;
        aces++;
      } else {
        score += parseInt(card.value, 10);
      }
    }
    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }
    return score;
  }

  playerHit(): void {
    if (!this.canAct) return;
    this.playerCards.push(this.drawCard());
    this.playerScore = this.calculateScore(this.playerCards);
    if (this.playerScore > 21) {
      this.endGame(`${this.playerName} busted! Dealer wins.`);
    } else if (this.playerScore === 21) {
      this.stand();
    }
  }

  stand(): void {
    if (!this.canAct) return;
    this.dealerDrawing = true;
    this.holeCardHidden = false;
    this.dealerScore = this.calculateScore(this.dealerCards);
    this.dealerDrawStep();
  }

  /** Double down: one card, then the hand is forced to stand. */
  doubleDown(): void {
    if (!this.canDoubleDown) return;
    this.playerCards.push(this.drawCard());
    this.playerScore = this.calculateScore(this.playerCards);
    if (this.playerScore > 21) {
      this.endGame(`${this.playerName} busted! Dealer wins.`);
    } else {
      this.stand();
    }
  }

  resetGame(): void {
    this.cancelDealerDraw();
    this.deck = this.buildShuffledDeck();
    this.playerCards = [this.drawCard(), this.drawCard()];
    this.dealerCards = [this.drawCard(), this.drawCard()];
    this.playerScore = this.calculateScore(this.playerCards);
    this.dealerScore = this.calculateScore(this.dealerCards);
    this.gameOver = false;
    this.dealerDrawing = false;
    this.holeCardHidden = true;
    this.result = '';
  }

  /** Reveal dealer cards one at a time, then settle the round. */
  private dealerDrawStep(): void {
    if (this.dealerScore < DEALER_STAND_SCORE) {
      this.dealerDrawTimeout = setTimeout(() => {
        this.dealerCards.push(this.drawCard());
        this.dealerScore = this.calculateScore(this.dealerCards);
        this.dealerDrawStep();
      }, DEALER_DRAW_DELAY_MS);
      return;
    }

    this.dealerDrawing = false;
    if (this.dealerScore > 21) {
      this.endGame(`Dealer busted! ${this.playerName} wins.`);
    } else if (this.playerScore > this.dealerScore) {
      this.endGame(`${this.playerName} wins!`);
    } else if (this.playerScore < this.dealerScore) {
      this.endGame('Dealer wins!');
    } else {
      this.endGame("Push! It's a tie.");
    }
  }

  private endGame(result: string): void {
    this.result = result;
    this.gameOver = true;
    this.dealerDrawing = false;
    this.holeCardHidden = false;
    this.dealerScore = this.calculateScore(this.dealerCards);

    this.blackJackHistory.push({
      date: new Date(),
      result: this.result,
      moves: [],
    });
    this._localStorageService.set(LocalStorageKey.blackJackHistory, this.blackJackHistory);
  }

  private drawCard(): Card {
    if (this.deck.length === 0) {
      this.deck = this.buildShuffledDeck();
    }
    return this.deck.pop()!;
  }

  private buildShuffledDeck(): Card[] {
    const deck: Card[] = [];
    for (const suit of SUITS) {
      for (const value of CARD_VALUES) {
        deck.push({ value, suit });
      }
    }
    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  private cancelDealerDraw(): void {
    if (this.dealerDrawTimeout !== null) {
      clearTimeout(this.dealerDrawTimeout);
      this.dealerDrawTimeout = null;
    }
  }
}
