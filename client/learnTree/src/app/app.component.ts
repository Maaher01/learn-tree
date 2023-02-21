import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public userService: UserService) { }

  ngDoCheck(): void {
    this.isLoggedIn()
  }

  isLoggedIn() {
    return localStorage.getItem('user')
  }

  displayName() {
    return JSON.parse(localStorage.getItem('user') || '{}').name.split(' ')[0];
  }

  logout() {
    this.userService.logout()
  }

}


