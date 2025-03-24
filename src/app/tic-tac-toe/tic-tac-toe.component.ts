import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.scss'
})
export class TicTacToeComponent {
  public board: (string | null)[] = Array(9).fill(null);
  public currentPlayer: string = 'X';
  public winner: string | null = null;
  public winnerHistory: string[] = [];

  private readonly winConditions: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
  ];

  ngOnInit(): void {
      const storedWinnerHistory = localStorage.getItem('TicTacToe:winnerHistory');
      if (storedWinnerHistory) {
        this.winnerHistory = JSON.parse(storedWinnerHistory);
      }
    
    this.resetGame();
  }

  public handleClick(index: number): void {
    if (!this.board[index] && !this.winner) {
      this.board[index] = this.currentPlayer;

      if (this.checkWinner()) {
        this.winner = this.currentPlayer;
        this.winnerHistory.push(this.winner);
        localStorage.setItem('TicTacToe:winnerHistory', JSON.stringify(this.winnerHistory));
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  private checkWinner(): boolean {
    for (const [a, b, c] of this.winConditions) {
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) { 
        return true;
      }
    }
    return false;
  }

  public resetGame(): void {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.winner = null;
  }
}
