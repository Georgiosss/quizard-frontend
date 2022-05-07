import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  endpoint: string = 'http://backendfoobar-env.eba-csyhpyy3.eu-central-1.elasticbeanstalk.com';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: User = new User();

  constructor(private http: HttpClient, public router: Router) {}

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/api/auth/signup`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/api/auth/signin`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['main-page']);
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getCurrentUser() {
    let obj = localStorage.getItem('user');
    return JSON.parse(obj == null ? '' : obj);
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  public doLogout() {
    localStorage.removeItem('user');
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['']);
    }
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  hasRoleIn(roles: string[]) {
    let user: User = this.getCurrentUser();
    return user.roles.filter(x => x in roles).length > 0;
    console.log(user.roles.filter(x => x in roles));
    console.log(user.roles);
    console.log(roles);
  }
}
