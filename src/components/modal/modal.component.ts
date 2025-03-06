import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalService, ModalState, ModalTemplate } from 'src/services/ModalService';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { A11yModule } from '@angular/cdk/a11y';
import { GameHistoryModalComponent } from "./game-history-modal/game-history-modal.component";

@Component({
  selector: 'main-modal',
  standalone: true,
  imports: [CommonModule, SignUpFormComponent, A11yModule, GameHistoryModalComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  public ModalTemplate = ModalTemplate;
  currentState: ModalState = { isOpen: false };

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.modalState$.subscribe((state) => {
      this.currentState = state;
    });
  }

  closeModal(): void {
    this.modalService.closeModal();
  }
}
