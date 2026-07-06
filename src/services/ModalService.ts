import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum ModalTemplate {
  SignUpForm = 'sign-up-form',
  GameHistory = 'game-history',
  Cities = 'cities',
  Weather = 'weather',
}

export interface ModalState<T = unknown> {
  isOpen: boolean;
  template?: ModalTemplate;
  data?: ModalData<T> | undefined;
}

export interface ModalData<T = unknown> {
  title: string;
  message?: string;
  action?: string;
  gameData?: T;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalStateSubject = new BehaviorSubject<ModalState>({ isOpen: false });
  modalState$ = this.modalStateSubject.asObservable();

  openModal<T>(template: ModalTemplate, data?: ModalData<T>): void {
    this.modalStateSubject.next({ isOpen: true, template, data });
  }

  closeModal(): void {
    this.modalStateSubject.next({ isOpen: false });
  }
}
