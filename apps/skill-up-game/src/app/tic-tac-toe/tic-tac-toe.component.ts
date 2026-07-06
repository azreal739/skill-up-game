import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageKey, LocalStorageService } from 'src/services/LocalStorageService';
import { GameHistoryItem } from '../shared/modal/game-history-modal/game-history-modal.component';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.scss'
})
export class TicTacToeComponent implements OnInit {
  public board: (string | null)[] = Array(9).fill(null);
  public currentPlayer = 'X';
  public winner: string | null = null;
  public isDraw = false;
  public winnerHistory: GameHistoryItem[] = [];

  private readonly winConditions: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
  ];

  constructor(private _localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.winnerHistory =
      this._localStorageService.get<GameHistoryItem[]>(LocalStorageKey.ticTacToeGameHistory) ?? [];
    this.resetGame();
  }

  public get gameOver(): boolean {
    return this.winner !== null || this.isDraw;
  }

  public handleClick(index: number): void {
    if (this.board[index] || this.gameOver) {
      return;
    }

    this.board[index] = this.currentPlayer;

    if (this.checkWinner()) {
      this.winner = this.currentPlayer;
      this.recordResult(this.winner);
    } else if (this.board.every(square => square !== null)) {
      this.isDraw = true;
      this.recordResult('Draw');
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  public resetGame(): void {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.winner = null;
    this.isDraw = false;
  }

  private checkWinner(): boolean {
    for (const [a, b, c] of this.winConditions) {
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return true;
      }
    }
    return false;
  }

  private recordResult(result: string): void {
    this.winnerHistory.push({ date: new Date(), result });
    this._localStorageService.set(LocalStorageKey.ticTacToeGameHistory, this.winnerHistory);
  }
}
