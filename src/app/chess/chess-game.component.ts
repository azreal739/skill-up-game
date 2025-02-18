import { Component, OnInit } from '@angular/core';
import { Chess } from 'chess.js';
import {
  DragDropModule,
  CdkDragStart,
  CdkDragDrop,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

type Square =
  | 'a1'
  | 'a2'
  | 'a3'
  | 'a4'
  | 'a5'
  | 'a6'
  | 'a7'
  | 'a8'
  | 'b1'
  | 'b2'
  | 'b3'
  | 'b4'
  | 'b5'
  | 'b6'
  | 'b7'
  | 'b8'
  | 'c1'
  | 'c2'
  | 'c3'
  | 'c4'
  | 'c5'
  | 'c6'
  | 'c7'
  | 'c8'
  | 'd1'
  | 'd2'
  | 'd3'
  | 'd4'
  | 'd5'
  | 'd6'
  | 'd7'
  | 'd8'
  | 'e1'
  | 'e2'
  | 'e3'
  | 'e4'
  | 'e5'
  | 'e6'
  | 'e7'
  | 'e8'
  | 'f1'
  | 'f2'
  | 'f3'
  | 'f4'
  | 'f5'
  | 'f6'
  | 'f7'
  | 'f8'
  | 'g1'
  | 'g2'
  | 'g3'
  | 'g4'
  | 'g5'
  | 'g6'
  | 'g7'
  | 'g8'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'h7'
  | 'h8';

interface VerboseMove {
  from: Square;
  to: Square;
  captured?: string;
  promotion?: string;
  color?: 'w' | 'b';
}

@Component({
  standalone: true,
  selector: 'app-chess-game',
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.scss'],
  imports: [DragDropModule, CommonModule],
})
export class ChessGameComponent implements OnInit {
  chess = new Chess();
  board: string[][] = [];
  validMoves: Square[] = [];
  whiteCaptures: string[] = [];
  blackCaptures: string[] = [];
  connectedLists: string[] = [];
  promotionPending: { from: Square; to: Square } | null = null;

  pieceSymbols: { [key: string]: string } = {
    p: '♟',
    r: '♜',
    n: '♞',
    b: '♝',
    q: '♛',
    k: '♚',
    P: '♙',
    R: '♖',
    N: '♘',
    B: '♗',
    Q: '♕',
    K: '♔',
  };

  pieceValues: { [key: string]: number } = {
    p: 1,
    n: 3,
    b: 3,
    r: 5,
    q: 9,
    k: 0,
    P: 1,
    N: 3,
    B: 3,
    R: 5,
    Q: 9,
    K: 0,
  };

  ngOnInit() {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        this.connectedLists.push(`${row}-${col}`);
      }
    }
    this.loadGame();
    this.updateBoard();
  }

  get currentTurn(): string {
    return this.chess.turn() === 'w' ? 'White' : 'Black';
  }

  get gameStatus(): string {
    if (!this.chess.isGameOver()) return '';
    if (this.chess.isCheckmate()) {
      return this.chess.turn() === 'b'
        ? 'Checkmate! White wins.'
        : 'Checkmate! Black wins.';
    }
    if (this.chess.isStalemate()) return 'Stalemate! It’s a draw.';
    if (this.chess.isThreefoldRepetition()) return 'Draw by repetition.';
    if (this.chess.isInsufficientMaterial())
      return 'Draw by insufficient material.';
    if (this.chess.isDraw()) return 'Draw by 50-move rule or agreement.';
    return 'Game over.';
  }

  // Getter to indicate if the current player is in check.
  get isCheck(): boolean {
    return !this.chess.isGameOver() && this.chess.inCheck();
  }

  get whiteScore(): number {
    return this.whiteCaptures.reduce(
      (sum, piece) => sum + this.pieceValues[piece],
      0
    );
  }

  get blackScore(): number {
    return this.blackCaptures.reduce(
      (sum, piece) => sum + this.pieceValues[piece],
      0
    );
  }

  getSquareId(rowIndex: number, colIndex: number): Square {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const rank = 8 - rowIndex;
    return (files[colIndex] + rank) as Square;
  }

  updateBoard(): void {
    this.board = this.chess
      .board()
      .map((row) =>
        row.map((piece) =>
          piece
            ? this.pieceSymbols[this.adjustCase(piece.type, piece.color)]
            : ''
        )
      );
    this.saveGame();
  }

  private adjustCase(type: string, color: 'w' | 'b'): string {
    return color === 'w' ? type.toUpperCase() : type.toLowerCase();
  }

  onDragStarted(event: CdkDragStart, rowIndex: number, colIndex: number) {
    if (this.chess.isGameOver()) return;
    const fromSquare = this.getSquareId(rowIndex, colIndex);
    const moves = this.chess.moves({
      square: fromSquare,
      verbose: true,
    }) as VerboseMove[];
    this.validMoves = moves.map((m) => m.to);
  }

  onDrop(event: CdkDragDrop<any>, rowIndex: number, colIndex: number) {
    if (this.chess.isGameOver()) return;

    const toSquare = this.getSquareId(rowIndex, colIndex);
    const fromRow = event.previousContainer.data.row;
    const fromCol = event.previousContainer.data.col;
    const fromSquare = this.getSquareId(fromRow, fromCol);

    if (fromSquare === toSquare) {
      this.validMoves = [];
      return;
    }

    const piece = this.chess.get(fromSquare);
    if (piece && piece.type === 'p') {
      const toRank = parseInt(toSquare[1], 10);
      if (
        (piece.color === 'w' && toRank === 8) ||
        (piece.color === 'b' && toRank === 1)
      ) {
        this.promotionPending = { from: fromSquare, to: toSquare };
        return;
      }
    }

    this.makeMove({ from: fromSquare, to: toSquare });
  }

  makeMove(moveObj: VerboseMove) {
    const result = this.chess.move(moveObj);
    if (result) {
      this.validMoves = [];
      if (result.captured) {
        const capturedKey = this.adjustCase(
          result.captured,
          result.color === 'w' ? 'b' : 'w'
        );
        if (result.color === 'w') {
          this.blackCaptures.push(capturedKey);
        } else {
          this.whiteCaptures.push(capturedKey);
        }
      }
      this.updateBoard();
    }
  }

  choosePromotion(promotion: string) {
    if (this.promotionPending) {
      const moveObj: VerboseMove = {
        from: this.promotionPending.from,
        to: this.promotionPending.to,
        promotion: promotion,
      };
      this.makeMove(moveObj);
      this.promotionPending = null;
    }
  }

  get promotionOptionsDisplay() {
    if (!this.promotionPending) return [];
    const piece = this.chess.get(this.promotionPending.from);
    if (!piece) return [];
    if (piece.color === 'w') {
      return [
        { value: 'q', symbol: this.pieceSymbols['Q'] },
        { value: 'r', symbol: this.pieceSymbols['R'] },
        { value: 'b', symbol: this.pieceSymbols['B'] },
        { value: 'n', symbol: this.pieceSymbols['N'] },
      ];
    } else {
      return [
        { value: 'q', symbol: this.pieceSymbols['q'] },
        { value: 'r', symbol: this.pieceSymbols['r'] },
        { value: 'b', symbol: this.pieceSymbols['b'] },
        { value: 'n', symbol: this.pieceSymbols['n'] },
      ];
    }
  }

  // Finds the square containing the current turn's king.
  getKingSquare(): Square | null {
    const currentColor = this.chess.turn();
    for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
      for (let colIndex = 0; colIndex < 8; colIndex++) {
        const square = this.getSquareId(rowIndex, colIndex);
        const piece = this.chess.get(square);
        if (piece && piece.type === 'k' && piece.color === currentColor) {
          return square;
        }
      }
    }
    return null;
  }

  // Returns true if the given square is the king's square while in check.
  isKingInCheck(square: Square): boolean {
    return this.isCheck && this.getKingSquare() === square;
  }

  saveGame(): void {
    localStorage.setItem('chessGameState', this.chess.fen());
    localStorage.setItem('whiteCaptures', JSON.stringify(this.whiteCaptures));
    localStorage.setItem('blackCaptures', JSON.stringify(this.blackCaptures));
  }

  loadGame(): void {
    const savedState = localStorage.getItem('chessGameState');
    if (savedState) {
      this.chess.load(savedState);
    }
    const savedWhite = localStorage.getItem('whiteCaptures');
    if (savedWhite) {
      this.whiteCaptures = JSON.parse(savedWhite);
    }
    const savedBlack = localStorage.getItem('blackCaptures');
    if (savedBlack) {
      this.blackCaptures = JSON.parse(savedBlack);
    }
  }

  restartGame() {
    this.chess.reset();
    this.whiteCaptures = [];
    this.blackCaptures = [];
    this.validMoves = [];
    this.promotionPending = null;
    this.updateBoard();
    this.saveGame();
  }
}
