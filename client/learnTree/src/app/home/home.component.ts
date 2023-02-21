import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public currentUser: any;
  // public userId: any;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.getCurrentUser();
    this.userService.getUserInfo(this.currentUser.id);
  }

  getCurrentUser() {
    const user = this.userService.getUserFromLocalStorage();
    if (user) {
      this.currentUser = user;
    }
  }

  getUserId() {
    this.userService.getUserId();
  }

  // getUserInfo() {
  //   this.userService.getUserInfo(this.getUserId());
  // }
}
