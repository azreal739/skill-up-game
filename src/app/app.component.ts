import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SignUpModalComponent } from "../components/sign-up-modal/sign-up-modal.component";
import { PageMenuComponent } from "../components/menu/menu.component";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { transform } from 'typescript';

const hidden = { transform : 'translateX(120%)' };
const visible = {transform : 'translateX(0)'};
const timing = '1s ease-in';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, SignUpModalComponent, PageMenuComponent, CommonModule],
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
  protected signUpModalOpen = false;
  protected menuOpen = false;
}
