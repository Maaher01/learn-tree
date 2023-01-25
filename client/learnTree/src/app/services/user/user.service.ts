import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private studentUrl = "http://localhost:3000/api/student"
  private teacherUrl = "http://localhost:3000/api/teacher"

  constructor(private http: HttpClient, public router: Router) { }

  registerStudent(student: any): Observable<any> {
    let studentUrl = `${this.studentUrl}/register`;
    return this.http.post(studentUrl, student).pipe(
      tap((res: any) => {
        this.setStudent(res.data.student)
      }),
      catchError(this.handleError)
    )
  }

  registerTeacher(teacher: any): Observable<any> {
    let teacherUrl = `${this.teacherUrl}/register`;
    return this.http.post(teacherUrl, teacher).pipe(
      tap((res: any) => {
        this.setStudent(res.data.teacher)
      }),
      catchError(this.handleError)
    )
  }

  setStudent(student: any): void {
    localStorage.setItem('student', JSON.stringify(student))
  }

  setTeacher(teacher: any): void {
    localStorage.setItem('teacher', JSON.stringify(teacher))
  }

  private handleError(response: HttpErrorResponse) {
    let errorResponse: any = {}
    errorResponse['status'] = response.status
    errorResponse['message'] = response.error.error
    return throwError(() => errorResponse)
  }
}
