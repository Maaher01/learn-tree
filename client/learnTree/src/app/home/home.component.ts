import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public currentUser: any

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.getCurrentStudent()
    this.getCurrentTeacher()
  }

  getCurrentStudent() {
    const student = this.userService.getStudentFromLocalStorage()
    if (student) {
      this.currentUser = student
    }
  }

  getCurrentTeacher() {
    const teacher = this.userService.getTeacherFromLocalStorage()
    if (teacher) {
      this.currentUser = teacher
    }
  }
}
