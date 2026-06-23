
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
    Cities = 'cities',
    Weather = 'weather',
  }
  export interface ModalState<T = any> {
    isOpen: boolean;
    template?: ModalTemplate;
    data?: ModalData<T> | undefined;
  }

  export interface ModalData<T = any> {
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
  