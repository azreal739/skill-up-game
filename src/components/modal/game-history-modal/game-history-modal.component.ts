import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from 'src/services/ModalService';

export enum GameName {
  TicTacToe = 'Tic Tac Toe',
  BlackJack = 'Black Jack',
  Chess = 'Chess',
}

export interface GameHistoryItem {
  date: Date;
  result: string;
  moves?: string[];
}

interface GameHistoryModalOptions {
  gameName: GameName | undefined;
  gameHistory: GameHistoryItem[];
}

@Component({
  selector: 'app-game-history-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-history-modal.component.html',
  styleUrl: './game-history-modal.component.scss',
})
export class GameHistoryModalComponent implements OnInit {
  gameHistory: GameHistoryModalOptions = {
    gameName: undefined,
    gameHistory: [],
  };
  
  constructor(private _modalService: ModalService) {}

  ngOnInit(): void {
    this._modalService.modalState$.subscribe((state) => {
      if (state.isOpen) {
        this.gameHistory = {
          gameName: state.data?.title as GameName,
          gameHistory: (state.data?.gameData as GameHistoryItem[]) || [],
        };
      }
    });
  }

  closeModal(): void {
    this._modalService.closeModal();
  }
}
