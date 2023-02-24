import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public userService: UserService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUrl = state.url;
    const isLoggedIn = this.userService.isLoggedIn;
    const AUTH_URLS = ['/user/register', 'user/login'];

    if (AUTH_URLS.includes(currentUrl) && isLoggedIn) {
      this.router.navigateByUrl('/');
      return false;
    }

    if (!AUTH_URLS.includes(currentUrl) && !isLoggedIn) {
      this.router.navigateByUrl('/user/login');
      return false;
    }
    return true;
  }
}
