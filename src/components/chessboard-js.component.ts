import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chess, Square } from 'chess.js';

@Component({
  selector: 'app-chessboard-js',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chessboard-js.component.html',
  styleUrls: ['./chessboard-js.component.scss']
})
export class ChessboardJsComponent implements AfterViewInit {
  @ViewChild('boardContainer', { static: false }) boardContainer!: ElementRef;
  boardInstance: any;
  
  // Create a new chess.js game instance to enforce full rules.
  game = new Chess();
  moveHistory: string[] = [];
  message: string = '';
  
  // Stores pending pawn promotion move info.
  promotionPending: { from: string; to: string } | null = null;

  ngAfterViewInit(): void {
    this.initializeChessboard();
  }

  initializeChessboard(): void {
    if (!this.boardContainer) {
      return;
    }
    // Initialize chessboard.js using the global "Chessboard" function.
    this.boardInstance = Chessboard(this.boardContainer.nativeElement, {
      position: this.game.fen(),
      draggable: true,
      // Adjust the path if your images are in a different folder.
      pieceTheme: 'assets/img/chesspieces/{piece}.png',
      onDragStart: (source: string, piece: string): boolean => {
        this.clearHighlights();
        if (this.game.isGameOver()) return false;
        const gamePiece = this.game.get(source as Square);
        if (gamePiece && gamePiece.color !== this.game.turn()) return false;
        // Retrieve valid moves for the selected piece.
        const moves = this.game.moves({ square: source as Square, verbose: true });
        moves.forEach(m => {
          // Use getElementById assuming each square’s ID is its coordinate.
          const squareEl = document.getElementById(m.to);
          if (squareEl) {
            squareEl.classList.add('highlight');
          }
        });
        return true;
      },
      onDrop: (source: string, target: string): string | undefined => {
        this.clearHighlights();
        const piece = this.game.get(source as Square);
        // Check for pawn promotion.
        if (piece && piece.type === 'p') {
          const targetRank = target[1];
          if ((piece.color === 'w' && targetRank === '8') ||
              (piece.color === 'b' && targetRank === '1')) {
            // Save the move info and open the promotion UI.
            this.promotionPending = { from: source, to: target };
            return 'snapback';
          }
        }
        // For non-promotion moves, auto-promote to queen.
        return this.makeMove({ from: source, to: target, promotion: 'q' });
      },
      onSnapEnd: () => {
        this.boardInstance.position(this.game.fen());
      }
    });
    this.updateGameState();
  }

  clearHighlights(): void {
    // Remove the highlight class from all elements that have it.
    const highlighted = document.querySelectorAll('.highlight');
    highlighted.forEach(el => el.classList.remove('highlight'));
  }

  makeMove(move: { from: string; to: string; promotion: string }): string | undefined {
    const result = this.game.move(move);
    if (result === null) return 'snapback';
    this.moveHistory.push(result.san);
    this.updateGameState();
    return undefined;
  }

  updateGameState(): void {
    this.boardInstance.position(this.game.fen());
    if (this.game.isCheckmate()) {
      this.message = `Checkmate! ${this.game.turn() === 'w' ? 'Black' : 'White'} wins.`;
    } else if (this.game.isStalemate()) {
      this.message = 'Stalemate!';
    } else if (this.game.isDraw()) {
      this.message = 'Draw!';
    } else if (this.game.inCheck()) {
      this.message = 'Check!';
    } else {
      this.message = `Turn: ${this.game.turn() === 'w' ? 'White' : 'Black'}`;
    }
  }

  // Called when the user selects a promotion piece from the UI.
  completePromotion(choice: string): void {
    if (this.promotionPending) {
      this.makeMove({
        from: this.promotionPending.from,
        to: this.promotionPending.to,
        promotion: choice
      });
      this.promotionPending = null;
    }
  }
}
