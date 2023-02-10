import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public errorResponse!: string;

  registerForm = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(11)]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
    birth_date: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(256)]),
    father_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
    mother_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
    role: new FormControl('', [Validators.required])
  })

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  registerUser() {
    this.userService.register(this.registerForm.value).subscribe({
      next: () => {
        this.registerForm.reset()
        this.router.navigate(['/'])
      },
      error: (err) => {
        this.errorResponse = err.message
      }
    })
  }
}
