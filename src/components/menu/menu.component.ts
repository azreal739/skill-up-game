import { Component, EventEmitter, Output } from '@angular/core';
import { LocalStorageKey, LocalStorageService } from 'src/services/LocalStorageService';
import { ModalData, ModalService, ModalTemplate } from 'src/services/ModalService';
import { GameHistoryItem, GameName } from '../modal/game-history-modal/game-history-modal.component';

@Component({
  selector: 'app-page-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
})
export class PageMenuComponent {
  @Output() close = new EventEmitter<void>();
  protected items = Object.values(GameName);

  constructor(private modalService: ModalService, private _localStorageService: LocalStorageService) {}

  // When a menu item is clicked, open the game history modal
  openGameHistoryModal(gameToOpen: GameName): void {
    const modalData: ModalData<GameHistoryItem[]>  = {
      title: gameToOpen,
      message: 'Your game history will be below.',
      gameData: [],
    };
    switch (gameToOpen) {
      case GameName.TicTacToe:
        modalData.action = 'Play Tic Tac Toe';
        modalData.gameData = this._localStorageService.get<GameHistoryItem[]>(LocalStorageKey.ticTacToeGameHistory) || [];
        break;
      case GameName.BlackJack:
        modalData.action = 'Play Blackjack';
        modalData.gameData = this._localStorageService.get<GameHistoryItem[]>(LocalStorageKey.blackJackHistory) || [];
        break;
      case GameName.Chess:
        modalData.action = 'Play Chess';
        // Chess does not have history yes
        // Implement this
        modalData.gameData = this._localStorageService.get<GameHistoryItem[]>(LocalStorageKey.chessGameState) || [];
        break;
      default:
        modalData.action = '????';
        break;
    }

    this.modalService.openModal<GameHistoryItem[]>(ModalTemplate.GameHistory, modalData);

    // Optionally close the menu after opening the modal
    this.close.emit();
  }

  openCitiesModal(): void {
    this.modalService.openModal(ModalTemplate.Cities, {
      title: 'Cities',
      message: 'Here are all the Cities.',
      gameData: undefined,
    });
    // Optionally close the menu after opening the modal
    this.close.emit();
  }

  openWeatherModal(): void {
    this.modalService.openModal(ModalTemplate.Weather, {
      title: 'Weather',
      message: 'Welcome to the weather.',
      gameData: undefined,
    });
    // Optionally close the menu after opening the modal
    this.close.emit();
  }
}
