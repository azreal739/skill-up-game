import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ModalComponent } from "../components/modal/modal.component";
import { PageMenuComponent } from "../components/menu/menu.component";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { transform } from 'typescript';
import { ModalService, ModalTemplate } from 'src/services/ModalService';
import { template } from '@angular-devkit/core';

const hidden = { transform : 'translateX(120%)' };
const visible = {transform : 'translateX(0)'};
const timing = '1s ease-in';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ModalComponent, PageMenuComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style(hidden),
        animate(timing, style(visible))
      ]),
      transition(':leave', [
        style(visible),
        animate(timing, style(hidden))
      ]) 
    ])
  ]
})
export class AppComponent {
  title = 'Up Skill Game';
  @Output() menuClick = new EventEmitter<void>();

  constructor(private _modalService: ModalService) { 

  }

  // constructor(private _modalService: ModalService) {
  //   const modalOprions = {
  //     backdrop: true,
  //     keyboard: true,
  //     focus: true,
  //     show: false,
  //     template: ModalTemplate.GameHistory,
  //   };
  //   this._modalService.showModal.subscribe((isOpen, ) => {
  //     this.signUpModalOpen = isOpen;
  //   });
  // }
  protected signUpModalOpen = false;
  protected menuOpen = false;
  protected modalTemplate = ModalTemplate.SignUpForm;

  public openModal() {
    this._modalService.openModal(ModalTemplate.SignUpForm, { gameData: undefined });
  }
}
