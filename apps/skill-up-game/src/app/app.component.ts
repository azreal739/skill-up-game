import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

import { ModalComponent } from './shared/modal/modal.component';
import { PageMenuComponent } from './shared/menu/menu.component';
import { ModalService, ModalTemplate } from 'src/services/ModalService';

const hidden = { transform: 'translateX(120%)' };
const visible = { transform: 'translateX(0)' };
const timing = '0.3s ease-in-out';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ModalComponent, PageMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('openClose', [
      transition(':enter', [style(hidden), animate(timing, style(visible))]),
      transition(':leave', [style(visible), animate(timing, style(hidden))]),
    ]),
  ],
})
export class AppComponent {
  title = 'Up Skill Game';
  protected menuOpen = false;

  constructor(private _modalService: ModalService) {}

  public openSignUpModal(): void {
    this._modalService.openModal(ModalTemplate.SignUpForm, {
      title: 'Sign Up',
      message: 'Hello! Welcome to the family.',
    });
  }
}
