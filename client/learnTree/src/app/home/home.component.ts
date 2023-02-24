import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { User } from '../models/Users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public currentUser: User | null;
  public userInfo$: Observable<any>;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.userService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
    this.getUserInfo();
  }

  getUserInfo() {
    this.userInfo$ = this.userService.getUserInfo(this.currentUser.id);
  }
}
