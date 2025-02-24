import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpFormComponent } from "../sign-up-form/sign-up-form.component";
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-sign-up-modal',
  standalone: true,
  imports: [CommonModule, SignUpFormComponent, A11yModule],
  templateUrl: './sign-up-modal.component.html',
  styleUrl: './sign-up-modal.component.scss'
})
export class SignUpModalComponent {
  @Output() modalClose = new EventEmitter<void>();

}
