
  import { Injectable } from '@angular/core';
  import { BehaviorSubject } from 'rxjs';
  
  export enum ModalTemplate {
    SignUpForm = 'sign-up-form',
    SignInForm = 'sign-in-form',
    ForgotPassword = 'forgot-password',
    ResetPassword = 'reset-password',
    ConfirmEmail = 'confirm-email',
    ConfirmPassword = 'confirm-password',
    ConfirmDelete = 'confirm-delete',
    GameHistory = 'game-history',
  }
  export interface ModalState {
    isOpen: boolean;
    template?: ModalTemplate;
    data?: any;
  }
  
  @Injectable({
    providedIn: 'root',
  })
  export class ModalService {
    private modalStateSubject = new BehaviorSubject<ModalState>({ isOpen: false });
    modalState$ = this.modalStateSubject.asObservable();
  
    openModal(template: ModalTemplate, data?: any): void {
      this.modalStateSubject.next({ isOpen: true, template, data });
    }
  
    closeModal(): void {
      this.modalStateSubject.next({ isOpen: false });
    }
  }
  