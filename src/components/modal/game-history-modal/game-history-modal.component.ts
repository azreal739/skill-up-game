import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from 'src/services/ModalService';

interface GameHistoryItem {
  date: Date;
  result: string; // e.g., 'Win', 'Loss', 'Draw'
  moves: string[];
}

interface GameHistoryModalOptions {
  gameName: string;
  gameHistory: GameHistoryItem[];
}

@Component({
  selector: 'app-game-history-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-history-modal.component.html',
  styleUrl: './game-history-modal.component.scss'
})
export class GameHistoryModalComponent implements OnInit {
  gameHistory: GameHistoryModalOptions = { gameName: '', gameHistory: [] };

  constructor(private _modalService: ModalService) {}

  ngOnInit(): void {
    // For now, we load some dummy data.
    // In a real app, you might retrieve this from a dedicated service or local storage.
    this.gameHistory = {
      gameName: 'Chess',
      gameHistory:
      [
      { date: new Date(), result: 'Win', moves: ['e4', 'e5', 'Nf3', 'Nc6'] },
      { date: new Date(), result: 'Loss', moves: ['d4', 'Nf6', 'c4', 'g6'] },
      { date: new Date(), result: 'Draw', moves: ['c4', 'e5', 'Nc3', 'Nf6'] },
    ]
  };
  }

  closeModal(): void {
    this._modalService.closeModal();
  }
}

