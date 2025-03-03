// Add Modal Service to handle modals and templates in the app

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

    // @Injectable({
    //     providedIn: 'root'
    // })
    // export class ModalService {
      
    //     openModal(template: ModalTemplate) {
    //     //   this..next(template);
    //     }
    //   }