import { Injectable } from '@angular/core';
import { Chess, Move, Square } from 'chess.js';

@Injectable({
  providedIn: 'root'
})
export class ChessGameService {
  private game: Chess;

  constructor() {
    this.game = new Chess();
  }

  // Get the current board state as a FEN string.
  getFEN(): string {
    return this.game.fen();
  }

  // Set the board state using a FEN string. Returns true if successful.
  setFEN(fen: string): void {
    this.game.load(fen);
  }

  // Return the PGN (Portable Game Notation) of the current game.
  getPGN(): string {
    return this.game.pgn();
  }

  // Return the current player's turn ('w' for White or 'b' for Black).
  getTurn(): string {
    return this.game.turn();
  }

  // Retrieve all legal moves for a given square in verbose mode.
  getValidMoves(square: Square): Move[] {
    return this.game.moves({ square, verbose: true }) as Move[];
  }

  // Attempt to make a move and return the move if valid, null otherwise.
  move(from: string, to: string, promotion: string = 'q'): Move | null {
    return this.game.move({ from, to, promotion });
  }

  // Check if a move is valid without affecting the current game state.
  isMoveValid(from: string, to: string, promotion: string = 'q'): boolean {
    const move = this.game.move({ from, to, promotion });
    if (move !== null) {
      this.game.undo();
      return true;
    }
    return false;
  }

  // Get the move history in SAN (Standard Algebraic Notation) format.
  getHistory(): string[] {
    return this.game.history({ verbose: true }).map(m => m.san);
  }

  // Undo the last move.
  undo(): Move | null {
    return this.game.undo();
  }

  // Reset the game to the initial position.
  reset(): void {
    this.game.reset();
  }

  // Check if the game is over.
  gameOver(): boolean {
    return this.game.isGameOver();
  }

  // Check if the current player is in check.
  inCheck(): boolean {
    return this.game.inCheck();
  }

  // Check if the game is in checkmate.
  inCheckmate(): boolean {
    return this.game.isCheckmate();
  }

  // Check if the game is in stalemate.
  inStalemate(): boolean {
    return this.game.isStalemate();
  }

  // Check if the game is drawn (by 50-move rule, insufficient material, etc.).
  inDraw(): boolean {
    return this.game.isDraw();
  }

  // Get a textual description of the current game result.
  getResult(): string {
    if (this.game.isCheckmate()) {
      return `Checkmate! ${this.getTurn() === 'w' ? 'Black' : 'White'} wins.`;
    } else if (this.game.isStalemate()) {
      return 'Stalemate!';
    } else if (this.game.isDraw()) {
      return 'Draw!';
    } else {
      return 'Ongoing';
    }
  }
}
