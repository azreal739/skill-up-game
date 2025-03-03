import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpFormComponent } from "./sign-up-form/sign-up-form.component";
import { A11yModule } from '@angular/cdk/a11y';
import { ModalTemplate } from 'src/services/ModalService';



@Component({
  selector: 'main-modal',
  standalone: true,
  imports: [CommonModule, SignUpFormComponent, A11yModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Output() modalClose = new EventEmitter<void>();
  @Input() modalTemplate : ModalTemplate = ModalTemplate.SignUpForm;

  
}
