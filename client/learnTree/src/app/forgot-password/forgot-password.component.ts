import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  public errorResponse!: string;
  public successResponse!: string;

  resetPasswordForm = this.fb.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(11),
    ]),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  resetPassword() {
    const email = this.resetPasswordForm.controls['email'].value;
    const newPassword = this.resetPasswordForm.controls['password'].value;
    this.authService.resetUserPassword({ email, newPassword }).subscribe({
      next: () => {
        this.errorResponse = '';
        this.resetPasswordForm.reset();
      },
      error: (err) => {
        this.successResponse = '';
        this.errorResponse = err.message;
      },
    });
  }
}
