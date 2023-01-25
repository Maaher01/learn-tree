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

  studentRegister = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(11)]),
    department: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(128)]),
    semester: new FormControl('', [Validators.required, Validators.min(1), Validators.max(24)]),
    cgpa: new FormControl('', [Validators.min(0), Validators.max(4)]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
    birth_date: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(256)]),
    father_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
    mother_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)])
  })

  teacherRegister = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(11)]),
    department: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(128)]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
    birth_date: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(256)]),
  })

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  registerStudent() {
    this.userService.registerStudent(this.studentRegister.value).subscribe({
      next: () => {
        this.studentRegister.reset()
        this.router.navigate(['/'])
      },
      error: (err) => {
        this.errorResponse = err.message
      }
    })
  }

  registerTeacher() {
    this.userService.registerTeacher(this.teacherRegister.value).subscribe({
      next: () => {
        this.teacherRegister.reset()
        this.router.navigate(['/'])
      },
      error: (err) => {
        this.errorResponse = err.message
      }
    })
  }

}
