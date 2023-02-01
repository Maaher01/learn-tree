import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public errorResponse!: string

  studentLogin = this.fb.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  teacherLogin = this.fb.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  loginStudent() {
    this.userService.loginStudent(this.studentLogin.value).subscribe({
      next: () => {
        this.studentLogin.reset()
        this.router.navigate(['/'])
      },
      error: (err) => {
        this.errorResponse = err.message
      }
    })
  }

  loginTeacher() {
    this.userService.loginTeacher(this.teacherLogin.value).subscribe({
      next: () => {
        this.teacherLogin.reset()
        this.router.navigate(['/'])
      },
      error: (err) => {
        this.errorResponse = err.message
      }
    })
  }

}
