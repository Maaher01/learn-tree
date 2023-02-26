import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public userService: UserService) {}

  logout() {
    this.userService.logout();
  }
}
