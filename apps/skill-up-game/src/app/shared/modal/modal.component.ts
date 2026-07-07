import { Component, HostListener, OnInit } from '@angular/core';

import { A11yModule } from '@angular/cdk/a11y';
import { ModalService, ModalState, ModalTemplate } from 'src/services/ModalService';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { GameHistoryModalComponent } from './game-history-modal/game-history-modal.component';
import { CitiesComponent } from './api-test/api-test-cities-modal.component';
import { WeatherComponent } from './api-test/api-test-weather-modal.component';

@Component({
  selector: 'main-modal',
  standalone: true,
  imports: [A11yModule, SignUpFormComponent, GameHistoryModalComponent, CitiesComponent, WeatherComponent],
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

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.currentState.isOpen) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.modalService.closeModal();
  }
}
