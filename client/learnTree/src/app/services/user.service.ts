import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'http://localhost:3000/api/home';

  constructor(private http: HttpClient) {}

  getUserInfo(id: number): Observable<any> {
    return this.http.post<any>(this.userUrl, { user_id: id }).pipe(
      map((res) => res.data),
      catchError(this.handleError)
    );
  }

  // getUserRole(id: number): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, { user_id: id }).pipe(
  //     map((res) => res.data),
  //     catchError(this.handleError)
  //   );
  // }

  private handleError(response: HttpErrorResponse) {
    let errorResponse: any = {};
    errorResponse['status'] = response.status;
    errorResponse['message'] = response.error.error;
    return throwError(() => errorResponse);
  }
}
