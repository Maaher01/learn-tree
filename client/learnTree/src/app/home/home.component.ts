import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public currentUser: any;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.getCurrentUser();
    this.getUserInfo();
  }

  getCurrentUser() {
    const user = this.userService.getUserFromLocalStorage();
    if (user) {
      this.currentUser = user;
    }
  }

  getUserId() {
    return JSON.parse(localStorage.getItem('user') || '{}').id;
  }

  getUserInfo() {
    this.userService.getUserInfo(this.currentUser.id).subscribe();
  }
}
