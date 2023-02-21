import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient, public router: Router) {}

  register(user: any): Observable<any> {
    let signupUrl = `${this.apiUrl}/register`;
    return this.http.post(signupUrl, user).pipe(
      tap((res: any) => {
        this.setUser(res.data.user);
      }),
      catchError(this.handleError)
    );
  }

  login(user: any): Observable<any> {
    let loginUrl = `${this.apiUrl}/login`;
    return this.http.post<any>(loginUrl, user).pipe(
      tap((res: any) => {
        this.setUser(res.data.user);
      }),
      catchError(this.handleError)
    );
  }

  getUserInfo(id: any): Observable<any> {
    let infoUrl = `/`;
    return this.http.post<any>(infoUrl, id).pipe(
      tap((res: any) => {
        this.setUser(res.data.user);
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/user/login');
  }

  resetUserPassword(payload: any) {
    let resetPasswordUrl = `${this.apiUrl}/forgot-password`;
    return this.http.put<any>(resetPasswordUrl, payload).pipe(
      tap((res: any) => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/user/login');
      }),
      catchError(this.handleError)
    );
  }

  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  get isLoggedIn(): Boolean {
    const user = this.getUserFromLocalStorage();
    return user ? true : false;
  }

  getUserFromLocalStorage() {
    const token = localStorage.getItem('user');
    if (token) {
      return JSON.parse(token);
    }
    return null;
  }

  getUserId() {
    return JSON.parse(localStorage.getItem('user') || '{}').id;
  }

  private handleError(response: HttpErrorResponse) {
    let errorResponse: any = {};
    errorResponse['status'] = response.status;
    errorResponse['message'] = response.error.error;
    return throwError(() => errorResponse);
  }
}
