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
    this.getCurrentUser()
  }

  getCurrentUser() {
    const user = this.userService.getUserFromLocalStorage()
    if (user) {
      this.currentUser = user
    }
  }
}
