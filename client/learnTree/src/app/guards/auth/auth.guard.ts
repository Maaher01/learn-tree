import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public userService: UserService, public router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUrl = state.url;
    const studentIsLoggedIn = this.userService.studentIsLoggedIn;
    const teacherIsLoggedIn = this.userService.teacherIsLoggedIn;
    const AUTH_URLS = ['/student/register', 'teacher/register', 'student/login', 'teacher/login']

    if (AUTH_URLS.includes(currentUrl) && (studentIsLoggedIn || teacherIsLoggedIn)) {
      this.router.navigateByUrl('/')
      return false;
    }

    if (!AUTH_URLS.includes(currentUrl) && !studentIsLoggedIn) {
      this.router.navigateByUrl('/student/login')
      return false;
    }

    if (!AUTH_URLS.includes(currentUrl) && !teacherIsLoggedIn) {
      this.router.navigateByUrl('/teacher/login')
    }
    return true;
  }
}
