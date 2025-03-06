import { Component, EventEmitter, Output } from '@angular/core';
import { ModalService, ModalTemplate } from 'src/services/ModalService';

@Component({
  selector: 'app-page-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true
})
export class PageMenuComponent {
  @Output() close = new EventEmitter<void>();
  protected items = [
    'Tic Tac Toe',
    'Blackjack',
    'Chess',
    'More...' 
  ];

  constructor(private modalService: ModalService) {}

  // When a menu item is clicked, open the game history modal
  openGameHistoryModal(): void {
    this.modalService.openModal(ModalTemplate.GameHistory);
    // Optionally close the menu after opening the modal
    this.close.emit();
  }
}
