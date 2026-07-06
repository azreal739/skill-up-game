import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageKey, LocalStorageService } from 'src/services/LocalStorageService';

export interface SignedUpUser {
  name: string;
  email: string;
}

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {
  @Output() formSubmitted = new EventEmitter<void>();

  submitted = false;
  signedUpName = '';

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _localStorageService = inject(LocalStorageService);

  readonly form = this._formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  showError(controlName: 'name' | 'email' | 'password'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || this.submitted);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const { name, email } = this.form.getRawValue();
    const user: SignedUpUser = { name, email };
    this._localStorageService.set(LocalStorageKey.signedUpUser, user);
    this.signedUpName = name;
  }

  done(): void {
    this.formSubmitted.emit();
  }
}
