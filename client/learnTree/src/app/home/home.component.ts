import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public currentUser: User | null;
  public userInfo$: Observable<any>;
  public userRole$: Observable<any>;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.userService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
    this.getUserInfo();
    this.getUserRole();
  }

  getUserInfo() {
    this.userInfo$ = this.userService.getUserInfo(this.currentUser.id);
  }

  getUserRole() {
    this.userRole$ = this.userService.getUserRole(this.currentUser.id);
  }
}
