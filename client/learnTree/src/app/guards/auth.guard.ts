import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUrl = state.url;
    const isLoggedIn = this.authService.isLoggedIn;
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
