import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  public errorResponse!: string
  public successResponse!: string

  studentResetPasswordForm = this.fb.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(11)])
  })

  teacherResetPasswordForm = this.fb.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(11)])
  })

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  resetStudentPassword() {
    const email = this.studentResetPasswordForm.controls['email'].value
    const newPassword = this.studentResetPasswordForm.controls['password'].value
    this.userService.resetStudentPassword({ email, newPassword }).subscribe({
      next: () => {
        this.errorResponse = ''
        this.studentResetPasswordForm.reset()
      },
      error: (err) => {
        this.successResponse = ''
        this.errorResponse = err.message
      }
    })
  }

  resetTeacherPassword() {
    const email = this.teacherResetPasswordForm.controls['email'].value
    const newPassword = this.teacherResetPasswordForm.controls['password'].value
    this.userService.resetTeacherPassword({ email, newPassword }).subscribe({
      next: () => {
        this.errorResponse = ''
        this.teacherResetPasswordForm.reset()
      },
      error: (err) => {
        this.successResponse = ''
        this.errorResponse = err.message
      }
    })
  }
}
