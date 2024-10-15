import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-black-jack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './black-jack.component.html',
  styleUrl: './black-jack.component.scss'
})
export class BlackJackComponent {
  playerCards: string[] = [];
  dealerCards: string[] = [];
  playerScore: number = 0;
  dealerScore: number = 0;
  gameOver: boolean = false;
  result: string = '';

  deck = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  
  // Function to calculate the score based on card values
  calculateScore(cards: string[]): number {
    let score = 0;
    cards.forEach(card => {
      if (['J', 'Q', 'K'].includes(card)) {
        score += 10;
      } else if (card === 'A') {
        score += score + 11 > 21 ? 1 : 11;
      } else {
        score += parseInt(card, 10);
      }
    });
    return score;
  }

  // Player draws a card
  drawCard(): string {
    return this.deck[Math.floor(Math.random() * this.deck.length)];
  }

  // Player takes a hit
  playerHit(): void {
    if (!this.gameOver) {
      const card = this.drawCard();
      this.playerCards.push(card);
      this.playerScore = this.calculateScore(this.playerCards);
      this.checkGameOver();
    }
  }

  // Dealer's turn
  dealerPlay(): void {
    while (this.dealerScore < 17) {
      const card = this.drawCard();
      this.dealerCards.push(card);
      this.dealerScore = this.calculateScore(this.dealerCards);
    }
    this.checkGameOver(true);
  }

  // Check if the game is over
  checkGameOver(dealerTurn: boolean = false): void {
    if (this.playerScore > 21) {
      this.result = 'You busted! Dealer wins.';
      this.gameOver = true;
    } else if (dealerTurn && this.dealerScore > 21) {
      this.result = 'Dealer busted! You win.';
      this.gameOver = true;
    } else if (dealerTurn && this.dealerScore >= 17) {
      if (this.playerScore > this.dealerScore) {
        this.result = 'You win!';
      } else {
        this.result = 'Dealer wins!';
      }
      this.gameOver = true;
    }
  }

  // Player stands
  stand(): void {
    this.dealerPlay();
  }

  // Reset the game
  resetGame(): void {
    this.playerCards = [];
    this.dealerCards = [];
    this.playerScore = 0;
    this.dealerScore = 0;
    this.gameOver = false;
    this.result = '';
  }
}
