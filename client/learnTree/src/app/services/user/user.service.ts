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
    let studentRegisterUrl = `${this.studentUrl}/register`;
    return this.http.post(studentRegisterUrl, student).pipe(
      tap((res: any) => {
        this.setStudent(res.data.student)
      }),
      catchError(this.handleError)
    )
  }

  registerTeacher(teacher: any): Observable<any> {
    let teacherRegisterUrl = `${this.teacherUrl}/register`;
    return this.http.post(teacherRegisterUrl, teacher).pipe(
      tap((res: any) => {
        this.setTeacher(res.data.teacher)
      }),
      catchError(this.handleError)
    )
  }

  loginStudent(student: any): Observable<any> {
    let studentLoginUrl = `${this.studentUrl}/login`
    return this.http.post<any>(studentLoginUrl, student).pipe(
      tap((res: any) => {
        this.setStudent(res.data.student)
      }),
      catchError(this.handleError)
    )
  }

  loginTeacher(teacher: any): Observable<any> {
    let teacherLoginUrl = `${this.teacherUrl}/login`
    return this.http.post<any>(teacherLoginUrl, teacher).pipe(
      tap((res: any) => {
        this.setTeacher(res.data.teacher)
      }),
      catchError(this.handleError)
    )
  }

  logoutStudent() {
    localStorage.removeItem('student')
    this.router.navigateByUrl('/student/login')
  }

  logoutTeacher() {
    localStorage.removeItem('teacher')
    this.router.navigateByUrl('/teacher/login')
  }

  resetStudentPassword(payload: any) {
    let resetStudentPasswordUrl = `${this.studentUrl}/forgot-password`
    return this.http.put<any>(resetStudentPasswordUrl, payload).pipe(
      tap((res: any) => {
        localStorage.removeItem('student')
        this.router.navigateByUrl('/student/login')
      }),
      catchError(this.handleError)
    )
  }

  resetTeacherPassword(payload: any) {
    let resetTeacherPasswordUrl = `${this.teacherUrl}/forgot-password`
    return this.http.put<any>(resetTeacherPasswordUrl, payload).pipe(
      tap((res: any) => {
        localStorage.removeItem('teacher')
        this.router.navigateByUrl('/teacher/login')
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

  get studentIsLoggedIn(): Boolean {
    const student = this.getStudentFromLocalStorage()
    return student ? true : false
  }

  get teacherIsLoggedIn(): Boolean {
    const teacher = this.getTeacherFromLocalStorage()
    return teacher ? true : false
  }

  getStudentFromLocalStorage() {
    const token = localStorage.getItem('student')
    if (token) {
      return JSON.parse(token)
    }
    return null
  }

  getTeacherFromLocalStorage() {
    const token = localStorage.getItem('teacher')
    if (token) {
      return JSON.parse(token)
    }
    return null
  }

  private handleError(response: HttpErrorResponse) {
    let errorResponse: any = {}
    errorResponse['status'] = response.status
    errorResponse['message'] = response.error.error
    return throwError(() => errorResponse)
  }
}
