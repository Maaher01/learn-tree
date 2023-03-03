import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public errorResponse!: string;

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginUser() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loginForm.reset();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorResponse = err.message;
      },
    });
  }
}
